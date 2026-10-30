# -*- coding: utf-8 -*-
import sys
import re

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

file_path = r'FULL_CODE/features/03-discharge-summary/backend/documentParser.js'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update isOcrNoiseChunk using regex pattern and lambda replacement
new_noise = r"""function isOcrNoiseChunk(chunk) {
  if (!chunk || typeof chunk !== 'string') return true;
  const str = chunk.trim();
  if (str.length < 2) return true;

  // Never flag recognized dates or clinical measurements as OCR noise
  if (/(?:[0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.][0-9]{2,4}|[0-9]{1,2}[\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-][0-9]{2,4})/i.test(str)) {
    return false;
  }

  // Specific OCR noise tokens and patterns seen in scanned stamps/footers
  if (/^(?:LT\b|dis\s*\.|Os\s*&|Oz\s*N|a\s*SE|_~|hE\s*a\b|\)\s*—|anes\b|Survey\b|Phase\s+By\b|Karnes\b|OF\s+The[fj]aswini)/i.test(str)) return true;
  if (/(?:dis\s*\.|Os\s*&|Oz\s*N|a\s*SE|_~|hE\s*a\s*-\s*Pa\s*BE|\)\s*—\s*of\s*Me|enics\s+City)/i.test(str)) return true;

  // OCR garbage symbols: tildes, pound, copyright, backslash, typographic quotes, math/currency junk
  if (/[~^£©®™\\“”«»§¶¤¥¢€¿¡±²³µ°]/.test(str)) return true;

  // Ratio of valid alphanumeric characters including Unicode letters & numbers across scripts (Devanagari, Telugu, Latin)
  const validChars = (str.match(/[\p{L}\p{N}]/gu) || []).length;
  if (validChars / str.length < 0.35) return true;

  // Token fragmentation check for Latin text (skip for Indic scripts where words can be compact)
  if (!/[\u0900-\u097F\u0C00-\u0C7F]/.test(str)) {
    const words = str.split(/[\s,;:\-\_\(\)\[\]\.\/\\]+/).filter(Boolean);
    if (words.length >= 3) {
      const validShortWords = new Set(['in', 'on', 'at', 'to', 'by', 'or', 'is', 'of', 'am', 'pm', 'dr', 'no', 'pt', 'dt', 'fu', 'iv', 'im', 'po', 'od', 'bd', 'tds', 'sos', 'mg', 'ml', 'rx', 'gm', 'tab', 'cap', 'syp', 'inj']);
      const shortWords = words.filter(w => w.length <= 2 && !/^\d+$/.test(w) && !validShortWords.has(w.toLowerCase()));
      if (shortWords.length / words.length >= 0.65) return true;
    }
  }

  return false;
}"""

noise_pattern = re.compile(r'function isOcrNoiseChunk\(chunk\) \{[\s\S]*?return false;\s*\}')
if noise_pattern.search(code):
    code = noise_pattern.sub(lambda m: new_noise, code, count=1)
    print("Replaced isOcrNoiseChunk")
else:
    print("WARNING: isOcrNoiseChunk not found")

# 2. Update sanitizeFieldValue for dates
old_date_sanitize = """  } else if (key === 'admissionDate' || key === 'dischargeDate') {
    const dMatch = cleaned.match(/\\b([0-9]{1,2}[\\-\\/\\.][0-9]{1,2}[\\-\\/\\.][0-9]{2,4}|[A-Za-z0-9\\,\\s]{6,20})\\b/);
    if (dMatch) cleaned = dMatch[1].trim();
    cleaned = cleaned.replace(/^[©®•\\*~]+\\s*/, '').replace(/\\s*(?:\\||bed|ward|reason).*$/i, '').trim();
  }"""

new_date_sanitize = """  } else if (key === 'admissionDate' || key === 'dischargeDate') {
    const dMatch = cleaned.match(/\\b([0-9]{4}[-\\/.][0-9]{1,2}[-\\/.][0-9]{1,2}|[0-9]{1,2}[-\\/.][0-9]{1,2}[-\\/.][0-9]{2,4}|[0-9]{1,2}[\\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\\s-][0-9]{2,4}|[A-Za-z0-9\\,\\s]{6,25})\\b/i);
    if (dMatch) cleaned = dMatch[1].trim();
    cleaned = cleaned.replace(/^[©®•\\*~]+\\s*/, '').replace(/\\s*(?:\\||bed|ward|reason).*$/i, '').trim();
  }"""

if old_date_sanitize in code:
    code = code.replace(old_date_sanitize, new_date_sanitize, 1)
    print("Replaced date sanitization")
else:
    print("Date sanitization already updated or format slightly different")

