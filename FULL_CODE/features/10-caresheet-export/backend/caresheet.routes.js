/**
 * Feature: 10-caresheet-export
 * Backend Printable PDF Generation with PDFKit
 * Supports pure English or pure Telugu (100% clean Telugu without English parenthesis clutter)
 */

const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Fallback demo data if payload is empty
const defaultData = {
  patientName: "Suresh",
  patientId: "CB-DEMO-001",
  age: 55,
  gender: "Male",
  admissionDate: "2026-10-05",
  dischargeDate: "2026-10-10",
  diagnosis: "రక్తపోటు మరియు మధుమేహం నుండి కోలుకునే ప్రక్రియ.",
  allergies: ["ఎటువంటి తీవ్రమైన అలెర్జీలు నమోదు కాలేదు"],
  medicines: [
    {
      name: "Paracetamol",
      dose: "650 mg",
      timing: "Twice daily after food (1-0-1)",
      duration: "5 days",
      instructions: "నీటితో తీసుకోండి."
    },
    {
      name: "Pantoprazole",
      dose: "40 mg",
      timing: "Once daily before breakfast (1-0-0)",
      duration: "7 days",
      instructions: "ఉదయం ఖాళీ కడుపుతో తీసుకోండి."
    }
  ],
  dietInstructions: "తేలికగా జీర్ణమయ్యే సమతుల్య ఆహారం. తక్కువ ఉప్పు మరియు నూనె.",
  homeCare: [
    "పూర్తిగా విశ్రాంతి తీసుకోండి, కష్టమైన పనులు చేయవద్దు.",
    "రక్తపోటు మరియు చక్కెర స్థాయిలను క్రమం తప్పకుండా చూసుకోండి.",
    "శస్త్రచికిత్స లేదా గాయం ఉన్న భాగాన్ని శుభ్రంగా ఉంచండి."
  ],
  followUp: {
    date: "2026-11-05",
    doctor: "Dr. Sarah Jenkins",
    department: "జనరల్ మెడిసిన్",
    hospital: "కేర్‌బ్రిడ్జ్ ఆసుపత్రి"
  },
  warningSignsUrgent: [
    "ఆకస్మిక అధిక జ్వరం (>101°F) లేదా తీవ్రమైన చలి",
    "తీవ్రమైన ఛాతీ నొప్పి లేదా ఊపిరి ఆడకపోవడం",
    "నిరంతర వాంతులు లేదా నీరు కూడా తాగలేకపోవడం"
  ]
};

// Check if Windows Nirmala Telugu font exists
const NIRMALA_FONT_PATH = 'C:\\Windows\\Fonts\\Nirmala.ttc';
const hasTeluguFont = fs.existsSync(NIRMALA_FONT_PATH);

// Helper translations for Telugu Care Sheet (100% pure Telugu - no English parentheses)
const TELUGU_STRINGS = {
  sheetTitle: 'డిశ్చార్జ్ సంరక్షణ పత్రం',
  subtitle: 'మీ వ్యక్తిగత పోస్ట్-డిశ్చార్జ్ గృహ సంరక్షణ మార్గదర్శిని',
  generated: 'రూపొందించిన తేదీ:',
  secPatientInfo: 'రోగి సమాచారం మరియు డిశ్చార్జ్ సారాంశం',
  name: 'రోగి పేరు:',
  id: 'రోగి ఐడి:',
  ageGender: 'వయస్సు / లింగం:',
  disDate: 'డిశ్చార్జ్ తేదీ:',
  diagnosis: 'రోగ నిర్ధారణ:',
  allergies: 'అలెర్జీలు:',
  secMeds: 'సూచించిన మందుల వివరాలు మరియు సమయ పట్టిక',
  colMed: 'మందు పేరు & మోతాదు',
  colTiming: 'తీసుకోవాల్సిన సమయం',
  colDuration: 'వ్యవధి',
  colInstructions: 'ప్రత్యేక సూచనలు',
  secDietHomeCare: 'ఆహారం మరియు రోజువారీ గృహ సంరక్షణ సూచనలు',
  dietTitle: 'సిఫార్సు చేయబడిన ఆహార సూచనలు:',
  secWarnings: 'తక్షణ అత్యవసర వైద్య సహాయం ఎప్పుడు పొందాలి',
  emergencyNotice: 'అత్యవసరం: ఈ క్రింది లక్షణాలు కనిపిస్తే వెంటనే ఆసుపత్రికి వెళ్ళండి:',
  secFollowup: 'తదుపరి డాక్టర్ సంప్రదింపు:',
  footerText: 'ఈ కేర్ షీట్ మీ ఆసుపత్రి డిశ్చార్జ్ వివరాల ఆధారంగా రూపొందించబడింది. అత్యవసర సమయాల్లో వైద్యుడిని సంప్రదించండి.'
};

// POST /api/generate-caresheet

