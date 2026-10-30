/**
 * CareBridge — Hackathon Submission Prediction Generator
 * Parses all 300 test cases from summaries.jsonl and outputs submission/H2S_predictions.csv
 */

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { parseUniversalDocument } = require('../features/03-discharge-summary/backend/documentParser');

async function generateSubmission() {
  const jsonlCandidates = [
    path.join(__dirname, '../data/summaries.jsonl'),
    path.join(__dirname, '../../data/summaries.jsonl'),
    'C:/Users/LENOVO/.gemini/antigravity/brain/3367237b-f668-4aeb-adc5-3a3fcbf19ee8/.user_uploaded/media_1793373312370_823d45a0.jsonl'
  ];
  const testIdsCandidates = [
    path.join(__dirname, '../data/test_ids.csv'),
    path.join(__dirname, '../../data/test_ids.csv'),
    'C:/Users/LENOVO/.gemini/antigravity/brain/3367237b-f668-4aeb-adc5-3a3fcbf19ee8/.user_uploaded/media_1793373312325_7eab1f0e.csv'
  ];

  const jsonlPath = jsonlCandidates.find(p => fs.existsSync(p));
  const testIdsPath = testIdsCandidates.find(p => fs.existsSync(p));

  if (!jsonlPath || !testIdsPath) {
    console.error('Cannot find test dataset files to generate predictions.');
    return;
  }

  // Load test IDs
  const testIdSet = new Set();
  const testLines = fs.readFileSync(testIdsPath, 'utf8').trim().split('\n');
  testLines.slice(1).forEach(l => {
    const id = l.trim().split(',')[0].trim();
    if (id) testIdSet.add(id);
  });

  console.log(`Loaded ${testIdSet.size} test case IDs from test_ids.csv`);

  const fileStream = fs.createReadStream(jsonlPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const rows = [
    ['summary_id', 'patient_name', 'patient_id', 'age', 'gender', 'doa', 'dod', 'doctor', 'diagnosis', 'total_meds', 'medication_names', 'warning_signs', 'follow_up_date'].join(',')
  ];

  let matched = 0;
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const item = JSON.parse(line);
      const sid = item.summary_id || item.id;
      if (testIdSet.has(sid)) {
        matched++;
        const parsed = parseUniversalDocument(item.summary_text || item.text || '');
        const medNames = (parsed.medicines || []).map(m => m.name).join('; ');
        const warnings = (parsed.warningSigns || []).join('; ');
        const followUpDate = parsed.followUp?.date || '';

        const sanitize = (val) => `"${String(val || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;

        rows.push([
          sanitize(sid),
          sanitize(parsed.patientName),
          sanitize(parsed.patientId),
          sanitize(parsed.age),
          sanitize(parsed.gender),
          sanitize(parsed.admissionDate),
          sanitize(parsed.dischargeDate),
          sanitize(parsed.doctor),
          sanitize(parsed.diagnosis),
          parsed.medicines?.length || 0,
          sanitize(medNames),
          sanitize(warnings),
          sanitize(followUpDate)
        ].join(','));
      }
    } catch (e) {}
  }

  const outDir = path.join(__dirname, '../../submission');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outCsvPath1 = path.join(outDir, 'H2S_predictions.csv');
  const outCsvPath2 = path.join(outDir, 'predictions.csv');
  const csvContent = rows.join('\n');

  fs.writeFileSync(outCsvPath1, csvContent, 'utf8');
  fs.writeFileSync(outCsvPath2, csvContent, 'utf8');

  console.log(`Successfully generated submission predictions for ${matched} test cases:`);
  console.log(` - ${outCsvPath1}`);
  console.log(` - ${outCsvPath2}`);
}

generateSubmission();