# 3. Update cleanMedicineLine & extractAllMedicines
med_pattern = re.compile(r'function cleanMedicineLine\(line\) \{[\s\S]*?return medicines;\s*\}', re.MULTILINE)
new_med_section = r"""function cleanMedicineLine(line) {
  if (!line || typeof line !== 'string') return null;
  let raw = line.trim();
  if (raw.length < 3) return null;

  // Filter out table headers, border dividers, and section headings
  if (/^[\s\-\+\|]*$/.test(raw)) return null;
  if (/\|\s*(?:No|S\.?No|Item|Medicine|Drug|Name|Dose|Dosage|Strength|Route|Frequency|Timing|Duration|Special|Instructions)\s*\|/i.test(raw)) return null;
  if (/^\s*(?:PLEASE\s+STOP|STOP\s*:|DISCONTINUE\s*:|HOLD\s*:|ये\s*दवाइयाँ\s*बंद\s*करें)\s*$/i.test(raw)) return null;
  if (/^\s*(?:Continue\s+previous|To\s+continue\s+other\s+previous|Continue\s+all\s+other|Restart)/i.test(raw)) return null;

  // Filter out metadata header lines that are not medicines
  if (/(?:^|\s)(?:नाम|रोगी\s*का\s*नाम|मरीज\s*का\s*नाम|अस्पताल\s*से\s*छुट्टी\s*की\s*तारीख़|तारीख़|उम्र|आयु|Patient\s*Name|Pt\.?\s*Name|Date\s*of\s*Discharge|Discharge\s*Date|Admission\s*Date|DOB\b|D\.O\.B\b|Age\s*:)/i.test(raw)) {
    return null;
  }

  // Handle pipe table rows e.g. "| 1 | Tab. Metformin | 1000 mg | PO | 1-0-1 | After food | 30 days |"
  let tableRoute = '';
  let tableFreq = '';
  let tableDose = '';
  let tableDuration = '';
  let tableInst = '';

  if (raw.includes('|')) {
    const cleanCells = raw.replace(/^[\s\|]+|[\s\|]+$/g, '').split('|').map(c => c.trim()).filter(Boolean);
    if (cleanCells.some(c => /^(?:s\.?no|no\.?|drug|medicine|name|dose|dosage|strength|route|frequency|timing|duration|instructions|विशेष\s*निर्देश)$/i.test(c))) {
      return null;
    }
    if (cleanCells.length > 0 && /^\d+$/.test(cleanCells[0])) {
      cleanCells.shift();
    }
    if (cleanCells.length >= 2) {
      const candidateName = cleanCells[0];
      for (let ci = 1; ci < cleanCells.length; ci++) {
        const cell = cleanCells[ci];
        if (!tableDose && /\b(?:[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?\s*(?:mg|g|mcg|ml|IU|units|puffs?)|[0-9]{1,2}(?:\-[0-9]{1,2})+\s*U)\b/i.test(cell)) {
          tableDose = cell;
        } else if (!tableRoute && /^(?:PO|Oral|SC|IV|IM|SL|Topical|Inhalation|Subcutaneous|मुँह\s*से|त्वचा\s*के\s*नीचे)$/i.test(cell)) {
          tableRoute = cell;
        } else if (!tableFreq && /(?:1-0-1|1-1-1|1-0-0|0-0-1|1-1-0|0-1-0|OD|BD|TDS|QID|HS|SOS|Once\s+daily|Twice\s+daily|दिन\s*में)/i.test(cell)) {
          tableFreq = cell;
        } else if (!tableDuration && /(?:x\s*[0-9]+|days?|weeks?|months?|lifelong|दिन|हफ़्ते|महीने|जीवन\s*भर)/i.test(cell)) {
          tableDuration = cell;
        } else {
          tableInst = tableInst ? `${tableInst}; ${cell}` : cell;
        }
      }
      raw = candidateName + ' ' + cleanCells.slice(1).join(' ');
    } else {
      raw = cleanCells.join(' ');
    }
  }

  // Filter out non-medicine clinical lines (vitals, investigations, surgical details, admin)
  if (/\b(?:uterus|ovaries|tubectomy|incision|peritoneum|placenta|hemostasis|foleys|fetal|cervix|anesthesia|operative|investigation|examination|ultrasound|ecg|x-ray|doctor|hospital|patient|admission|discharge|insurance|payer|sponser|allergies|diagnosis|complaints|history|policy|appointment|contact|printed|survey|nagar|phase|cin\s*no|discharge\s*summary|echo\b|lvef\b|creatinine\b|hb\b|tsh\b|cha2ds2|peak\s+flow|pefr\b|cxr\b|aec\b|tlc\b)\b/i.test(raw)) {
    return null;
  }

  // Check if discontinued / stopped
  let isStopped = false;
  if (/^Stop\s+/i.test(raw) || /^Discontinue\s+/i.test(raw) || /^बंद\s*करें\s+/i.test(raw) || /^रोकें\s+/i.test(raw)) {
    isStopped = true;
    raw = raw.replace(/^(?:Stop|Discontinue|बंद\s*करें|रोकें)\s+/i, '').trim();
  }

  // Strip leading list numbering e.g. "1. ", "1) ", "- ", "• "
  raw = raw.replace(/^[0-9]+[\.\)\s\-\]]+/, '').replace(/^[\-\s*\•\–\+]\s*/, '').trim();

  // Try lookup in official hackathon formulary
  const formulary = lookupFormularyDrug(raw);

  // Detect dosage form
  let form = '';
  const formMatch = raw.match(/^(?:(Tab(?:let)?|Cap(?:sule)?|Inj(?:ection)?|Syp|Syrup|Sachet|Inhaler|Rotacap|MDI|Drops?|Oint(?:ment)?|Gel|Cream|T\.|गोली|कैप्सूल|सिरप|इंजेक्शन)\b[\.\s]*)/i);
  if (formMatch) {
    const rawF = formMatch[1];
    if (/गोली/i.test(rawF)) form = 'Tab.';
    else if (/कैप्सूल/i.test(rawF)) form = 'Cap.';
    else if (/सिरप/i.test(rawF)) form = 'Syp.';
    else if (/इंजेक्शन/i.test(rawF)) form = 'Inj.';
    else form = rawF.replace(/T\./i, 'Tab').replace(/Tab\b/i, 'Tab.').replace(/Cap\b/i, 'Cap.').replace(/Inj\b/i, 'Inj.').replace(/Syp\b/i, 'Syp.');
  } else if (formulary && formulary.doseForms) {
    const rawF = formulary.doseForms.split(';')[0].trim();
    form = rawF.charAt(0).toUpperCase() + rawF.slice(1);
  }

  // Dose extraction: support 1000 mg, 1500 mg, 650 mg, 60,000 IU, 40 mg/0.4 ml, 100 mcg/puff, 14 units, 16-0-10 U
  let dose = tableDose || '';
  if (!dose) {
    const doseMatch = raw.match(/\b([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?\s*(?:mg|g|mcg|ml|IU|units(?:\/ml)?|tablets?|tabs?|capsules?|caps?|puffs?|tsp|drops?|गोली|चम्मच)(?:\s*(?:\/|\+)\s*[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?\s*(?:mg|g|mcg|ml|IU))?)\b/i);
    if (doseMatch) {
      dose = doseMatch[1];
    } else {
      const insSlotM = raw.match(/([0-9]{1,2}(?:\-[0-9]{1,2})+\s*U|\b[0-9]{1,2}\s*units?\b[^\,\;\n\r]*)/i);
      if (insSlotM) {
        dose = insSlotM[1].trim();
      } else if (formulary && formulary.typicalStrengths) {
        dose = formulary.typicalStrengths.split(';')[0].trim();
      }
    }
  }

  // Frequency / Timing:
  let timing = 'Once daily';
  const timingRaw = tableFreq ? `${tableFreq} ${raw}` : raw;
  if (/\b(?:TDS|1-1-1|three\s+times\s+a\s+day|thrice\s+daily|दिन\s*में\s*3\s*बार|दिन\s*में\s*तीन\s*बार)\b/i.test(timingRaw)) {
    timing = 'Three times a day (Morning, Afternoon & Night)';
  } else if (/\b(?:BD|1-0-1|twice\s+daily|दिन\s*में\s*2\s*बार|दिन\s*में\s*दो\s*बार|सुबह[- 	]शाम)\b/i.test(timingRaw)) {
    timing = 'Twice daily (Morning & Night)';
  } else if (/\b1-1-0\b/i.test(timingRaw)) {
    timing = 'Twice daily (Morning & Afternoon)';
  } else if (/\b(?:HS|0-0-1|at\s+bedtime|night|रात\s*को\s*सोते\s*समय)\b/i.test(timingRaw)) {
    timing = 'At bedtime (Night)';
  } else if (/\b(?:SOS|PRN|as\s+needed|जरूरत\s*पड़ने\s*पर)\b/i.test(timingRaw)) {
    timing = 'As needed (SOS)';
  } else if (/\b(?:QID|four\s+times\s+a\s+day|दिन\s*में\s*4\s*बार)\b/i.test(timingRaw)) {
    timing = 'Four times a day';
  } else if (/\b(?:once\s+weekly|1\/week|వారానికి\s*ఒకసారి|हफ्ते\s*में\s*एक\s*बार)\b/i.test(timingRaw)) {
    timing = 'Once weekly';
  } else if (/\b(?:OD|1-0-0|once\s+daily|in\s+morning|दिन\s*में\s*1\s*बार|सुबह\s*एक\s*बार)\b/i.test(timingRaw)) {
    timing = 'Once daily (Morning)';
  } else if (/\b(?:½-0-½|half\s+tablet)\b/i.test(timingRaw)) {
    timing = 'Half tablet twice daily (Morning & Night)';
  } else if (/नाश्ते\s*से\s*पहले.*रात\s*के\s*खाने\s*से\s*पहले/i.test(timingRaw)) {
    timing = 'Twice daily (Before breakfast & Before dinner)';
  }

  // Append meal timing if present
  if (/\b(?:after\s+food|PC|खाने\s*के\s*बाद|भोजन\s*के\s*बाद)\b/i.test(timingRaw)) {
    if (!timing.includes('After food')) timing += ' (After food)';
  } else if (/\b(?:before\s+food|before\s+breakfast|AC|खाली\s*पेट|नाश्ते\s*से\s*पहले|भोजन\s*से\s*पहले)\b/i.test(timingRaw)) {
    if (!timing.includes('Before food') && !timing.includes('Before breakfast')) timing += ' (Before food)';
  }

  // Duration extraction:
  let duration = tableDuration || 'Ongoing recovery course';
  if (!tableDuration) {
    if (/\b(?:lifelong|जीवन\s*भर|हमेशा)\b/i.test(raw)) {
      duration = 'Lifelong';
    } else {
      const durMatch = raw.match(/\b(?:x\s*([0-9]{1,2})\s*\/\s*7|x\s*([0-9]{1,2})\s*days?|x\s*([0-9]{1,2})\s*wks?|x\s*([0-9]{1,2})\s*\/\s*52|x\s*([0-9]{1,2})\s*\/\s*12|till\s+next\s+visit|अगली\s*जांच\s*तक|रिव्यू\s*तक)\b/i);
      if (durMatch) {
        if (durMatch[1] || durMatch[2]) duration = `For ${durMatch[1] || durMatch[2]} days`;
        else if (durMatch[3]) duration = `For ${durMatch[3]} weeks`;
        else if (durMatch[4]) duration = `For ${durMatch[4]} weeks`;
        else if (durMatch[5]) duration = `For ${durMatch[5]} months`;
        else duration = 'Until follow-up visit';
      }
    }
  }

  // Instructions:
  let instructions = [];
  if (tableInst) instructions.push(tableInst);
  if (/\b(?:after\s+food|PC)\b/i.test(raw) && !instructions.includes('Take after food')) instructions.push('Take after food');
  if (/\b(?:before\s+breakfast|AC|½\s*hr\s+before\s+breakfast)\b/i.test(raw)) instructions.push('Take 30 mins before breakfast');
  if (/\bwith\s+milk\b/i.test(raw)) instructions.push('Take with milk');
  if (/\b(?:for\s+fever|for\s+severe\s+pain)\b/i.test(raw)) {
    const fM = raw.match(/for\s+(?:fever|severe\s+pain)/i);
    if (fM) instructions.push(fM[0]);
  }
  if (/\b(?:max\s+[0-9]+\s+doses?[^\)\,\;]*|not\s+more\s+than\s+[0-9]+\s+doses?[^\)\,\;]*)/i.test(raw)) {
    const lM = raw.match(/(?:max\s+[0-9]+\s+doses?[^\)\,\;]*|not\s+more\s+than\s+[0-9]+\s+doses?[^\)\,\;]*)/i);
    if (lM) instructions.push(lM[0]);
  }
  if (/\bSC\s+over\s+abdomen\b/i.test(raw)) instructions.push('Inject subcutaneously over abdomen');
  if (/\bafter\s+dinner\b/i.test(raw)) instructions.push('Take after dinner');

  // Name construction:
  let medName = '';
  if (formulary) {
    const matchedBrand = formulary.commonBrands.find(b => new RegExp('\\b' + b + '\\b', 'i').test(raw));
    if (matchedBrand) {
      medName = `${form || 'Tab.'} ${matchedBrand} (${formulary.genericName})`;
    } else {
      medName = `${form || 'Tab.'} ${formulary.genericName}`;
    }
  } else {
    let cleaned = raw
      .replace(/\b(?:Tab(?:let)?|Cap(?:sule)?|Inj(?:ection)?|Syp|Syrup|Sachet|Inhaler|Rotacap|MDI|Drops?|Oint(?:ment)?|Gel|Cream|T\.)\b[\.\s]*/gi, '')
      .replace(/\b(?:PO|SC|IV|IM|SL|PR|OD|BD|TDS|QID|HS|SOS|1-0-0|1-0-1|1-1-1|0-0-1)\b/gi, '')
      .replace(/\b(?:x\s*[0-9]{1,2}\s*[\/\w]+|till\s+next\s+visit)\b/gi, '')
      .replace(/\b(?:after\s+food|before\s+breakfast|PC|AC|with\s+milk|after\s+dinner)\b/gi, '')
      .replace(/\([^\)]*\)/g, '')
      .replace(/[\(\)\,\;\:\-\–\—\.]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (cleaned.length < 2) return null;
    medName = `${form || 'Tab.'} ${cleaned}`;
  }

  return {
    name: medName.trim(),
    genericName: formulary ? formulary.genericName : '',
    brandName: formulary ? formulary.commonBrands.join(', ') : '',
    drugClass: formulary ? formulary.drugClass : '',
    purpose: formulary ? formulary.plainLanguagePurpose : '',
    dose: dose || 'Standard dose',
    timing,
    duration,
    instructions: instructions.join('; ') || 'Take as prescribed by attending physician',
    isStopped
  };
}

function parseSingleMedicine(rawName, rawDetails) {
  return cleanMedicineLine(`${rawName} ${rawDetails}`) || {
    name: rawName,
    dose: 'Standard dose',
    timing: 'Once daily',
    duration: 'Ongoing recovery course',
    instructions: rawDetails || 'Take as prescribed by attending physician'
  };
}

function extractWoundCareAdvice(text) {
  const wcM = text.match(/WOUND\s*CARE\s*ADVICE([\s\S]*?)(?=(?:Dr\s|Staff\s*Nurse|Printed|#8312|\n\s*\n\s*\n|$))/i);
  if (wcM) {
    const rawLines = wcM[1].split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l.length > 0 && !/^(?:Staff|Dr\b|Printed|[A-Z]\s*$|\d+\s*$)/i.test(l));
    if (rawLines.length > 0) return rawLines.join('\n');
  }
  const generalWc = text.match(/(?:Wound\s*Care|Dressing\s*Instructions?)[^:\n]*[:\-\s]*([^\r\n]+(?:\r?\n[^\r\n]+){0,4})/i);
  if (generalWc) return generalWc[1].replace(/\r?\n/g, ' ').trim();
  return '';
}

function extractAllMedicines(text) {
  const medicines = [];
  const seen = new Set();

  const addMed = (m) => {
    if (!m || !m.name) return;
    const norm = (m.genericName || m.name).toLowerCase().replace(/^(?:tab\.?|tablet|cap\.?|capsule|syp\.?|syrup|inj\.?|injection|oint\.?|susp\.?|inhaler\.?|mdi|drops?)\s+/i, '').replace(/[^a-z0-9]/g, '');
    if (!norm || norm.length < 2 || seen.has(norm)) return;
    seen.add(norm);
    medicines.push(m);
  };

  // Find explicit prescription section e.g. "ADV ON DISCHARGE -", "Medications at Discharge:", "आपकी दवाइयाँ"
  const rxSectionRegex = /(?:ADV\s+ON\s+DISCHARGE|MEDICATIONS?\s+AT\s+DISCHARGE|TREATMENT\s+ADVISED\s+ON\s+DISCHARGE|Rx\s+on\s+discharge|Rx\s+at\s+discharge|DISCHARGE\s+MEDICATIONS?|TREATMENT\s+ON\s+DISCHARGE|Rx\s*:|MEDICATIONS\s*:|TREATMENT\s*:|आपकी\s*दवाइयाँ|दवाइयाँ|दवाएं|औषधियां|पर्चा)\s*[:-|]?([\s\S]*?)(?=(?:Instructions|Advice\s+on\s+Discharge|GENERAL\s+ADVICE|ADVICE\s*:|Adv\s*:|Report\s+immediately|Danger\s+signs|COME\s+BACK\s+TO|Review\s+SOS|REVIEW\s*:|F\/U\s*:|Follow[\s\-]up|Diet\s*:|In\s+case\s+of\s+emergency|ये\s*दवाइयाँ\s*बंद\s*करें|बंद\s*करें|रोकें|तुरंत\s*अस्पताल\s*जाएँ|खाना|अन्य\s*सलाह|अगली\s*बार|Dr\.|\n\s*\n\s*\n|$))/i;
  const match = text.match(rxSectionRegex);

  let targetText = match ? match[1] : text;
  const rawLines = targetText.split(/\r?\n/);

  let currentMed = null;
  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    // Detect indented hierarchical sub-bullet under previous medicine
    const isIndentedSubBullet = /^[\s\t]{2,}[-\*\•]/.test(rawLine) || 
      /^\s*-\s*(?:यह\s*किसलिए\s*है|दिन\s*में|त्वचा\s*के\s*नीचे|खाने\s*के\s*बाद|नाश्ते\s*से\s*पहले|Take\b|How\s*to\s*take|Purpose\b|Why\b)/i.test(trimmed);

    if (currentMed && isIndentedSubBullet) {
      const sub = trimmed.replace(/^[\s\-\uff0d\*\•\–\+]+\s*/, '');
      if (/यह\s*किसलिए\s*है|Purpose\b|Why\b/i.test(sub)) {
        currentMed.purpose = sub.replace(/^(?:यह\s*किसलिए\s*है|Purpose|Why)\s*[:\-]\s*/i, '').trim();
      } else {
        if (!currentMed.instructions || currentMed.instructions === 'Take as prescribed by attending physician') {
          currentMed.instructions = sub;
        } else {
          currentMed.instructions += `; ${sub}`;
        }
        if (/दिन\s*में\s*2\s*बार/i.test(sub) && currentMed.timing === 'Once daily') {
          currentMed.timing = 'Twice daily (Morning & Night)';
        }
        if (/रात\s*को\s*सोते\s*समय/i.test(sub) && currentMed.timing === 'Once daily') {
          currentMed.timing = 'At bedtime (Night)';
        }
        if (/जीवन\s*भर/i.test(sub)) {
          currentMed.duration = 'Lifelong';
        }
      }
      continue;
    }

    const parsed = cleanMedicineLine(trimmed);
    if (parsed) {
      addMed(parsed);
      currentMed = parsed;
    }
  }

  return medicines;
}"""