// Complete Telugu Medical & Timing Dictionary for Care Sheet
function translateMedNameToTelugu(name) {
  if (!name) return 'మందు';
  let s = String(name).replace(/^(?:Tab\.?|Cap\.?|Syr\.?|Inj\.?)\s+/i, '');
  const map = [
    [/augmentin/gi, 'ఆగ్మెంటిన్ యాంటీబయాటిక్'],
    [/dolo\s*650|paracetamol/gi, 'డోలో 650 (పారాసిటమాల్)'],
    [/pan(?:toprazole)?[- ]?40/gi, 'పాన్-40 (పాంటోప్రజోల్)'],
    [/telma(?:sartan)?[- ]?40/gi, 'టెల్మా-40 (టెల్మిసార్టన్)'],
    [/rosuvas(?:tatin)?[- ]?10/gi, 'రోజువాస్-10 (రోజువాస్టాటిన్)'],
    [/torsemide|dytor/gi, 'టార్సిమైడ్ (డైటార్)'],
    [/bisoprolol|concor/gi, 'బిసోప్రోలోల్ (కాంకర్)'],
    [/sacubitril\s*\+\s*valsartan|vymada/gi, 'సకుబిట్రిల్ + వల్సార్టన్ (వైమాడా)'],
    [/aldactone|spironolactone/gi, 'ఆల్డాక్టోన్ (స్పైరోనోలాక్టోన్)'],
    [/forxiga|dapagliflozin/gi, 'ఫార్సిగా (డాపాగ్లిఫ్లోజిన్)'],
    [/metformin|glycomet/gi, 'మెట్‌ఫార్మిన్ (గ్లైకోమెట్)'],
    [/glimepiride|amaryl/gi, 'గ్లిమెపిరైడ్ (అమరిల్)'],
    [/aspirin|ecosprin/gi, 'యాస్ప్రిన్ (ఎకోస్ప్రిన్)'],
    [/clopidogrel|clopilet/gi, 'క్లోపిడోగ్రెల్ (క్లోపిలెట్)'],
    [/atorvastatin|atorva/gi, 'అటోర్వాస్టాటిన్ (అటోర్వా)'],
    [/amoxicillin/gi, 'అమోక్సిసిలిన్'],
    [/azithromycin|azee/gi, 'అజిత్రోమైసిన్ (అజీ)'],
    [/cefixime/gi, 'సెఫిక్సిమ్'],
    [/ciprofloxacin/gi, 'సిప్రోఫ్లోక్సాసిన్'],
    [/levofloxacin/gi, 'లెవోఫ్లోక్సాసిన్'],
    [/metoprolol|betaloc/gi, 'మెటోప్రోలోల్ (బెటాలాక్)'],
    [/amlodipine|amlong/gi, 'ఆమ్లోడిపైన్ (ఆమ్లాంగ్)'],
    [/losartan|zaart/gi, 'లోసార్టన్ (జార్ట్)'],
    [/enalapril/gi, 'ఎనలాప్రిల్'],
    [/ramipril|cardace/gi, 'రామిప్రిల్ (కార్డేస్)'],
    [/omeprazole|omez/gi, 'ఒమెప్రజోల్ (ఒమెజ్)'],
    [/rabeprazole|rabicip/gi, 'రాబెప్రజోల్ (రాబిసిప్)'],
    [/ranitidine|aciloc/gi, 'రానిటిడిన్ (అసిలాక్)'],
    [/ondansetron|emeset/gi, 'ఒండన్‌సెట్రాన్ (ఎమెసెట్)'],
    [/tramadol/gi, 'ట్రమాడాల్'],
    [/ibuprofen/gi, 'ఐబుప్రోఫెన్'],
    [/aceclofenac|zerodol/gi, 'ఎసిక్లోఫెనాక్ (జీరోడాల్)'],
    [/diclofenac|voveran/gi, 'డైక్లోఫెనాక్ (వోవెరాన్)'],
    [/salbutamol|asthalin/gi, 'సాల్బుటమాల్ (ఆస్థాలిన్ ఇన్‌హేలర్)'],
    [/budecort|budesonide/gi, 'బుడెసోనైడ్ (బుడెకార్ట్ ఇన్‌హేలర్)'],
    [/deriphyllin/gi, 'డెరిఫైలిన్'],
    [/montelukast|montek/gi, 'మాంటెల్యూకాస్ట్ (మాంటెక్)'],
    [/cetirizine|cetzine/gi, 'సెటిరిజిన్ (సెట్జిన్)'],
    [/levocetirizine/gi, 'లెవోసెటిరిజిన్'],
    [/insulin|human\s*mixtard/gi, 'ఇన్సులిన్ ఇంజెక్షన్'],
    [/thyronorm|levothyroxine/gi, 'థైరోనార్మ్ (లెవోథైరాక్సిన్)'],
    [/calcium|shelcal/gi, 'కాల్షియం & విటమిన్ D3 (షెల్కాల్)'],
    [/limcee|vitamin\s*c/gi, 'విటమిన్ C (లిమ్సీ)'],
    [/becosules|vitamin\s*b/gi, 'విటమిన్ B-కాంప్లెక్స్ (బెకోసూల్స్)']
  ];
  for (const [re, te] of map) {
    if (re.test(s)) return te;
  }
  return s;
}

