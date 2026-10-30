const { parseUniversalDocument } = require('../features/03-discharge-summary/backend/documentParser');

const tableDoc = `
DISCHARGE SUMMARY
Patient Name: Rajesh Sharma    Age: 52 Yrs    Sex: Male
DOB: 1974-06-15
Date of Admission: 10/10/2026    Date of Discharge: 15/10/2026
Reason for Admission: Uncontrolled blood sugar with HbA1c 9.8% and fatigue
Procedure: Medically managed with insulin titration and oral anti-diabetics

Medications at Discharge:
| S.No | Medicine | Dose | Route | Frequency | Duration | Special Instructions |
| 1 | Tab. Metformin | 1000 mg | PO | 1-0-1 | Lifelong | After food |
| 2 | Tab. Atorvastatin | 10 mg | PO | 0-0-1 | Lifelong | At bedtime |
| 3 | Inj. Huminsulin 30/70 | 14 units | SC | 1-0-0 | Till review | 30 mins before breakfast |

Diet: Diabetic diet, low carbohydrate, high fiber
Follow-up: Review after 2 weeks on 2026-10-30 in Diabetology OPD
`;

const res = parseUniversalDocument(tableDoc);
console.log('=== TABLE DOC EXTRACTED FIELDS ===');
res.fields.forEach(f => console.log(f.key.padEnd(20) + ' : ' + f.value));
console.log('\n=== STRUCTURED MEDS ===');
res.structuredMedicines.forEach((m, i) => console.log((i+1) + '. ' + m.name + ' | Dose: ' + m.dose + ' | Timing: ' + m.timing + ' | Dur: ' + m.duration + ' | Inst: ' + m.instructions));