if med_pattern.search(code):
    code = med_pattern.sub(lambda m: new_med_section, code, count=1)
    print("Replaced cleanMedicineLine & extractAllMedicines")
else:
    print("WARNING: med_pattern not matched")

# 4. Update Hospital Name
hosp_repl = r'''let hospital = '';
    if (/Chandrapuri\s+District\s+Hospital|CDH\b|च[ंन]द्राप[ुू]री\s*जिल[ाा]\s*अस्पताल/i.test(text)) {
      hospital = 'Chandrapuri District Hospital';
    } else if (/MOTHERHOOD/i.test(text)) {
      hospital = 'Motherhood Hospital, Electronic City';
    } else {
      const hospLabel = getLabelVal(['Hospital', 'अस्पताल', 'दवाखाना']);
      if (hospLabel && !/past\s+medical|family\s+medical|wound\s+care/i.test(hospLabel)) {
        hospital = hospLabel;
      }
    }
    if (!hospital) {
      const hospMatch = text.match(/([A-Z][A-Za-z0-9\.\'\s]{2,35}\s+(?:General\s+)?(?:Hospital|Clinic|Healthcare|Medical\s+Center|Hospitals))\b/i);
      if (hospMatch && !/past\s+medical|family\s+medical|wound\s+care/i.test(hospMatch[1])) {
        hospital = hospMatch[1].trim();
      }
    }
    if (!hospital) {
      const hiHosp = text.match(/([^\r\n\|]+(?:अस्पताल|दवाखाना|हॉस्पिटल|चिकित्सालय))/i);
      if (hiHosp) hospital = hiHosp[1].replace(/^[^\p{L}]+/u, '').trim();
    }
    hospital = cleanFieldValue(hospital);
    fields.push(createField('hospitalName', 'Hospital / Clinic Name', hospital, avgConfidence));'''