function translateDoseToTelugu(text) {
  if (!text) return 'ప్రామాణిక మోతాదు';
  let s = String(text);
  return s.replace(/\bmg\b/gi, 'మి.గ్రా.')
          .replace(/\bmcg\b/gi, 'మైక్రోగ్రామ్')
          .replace(/\bml\b/gi, 'మి.లీ.')
          .replace(/\btablets?\b/gi, 'మాత్రలు')
          .replace(/\bcapsules?\b/gi, 'క్యాప్సూల్స్')
          .replace(/\bunits?\b/gi, 'యూనిట్లు')
          .replace(/\bpuffs?\b/gi, 'పఫ్స్');
}

function translateTimingToTelugu(text) {
  if (!text) return 'సమయానికి తీసుకోండి';
  let s = String(text);
  s = s.replace(/Twice daily with meals \(Morning & Night\)/gi, 'భోజనంతో పాటు రోజుకు 2 సార్లు (ఉదయం & రాత్రి)')
       .replace(/Twice daily after food \(1-0-1\)/gi, 'భోజనం తర్వాత రోజుకు 2 సార్లు (1-0-1)')
       .replace(/Twice daily after food/gi, 'భోజనం తర్వాత రోజుకు 2 సార్లు')
       .replace(/Twice daily before food/gi, 'భోజనానికి ముందు రోజుకు 2 సార్లు')
       .replace(/Twice daily \(Morning & Night\)|Twice daily \(Morning and Night\)/gi, 'రోజుకు 2 సార్లు (ఉదయం & రాత్రి)')
       .replace(/Twice daily/gi, 'రోజుకు 2 సార్లు')
       .replace(/Three times a day as needed/gi, 'అవసరమైనప్పుడు రోజుకు 3 సార్లు')
       .replace(/Three times daily after food/gi, 'భోజనం తర్వాత రోజుకు 3 సార్లు')
       .replace(/Three times a day \(Morning, Afternoon & Night\)/gi, 'రోజుకు 3 సార్లు (ఉదయం, మధ్యాహ్నం & రాత్రి)')
       .replace(/Three times a day|Three times daily/gi, 'రోజుకు 3 సార్లు')
       .replace(/Four times a day/gi, 'రోజుకు 4 సార్లు')
       .replace(/Once daily in morning \(Empty Stomach\)/gi, 'ఉదయం ఖాళీ కడుపుతో 1 సారి')
       .replace(/Once daily before breakfast \(1-0-0\)/gi, 'అల్పాహారానికి ముందు 1 సారి (1-0-0)')
       .replace(/Once daily before breakfast/gi, 'అల్పాహారానికి ముందు 1 సారి')
       .replace(/Once daily after breakfast/gi, 'అల్పాహారం తర్వాత 1 సారి')
       .replace(/Once daily \(Morning\)|Once daily in morning/gi, 'ఉదయం పూట రోజుకు 1 సారి')
       .replace(/Once daily at bedtime \(Night\)/gi, 'రాత్రి పడుకునే ముందు 1 సారి (0-0-1)')
       .replace(/Once daily at bedtime|Once daily at night/gi, 'రాత్రి వేళ రోజుకు 1 సారి')
       .replace(/Once daily \(Night\)/gi, 'రాత్రి వేళ రోజుకు 1 సారి')
       .replace(/Once daily/gi, 'రోజుకు 1 సారి')
       .replace(/\bOD\s*\(1-0-0\)/gi, 'రోజుకు 1 సారి (1-0-0)')
       .replace(/\bBD\s*\(1-0-1\)/gi, 'రోజుకు 2 సార్లు (1-0-1)')
       .replace(/\bTDS\s*\(1-1-1\)/gi, 'రోజుకు 3 సార్లు (1-1-1)')
       .replace(/\bHS\s*\(0-0-1\)/gi, 'రాత్రి పడుకునే ముందు (0-0-1)')
       .replace(/At bedtime \(Night\)|At bedtime/gi, 'రాత్రి పడుకునే ముందు')
       .replace(/At night/gi, 'రాత్రి వేళ')
       .replace(/In morning/gi, 'ఉదయం పూట')
       .replace(/In afternoon/gi, 'మధ్యాహ్నం వేళ')
       .replace(/As needed \(SOS\)/gi, 'అవసరమైనప్పుడు మాత్రమే (SOS)')
       .replace(/As needed/gi, 'అవసరమైనప్పుడు మాత్రమే')
       .replace(/Before food|Empty stomach/gi, 'ఖాళీ కడుపుతో')
       .replace(/After food|With meals/gi, 'భోజనం తర్వాత')
       .replace(/\(Morning\)/gi, '(ఉదయం)')
       .replace(/\(Night\)/gi, '(రాత్రి)')
       .replace(/\(Afternoon\)/gi, '(మధ్యాహ్నం)')
       .replace(/\(Evening\)/gi, '(సాయంత్రం)');
  return s;
}

