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

const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, PNG, and WebP files are accepted.'));
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
      name: "Sample Med A (Demo Tab)",
      dose: "500 mg",
      timing: "Twice daily with meals",
      duration: "5 days",
      instructions: "DEMO ONLY — NOT A REAL PRESCRIPTION. Take with food."
    },
    {
      name: "Sample Med B (Demo Cap)",
      dose: "20 mg",
      timing: "Once daily in morning",
      duration: "14 days",
      instructions: "DEMO ONLY — NOT A REAL PRESCRIPTION. Swallow whole with water."
    },
    {
      name: "Sample Med C (Demo Susp)",
      dose: "10 ml",
      timing: "At bedtime as needed",
      duration: "As needed (Max 3 days)",
      instructions: "DEMO ONLY — NOT A REAL PRESCRIPTION. Shake well before use."
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

// POST /api/upload — REAL OCR / DOCUMENT TEXT EXTRACTION
router.post('/upload', (req, res) => {
  upload.any()(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size exceeds maximum limit of 10MB.' });
      }
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const uploaded = req.file || (req.files && req.files[0]);
    if (!uploaded) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please upload a PDF, JPG, PNG, or WebP document.'
      });
    }

    try {
      console.log(`[CareBridge OCR] Analyzing uploaded file: ${uploaded.filename} (${uploaded.mimetype})`);

      // Extract raw text with layout & confidence via Sharp + Tesseract (offline eng, hin, tel) or digital PDF
      const ocrResult = await extractRawTextWithLayout(uploaded.path, uploaded.mimetype);
      console.log(`[CareBridge OCR] Extracted ${ocrResult.text.length} characters (avg confidence: ${ocrResult.confidence}%).`);

      // Universal Certificate & Medical Document Parsing
      const parsed = parseUniversalDocument(ocrResult.text, ocrResult.lines, ocrResult.confidence);

      // Helper to retrieve field value safely without fabrication
      const getVal = (key) => {
        const item = parsed.fields.find(f => f.key === key);
        return (item && item.status !== 'missing') ? item.value : '';
      };

      // Construct backward-compatible clinical recovery data object
      const patientName = getVal('patientName') || getVal('beneficiaryName') || getVal('personName') || getVal('candidateName') || getVal('electorName') || getVal('studentName') || getVal('individualName') || 'Patient';
      const patientId = getVal('patientId') || getVal('certificateNumber') || getVal('aadhaarNumber') || getVal('panNumber') || getVal('epicNumber') || getVal('registrationNumber') || 'N/A';
      const diagnosis = getVal('diagnosis') || getVal('documentTitle') || parsed.documentTypeName;
      const hospital = getVal('hospitalName') || getVal('authority') || getVal('institutionName') || 'Official Record';
      const doctor = getVal('doctor') || 'Attending Authority';
      const admissionDate = getVal('admissionDate') || getVal('issueDate') || getVal('documentDate') || '';
      const dischargeDate = getVal('dischargeDate') || getVal('documentDate') || '';
      const age = getVal('age') || '';
      const gender = getVal('gender') || '';
      const address = getVal('address') || '';

      // Extract medicines if printed
      let medicines = (parsed.structuredMedicines && parsed.structuredMedicines.length > 0) ? parsed.structuredMedicines : [];
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
              medicines.push({
                name: rawN,
                dose: doseM || 'As prescribed',
                timing: timeM || 'Once daily',
                duration: 'Ongoing recovery course',
                instructions: rawI
              });
            } else {
              medicines.push({
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
        medicines: medicines.length > 0 ? medicines : [],
        dietInstructions: getVal('dietInstructions') || '',
        activityLifestyle: getVal('activityLifestyle') || '',
        followUp: {
          date: getVal('followUpDate') || dischargeDate || '',
          hospital,
          doctor,
          notes: getVal('followUp') || ''
        },
        warningSigns: getVal('warningSigns') ? [getVal('warningSigns')] : (getVal('emergencyContacts') ? [getVal('emergencyContacts')] : []),
        rawText: parsed.rawText
      };

      res.status(200).json({
        success: true,
        mode: 'real-ocr',
        message: `Successfully read ${parsed.documentTypeName} with ${parsed.verifiedCount} verified fields.`,
        documentType: parsed.documentType,
        documentTypeName: parsed.documentTypeName,
        overallConfidence: parsed.overallConfidence,
        verifiedCount: parsed.verifiedCount,
        missingCount: parsed.missingCount,
        availableLangs: AVAILABLE_LANGS,
        uploadedFile: {
          filename: uploaded.filename,
          url: `/uploads/${uploaded.filename}`,
          originalName: uploaded.originalname,
          size: uploaded.size,
          mimetype: uploaded.mimetype
        },
        fields: parsed.fields,
        rawText: parsed.rawText,
        data: clinicalData
      });
    } catch (ocrErr) {
      console.error('[CareBridge OCR] Extraction failed:', ocrErr);
      // Strictly report actual error, never fabricate or fall back to mock sample data silently
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