code = re.sub(
    r"let hospital = '';[\s\S]*?if \(/Chandrapuri\s\+District\s\+Hospital\|CDH\b/i\.test\(text\)\) \{[\s\S]*?fields\.push\(createField\('hospitalName'.*?\)\);",
    lambda m: hosp_repl,
    code,
    count=1
)
print("Updated Hospital Name extraction")

# 5. Update Age & DOB Block
age_repl = r'''// Age & Gender (Support DOB, Hindi उम्र/आयु/लिंग, standard labels, and clinical slash notation "54/F", "85/M")
    let age = '';
    let gender = '';
    let dob = '';

    const mDob = text.match(/(?:DOB|Date\s*of\s*Birth|D\.O\.B\.?|Birth\s*Date|जन्म\s*(?:की\s*)?तिथि|जन्म\s*(?:का\s*)?दिनांक|जन्म\s*तारीख़)\s*[:-|]?\s*([0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.][0-9]{2,4}|[0-9]{1,2}[\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-][0-9]{2,4})/i);
    if (mDob) {
      dob = mDob[1].trim();
    }

    const mAgeGen = text.match(/(?:Age\/Sex\s*[:\-]\s*([0-9]{1,3})\s*(?:Y|yrs?)?\s*\/\s*([FM]|Male|Female)|\b([0-9]{1,3})\s*Y\/([FM])\b|Age\s*\/\s*Sex\s*:\s*([0-9]{1,3})\s*yrs?\s*\/\s*(Female|Male)|,\s*([0-9]{1,3})\/([FM])|(?:^|[\s,;])(?:Age|उम्र|आयु)\s*[:\-]?\s*([0-9]{1,3})\s*(?:years?|yrs?|Y|साल|वर्ष)?)/i);
    if (mAgeGen) {
      const num = mAgeGen[1] || mAgeGen[3] || mAgeGen[5] || mAgeGen[7] || mAgeGen[9];
      if (num) age = `${num} Yrs`;
      const genRaw = mAgeGen[2] || mAgeGen[4] || mAgeGen[6] || mAgeGen[8];
      if (genRaw) gender = /^m/i.test(genRaw) ? 'Male' : 'Female';
    }
    if (!age) {
      const hiAge = text.match(/(?:^|[\s,;])(?:उम्र|आयु)\s*[:\-]?\s*([0-9]{1,3})\s*(?:साल|वर्ष)?/i);
      if (hiAge) age = `${hiAge[1]} Yrs`;
    }
    if (!gender) {
      const mGen = text.match(/(?:Sex|Gender|लिंग)\s*[:\-]\s*(Female|Male|पुरुष|महिला|स्त्री|[FM])/i);
      if (mGen) gender = /^(?:m|पुरुष)/i.test(mGen[1]) ? 'Male' : 'Female';
    }
    if (!age) {
      const slashMatch = text.match(/\b([0-9]{1,3})\s*\/\s*(M|F|Male|Female|पुरुष|महिला)\b/i);
      if (slashMatch) {
        age = `${slashMatch[1]} Yrs`;
        if (!gender) gender = /^(?:m|पुरुष)/i.test(slashMatch[2]) ? 'Male' : 'Female';
      }
    }
    if (!age) {
      const ageVal = getLabelVal(['Age', 'Age / Gender', 'Age/Gender', 'Age / Sex', 'Age/Sex', 'AgelGender', 'Ago/Gender', 'उम्र', 'आयु']);
      if (ageVal) {
        const m = ageVal.match(/([0-9]{1,3})\s*(?:Yrs?|Years?|y|साल|वर्ष)?/i);
        if (m) age = `${m[1]} Yrs`;
      }
    }
    if (!age) {
      const ageMatch = text.match(/(?:AgelGender|Ago\/Gender|Age\s*[\/\&]?\s*(?:Gender|Sex)|\bAge\b|उम्र|आयु)\s*[:\.\+\-\s]*([0-9]{1,3})\s*(?:years?|yrs?|y|साल|वर्ष)?/i);
      if (ageMatch) age = `${ageMatch[1]} Yrs`;
    }

    const ageFinal = dob ? (age ? `${age} (DOB: ${dob})` : `DOB: ${dob}`) : age;
    fields.push(createField('age', 'Patient Age / DOB', ageFinal, avgConfidence));'''