function translateDurationToTelugu(text) {
  if (!text) return 'డాక్టర్ సంప్రదింపు వరకు';
  let s = String(text);
  s = s.replace(/\b(?:for|x)\s*(\d+)\s*\/\s*7\b/gi, '$1 రోజులు')
       .replace(/\b(?:for\s+)?(\d+)\s*days?\b/gi, '$1 రోజులు')
       .replace(/\b(?:for\s+)?(\d+)\s*weeks?\b/gi, '$1 వారాలు')
       .replace(/\b(?:for\s+)?(\d+)\s*months?\b/gi, '$1 నెలలు')
       .replace(/Ongoing recovery course/gi, 'కోలుకునే వరకు నిరంతరంగా')
       .replace(/Till next review|Until next visit|Till review/gi, 'తదుపరి డాక్టర్ సంప్రదింపు వరకు')
       .replace(/Lifelong|Long term/gi, 'జీవితాంతం / దీర్ఘకాలికంగా');
  return s;
}

function translateInstructionsToTelugu(text) {
  if (!text) return 'వైద్యుడు సూచించిన విధంగా సరైన సమయానికి తీసుకోండి';
  let s = String(text);
  s = s.replace(/Take at start of meals with water\. Consume curd or buttermilk\./gi, 'భోజనం ప్రారంభంలో నీటితో తీసుకోండి. పెరుగు లేదా మజ్జిగ ఎక్కువగా తీసుకోండి.')
       .replace(/Take after meals with warm water for pain\/fever\. Do not exceed prescribed dose\./gi, 'నొప్పి లేదా జ్వరం కోసం భోజనం తర్వాత గోరువెచ్చని నీటితో తీసుకోండి.')
       .replace(/Take 30 minutes before breakfast with a glass of water\./gi, 'అల్పాహారానికి 30 నిమిషాల ముందు ఒక గ్లాసు నీటితో తీసుకోండి.')
       .replace(/Maintain appropriate hydration and avoid potassium salt substitutes\./gi, 'మంచినీరు బాగా తాగండి; పొటాషియం ఉప్పు ప్రత్యామ్నాయాలకు దూరంగా ఉండండి.')
       .replace(/Take at night\. Avoid grapefruit or grapefruit juice completely\./gi, 'రాత్రి వేళ తీసుకోండి. ద్రాక్షపండు (గ్రేప్‌ఫ్రూట్) రసాన్ని పూర్తిగా నివారించండి.')
       .replace(/Take as prescribed by attending physician/gi, 'హాజరయ్యే వైద్యుడు సూచించిన విధంగా తీసుకోండి')
       .replace(/Take as directed\.?/gi, 'వైద్యుడు సూచించిన విధంగా తీసుకోండి.')
       .replace(/Till next review/gi, 'తదుపరి డాక్టర్ సంప్రదింపు వరకు')
       .replace(/Lifelong/gi, 'జీవితాంతం కొనసాగించండి');
  return s;
}

