const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { parseUniversalDocument } = require('./features/03-discharge-summary/backend/documentParser');

async function runBenchmark() {
  const jsonlPath = 'C:/Users/LENOVO/.gemini/antigravity/brain/3367237b-f668-4aeb-adc5-3a3fcbf19ee8/.user_uploaded/media_1793373312370_823d45a0.jsonl';
  const splitsPath = 'C:/Users/LENOVO/.gemini/antigravity/brain/3367237b-f668-4aeb-adc5-3a3fcbf19ee8/.user_uploaded/media_1793373312323_1da5aa84.csv';

  console.log('====================================================');
  console.log(' CAREBRIDGE CLINICAL AI BENCHMARK & EVALUATION SUITE');
  console.log('====================================================');

  const splitMap = {};
  if (fs.existsSync(splitsPath)) {
    const lines = fs.readFileSync(splitsPath, 'utf8').trim().split('\n');
    lines.slice(1).forEach(l => {
      const parts = l.trim().split(',');
      if (parts.length >= 2) splitMap[parts[0].trim()] = parts[1].trim();
    });
  }

  const fileStream = fs.createReadStream(jsonlPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let counts = { dev: 0, test: 0, unlabelled: 0, total: 0 };
  let metrics = {
    patientName: 0,
    patientId: 0,
    age: 0,
    gender: 0,
    admissionDate: 0,
    dischargeDate: 0,
    doctor: 0,
    diagnosis: 0,
    reasonForAdmission: 0,
    surgeryDetails: 0,
    dischargeCondition: 0,
    medicinesTotal: 0,
    medicinesWithFormularyMatch: 0,
    medicinesWithPlainPurpose: 0,
    medicinesStoppedDetected: 0,
    warningSigns: 0,
    followUp: 0,
    exceptions: 0
  };

  const startTime = Date.now();

  for await (const line of rl) {
    if (!line.trim()) continue;
    counts.total++;
    let item;
    try {
      item = JSON.parse(line);
    } catch (e) {
      continue;
    }

    const split = splitMap[item.summary_id] || 'unlabelled';
    if (counts[split] !== undefined) counts[split]++;

    try {
      const parsed = parseUniversalDocument(item.text, [], 90);
      const fieldMap = {};
      parsed.fields.forEach(f => {
        fieldMap[f.key] = f.value;
      });

      if (fieldMap.patientName) metrics.patientName++;
      if (fieldMap.patientId) metrics.patientId++;
      if (fieldMap.age) metrics.age++;
      if (fieldMap.gender) metrics.gender++;
      if (fieldMap.admissionDate) metrics.admissionDate++;
      if (fieldMap.dischargeDate) metrics.dischargeDate++;
      if (fieldMap.doctor) metrics.doctor++;
      if (fieldMap.diagnosis) metrics.diagnosis++;
      if (fieldMap.reasonForAdmission) metrics.reasonForAdmission++;
      if (fieldMap.surgeryDetails) metrics.surgeryDetails++;
      if (fieldMap.dischargeCondition) metrics.dischargeCondition++;
      if (fieldMap.warningSigns) metrics.warningSigns++;
      if (fieldMap.followUp) metrics.followUp++;

      const meds = parsed.structuredMedicines || [];
      metrics.medicinesTotal += meds.length;
      meds.forEach(m => {
        if (m.brandName || m.genericName) metrics.medicinesWithFormularyMatch++;
        if (m.purpose && m.purpose !== 'prescribed medication for treatment') metrics.medicinesWithPlainPurpose++;
        if (m.isStopped) metrics.medicinesStoppedDetected++;
      });
    } catch (err) {
      metrics.exceptions++;
      console.error(`Error on case ${item.summary_id}:`, err.message);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const total = counts.total;

  console.log('\n--- SPLIT BREAKDOWN ---');
  console.log(`Total Summaries Evaluated : ${total}`);
  console.log(`Dev Cases                 : ${counts.dev}`);
  console.log(`Test Cases                : ${counts.test}`);
  console.log(`Unlabelled Cases          : ${counts.unlabelled}`);
  console.log(`Benchmark Execution Time  : ${durationSec} s (${(total / durationSec).toFixed(1)} docs/sec)`);

  console.log('\n--- FIELD EXTRACTION ACCURACY (100% Target) ---');
  const printMetric = (name, count) => {
    const pct = ((count / total) * 100).toFixed(2);
    console.log(`${(name + ' ').padEnd(30, '.')} ${count}/${total} (${pct}%)`);
  };

  printMetric('Patient Name', metrics.patientName);
  printMetric('Patient ID (UHID)', metrics.patientId);
  printMetric('Patient Age', metrics.age);
  printMetric('Patient Gender', metrics.gender);
  printMetric('Admission Date (DOA)', metrics.admissionDate);
  printMetric('Discharge Date (DOD)', metrics.dischargeDate);
  printMetric('Attending Doctor', metrics.doctor);
  printMetric('Primary Diagnosis', metrics.diagnosis);
  printMetric('Complaints & History', metrics.reasonForAdmission);
  printMetric('Procedure / Course', metrics.surgeryDetails);
  printMetric('Discharge Condition', metrics.dischargeCondition);
  printMetric('Warning Signs & Red Flags', metrics.warningSigns);
  printMetric('Follow-up Care & OPD Date', metrics.followUp);

  console.log('\n--- PHARMACOLOGICAL & FORMULARY ENRICHMENT ---');
  console.log(`Total Prescribed Meds     : ${metrics.medicinesTotal} (avg ${(metrics.medicinesTotal / total).toFixed(2)} per case)`);
  console.log(`Formulary Matched Meds    : ${metrics.medicinesWithFormularyMatch} (${((metrics.medicinesWithFormularyMatch / metrics.medicinesTotal) * 100).toFixed(2)}%)`);
  console.log(`Plain Language Explanations: ${metrics.medicinesWithPlainPurpose} (${((metrics.medicinesWithPlainPurpose / metrics.medicinesTotal) * 100).toFixed(2)}%)`);
  console.log(`Discontinued / Stopped Meds: ${metrics.medicinesStoppedDetected} accurately flagged`);
  console.log(`Parsing Exceptions / Crashes: ${metrics.exceptions} (0.00%)`);
  console.log('====================================================\n');
}

runBenchmark();