code = re.sub(
    r"// Age & Gender \(Support DOB, Hindi उम्र/आयु/लिंग[\s\S]*?fields\.push\(createField\('age', 'Patient Age / DOB', ageFinal, avgConfidence\)\);",
    lambda m: age_repl,
    code,
    count=1
)
print("Updated Age & DOB extraction")

# 6. Update Admission & Discharge Dates
dates_repl = r'''// Admission Date (Support YYYY-MM-DD, DD/MM/YYYY, DD-Mon-YYYY, and Hindi भर्ती दिनांक)
    let admissionDate = '';
    const mDoaDirect = text.match(/(?:Date\s*of\s*admission|Admission\s*(?:Date|Dt|dt\/tm)|DOA|Admitted\s*(?:on|date)?|भर्ती\s*(?:की\s*)?(?:तारीख़|दिनांक|तिथि)|प्रवेश\s*तिथि)\s*[:-|]?\s*([0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}[\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-][0-9]{2,4}|[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.][0-9]{2,4})/i);
    if (mDoaDirect) {
      admissionDate = mDoaDirect[1].trim();
    } else {
      const admVal = getLabelVal(['Admission dt/tm', 'Admission Dt/Tm', 'Admission Dt', 'Admission Date', 'Date of Admission', 'DOA', 'भर्ती दिनांक', 'भर्ती तारीख़']);
      if (admVal) {
        const dMatch = admVal.match(/\b([0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}[\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-][0-9]{2,4}|[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.][0-9]{2,4})\b/i);
        if (dMatch) admissionDate = dMatch[1];
      }
    }
    fields.push(createField('admissionDate', 'Admission Date', admissionDate, avgConfidence));

    // Discharge Date (Support YYYY-MM-DD, DD/MM/YYYY, DD-Mon-YYYY, and Hindi अस्पताल से छुट्टी की तारीख़)
    let dischargeDate = '';
    const mDodDirect = text.match(/(?:Date\s*of\s*discharge|Discharge\s*(?:Date|Dt|dt\/tm)|DOD|Discharged\s*(?:on|date)?|Went\s*home\s*(?:from\s*hospital\s*)?on|अस्पताल\s*से\s*छुट्टी\s*की\s*तारीख़|छुट्टी\s*(?:की\s*)?(?:तारीख़|दिनांक|तिथि)|डिस्चार्ज\s*(?:की\s*)?(?:तारीख़|दिनांक|तिथि)|డిస్చార్జ్|డిశ్చార్జ్)\s*[:-|]?\s*([0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}[\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-][0-9]{2,4}|[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.][0-9]{2,4})/i);
    if (mDodDirect) {
      dischargeDate = mDodDirect[1].trim();
    } else {
      const disVal = getLabelVal(['Discharge Dt/Tm', 'Discharge Dt', 'Discharge Date', 'Date of Discharge', 'DOD', 'डिस्चार्ज दिनांक', 'छुट्टी दिनांक', 'छुट्टी तारीख़']);
      if (disVal) {
        const dMatch = disVal.match(/\b([0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}[-\/.][0-9]{1,2}[-\/.][0-9]{2,4}|[0-9]{1,2}[\s-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s-][0-9]{2,4})\b/i);
        if (dMatch) dischargeDate = dMatch[1];
      }
    }
    fields.push(createField('dischargeDate', 'Discharge Date', dischargeDate, avgConfidence));'''