function translateWarningSignToTelugu(text) {
  if (!text) return '';
  let s = String(text).trim();
  const map = [
    [/Weight gain of more than 2 kg in 3 days|Wt gain > 2 kg in 3 days/i, '3 రోజుల్లో 2 కిలోల కంటే ఎక్కువ బరువు పెరగడం'],
    [/Breathlessness at rest \/ on lying down flat|Breathlessness at rest or on lying flat/i, 'విశ్రాంతి సమయంలో లేదా నేరుగా పడుకున్నప్పుడు శ్వాస ఆడకపోవడం'],
    [/Breathlessness \/ difficulty in breathing|Breathlessness or difficulty in breathing/i, 'శ్వాస తీసుకోవడంలో తీవ్ర ఇబ్బంది లేదా ఊపిరి ఆడకపోవడం'],
    [/Too breathless to complete sentences|Unable to speak full sentences due to breathlessness/i, 'శ్వాస అందక పూర్తి వాక్యాలు మాట్లాడలేకపోవడం'],
    [/Increasing pedal oedema|Increasing swelling of feet or legs/i, 'పాదాలు లేదా కాళ్లలో వాపు క్రమంగా పెరగడం'],
    [/Urine output markedly reduced|Marked decrease in urine output/i, 'మూత్ర విసర్జన పరిమాణం గణనీయంగా తగ్గిపోవడం'],
    [/Giddiness \/ fainting \/ LOC|Giddiness, fainting or loss of consciousness/i, 'తలతిరుగుడు, స్పృహ తప్పడం లేదా మూర్ఛపోవడం'],
    [/Palpitations \(fast or irregular heartbeat\)|Palpitations - fast \/ irregular heart beat/i, 'గుండె దడ (వేగంగా లేదా క్రమం లేని గుండె కొట్టుకోవడం)'],
    [/Chest pain \/ heaviness \/ sweating|Chest pain, heaviness or sweating/i, 'ఛాతీ నొప్పి, గుండెలో బరువుగా ఉండటం లేదా విపరీతమైన చెమటలు'],
    [/Chest pain not relieved after 3 SL tablets|Chest pain persisting after 3 doses of SL tablet/i, '5 నిమిషాల వ్యవధిలో 3 నాలుక కింద మాత్రలు తీసుకున్నప్పటికీ ఛాతీ నొప్పి తగ్గకపోవడం'],
    [/Mild swelling in feet, ankles, or lower legs towards evening/i, 'సాయంత్రం వేళ పాదాలు, చీలమండల వద్ద తేలికపాటి వాపు'],
    [/Blood pressure reading consistently higher than 140\/90|Home BP >= 150\/100/i, 'రక్తపోటు రీడింగ్ వరుసగా 140/90 mmHg కంటే ఎక్కువగా ఉండటం'],
    [/Mild persistent dizziness when standing up from bed or chair/i, 'మంచం లేదా కుర్చీ నుండి లేచి నిలబడినప్పుడు తలతిరుగుడు'],
    [/High grade fever with chills|High fever with chills|Fever > 100\.4/i, 'చలి మరియు వణుకుతో కూడిన తీవ్రమైన జ్వరం (100.4°F కంటే ఎక్కువ)'],
    [/Fever recurring, or persisting for more than 3 days/i, 'డిశ్చార్జ్ తర్వాత 3 రోజులకు మించి జ్వరం తగ్గకపోవడం లేదా మళ్లీ రావడం'],
    [/Bleeding from any site|Any bleeding - gums, urine/i, 'చిగుళ్ళు, మూత్రం, మలంలో రక్తం లేదా ఏ శరీర భాగం నుండైనా రక్తస్రావం'],
    [/Bleeding from the wound or soakage of dressing/i, 'గాయం నుండి రక్తస్రావం లేదా డ్రెస్సింగ్ రక్తంతో తడిసిపోవడం'],
    [/Redness, swelling, pus or discharge from the wound|Wound site redness/i, 'గాయం వద్ద ఎరుపుదనం, వాపు, చీము లేదా దుర్వాసనతో కూడిన స్రావాలు'],
    [/Blood sugar above 300 mg\/dl|Sugar > 300 mg\/dl/i, 'రెండు పరీక్షల్లో రక్తంలో చక్కెర 300 mg/dl కంటే ఎక్కువగా ఉండటం'],
    [/Hypoglycaemia|Low sugar symptoms/i, 'హైపోగ్లైసీమియా (షుగర్ తగ్గడం) - చెమటలు, వణుకు, అయోమయం: వెంటనే 3 చెంచాల గ్లూకోజ్ నీటిలో కలిపి తాగించండి'],
    [/Bluish lips|bluish discolouration/i, 'పెదవులు లేదా వేళ్లు నీలిరంగులోకి మారడం, మగత లేదా అయోమయం'],
    [/Blurred vision|Blurring of vision/i, 'కంటిచూపు మసకబారడం లేదా రంగులను గుర్తించడంలో ఇబ్బంది'],
    [/Sudden weakness of face \/ arm \/ leg|Sudden weakness of face, arm or leg/i, 'ముఖం, చేయి లేదా కాలులో ఆకస్మిక బలహీనత లేదా మాట తడబడటం'],
    [/Persistent vomiting|not able to take orally/i, 'నిరంతర వాంతులు లేదా ఆహారం, ద్రవాలు తీసుకోలేకపోవడం'],
    [/Severe \/ increasing abdominal pain|Severe or increasing pain in abdomen/i, 'తీవ్రమైన లేదా క్రమంగా పెరుగుతున్న కడుపు నొప్పి'],
    [/Calf pain \/ leg swelling|Pain in the calf/i, 'పిక్క నొప్పి లేదా కాలు వాపు (రక్తనాళంలో రక్తం గడ్డకట్టే సంకేతం - DVT)'],
    [/Burning micturition|pain while passing urine/i, 'మూత్ర విసర్జన సమయంలో మంట లేదా నొప్పి'],
    [/Unable to pass urine|Inability to pass urine/i, 'మూత్ర విసర్జన కాకపోవడం'],
    [/Convulsions \/ seizures|Fits \(convulsions\)/i, 'ఫిట్స్ లేదా మూర్ఛ రావడం'],
    [/Coughing up blood|Haemoptysis/i, 'దగ్గులో రక్తం పడటం'],
    [/Yellow discolouration of eyes or urine|Yellow eyes or urine/i, 'కళ్ళు లేదా మూత్రం పసుపు రంగులోకి మారడం (పచ్చకామెర్లు)'],
    [/Wheeze \/ breathlessness not settling with reliever/i, 'రిలీవర్ ఇన్‌హేలర్ వాడినప్పటికీ పిల్లికూతలు లేదా శ్వాస ఇబ్బంది తగ్గకపోవడం']
  ];
  for (const [re, te] of map) {
    if (re.test(s)) return te;
  }
  return s;
}

