# Feature Specification: 09-Warning-Signs (Emergency Triage Protocol)

## 1. Overview
The **09-Warning-Signs** module serves as the primary patient safety guardrail. It bifurcates red flags into two priority levels:
1. **Red Alert (Urgent/Emergency)**: Severe, life-threatening symptoms requiring an immediate 108/112 ambulance or ER visit.
2. **Amber Alert (Cautionary)**: Worsening or persistent symptoms requiring prompt contact with the attending doctor.

## 2. Directory Contents
```
09-warning-signs/
├── frontend/
│   ├── warnings.html        # Emergency banner and symptom cards markup
│   └── warnings.js          # List populator and emergency call triggers
├── backend/
│   └── warnings.routes.js   # GET /api/warning-signs endpoint
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/warning-signs`
- Returns emergency phone numbers, urgent signs list, and caution signs list.

## 4. Frontend Component Interface
- `renderWarningSigns(patientData)`:
  - Injects red alert items into `#warning-urgent-list` and amber items into `#warning-caution-list`.
