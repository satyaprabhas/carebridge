# Feature Specification: 03-Discharge-Summary (Real OCR Document Ingestion)

## 1. Overview
The **03-Discharge-Summary** module performs **real optical character recognition (OCR)** on uploaded patient discharge documents (PNG, JPG, PDF) using `sharp`, `tesseract.js`, and `pdf-parse`. It extracts actual patient clinical parameters and customizes medicines, recovery directives, and diet plans to match the document.

## 2. Directory Contents
```
03-discharge-summary/
├── frontend/
│   ├── discharge.html       # Dropzone, upload banner, review card, active summary
│   └── discharge.js         # Real upload handler and stage/review pipeline
├── backend/
│   ├── discharge.routes.js  # Multer upload handler and /api/sample-discharge
│   └── documentParser.js    # Sharp image pre-processor + Tesseract OCR semantic parser
└── SPEC.md                  # This specification
```

## 3. Real OCR Pipeline
1. **Preprocessing (`sharp`)**:
   - Resizes low-resolution images up to 1600px width.
   - Applies grayscale conversion, contrast normalization, and bicubic sharpening.
2. **Text Recognition (`tesseract.js` / `pdf-parse`)**:
   - Extracts character streams with page segmentation mode (`PSM 6`).
3. **Semantic Clinical Parser (`documentParser.js`)**:
   - Extracts Patient Name, Age, Gender, Admission & Discharge Dates, Attending Doctor, Hospital Name, Diagnosis, and Follow-up Advice.
   - Generates tailored recovery protocols (dietary plan, medications, home care instructions, warning red flags) matching the patient's diagnosed condition.

## 4. API Endpoints Contract

### `POST /api/upload`
- **Content-Type**: `multipart/form-data`
- **Field**: `discharge` (File: PNG, JPG, or PDF)
- **Response**:
  ```json
  {
    "success": true,
    "mode": "real-ocr",
    "message": "Successfully scanned and extracted details for Mr. Sonaimuthu (LOWER OESOPHAGEAL HIATUS HERNIA).",
    "uploadedFile": { "filename": "discharge-17298.png", ... },
    "data": {
      "patientName": "Mr. Sonaimuthu",
      "age": 71,
      "gender": "Male",
      "admissionDate": "21/01/2019",
      "dischargeDate": "25/01/2019",
      "diagnosis": "LOWER OESOPHAGEAL HIATUS HERNIA",
      "doctor": "Dr. Anand MBBS, MD",
      "hospital": "SANGEETHA HOSPITAL TRUSTED CARE",
      "medicines": [...],
      "dietPlan": { "eat": [...], "limit": [...], "avoid": [...] },
      "homeCare": [...],
      "warningSignsUrgent": [...]
    }
  }
  ```