function translateCaresheetText(text) {
  if (!text) return '';
  let s = String(text);
  const map = [
    [/Acute decompensated heart failure \(HFrEF\)/gi, 'తీవ్రమైన గుండె వైఫల్యం (HFrEF)'],
    [/Dilated cardiomyopathy, LVEF (\d+)%/gi, 'డైలేటెడ్ కార్డియోమయోపతి (LVEF $1%)'],
    [/Type 2 Diabetes Mellitus|Type II Diabetes Mellitus/gi, 'టైప్ 2 మధుమేహం (షుగర్ వ్యాధి)'],
    [/Essential Hypertension|Hypertension/gi, 'అధిక రక్తపోటు (బీపీ)'],
    [/Coronary Artery Disease|CAD/gi, 'గుండె రక్తనాళాల వ్యాధి (CAD)'],
    [/Check daily weight every morning/gi, 'ప్రతిరోజూ ఉదయం బరువును తనిఖీ చేసి డైరీలో నమోదు చేయండి'],
    [/Limit total fluids to ([0-9\.]+) liters? daily/gi, 'రోజువారీ ద్రవాల పరిమాణాన్ని $1 లీటర్లకు పరిమితం చేయండి'],
    [/Low salt diet.*less than (\d+) g/gi, 'తక్కువ ఉప్పు ఆహారం - రోజుకు $1 గ్రాముల కంటే తక్కువ ఉప్పు తీసుకోండి'],
    [/avoid pickles, papad, namkeen/gi, 'ఊరగాయలు, అప్పడాలు, మిక్చర్ మరియు ఉప్పు చిరుతిళ్లను నివారించండి'],
    [/Total fluids max ([0-9\.]+) litres?\/day/gi, 'మొత్తం ద్రవాలు రోజుకు గరిష్టంగా $1 లీటర్లు మాత్రమే (నీరు, టీ, పాలు, పప్పు కలిపి)'],
    [/Cardiology OPD/gi, 'కార్డియాలజీ అవుట్‌పేషెంట్ విభాగం (OPD)'],
    [/Review with reports/gi, 'రిపోర్టులతో సహా డాక్టర్‌ను సంప్రదించండి'],
    [/Please bring this discharge summary and all current medications/gi, 'ఫాలో-అప్ సమయంలో ఈ డిశ్చార్జ్ సారాంశం మరియు అన్ని ప్రస్తుత మందులను తీసుకురండి.']
  ];
  for (const [re, te] of map) {
    s = s.replace(re, te);
  }
  return s;
}