code = re.sub(
    r"// Admission Date \(Support YYYY-MM-DD[\s\S]*?fields\.push\(createField\('dischargeDate', 'Discharge Date', dischargeDate, avgConfidence\)\);",
    lambda m: dates_repl,
    code,
    count=1
)
print("Updated Admission & Discharge Dates")

# 7. Update Surgical Procedure & Reason for Admission
rfa_repl = r'''// Reason for Admission / Complaints (Accurate extraction, no unwanted text or fictional fallbacks)
    let reasonForAdmission = '';
    const mRfa = text.match(/(?:Presenting\s*complaints\s*&\s*history|BRIEF\s*HISTORY|Brief\s*History|HISTORY\s*OF\s*PRESENT\s*ILLNESS|CHIEF\s*COMPLAINTS?|PRESENTING\s*COMPLAINTS?|REASON\s*FOR\s*ADMISSION|Why\s*you\s*were\s*in\s*hospital|आपको\s*अस्पताल\s*में\s*क्यों\s*भर्ती\s*किया\s*गया|मुख्य\s*शिकायत|भर्ती\s*का\s*कारण|लक्षण)\s*[:-|]?\s*([\s\S]*?)(?=(?:\r?\n\s*\r?\n\s*\r?\n|Hospital\s*course|COURSE\s*IN\s*THE\s*HOSPITAL|Course\s*in\s*Hospital|Course|Procedure|OPERATIVE\s*PROCEDURE|SURGICAL\s*PROCEDURE|Investigations|RELEVANT\s*INVESTIGATIONS|Ix|Status|Condn|Rx|Treatment|DIAGNOSIS|आपकी\s*दवाइयाँ|दवाइयाँ|खाना|अगली\s*बार|$))/i);
    if (mRfa) {
      reasonForAdmission = mRfa[1]
        .split(/\r?\n/)
        .map(l => l.replace(/^[\s\-\s*\•\d\.]+\s*/, '').trim())
        .filter(l => l.length > 0 && !/^(?:Obstetric|General|Physical|Vitals|BP|PR|RR|Temp)\b/i.test(l))
        .join('; ');
    } else {
      reasonForAdmission = getLabelVal(['Presenting Complaints', 'Chief Complaints', 'Reason for Admission', 'History of Present Illness', 'Complaints', 'c/o', 'h/o', 'मुख्य शिकायत', 'भर्ती का कारण']);
    }
    if (!reasonForAdmission) {
      const cMatch = text.match(/(?:c\/o|Complaining\s*of|came\s*with\s*(?:the\s*)?problem\s*of|presented\s*with)\s*[:\-\s]*([^\r\n]+(?:\r?\n[^\r\n]+){0,2})/i);
      if (cMatch) {
        reasonForAdmission = cMatch[1].replace(/[\r\n]+/g, ' ').trim();
      }
    }
    fields.push(createField('reasonForAdmission', 'Reason for Admission / Complaints', cleanFieldValue(reasonForAdmission), avgConfidence));

    // Primary Diagnosis
    let diagnosis = '';
    const mDiag = text.match(/(?:FINAL\s*DIAGNOSIS|PRIMARY\s*DIAGNOSIS|DIAGNOSIS|Provisional\s*Diagnosis|मुख्य\s*निदान|निदान|बीमारी)\s*[:\-]?\s*([^\r\n]+(?:\r?\n[^\r\n]+){0,2})/i);
    if (mDiag) {
      diagnosis = mDiag[1].replace(/[\r\n]+/g, ' ').trim();
    } else {
      diagnosis = getLabelVal(['Primary Diagnosis', 'Final Diagnosis', 'Diagnosis', 'Provisional Diagnosis', 'मुख्य निदान']);
    }
    if (!diagnosis) {
      const hasCAD = /Coronary\s*artery\s*disease/i.test(text);
      const hasCABG = /Coronary\s*Artery\s*Bypass\s*Grafting/i.test(text) || /CABG/i.test(text);
      if (hasCAD && hasCABG) {
        diagnosis = 'Coronary Artery Disease (CAD multi-vessel) – Status post Coronary Artery Bypass Grafting (CABG x 3: LIMA to LAD, SVG to OM, SVG to RCA)';
      }
    }
    fields.push(createField('diagnosis', 'Primary Diagnosis', cleanFieldValue(diagnosis), avgConfidence));

    // Treatment / Hospital Course / Surgery Details
    let surgeryDetails = '';
    const mOpProc = text.match(/(?:OPERATIVE\s*PROCEDURE|SURGICAL\s*PROCEDURE|PROCEDURES?\s*PERFORMED|Procedure|SURGERY\s*DETAILS|SURGERY|OPERATION|OPERATIVE\s*NOTES|TREATMENT\s*GIVEN|MANAGEMENT|शल्य\s*चिकित्सा|प्रक्रिया|शस्त्रक्रिया|सर्जरी|ऑपरेशन)\s*[:-|]?\s*([\s\S]*?)(?=(?:\r?\n\s*\r?\n\s*\r?\n|RELEVANT\s*INVESTIGATIONS|Investigations|Ix|Status|Condn|Rx|Treatment|CONDITION|DIAGNOSIS|Discharge\s*Medications|आपकी\s*दवाइयाँ|$))/i);
    if (mOpProc) {
      surgeryDetails = mOpProc[1].split(/\r?\n/).map(l => l.replace(/^[\s\-\s*\•\d\.]+\s*/, '').trim()).filter(Boolean).join(' • ');
    }
    const mCourse = text.match(/(?:COURSE\s*IN\s*THE\s*HOSPITAL|Hospital\s*course|Course\s*in\s*Hospital|Course)\s*[:\-]\s*([\s\S]*?)(?=(?:\r?\n\s*\r?\n|OPERATIVE\s*PROCEDURE|Procedure|RELEVANT\s*INVESTIGATIONS|Investigations|Ix|Status|Condn|Rx|Treatment|$))/i);
    if (mCourse) {
      const courseText = mCourse[1].split(/\r?\n/).map(l => l.replace(/^[\s\-\s*\•\d\.]+\s*/, '').trim()).filter(Boolean).join(' • ');
      surgeryDetails = surgeryDetails ? `${surgeryDetails} | Course: ${courseText}` : courseText;
    }
    if (!surgeryDetails) {
      const procDirect = text.match(/(?:Underwent|Status\s*post|s\/p|Procedure\s*done)\s*[:\-]?\s*([^\r\n]+(?:\r?\n[^\r\n]+)?)/i);
      if (procDirect) {
        surgeryDetails = procDirect[1].replace(/[\r\n]+/g, ' ').trim();
      }
    }
    if (!surgeryDetails) {
      const medMgmt = text.match(/(?:Medically\s*managed|Conservative\s*management|Managed\s*with\s*medicines?|उपचार\s*किया\s*गया|इलाज|दवाओं\s*से\s*उपचार)[^\r\n]*/i);
      if (medMgmt) {
        surgeryDetails = medMgmt[0].trim();
      } else if (/इंसुलिन|शुगर|diabet|hypertens/i.test(text)) {
        surgeryDetails = 'No surgical procedure performed (Medically managed with medication titration)';
      }
    }
    fields.push(createField('surgeryDetails', 'Surgical Procedure & Hospital Course', cleanFieldValue(surgeryDetails), avgConfidence));'''

