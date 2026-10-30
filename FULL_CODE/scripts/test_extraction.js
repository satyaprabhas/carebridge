const fs = require('fs');
const { parseUniversalDocument } = require('../features/03-discharge-summary/backend/documentParser');

const text = fs.readFileSync('FULL_CODE/uploads/discharge-1793389490761-356110091.txt', 'utf8');
const result = parseUniversalDocument(text);

console.log('=== EXTRACTED FIELDS ===');
result.fields.forEach(f => {
  console.log(f.key.padEnd(20) + ' : ' + f.value);
});

console.log('\n=== STRUCTURED MEDICINES ===');
result.structuredMedicines.forEach((m, i) => {
  console.log((i+1) + '. ' + m.name + ' | Dose: ' + m.dose + ' | Timing: ' + m.timing + ' | Duration: ' + m.duration);
});
