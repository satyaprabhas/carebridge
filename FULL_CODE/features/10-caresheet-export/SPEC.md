# Feature Specification: 10-Caresheet-Export (PDF Generation Engine)

## 1. Overview
The **10-Caresheet-Export** module produces a printable, branded, multi-page PDF Care Sheet from the patient's active parameters. It converts clinical data into formatted tables, callout boxes, and disclaimer footers using `pdfkit`.

## 2. Directory Contents
```
10-caresheet-export/
├── frontend/
│   ├── caresheet.html       # Download button and export preview block
│   └── caresheet.js         # Client-side blob stream reader and download trigger
├── backend/
│   └── caresheet.routes.js  # PDFKit layout generator streaming directly to HTTP response
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `POST /api/generate-caresheet`
- **Request Body**: Patient data object `{ patientName, medicines: [...], ... }`
- **Response Headers**:
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="CareSheet-Suresh.pdf"`
- **Response Body**: Binary PDF stream.

## 4. Frontend Component Interface
- `initCareSheetExport(getCurrentPatientData)`:
  - Hooks download buttons and triggers the browser file download workflow.
