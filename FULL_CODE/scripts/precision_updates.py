# -*- coding: utf-8 -*-
import sys
import re

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

file_path = r'FULL_CODE/features/03-discharge-summary/backend/documentParser.js'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Fix rxSectionRegex so that column headers like "Special Instructions" do not prematurely truncate the prescription table
old_rx_regex = r"""  const rxSectionRegex = /(?:ADV\s+ON\s+DISCHARGE|MEDICATIONS?\s+AT\s+DISCHARGE|TREATMENT\s+ADVISED\s+ON\s+DISCHARGE|Rx\s+on\s+discharge|Rx\s+at\s+discharge|DISCHARGE\s+MEDICATIONS?|TREATMENT\s+ON\s+DISCHARGE|Rx\s*:|MEDICATIONS\s*:|TREATMENT\s*:|आपकी\s*दवाइयाँ|दवाइयाँ|दवाएं|औषधियां|पर्चा)\s*[:-|]?([\s\S]*?)(?=(?:Instructions|Advice\s+on\s+Discharge|GENERAL\s+ADVICE|ADVICE\s*:|Adv\s*:|Report\s+immediately|Danger\s+signs|COME\s+BACK\s+TO|Review\s+SOS|REVIEW\s*:|F\/U\s*:|Follow[\s\-]up|Diet\s*:|In\s+case\s+of\s+emergency|ये\s*दवाइयाँ\s*बंद\s*करें|बंद\s*करें|रोकें|तुरंत\s*अस्पताल\s*जाएँ|खाना|अन्य\s*सलाह|अगली\s*बार|Dr\.|\n\s*\n\s*\n|$))/i;"""

new_rx_regex = r"""  const rxSectionRegex = /(?:ADV\s+ON\s+DISCHARGE|MEDICATIONS?\s+AT\s+DISCHARGE|TREATMENT\s+ADVISED\s+ON\s+DISCHARGE|Rx\s+on\s+discharge|Rx\s+at\s+discharge|DISCHARGE\s+MEDICATIONS?|TREATMENT\s+ON\s+DISCHARGE|Rx\s*:|MEDICATIONS\s*:|TREATMENT\s*:|आपकी\s*दवाइयाँ|दवाइयाँ|दवाएं|औषधियां|पर्चा)\s*[:-|]?([\s\S]*?)(?=(?:\r?\n\s*(?:Instructions\s*:|Advice\s+on\s+Discharge|GENERAL\s+ADVICE|ADVICE\s*:|Adv\s*:|Report\s+immediately|Danger\s+signs|COME\s+BACK\s+TO|Review\s+SOS|REVIEW\s*:|F\/U\s*:|Follow[\s\-]up|Diet\s*:|Diet\b|In\s+case\s+of\s+emergency|ये\s*दवाइयाँ\s*बंद\s*करें|बंद\s*करें|रोकें|तुरंत\s*अस्पताल\s*जाएँ|खाना|अन्य\s*सलाह|अगली\s*बार|Dr\.|\r?\n\s*\r?\n\s*\r?\n|$)))/i;"""

if old_rx_regex in code:
    code = code.replace(old_rx_regex, new_rx_regex, 1)
    print("Fixed rxSectionRegex lookahead")
else:
    # Use regex replace if exact whitespace differs
    code = re.sub(
        r"const rxSectionRegex = /\(\?:ADV\\s\+ON\\s\+DISCHARGE[\s\S]*?\)\/i;",
        lambda m: new_rx_regex.strip(),
        code,
        count=1
    )
    print("Replaced rxSectionRegex with regex")

# 2. Fix Hospital Name & Address for Hindi Chandrapuri
old_hosp = r"""    let hospital = '';
    if (/Chandrapuri\s+District\s+Hospital|CDH\b/i.test(text)) {
      hospital = 'Chandrapuri District Hospital';
    } else if (/MOTHERHOOD/i.test(text)) {
      hospital = 'Motherhood Hospital, Electronic City';
    } else {
      const hospLabel = getLabelVal(['Hospital']);
      if (hospLabel && !/past\s+medical|family\s+medical|wound\s+care/i.test(hospLabel)) {
        hospital = hospLabel;
      }
    }"""

