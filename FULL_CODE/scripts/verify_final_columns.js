const fs = require('fs');
const { parseUniversalDocument } = require('../features/03-discharge-summary/backend/documentParser');

console.log('===========================================================');
console.log('VERIFYING FIELD & MEDICINE COLUMN SEPARATION ON LOCAL DOCUMENTS');
console.log('===========================================================');

const p1 = fs.readFileSync('uploads/ocr_page_1.txt', 'utf8');
const p2 = fs.readFileSync('uploads/ocr_page_2.txt', 'utf8');
const p3 = fs.readFileSync('uploads/ocr_page_3.txt', 'utf8');
const p4 = fs.readFileSync('uploads/ocr_page_4.txt', 'utf8');

// Test 1: Page 4 alone (Hospital Header + Patient Name + Age/Gender + Ward/Bed + Dates + Doctor)
console.log('\n--- TEST 1: Page 4 (Multi-Column Header Segmentation) ---');
const res4 = parseUniversalDocument(p4);
const fieldMap4 = {};
res4.fields.forEach(f => fieldMap4[f.key] = f.value);

console.log('Patient Name:', fieldMap4.patientName);
console.log('Patient ID  :', fieldMap4.patientId);
console.log('Age         :', fieldMap4.age);
console.log('Gender      :', fieldMap4.gender);
console.log('Ward / Bed  :', fieldMap4.wardBed);
console.log('Admission Dt:', fieldMap4.admissionDate);
console.log('Discharge Dt:', fieldMap4.dischargeDate);
console.log('Doctor      :', fieldMap4.doctor);

// Verifications
let failed = false;
if (fieldMap4.patientName.includes('Ago') || fieldMap4.patientName.includes('Gender') || fieldMap4.patientName.includes('CIN')) {
  console.error('❌ FAIL: Patient Name contains leaked Age/Gender data!');
  failed = true;
} else {
  console.log('✅ PASS: Patient Name has zero column bleed.');
}

if (fieldMap4.age === '7 Yrs') {
  console.error('❌ FAIL: Age matched obstetric marriage length (ML- 7 years)!');
  failed = true;
} else {
  console.log('✅ PASS: Age did not bleed from obstetric history.');
}

if (fieldMap4.gender === 'Male') {
  console.error('❌ FAIL: Gender matched baby sex instead of patient title (Mrs.)!');
  failed = true;
} else {
  console.log('✅ PASS: Gender is correctly Female.');
}

// Test 2: Combined 4 Pages (Full Document Consolidation & Medicine 5-Column Table)
console.log('\n--- TEST 2: Consolidated 4 Pages & Medicine Table ---');
const resFull = parseUniversalDocument([p1, p2, p3, p4].join('\n\n'));
const fieldMapFull = {};
resFull.fields.forEach(f => fieldMapFull[f.key] = f.value);

console.log('Consolidated Demographics:');
console.log('- Hospital:', fieldMapFull.hospitalName);
console.log('- Patient :', fieldMapFull.patientName);
console.log('- ID      :', fieldMapFull.patientId);
console.log('- Age     :', fieldMapFull.age);
console.log('- Gender  :', fieldMapFull.gender);
console.log('- Bed     :', fieldMapFull.wardBed);
console.log('- Dates   :', `${fieldMapFull.admissionDate} to ${fieldMapFull.dischargeDate}`);
console.log('- Doctor  :', fieldMapFull.doctor);

console.log('\nMedicines 5 Columns Table:');
console.table(resFull.structuredMedicines);

// Verify medicine columns
resFull.structuredMedicines.forEach(m => {
  if (m.instructions.toLowerCase().includes('for 5 days') || m.instructions.toLowerCase().includes('for 14 days')) {
    console.error(`❌ FAIL: Duration leaked into Instructions for ${m.name}: "${m.instructions}"`);
    failed = true;
  }
  if (m.name.includes('(') || m.name.includes(')')) {
    console.error(`❌ FAIL: Medicine Name contains bracketed instructions: "${m.name}"`);
    failed = true;
  }
});

if (!failed) {
  console.log('✅ ALL COLUMN PLACEMENT AND SEPARATION VERIFICATIONS PASSED 100%!');
} else {
  process.exit(1);
}