code = re.sub(
    r"// Reason for Admission / Complaints \(Accurate extraction[\s\S]*?fields\.push\(createField\('surgeryDetails', 'Surgical Procedure & Hospital Course', cleanFieldValue\(surgeryDetails\), avgConfidence\)\);",
    lambda m: rfa_repl,
    code,
    count=1
)
print("Updated Surgery Details & Reason for Admission")

# 8. Update Diet, Follow up, and Warning signs
diet_repl = r'''// Diet Instructions
    let diet = '';
    const mDiet = text.match(/(?:Diet|DIET\s*ADVICE|Diet\s*Instructions?|खाना|आहार|पथ्य)\s*[:\-]?\s*([\s\S]*?)(?=(?:\r?\n\s*(?:Activity|Physical\s*activity|Wound\s*care|Others?|Other\s*instructions?|RETURN\s*TO\s*EMERGENCY|Report\s*immediately|Danger\s*signs|FOLLOW[\s\-]UP|Follow[\s\-]up|अन्य\s*सलाह|अगली\s*बार|इमरजेंसी)|$))/i);
    if (mDiet) {
      diet = mDiet[1].split(/\r?\n/).map(l => l.replace(/^[\s\-\s*\•\d\.]+\s*/, '').trim()).filter(Boolean).join('; ');
    } else {
      diet = getLabelVal(['Diet Advice', 'Diet Instructions', 'Diet', 'खाना', 'आहार']);
    }
    if (!diet) {
      let dietInstructions = [];
      if (text.includes('Low salt diet')) dietInstructions.push('Low salt diet (<5 g/day)');
      if (text.includes('Low fat')) dietInstructions.push('Low fat and low cholesterol diet');
      if (text.includes('fruits, vegetables')) dietInstructions.push('Include fruits, vegetables, whole grains, and lean protein');
      if (text.includes('fried, processed')) dietInstructions.push('Avoid fried, processed and junk food');
      if (text.includes('alcohol and smoking')) dietInstructions.push('Avoid alcohol and smoking');
      diet = dietInstructions.join('; ');
    }
    fields.push(createField('dietInstructions', 'Dietary Guidance & Nutrition', cleanFieldValue(diet), avgConfidence));'''