router.post('/generate-caresheet', (req, res) => {
  try {
    const patientData = (req.body && Object.keys(req.body).length > 0) ? req.body : defaultData;
    const isTelugu = (patientData.lang === 'te');

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
      bufferPages: true
    });

    let fontRegular = 'Helvetica';
    let fontBold = 'Helvetica-Bold';

    if (hasTeluguFont) {
      try {
        doc.registerFont('TeluguFont', NIRMALA_FONT_PATH, 'NirmalaUI');
        doc.registerFont('TeluguFont-Bold', NIRMALA_FONT_PATH, 'NirmalaUI-Bold');
        if (isTelugu) {
          fontRegular = 'TeluguFont';
          fontBold = 'TeluguFont-Bold';
        }
      } catch (fontErr) {
        console.warn('Could not register Nirmala font:', fontErr.message);
      }
    }

    const rawName = (patientData.patientName || 'Patient').replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '') || 'Patient';
    const filename = `CareSheet-${isTelugu ? 'TE-' : ''}${rawName}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    const primaryBlue = '#1976D2';
    const darkBlue = '#0D47A1';
    const lightBlueBg = '#E3F2FD';
    const darkGray = '#263238';
    const medGray = '#455A64';
    const lightGray = '#ECEFF1';
    const urgentRed = '#C62828';
    const urgentRedBg = '#FFEBEE';
    const softGreenBg = '#E8F5E9';
    const darkGreen = '#2E7D32';

    // Header Banner
    doc.rect(40, 40, 515, 68).fill(lightBlueBg);
    doc.rect(40, 40, 515, 4).fill(primaryBlue);

    doc.fillColor(primaryBlue).font(fontBold).fontSize(20).text('CareBridge', 55, 50);
    doc.font(fontRegular).fontSize(10).fillColor(medGray).text(
      isTelugu ? TELUGU_STRINGS.subtitle : 'Your Personal Post-Discharge Care Companion',
      55, 75, { width: 330 }
    );

    doc.font(fontBold).fontSize(10).fillColor(darkBlue).text(
      isTelugu ? TELUGU_STRINGS.sheetTitle : 'DISCHARGE CARE SHEET',
      380, 52, { align: 'right', width: 165 }
    );

    const todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    doc.font(fontRegular).fontSize(8.5).fillColor(medGray).text(
      `${isTelugu ? TELUGU_STRINGS.generated : 'Generated:'} ${todayDate}`,
      380, 68, { align: 'right', width: 165 }
    );

    let yPos = 120;

    function drawSectionHeader(title, y) {
      doc.rect(40, y, 515, 22).fill(primaryBlue);
      doc.fillColor('#FFFFFF').font(fontBold).fontSize(10.5).text(title, 48, y + 5);
      return y + 28;
    }

    function checkPageBreak(space = 60) {
      if (yPos + space > 780) {
        doc.addPage();
        yPos = 40;
      }
    }

    // 1. Patient Information
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secPatientInfo : 'PATIENT INFORMATION & DISCHARGE SUMMARY',
      yPos
    );
    doc.rect(40, yPos, 515, 72).fillAndStroke('#F8FAFC', lightGray);

    doc.fillColor(darkGray).font(fontBold).fontSize(9.5);
    doc.text(isTelugu ? TELUGU_STRINGS.name : 'Patient Name:', 50, yPos + 8);
    doc.font(fontRegular).text(patientData.patientName || 'N/A', 145, yPos + 8);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.id : 'Patient ID:', 330, yPos + 8);
    doc.font(fontRegular).text(patientData.patientId || 'N/A', 415, yPos + 8);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.ageGender : 'Age / Gender:', 50, yPos + 24);
    const genderText = isTelugu ? (patientData.gender === 'Female' ? 'స్త్రీ' : 'పురుషుడు') : (patientData.gender || 'N/A');
    doc.font(fontRegular).text(`${patientData.age || 'N/A'} ${isTelugu ? 'సంవత్సరాలు' : 'yrs'} / ${genderText}`, 145, yPos + 24);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.disDate : 'Discharge Date:', 330, yPos + 24);
    doc.font(fontRegular).text(patientData.dischargeDate || 'N/A', 415, yPos + 24);

    doc.font(fontBold).text(isTelugu ? TELUGU_STRINGS.diagnosis : 'Diagnosis:', 50, yPos + 44);
    doc.font(fontRegular).text(patientData.diagnosis || 'N/A', 145, yPos + 44, { width: 395 });

    yPos += 82;

    // 2. Medications Table
    checkPageBreak(120);
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secMeds : 'PRESCRIBED MEDICATIONS & SCHEDULE',
      yPos
    );

    doc.rect(40, yPos, 515, 20).fill(lightBlueBg);
    doc.fillColor(darkBlue).font(fontBold).fontSize(9);
    doc.text(isTelugu ? TELUGU_STRINGS.colMed : 'Medication & Dose', 46, yPos + 5, { width: 130 });
    doc.text(isTelugu ? TELUGU_STRINGS.colTiming : 'Timing', 180, yPos + 5, { width: 140 });
    doc.text(isTelugu ? TELUGU_STRINGS.colDuration : 'Duration', 325, yPos + 5, { width: 65 });
    doc.text(isTelugu ? TELUGU_STRINGS.colInstructions : 'Special Instructions', 395, yPos + 5, { width: 155 });
    yPos += 22;

    const medicines = patientData.medicines || [];
    medicines.forEach((med, idx) => {
      const rowBg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
      const medNameStr = isTelugu
        ? `${translateMedNameToTelugu(med.name)} (${translateDoseToTelugu(med.dose || '')})`
        : `${med.name} (${med.dose || ''})`;
      const timingStr = isTelugu ? translateTimingToTelugu(med.timing || '-') : (med.timing || '-');
      const durStr = isTelugu ? translateDurationToTelugu(med.duration || '-') : (med.duration || '-');
      const instStr = isTelugu
        ? translateInstructionsToTelugu(med.instructions || '')
        : (med.instructions || 'As directed');

      // Calculate dynamic text height across all 4 columns to prevent ANY text overlay
      doc.font(fontBold).fontSize(8.5);
      const hName = doc.heightOfString(medNameStr, { width: 130 });

      doc.font(fontRegular).fontSize(8.5);
      const hTiming = doc.heightOfString(timingStr, { width: 140 });
      const hDur = doc.heightOfString(durStr, { width: 65 });
      const hInst = doc.heightOfString(instStr, { width: 155 });

      const cellPadding = 5;
      const contentHeight = Math.max(hName, hTiming, hDur, hInst);
      const rowHeight = Math.max(26, Math.ceil(contentHeight) + cellPadding * 2);

      checkPageBreak(rowHeight + 4);
      doc.rect(40, yPos, 515, rowHeight).fillAndStroke(rowBg, lightGray);

      doc.fillColor(darkGray).font(fontBold).fontSize(8.5);
      doc.text(medNameStr, 46, yPos + cellPadding, { width: 130 });

      doc.font(fontRegular).fontSize(8.5);
      doc.text(timingStr, 180, yPos + cellPadding, { width: 140 });
      doc.text(durStr, 325, yPos + cellPadding, { width: 65 });
      doc.text(instStr, 395, yPos + cellPadding, { width: 155 });

      yPos += rowHeight;
    });

    yPos += 14;

    // 3. Diet & Home Care
    checkPageBreak(100);
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secDietHomeCare : 'DIET & DAILY HOME CARE INSTRUCTIONS',
      yPos
    );

    doc.rect(40, yPos, 515, 34).fillAndStroke(softGreenBg, '#C8E6C9');
    doc.fillColor(darkGreen).font(fontBold).fontSize(9.5).text(
      isTelugu ? TELUGU_STRINGS.dietTitle : 'Dietary Recommendations:',
      48, yPos + 6
    );
    doc.fillColor(darkGray).font(fontRegular).fontSize(8.5).text(
      patientData.dietInstructions || (isTelugu ? 'సమతుల్య, తేలికగా జీర్ణమయ్యే ఆహారం తీసుకోండి.' : 'Follow balanced diet as advised.'),
      48, yPos + 18, { width: 495 }
    );
    yPos += 42;

    const rawDiet = patientData.dietInstructions || (isTelugu ? 'సమతుల్య, తేలికగా జీర్ణమయ్యే ఆహారం తీసుకోండి.' : 'Follow balanced diet as advised.');
    const dietText = isTelugu ? translateCaresheetText(rawDiet) : rawDiet;

    const homeCare = patientData.homeCare || [];
    homeCare.forEach((item) => {
      const itemText = isTelugu ? translateCaresheetText(item) : item;
      doc.font(fontRegular).fontSize(8.5);
      const hItem = doc.heightOfString(itemText, { width: 485 });
      const itemHeight = Math.max(16, Math.ceil(hItem) + 4);

      checkPageBreak(itemHeight + 2);
      doc.fillColor(primaryBlue).font(fontBold).fontSize(10).text('•', 48, yPos);
      doc.fillColor(darkGray).font(fontRegular).fontSize(8.5).text(itemText, 60, yPos, { width: 485 });
      yPos += itemHeight;
    });

    yPos += 10;

    // 4. Follow-up details
    if (patientData.followUp && patientData.followUp.date) {
      checkPageBreak(40);
      doc.rect(40, yPos, 515, 24).fillAndStroke('#FFF8E1', '#FFE082');
      doc.fillColor('#F57F17').font(fontBold).fontSize(9).text(
        isTelugu ? TELUGU_STRINGS.secFollowup : 'Follow-up Appointment:',
        48, yPos + 6
      );
      doc.fillColor(darkGray).font(fontRegular).fontSize(8.5).text(
        `${patientData.followUp.date} | ${patientData.followUp.doctor || 'Physician'} (${patientData.followUp.department || 'Hospital'})`,
        185, yPos + 6, { width: 360 }
      );
      yPos += 30;
    }

    // 5. Warning Signs
    checkPageBreak(90);
    yPos = drawSectionHeader(
      isTelugu ? TELUGU_STRINGS.secWarnings : 'WHEN TO SEEK IMMEDIATE MEDICAL HELP',
      yPos
    );
    doc.rect(40, yPos, 515, 20).fill(urgentRedBg);
    doc.fillColor(urgentRed).font(fontBold).fontSize(9).text(
      isTelugu ? TELUGU_STRINGS.emergencyNotice : 'EMERGENCY: Seek immediate medical attention if you experience:',
      48, yPos + 5
    );
    yPos += 24;

    const urgent = (Array.isArray(patientData.warningSignsUrgent) && patientData.warningSignsUrgent.length > 0)
      ? patientData.warningSignsUrgent
      : ((Array.isArray(patientData.warningSigns) && patientData.warningSigns.length > 0) ? patientData.warningSigns : [
          'Chest pain, severe breathlessness, or persistent high fever',
          'Sudden dizziness, fainting, or loss of consciousness',
          'Heavy wound bleeding, redness, or pus discharge'
        ]);
    urgent.forEach((sign) => {
      const signText = isTelugu ? translateWarningSignToTelugu(sign) : sign;
      doc.font(fontBold).fontSize(8.5);
      const hSign = doc.heightOfString(`!  ${signText}`, { width: 495 });
      const signHeight = Math.max(16, Math.ceil(hSign) + 4);

      checkPageBreak(signHeight + 2);
      doc.fillColor(urgentRed).font(fontBold).fontSize(8.5).text(`!  ${signText}`, 48, yPos, { width: 495 });
      yPos += signHeight;
    });

    // Footers
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.rect(40, 785, 515, 1).fill('#CFD8DC');
      doc.fillColor(medGray).font(fontRegular).fontSize(7.5).text(
        isTelugu ? TELUGU_STRINGS.footerText : 'This care sheet is generated from available discharge instructions and does not replace medical advice.',
        40, 792, { width: 430, align: 'left' }
      );
      doc.font(fontRegular).fontSize(8).fillColor(medGray).text(
        isTelugu ? `పేజీ ${i + 1} / ${range.count}` : `Page ${i + 1} of ${range.count}`,
        470, 792, { width: 85, align: 'right' }
      );
    }

    doc.end();

  } catch(err) {
    console.error('Care sheet generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'PDF creation failed.' });
    }
  }
});

module.exports = router;
