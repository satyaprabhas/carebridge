# Feature Specification: 04-Medicine-Schedule (Prescribed Regimen)

## 1. Overview
The **04-Medicine-Schedule** displays all prescribed medications extracted from the hospital discharge summary in a clear, high-contrast, accessible schedule table.

## 2. Directory Contents
```
04-medicine-schedule/
├── frontend/
│   ├── medicines.html       # Medication regimen table markup
│   └── medicines.js         # Table renderer and pill badges
├── backend/
│   └── medicines.routes.js  # GET /api/medicines and POST /api/medicines/update
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/medicines`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "med-1",
        "name": "Sample Med A (Demo Tab)",
        "dose": "500 mg",
        "timing": "Twice daily with meals",
        "duration": "5 days",
        "instructions": "DEMO ONLY — Take with food."
      }
    ]
  }
  ```

## 4. Frontend Component Interface
- `renderMedicineTable(medicines)`:
  - Injects formatted rows into `#medicine-table-rows`.
  - Shows friendly empty state if no medications exist.
