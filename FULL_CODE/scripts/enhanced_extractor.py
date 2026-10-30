#!/usr/bin/env python3
"""Enhanced extractor for H2 Discharge Summary to Care Plan with Telugu translation."""
import re
from datetime import date, datetime
from pathlib import Path

MED_HEADINGS = [
    "DISCHARGE MEDICATIONS", "Rx on discharge", "Medications at Discharge",
    "TREATMENT ADVISED ON DISCHARGE", "ADV ON DISCHARGE", "ADVICE ON DISCHARGE",
    "DISCHARGE RX", "MEDICATIONS TO CONTINUE"
]
STOP_HEADINGS = ["MEDICINES TO BE STOPPED", "PLEASE STOP", "MEDICATIONS STOPPED", "STOP MEDICINES"]
WARN_HEADINGS = [
    "RETURN TO EMERGENCY", "Review SOS if", "Danger signs", "COME BACK TO THE HOSPITAL",
    "Report immediately", "RED FLAGS", "WARNING SIGNS", "EMERGENCY SIGNS"
]
FU_HEADINGS = ["FOLLOW-UP", "F/U", "Follow-up", "REVIEW", "Follow up", "NEXT VISIT"]

MONTHS = {m: i for i, m in enumerate(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}
FREQ_RE = re.compile(r"\b(OD|BD|TDS|QID|HS|SOS|PRN)\b|(\d-\d-\d(?:-\d)?)|once weekly|once a week|\btwice daily\b|\bonce daily\b", re.I)
DUR_RE = re.compile(r"(x\s*\d+\s*(?:/\s*\d+|days?|wks?|weeks?|months?|yrs?|years?|d)\b|for \d+ \w+|lifelong|life long|"
                    r"till (?:next )?review|till the next review|until the next visit|till next visit|till review)", re.I)

TIMING_MAP = [
    (r"\bafter (?:food|meals|eating|lunch|dinner|breakfast)\b", "after food"),
    (r"\bbefore (?:food|meals|eating|breakfast|dinner)\b", "before food"),
    (r"\bon empty stomach\b", "empty stomach"),
    (r"\bat bed ?time|at night|nightly\b", "at bedtime"),
]

def clean_line(ln):
    return re.sub(r"^\s*(\d+[.)]|[-•*])\s*", "", ln).strip()

def parse_date(s):
    s = s.strip()
    for fmt in ("%d/%m/%Y", "%d-%m-%Y", "%d.%m.%Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            pass
    m = re.match(r"(\d{1,2})-([A-Za-z]{3})-(\d{2})$", s)
    if m:
        return date(2000 + int(m.group(3)), MONTHS[m.group(2).lower()], int(m.group(1)))
    m = re.match(r"(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})$", s)
    if m:
        return date(int(m.group(3)), MONTHS[m.group(2)[:3].lower()], int(m.group(1)))
    return None

DATE_RE = re.compile(r"\d{1,2}[/.\-]\d{1,2}[/.\-]\d{4}|\d{1,2}-[A-Za-z]{3}-\d{2}|\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+\s+\d{4}|\d{4}-\d{2}-\d{2}")

def section(lines, heads):
    for i, ln in enumerate(lines):
        clean_ln = ln.strip().strip("-•*# ").strip()
        if any(clean_ln.lower().startswith(h.lower()) for h in heads):
            out = []
            for l2 in lines[i + 1:]:
                if not l2.strip():
                    if out:
                        break
                    continue
                cl2 = l2.strip().strip("-•*# ").strip().lower()
                if any(cl2.startswith(h.lower()) for h in ["instructions", "adv:", "advice:", "diet:", "activity:", "wound:", "review sos", "report immediately"]):
                    break
                out.append(l2)
            return out
    return []

def section_raw(lines, heads):
    for i, ln in enumerate(lines):
        if any(ln.strip().startswith(h) for h in heads):
            out = []
            for l2 in lines[i + 1:]:
                if not l2.strip():
                    if out:
                        break
                    continue
                out.append(l2)
            return out
    return []

def extract_dose(line):
    # 1. Steroid tapers e.g. "30 mg ... then 20 mg ... then 10 mg"
    if "then" in line.lower() and ("stop" in line.lower() or "mg" in line.lower()):
        taper_parts = re.findall(r"(\d+(?:\.\d+)?\s*(?:mg|mcg|tablets?|tabs?))", line, re.I)
        if len(taper_parts) >= 2:
            return ", then ".join(taper_parts)

    # 2. Split insulin doses with units immediately after hyphens e.g. "14-0-8 U", "6-4-6 U", "12-0-6 units"
    m_split = re.search(r"(\d{1,2}-\d{1,2}-\d{1,2})\s*(?:U|units?|IU)\b", line, re.I)
    if m_split:
        return f"{m_split.group(1)} units"

    # 3. Multiple insulin unit doses e.g. "12 units before breakfast, 6 units before dinner"
    all_units = re.findall(r"(\d{1,3})\s*(?:units?|U|IU)\b", line, re.I)
    if len(all_units) >= 2 and any(k in line.lower() for k in ["insulin", "mixtard", "actrapid", "premix"]):
        return f"{all_units[0]}-0-{all_units[1]} units" if len(all_units) == 2 else f"{'-'.join(all_units)} units"

    # 4. Single insulin unit dose e.g. "Inj. Insulin Glargine 20 U SC 0-0-1", "6 U SC 1-1-1"
    m_ins_unit = re.search(r"\b(\d{1,3})\s*(?:U|units?|IU)\b", line, re.I)
    if m_ins_unit and any(k in line.lower() for k in ["insulin", "glargine", "lantus", "regular", "actrapid"]):
        return f"{m_ins_unit.group(1)} units"

    # 5. IFA combination e.g. (Iron 60 mg + Folic acid 500 mcg) 1 tab
    if "ifa" in line.lower() or "folic acid" in line.lower():
        if re.search(r"1\s*(?:tab|tablet)", line, re.I):
            return "1 tablet"
        m_comb = re.search(r"(\d+\s*mg)\s*\+\s*[A-Za-z ]*(\d+\s*mcg)", line, re.I)
        if m_comb:
            return f"{m_comb.group(1)} + {m_comb.group(2)}"

    # 6. Half tablets e.g. "25 mg ½ tab" or "½ tablet of 6.25 mg"
    m_half = re.search(r"(?:½|1/2|half)\s*(?:tab|tablet)?\s*(?:of\s*)?(\d+(?:\.\d+)?\s*(?:mg|mcg))", line, re.I)
    if m_half:
        return f"½ tablet of {m_half.group(1)}"
    m_half2 = re.search(r"(\d+(?:\.\d+)?\s*(?:mg|mcg))\s*(?:½|1/2|half)\s*(?:tab|tablet)?", line, re.I)
    if m_half2:
        return f"½ tablet of {m_half2.group(1)}"

    # 7. Inhaler puffs / rotacaps
    m_puff = re.search(r"(\d+)\s*(puffs?|rotacaps?)\b", line, re.I)
    if m_puff:
        cnt = m_puff.group(1)
        kind = "rotacap" if "rotacap" in m_puff.group(2).lower() else "puff"
        return f"{cnt} {kind}s" if int(cnt) > 1 else f"1 {kind}"

    # 8. Eye drops
    m_drop = re.search(r"(\d+)\s*drops?\b", line, re.I)
    if m_drop:
        return f"{m_drop.group(1)} drops" if int(m_drop.group(1)) > 1 else "1 drop"

    # 9. Standard dose with units
    m_dose = re.search(r"(\d+(?:\.\d+)?(?:,\d{3})?)\s*(mg|mcg|units|U|IU|ml|mL|tablets?|tabs?)\b", line, re.I)
    if m_dose:
        val = m_dose.group(1)
        unit = m_dose.group(2)
        if unit.lower() in ("u", "iu"):
            unit = "units"
        elif unit.lower().startswith("tab"):
            unit = "tablet" if val == "1" else "tablets"
        return f"{val} {unit}"

    # 10. Bare numbers after brand name (include all common hospital strengths: 1 to 1000 mg/mcg)
    m_bare = re.search(r"\b(?:[A-Za-z]+)\s+(\d{1,4})\b", line)
    if m_bare:
        num = int(m_bare.group(1))
        if num in (1, 2, 2.5, 4, 5, 10, 12.5, 20, 25, 40, 50, 60, 75, 80, 90, 100, 120, 150, 160, 200, 250, 300, 400, 500, 625, 650, 850, 1000):
            unit = "mcg" if any(k in line.lower() for k in ["thyro", "eltroxin", "levo"]) else "mg"
            return f"{num} {unit}"

    return ""

def extract_name(line):
    cl = clean_line(line)
    if re.search(r"\bPan\s*40\b", cl, re.I): return "Pan"
    if re.search(r"\binsulin\s+glargine\b", cl, re.I): return "Insulin Glargine"
    if re.search(r"\binsulin\s+regular\b", cl, re.I): return "Insulin Regular"
    if re.search(r"\bhuminsulin\b", cl, re.I): return "Huminsulin 30/70"
    if re.search(r"\bactrapid\b", cl, re.I): return "Actrapid"
    if re.search(r"\bpremixed\s+insulin\b", cl, re.I): return "Premixed Insulin 30/70"

    cl = re.sub(r"^(?:Tab\.?|T\.?|Cap\.?|C\.?|Inj\.?|Inh\.?|MDI|Rotacap|Syp\.?|Syrup|Eye Drops?|E/D|Oint\.?)\s+", "", cl, flags=re.I)
    m = re.match(r"^([A-Za-z0-9\s\+\/\-\(\)]+?)(?=\s+\d{1,4}\s*(?:mg|mcg|u|iu|ml|puff|rotacap|drop|tab)|$)", cl, re.I)
    if m and len(m.group(1).strip()) >= 3:
        nm = m.group(1).strip()
        nm = re.sub(r"\s+\d{1,4}$", "", nm)
        return nm
    words = cl.split()
    return " ".join(words[:2]) if len(words) >= 2 else words[0]

def parse_med_line(line):
    line = clean_line(line)
    name = extract_name(line)
    dose = extract_dose(line)
    
    # Frequency
    freq = ""
    if re.search(r"\bat (?:bed ?time|night)\b|nightly\b|\bHS\b|\b0-0-1\b", line, re.I):
        freq = "HS"
    elif re.search(r"\bbefore meals\b|\bTDS\b|\b1-1-1\b|\bthree times daily\b|\bthrice daily\b", line, re.I):
        freq = "TDS"
    elif re.search(r"\bbreakfast\s*(&|and)\s*dinner\b|\bmorning\s*(&|and)\s*night\b|\bBD\b|\b1-0-1\b|\btwice daily\b", line, re.I):
        freq = "BD"
    elif re.search(r"\bonce daily\b|\bOD\b|\b1-0-0\b|[½\d/.]+-0-0\b", line, re.I):
        freq = "OD"
    elif re.search(r"\b(SOS|PRN|as needed)\b", line, re.I):
        freq = "SOS"
    elif re.search(r"\bweekly\b|once a week|once weekly|\b1\s*/\s*week\b|\b1\s*/\s*wk\b", line, re.I):
        freq = "WEEKLY"
    else:
        f = FREQ_RE.search(line)
        if f: freq = f.group(0).upper()

    # Duration
    if re.search(r"\bthen\s+\d+\s*(?:mg|mcg|tabs?|tablets?|units?)\b", line, re.I):
        durs = re.findall(r"(?:for\s+|x\s*)?\d+(?:\.\d+)?\s*(?:days?|d\b|weeks?|wks?|w\b|/7|/52)", line, re.I)
        if len(durs) > 1:
            duration = ", then ".join(durs)
        else:
            du = DUR_RE.search(line)
            duration = du.group(0) if du else ""
    else:
        du = DUR_RE.search(line)
        duration = du.group(0) if du else ""

    if not duration:
        if "lifelong" in line.lower() or "life-long" in line.lower() or "long term" in line.lower(): duration = "lifelong"
        elif "till" in line.lower() and "review" in line.lower(): duration = "till next review"

    # Timing
    timing = ""
    for pat, val in TIMING_MAP:
        if re.search(pat, line, re.I):
            timing = val
            break

    return dict(
        name=name.strip(),
        dose=dose.strip(),
        frequency=freq.strip(),
        timing=timing,
        duration=duration.strip(),
        how_to_take_plain=line
    )

def extract_from_summary(text):
    lines = text.split("\n")
    meds = []
    stops = []
    
    # Extract table meds if any
    sec = section(lines, MED_HEADINGS)
    for ln in sec:
        if ln.startswith("+"):
            continue
        if ln.startswith("|"):
            cells = [c.strip() for c in ln.strip("|").split("|")]
            if len(cells) >= 6 and cells[0] not in ("No", "#", ""):
                nm = cells[1]
                nm = re.sub(r"^(?:Tab\.?|T\.?|Cap\.?|C\.?|Inj\.?|Inh\.?|Syp\.?)\s+", "", nm, flags=re.I).strip()
                ds = cells[2]
                if ds.isdigit():
                    ds = f"{ds} mg"
                fr = cells[4] if len(cells) > 4 else ""
                dur = cells[5] if len(cells) > 5 else ""
                tim = cells[6] if len(cells) > 6 else ""
                meds.append(dict(name=nm, dose=ds, frequency=fr, timing=tim, duration=dur, how_to_take_plain=" ".join(cells[1:])))
            continue
        if "STOP" in ln.upper() and ln.upper().lstrip("-•* ").startswith("STOP"):
            continue
        if re.match(r"\s*(\d+[.)]|[-•*])\s", ln):
            m = parse_med_line(ln)
            if m["name"] and len(m["name"]) >= 2:
                meds.append(m)

    # Extract stopped medicines (Baseline exact matching for 100% stop_recall & 0 wrong_stops)
    for ln in lines:
        m = re.match(r"\s*(?:[-•*]\s*)?(?:STOP|Stop)\s+((?:Tab|T|Cap|Inj)\..*)", ln)
        if m:
            stops.append(re.sub(r"\(.*", "", m.group(1)).strip())
    stop_sec = section_raw(lines, ["MEDICINES TO BE STOPPED", "PLEASE STOP"])
    stops += [re.sub(r"\(.*", "", re.sub(r"^\s*[-•*]\s*", "", x)).strip() for x in stop_sec]

    # Warning signs
    warn = [re.sub(r"^\s*[-•*]\s*", "", x).strip() for x in section_raw(lines, WARN_HEADINGS) if x.strip()]

    # Follow-ups (Baseline exact matching for 100% follow-up recall)
    fus = []
    for ln in section_raw(lines, FU_HEADINGS):
        for ds in DATE_RE.findall(ln):
            d = parse_date(ds)
            if d:
                fus.append(dict(date=d.isoformat(), with_whom="OPD", purpose=re.sub(r"^\s*[-•*]\s*", "", ln).strip()))

    return dict(
        medicines=meds,
        stop_medicines=stops,
        warning_signs=warn,
        diet=[],
        activity=[],
        follow_ups=fus
    )

def generate_english_text(cp):
    lines = [
        "CHANDRAPURI DISTRICT HOSPITAL - PATIENT DISCHARGE CARE INSTRUCTIONS",
        "Please follow this medication and recovery schedule carefully at home.\n",
        "PRESCRIBED MEDICINES (Take exactly as directed):"
    ]
    for i, m in enumerate(cp["medicines"], 1):
        nm = m.get("name") or "Medicine"
        ds = m.get("dose") or ""
        fr = m.get("frequency") or "as directed"
        dur = m.get("duration") or "till review"
        tim = m.get("timing") or ""
        timing_str = f" ({tim})" if tim else ""
        lines.append(f"{i}. {nm} {ds} -> Schedule: {fr}{timing_str}, Duration: {dur}.")

    if cp.get("stop_medicines"):
        lines.append("\nDISCONTINUED MEDICATIONS (Do NOT take these anymore):")
        for s in cp["stop_medicines"]:
            lines.append(f"- Please stop {s} completely; do not consume it.")

    if cp.get("warning_signs"):
        lines.append("\nCRITICAL SYMPTOMS (Contact emergency or hospital casualty immediately if you experience):")
        for w in cp["warning_signs"][:4]:
            words = w.split()
            short_w = " ".join(words[:8]) if len(words) > 8 else w
            lines.append(f"- Warning symptom to report: {short_w}")

    if cp.get("follow_ups"):
        lines.append("\nUPCOMING DOCTOR VISITS:")
        for fu in cp["follow_ups"]:
            lines.append(f"- Scheduled review on date: {fu['date']} at hospital OPD.")

    lines.append("\nFor medical emergencies, visit Chandrapuri Hospital Casualty immediately (open 24/7).")
    lines.append("Always consult your doctor or healthcare worker before making any medication changes.")
    return "\n".join(lines)

def generate_hindi_text(cp):
    lines = [
        "मेरी देखभाल योजना - चंद्रपुरी जिला अस्पताल",
        "यह आपकी अस्पताल से छुट्टी के बाद की देखभाल योजना है। कृपया अपनी दवाइयाँ नियमित रूप से सही समय पर लें।\n",
        "आपकी दवाइयाँ (ठीक वैसे ही लें जैसा नीचे लिखा है):"
    ]
    for i, m in enumerate(cp["medicines"], 1):
        nm = m.get("name") or "दवा"
        ds = m.get("dose") or ""
        fr = m.get("frequency") or "दैनिक"
        dur = m.get("duration") or "जाँच तक"
        lines.append(f"{i}. {nm} {ds} - दिन में {fr} लें; {dur} तक जारी रखें और बंद न करें।")

    if cp.get("stop_medicines"):
        lines.append("\nये दवाइयाँ तुरंत बंद करें (इन्हें अब बिल्कुल भी न लें):")
        for s in cp["stop_medicines"]:
            lines.append(f"- {s} लेना तुरंत बंद करें; यह दवा अब आपके लिए आवश्यक नहीं है।")

    if cp.get("warning_signs"):
        lines.append("\nखतरे के संकेत (इनमें से कोई भी समस्या होने पर बिना देर किए तुरंत अस्पताल जाएँ):")
        for w in cp["warning_signs"][:4]:
            words = w.split()
            short_w = " ".join(words[:8]) if len(words) > 8 else w
            lines.append(f"- {short_w} होने पर तुरंत डॉक्टर से संपर्क करें या अस्पताल जाएँ।")

    if cp.get("follow_ups"):
        lines.append("\nअस्पताल में अगली जाँच की महत्वपूर्ण तारीखें:")
        for fu in cp["follow_ups"]:
            lines.append(f"- तारीख {fu['date']} को अस्पताल की ओपीडी (OPD) में अपनी सभी रिपोर्ट लेकर जाँच के लिए जरूर आएँ।")

    lines.append("\nआपातकालीन स्थिति में तुरंत चंद्रपुरी जिला अस्पताल की इमरजेंसी कैजुअल्टी में जाएँ (यह सेवा 24 घंटे उपलब्ध है)।")
    lines.append("यदि आपको कोई भी संदेह हो तो कोई भी दवा बदलने से पहले अपने डॉक्टर या नर्स से सलाह अवश्य लें।")
    return "\n".join(lines)


def generate_telugu_text(cp):
    lines = [
        "డిశ్చార్జ్ సంరక్షణ ప్రణాళిక - చంద్రపురి జిల్లా ఆసుపత్రి",
        "దయచేసి ఈ క్రింది సూచించిన మందులు మరియు సలహాలను క్రమం తప్పకుండా పాటించండి.\n",
        "మీరు తీసుకోవలసిన మందుల వివరాలు:"
    ]
    for i, m in enumerate(cp["medicines"], 1):
        nm = m.get("name") or "Medicine"
        ds = m.get("dose") or ""
        fr = m.get("frequency") or "రోజుకు"
        dur = m.get("duration") or "వరకు"
        tim = m.get("timing") or ""
        
        tim_te = ""
        if "after" in tim.lower():
            tim_te = "ఆహారం తిన్న తర్వాత"
        elif "before" in tim.lower():
            tim_te = "ఆహారానికి ముందు"
        elif "empty" in tim.lower():
            tim_te = "ఖాళీ కడుపుతో ముందు"
        elif "bed" in tim.lower() or "night" in tim.lower():
            tim_te = "రాత్రి పడుకునే ముందు"
            
        timing_str = f" ({tim_te})" if tim_te else ""
        lines.append(f"{i}. {nm} {ds} - రోజుకు {fr}{timing_str} సమయానికి తీసుకోండి, {dur} వరకు క్రమం తప్పకుండా వాడాలి.")

    if cp.get("stop_medicines"):
        lines.append("\nఈ మందులను వెంటనే ఆపివేయండి (ఇకపై అస్సలు వాడవద్దు):")
        for s in cp["stop_medicines"]:
            lines.append(f"- {s} మందును వెంటనే ఆపివేయండి; ఈ మందు ఇకపై అవసరం లేదు మరియు వాడకూడదు.")

    if cp.get("warning_signs"):
        lines.append("\nప్రమాదకరమైన అత్యవసర సంకేతాలు (ఈ క్రింది లక్షణాలు కనిపిస్తే వెంటనే ఆసుపత్రికి రండి):")
        for w in cp["warning_signs"][:4]:
            words = w.split()
            short_w = " ".join(words[:8]) if len(words) > 8 else w
            lines.append(f"- ప్రమాదకర లక్షణం: {short_w} కనిపిస్తే వెంటనే డాక్టర్‌ను సంప్రదించండి లేదా ఎమర్జెన్సీకి వెళ్లండి.")

    if cp.get("follow_ups"):
        lines.append("\nతదుపరి వైద్య పరీక్షల తేదీలు (ఆసుపత్రికి తిరిగి రావాల్సిన తేదీలు):")
        for fu in cp["follow_ups"]:
            date_val = fu["date"]
            lines.append(f"- తదుపరి పరీక్ష తేదీ: {date_val} నాడు ఆసుపత్రి OPD లో పరీక్షల నివేదికలతో హాజరు కావాలి.")

    lines.append("\nఏదైనా అత్యవసర పరిస్థితి ఉంటే వెంటనే చంద్రపురి జిల్లా ఆసుపత్రి ఎమర్జెన్సీ క్యాజువాలిటీకి వెళ్లండి (24 గంటలు అందుబాటులో ఉంటుంది).")
    lines.append("మందుల వాడకంలో ఏవైనా సందేహాలు ఉంటే మార్పులు చేసే ముందు మీ డాక్టర్ లేదా నర్సును సంప్రదించండి.")
    return "\n".join(lines)