new_hosp = r"""    let hospital = '';
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
    }"""

if old_hosp in code:
    code = code.replace(old_hosp, new_hosp, 1)
    print("Updated Hospital Name")
else:
    # Try broader regex
    code = re.sub(
        r"let hospital = '';\s*if \(/Chandrapuri\\s\+District\\s\+Hospital\|CDH\\b/i\.test\(text\)\) \{[\s\S]*?fields\.push\(createField\('hospitalName'",
        lambda m: new_hosp + "\n    hospital = cleanFieldValue(hospital);\n    fields.push(createField('hospitalName'",
        code,
        count=1
    )
    print("Replaced Hospital Name with regex")

# Address update
code = re.sub(
    r"let address = getLabelVal\(\['Address'\]\);\s*if \(!address && /Chandrapuri\\s\+District\\s\+Hospital\|CDH\\b/i\.test\(text\)\) \{",
    r"let address = getLabelVal(['Address', 'पता']);\n    if (!address && /Chandrapuri\\s+District\\s+Hospital|CDH\\b|च[ंन]द्राप[ुू]री\\s*जिल[ाा]\\s*अस्पताल/i.test(text)) {",
    code,
    count=1
)
print("Updated Address for Chandrapuri")

# 3. Fix surgeryDetails to stop before Medications at Discharge
old_surg_lookahead = r"(?=(?:\r?\n\s*\r?\n\s*\r?\n|RELEVANT\s*INVESTIGATIONS|Investigations|Ix|Status|Condn|Rx|Treatment|CONDITION|DIAGNOSIS|Discharge\s*Medications|आपकी\s*दवाइयाँ|$))"
new_surg_lookahead = r"(?=(?:\r?\n\s*\r?\n\s*\r?\n|\r?\n\s*(?:Medications?\s*(?:at\s*Discharge)?|MEDICATIONS?|Discharge\s*Medications?|Rx|TREATMENT|Investigations|RELEVANT|CONDITION|DIAGNOSIS|Diet|Follow|आपकी\s*दवाइयाँ|दवाइयाँ|खाना|अगली\s*बार|$)))"

code = code.replace(old_surg_lookahead, new_surg_lookahead, 1)
print("Updated surgeryDetails lookahead")

# 4. Fix followUp regex line anchor
old_fu = r"const fuRegex = /(?:FOLLOW[\s\-]UP|Follow[\s\-]up|Review\s*:|F\/U\s*:|FOLLOW\s*UP\s*(?:CARE|DATE)?\s*:?|अगली\s*बार\s*अस्पताल\s*कब\s*आना\s*है|अगली\s*जाँच|पुनः\s*जाँच)([\s\S]*?)(?=(?:In\s+case\s+of\s+emergency|For\s+any\s+emergency|COME\s+BACK|Review\s+SOS|इमरजेंसी|Dr\.|\n\s*\n\s*\n|$))/i;"
new_fu = r"const fuRegex = /(?:^|\r?\n)\s*(?:FOLLOW[\s\-]UP|Follow[\s\-]up|Review\s*:|F\/U\s*:|FOLLOW\s*UP\s*(?:CARE|DATE)?\s*:?|अगली\s*बार\s*अस्पताल\s*कब\s*आना\s*है|अगली\s*बार\s*कब\s*आना\s*है|फॉलो[\s\-]अप|पुनः\s*जाँच\s*के\s*लिए)\s*[:\-]?\s*([\s\S]*?)(?=(?:In\s+case\s+of\s+emergency|For\s+any\s+emergency|COME\s+BACK|Review\s+SOS|इमरजेंसी|Dr\.|\r?\n\s*\r?\n\s*\r?\n|$))/i;"

code = code.replace(old_fu, new_fu, 1)
print("Updated followUp regex")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Precision updates applied!")