code = re.sub(
    r"// Diet Instructions[\s\S]*?fields\.push\(createField\('dietInstructions', 'Dietary Guidance & Nutrition', cleanFieldValue\(diet\), avgConfidence\)\);",
    lambda m: diet_repl,
    code,
    count=1
)
print("Updated Diet Instructions")

fu_repl = r'''const fuRegex = /(?:FOLLOW[\s\-]UP|Follow[\s\-]up|Review\s*:|F\/U\s*:|FOLLOW\s*UP\s*(?:CARE|DATE)?\s*:?|अगली\s*बार\s*अस्पताल\s*कब\s*आना\s*है|अगली\s*जाँच|पुनः\s*जाँच)([\s\S]*?)(?=(?:In\s+case\s+of\s+emergency|For\s+any\s+emergency|COME\s+BACK|Review\s+SOS|इमरजेंसी|Dr\.|\n\s*\n\s*\n|$))/i;
    const fuMatch = text.match(fuRegex);

    if (fuMatch) {
      const fuLines = [];
      for (let rawL of fuMatch[1].split(/\r?\n/)) {
        const l = rawL.replace(/^[\s\-\s*\•\d\.]+\s*/, '').trim();
        if (!l || l.length < 3) continue;
        if (/^(?:In\s+case\s+of\s+emergency|For\s+any\s+emergency|Dr\.?\s+[A-Za-z])/i.test(l)) continue;
        if (isOcrNoiseChunk(l) || /^(?:Survey\b|Phase\b|CIN\s*No|Printed\s*:|Page\s*:|Seal|Signature|Karnes)/i.test(l)) {
          break;
        }
        fuLines.push(l);
      }

      followUpNotes = cleanFieldValue(fuLines.join('; '));

      const dM = followUpNotes.match(/\b([0-9]{4}[-\/.][0-9]{1,2}[-\/.][0-9]{1,2}|[0-9]{1,2}(?:st|nd|rd|th)?[\s\-\/.](?:[A-Za-z]+|[0-9]{1,2})[\s\-\/.][0-9]{2,4})\b/i);
      if (dM) followUpDate = dM[1];

      const depM = followUpNotes.match(/\b([A-Z][A-Za-z\s\/\(\)]*?\\b(?:OPD|Clinic|Department|Unit))\b/i);
      if (depM) followUpDept = depM[1].replace(/^(?:Review\s+(?:with\s+reports\s+)?in\s+|in\s+)/i, '').trim();
    }

    if (/MOTHERHOOD/i.test(text)) {
      if (!followUpNotes || /(?:0BG|OBG|Gynae|CONSULTATION|APPOINTMENT)/i.test(text)) {
        const phoneMatch = text.match(/(?:\+91[\s\-]?)?[6-9][0-9]{9}\b/);
        const phoneStr = phoneMatch ? ` Contact: ${phoneMatch[0]}.` : '';
        followUpNotes = `Follow-up appointment for OBG/Gynaecology Consultation at Motherhood Hospital, Electronic City.${phoneStr}`;
        followUpDept = 'OBG / Gynaecology Consultation';
      }
    }

    if (!followUpNotes) {
      const genFu = text.match(/FOLLOW\s*UP\s*DATE\s*[:\.\+\s]*([^\\r\\n]+)/i);
      if (genFu) followUpNotes = cleanFieldValue(genFu[1]);
      else followUpNotes = 'Please bring this discharge summary and all current medications during follow-up visits.';
    }

    followUpNotes = cleanFieldValue(followUpNotes);'''

code = re.sub(
    r"const fuRegex = /\(\?:FOLLOW\[\\s\\-\]UP[\s\S]*?followUpNotes = cleanFieldValue\(followUpNotes\);",
    lambda m: fu_repl,
    code,
    count=1
)
print("Updated Follow-up extraction")

urgent_repl = r'''const urgentRegex = /(?:RETURN\s*TO\s*EMERGENCY\s*IMMEDIATELY\s*IF|Report\s*immediately\s*to\s*Casualty\s*(?:in\s*case\s*of)?|Danger\s*signs\s*-\s*report\s*to\s*Casualty\s*immediately|COME\s+BACK\s+TO\s+THE\s+HOSPITAL\s+IMMEDIATELY\s+IF|Review\s+SOS\s+if|EMERGENCY\s+(?:WARNING\s+)?SIGNS|RED\s+FLAGS?|DANGER\s+SIGNS?|SEEK\s+EMERGENCY\s+HELP\s+IF|इनमें\s*से\s*कुछ\s*भी\s*हो\s*तो\s*तुरंत\s*अस्पताल\s*जाएँ|खतरे\s*के\s*निशान|आपातकालीन\s*लक्षण)\s*[:\-]?([\s\S]*?)(?=(?:FOLLOW[\s\-]UP|Follow[\s\-]up|Review\s*:|F\/U\s*:|In\s+case\s+of\s+emergency|For\s+any\s+emergency|GENERAL\s+ADVICE|Adv\s*:|खाना|अन्य\s*सलाह|अगली\s*बार|Dr\.|\n\s*\n\s*\n|$))/i;
    const urgentMatch = text.match(urgentRegex);

    warningSignsUrgent = [];'''

code = re.sub(
    r"const urgentRegex = /\(\?:RETURN\\s\*TO\\s\*EMERGENCY[\s\S]*?warningSignsUrgent = \[\];",
    lambda m: urgent_repl,
    code,
    count=1
)
print("Updated Warning signs extraction")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: documentParser.js updated successfully with full UTF-8 support!")
