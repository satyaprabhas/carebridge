/**
 * Feature: 03-discharge-summary
 * Backend Document Upload & Real OCR Document Analysis Router
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractRawTextWithLayout, parseUniversalDocument, AVAILABLE_LANGS } = require('./documentParser');

const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const allowedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/html',
  'application/xhtml+xml',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain'
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.html', '.htm', '.docx', '.doc', '.txt'];
  
  if (allowedMimeTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, Word (.docx/.doc), HTML, Text (.txt), and Image (JPG, PNG, WebP) files are accepted.'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
});

// Realistic Fictional Sample Discharge Summary (matches bundled PDF)
const sampleDischargeData = {
  patientName: "Suresh",
  patientId: "CB-DEMO-001",
  age: 55,
  gender: "Male",
  admissionDate: "2026-10-05",
  dischargeDate: "2026-10-10",
  diagnosis: "Fictional example of recovery following an uncomplicated hospital admission. This document is for software testing only.",
  allergies: ["Not provided in this fictional sample"],
  medicines: [
    {
      name: "Tab. Augmentin 625mg",
      dose: "625 mg",
      timing: "Twice daily with meals (Morning & Night)",
      duration: "7 days",
      instructions: "Take at start of meals with water. Consume curd or buttermilk."
    },
    {
      name: "Tab. Dolo 650mg (Paracetamol)",
      dose: "650 mg",
      timing: "Three times a day as needed",
      duration: "5 days",
      instructions: "Take after meals with warm water for pain/fever. Do not exceed prescribed dose."
    },
    {
      name: "Cap. Pan-40 (Pantoprazole)",
      dose: "40 mg",
      timing: "Once daily in morning (Empty Stomach)",
      duration: "14 days",
      instructions: "Take 30 minutes before breakfast with a glass of water."
    },
    {
      name: "Tab. Telma 40mg (Telmisartan)",
      dose: "40 mg",
      timing: "Once daily in morning",
      duration: "Ongoing recovery course",
      instructions: "Maintain appropriate hydration and avoid potassium salt substitutes."
    },
    {
      name: "Tab. Rosuvas 10mg (Rosuvastatin)",
      dose: "10 mg",
      timing: "At bedtime (Night)",
      duration: "Ongoing recovery course",
      instructions: "Take at night. Avoid grapefruit or grapefruit juice completely."
    }
  ],
  dietInstructions: "Fictional testing rules, not medical advice. Eat light digestible meals (steamed rice, oats, clear soups, steamed vegetables). Limit full-fat dairy, eggs, caffeine and sodium. Avoid deep-fried, heavily spiced foods, processed chips and alcohol.",
  dietPlan: {
    eat: [
      { food: "Steamed Rice", reason: "Light, easily digestible carbohydrate supporting smooth recovery." },
      { food: "Oatmeal", reason: "High in soluble fibre, gentle on digestive system." },
      { food: "Clear Vegetable Soups", reason: "Maintains electrolyte balance and promotes hydration." },
      { food: "Steamed Vegetables", reason: "Provides micronutrients and vitamins without digestive strain." },
      { food: "Bananas (moderate)", reason: "Good source of potassium; easy to digest in moderate portions." }
    ],
    limit: [
      { food: "Full-Fat Milk", reason: "Heavy saturated fats; prefer low-fat or skimmed milk." },
      { food: "Eggs", reason: "Limit to 1 boiled egg daily to moderate lipid intake." },
      { food: "Tea / Coffee", reason: "Limit caffeine to 1 cup daily; avoid added sugar." },
      { food: "Table Salt", reason: "Keep sodium intake low to support stable blood pressure during recovery." }
    ],
    avoid: [
      { food: "Deep-Fried Foods", reason: "High in trans fats, irritates digestive tract and delays recovery." },
      { food: "Heavily Spiced Curries", reason: "Can trigger gastric irritation and discomfort post-discharge." },
      { food: "Packaged Chips & Snacks", reason: "Excessive sodium and preservatives conflict with home-care guidance." },
      { food: "Sugary Sodas & Drinks", reason: "Rapid sugar spikes without nutritional benefit." },
      { food: "Alcohol", reason: "Conflicts with recovery protocol and medication safety." }
    ]
  },
  followUp: {
    date: "2026-10-18",
    time: "10:30 AM",
    doctor: "Dr. Sarah Jenkins, MD",
    department: "Internal Medicine (Outpatient Clinic Room 302)",
    hospital: "Metropolitan General Hospital",
    notes: "Bring this discharge record and daily symptom journal. (Sample Follow-up Date)"
  },
  homeCare: [
    "Rest adequately and avoid strenuous physical exertion or heavy lifting (>5 kg) for 7 days.",
    "Maintain adequate hydration (drink 2 litres of water throughout the day unless restricted).",
    "Keep recovery site clean and dry; follow normal personal hygiene routine.",
    "Resume normal light daily activities gradually as comfort allows."
  ],
  warningSignsUrgent: [
    "Sudden high fever (>101°F / 38.3°C) or severe chills",
    "Severe sharp chest pain or acute abdominal pain",
    "Sudden shortness of breath or difficulty breathing at rest",
    "Loss of consciousness, severe dizziness, or fainting"
  ],
  warningSigns: [
    "Persistent low-grade temperature not responding to rest",
    "Inability to tolerate oral fluids or food for over 24 hours",
    "New or worsening redness, swelling, or drainage around recovery site",
    "Persistent headache or unexplained lightheadedness"
  ]
};

// GET /api/sample-discharge
router.get('/sample-discharge', (req, res) => {
  res.status(200).json({
    success: true,
    mode: 'sample-demo',
    sampleFileName: 'CareBridge_Sample_Discharge_Summary.pdf',
    sampleDownloadUrl: '/sample/CareBridge_Sample_Discharge_Summary.pdf',
    message: 'Loaded bundled fictional sample discharge summary for Suresh (CB-DEMO-001).',
    data: sampleDischargeData
  });
});

// POST /api/upload — REAL OCR / DOCUMENT TEXT EXTRACTION (Supports Single & Multiple Document Photos/Pages)
router.post('/upload', (req, res) => {
  upload.any()(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds maximum limit of 10MB per document.' });
      }
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const uploadedList = req.files && req.files.length > 0 ? req.files : (req.file ? [req.file] : []);
    if (!uploadedList || uploadedList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded. Please upload one or more PDF, JPG, PNG, or WebP documents.'
      });
    }

    try {
      console.log(`[CareBridge OCR] Analyzing ${uploadedList.length} file(s) for discharge summary...`);

      // 1. Process all documents with OCR in sequence
      const fileResults = [];
      for (let i = 0; i < uploadedList.length; i++) {
        const fileItem = uploadedList[i];
        console.log(`[CareBridge OCR] Processing document ${i + 1}/${uploadedList.length}: ${fileItem.filename} (${fileItem.mimetype})`);
        const ocrResult = await extractRawTextWithLayout(fileItem.path, fileItem.mimetype);
        fileResults.push({
          page: i + 1,
          file: fileItem,
          filename: fileItem.filename,
          url: `/uploads/${fileItem.filename}`,
          originalName: fileItem.originalname,
          size: fileItem.size,
          mimetype: fileItem.mimetype,
          ocr: ocrResult
        });
      }

      // 2. Build aggregated text and lines with page demarcations
      const combinedText = fileResults.map(fr => `=== [Document / Page ${fr.page}: ${fr.originalName}] ===\n${fr.ocr.text}`).join('\n\n');
      const combinedLines = fileResults.flatMap(fr => fr.ocr.lines || []);
      const totalConf = fileResults.reduce((sum, fr) => sum + (fr.ocr.confidence || 0), 0);
      const avgConfidence = Math.round(totalConf / fileResults.length);

      // 3. Universal parse on the combined text
      const parsedCombined = parseUniversalDocument(combinedText, combinedLines, avgConfidence);

      // 4. Also parse each page independently to ensure no page-boundary cutoffs
      const pageParses = fileResults.map(fr => parseUniversalDocument(fr.ocr.text, fr.ocr.lines, fr.ocr.confidence));

      // Consolidated field getter: checks individual pages then combined
      const getVal = (key) => {
        const combItem = parsedCombined.fields.find(f => f.key === key);
        if (combItem && combItem.status !== 'missing' && combItem.value && !combItem.value.toLowerCase().includes('not found')) {
          return combItem.value;
        }
        for (const pp of pageParses) {
          const item = pp.fields.find(f => f.key === key);
          if (item && item.status !== 'missing' && item.value && !item.value.toLowerCase().includes('not found')) return item.value;
        }
        return '';
      };

      const patientName = getVal('patientName') || getVal('beneficiaryName') || getVal('personName') || getVal('candidateName') || getVal('electorName') || getVal('studentName') || getVal('individualName') || 'Patient';
      const patientId = getVal('patientId') || getVal('certificateNumber') || getVal('aadhaarNumber') || getVal('panNumber') || getVal('epicNumber') || getVal('registrationNumber') || 'N/A';
      const diagnosis = getVal('diagnosis') || getVal('documentTitle') || parsedCombined.documentTypeName;
      const hospital = getVal('hospitalName') || getVal('authority') || getVal('institutionName') || 'Official Record';
      const doctor = getVal('doctor') || 'Attending Authority';
      const admissionDate = getVal('admissionDate') || getVal('issueDate') || getVal('documentDate') || '';
      const dischargeDate = getVal('dischargeDate') || getVal('documentDate') || '';
      const age = getVal('age') || '';
      const gender = getVal('gender') || '';
      const address = getVal('address') || '';

      // 5. Merge medicines across ALL pages without duplicates
      const medicines = [];
      const seenMeds = new Set();
      const addMedicine = (m) => {
        if (!m || !m.name) return;
        const norm = m.name.toLowerCase().replace(/^(?:tab\.?|cap\.?|syr\.?|inj\.?)\s+/i, '').replace(/[^a-z0-9]/g, '');
        if (!norm || seenMeds.has(norm)) return;
        seenMeds.add(norm);
        medicines.push(m);
      };

      // Add structured medicines found across all pages
      pageParses.forEach(pp => {
        if (Array.isArray(pp.structuredMedicines)) {
          pp.structuredMedicines.forEach(addMedicine);
        }
      });
      if (Array.isArray(parsedCombined.structuredMedicines)) {
        parsedCombined.structuredMedicines.forEach(addMedicine);
      }

      // Fallback: parse from raw medicine text lines if structured was empty
      if (medicines.length === 0) {
        const medsVal = getVal('medicines') || getVal('medications');
        if (medsVal) {
          const medParts = medsVal.split(';').map(m => m.trim()).filter(m => m.length > 2);
          medParts.forEach(m => {
            const sep = m.includes('—') ? '—' : (m.includes(':') ? ':' : null);
            if (sep) {
              const rawN = m.split(sep)[0].trim();
              const rawI = m.split(sep).slice(1).join(sep).trim();
              const doseM = (m.match(/\b([0-9]+(?:\.[0-9]+)?\s*(?:mg|mcg|g|ml))\b/i) || [])[1];
              const timeM = (m.match(/\b(Once\s+daily(?:\s*\([^\)]+\))?|Twice\s+daily|At\s+night|In\s+morning)\b/i) || [])[1];
              addMedicine({
                name: rawN,
                dose: doseM || 'As prescribed',
                timing: timeM || 'Once daily',
                duration: 'Ongoing recovery course',
                instructions: rawI
              });
            } else {
              addMedicine({
                name: m,
                dose: 'As prescribed',
                timing: 'Once daily',
                duration: 'Ongoing recovery course',
                instructions: 'Take as prescribed by attending physician'
              });
            }
          });
        }
      }

      // Merge diet instructions from all pages
      const dietParts = [];
      pageParses.forEach(pp => {
        const item = pp.fields.find(f => f.key === 'dietInstructions');
        if (item && item.value && !dietParts.includes(item.value)) dietParts.push(item.value);
      });
      const combinedDiet = dietParts.join('; ') || getVal('dietInstructions') || '';

      // Merge warning signs from all pages
      const warningParts = [];
      pageParses.forEach(pp => {
        const item = pp.fields.find(f => f.key === 'warningSigns' || f.key === 'emergencyContacts');
        if (item && item.value && !warningParts.includes(item.value)) warningParts.push(item.value);
      });

      const clinicalData = {
        patientName,
        patientId,
        age,
        gender,
        address,
        wardBed: getVal('wardBed') || '',
        hospital,
        doctor,
        admissionDate,
        dischargeDate,
        reasonForAdmission: getVal('reasonForAdmission') || '',
        diagnosis,
        surgeryDetails: getVal('surgeryDetails') || '',
        clinicalSummary: getVal('reasonForAdmission') || getVal('treatmentSummary') || getVal('procedureSummary') || '',
        dischargeCondition: getVal('dischargeCondition') || '',
        medicines: medicines,
        dietInstructions: combinedDiet,
        activityLifestyle: getVal('activityLifestyle') || '',
        woundCare: getVal('woundCare') || '',
        followUp: {
          date: getVal('followUpDate') || dischargeDate || '',
          hospital,
          doctor,
          notes: getVal('followUp') || ''
        },
        warningSigns: warningParts.length > 0 ? warningParts : (getVal('warningSigns') ? [getVal('warningSigns')] : []),
        rawText: combinedText,
        pageCount: fileResults.length
      };

      res.status(200).json({
        success: true,
        mode: 'real-ocr',
        message: `Successfully analyzed ${fileResults.length} document page${fileResults.length > 1 ? 's' : ''} with OCR (${parsedCombined.verifiedCount} fields verified).`,
        documentType: parsedCombined.documentType,
        documentTypeName: fileResults.length > 1 ? `${parsedCombined.documentTypeName} (${fileResults.length} Pages)` : parsedCombined.documentTypeName,
        overallConfidence: avgConfidence,
        verifiedCount: parsedCombined.verifiedCount,
        missingCount: parsedCombined.missingCount,
        availableLangs: AVAILABLE_LANGS,
        totalPages: fileResults.length,
        uploadedFile: {
          filename: fileResults[0].file.filename,
          url: fileResults[0].url,
          originalName: fileResults[0].originalName,
          size: fileResults[0].size,
          mimetype: fileResults[0].mimetype
        },
        uploadedFiles: fileResults.map(fr => ({
          page: fr.page,
          filename: fr.file.filename,
          url: fr.url,
          originalName: fr.originalName,
          size: fr.size,
          mimetype: fr.mimetype,
          confidence: fr.ocr.confidence
        })),
        fields: parsedCombined.fields,
        rawText: combinedText,
        data: clinicalData
      });
    } catch (ocrErr) {
      console.error('[CareBridge OCR] Extraction failed:', ocrErr);
      res.status(422).json({
        success: false,
        message: `OCR document analysis failed: ${ocrErr.message || 'Unable to recognize text from document.'}. Please check image clarity and rotation.`,
        error: ocrErr.message
      });
    }
  });
});

module.exports = router;
module.exports.sampleDischargeData = sampleDischargeData;
