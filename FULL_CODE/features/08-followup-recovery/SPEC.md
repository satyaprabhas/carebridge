# Feature Specification: 08-Followup-Recovery (Care Milestones & Checklist)

## 1. Overview
The **08-Followup-Recovery** module combines two essential components of convalescent care:
1. **Follow-up Appointment Card**: Physician name, clinic location room, date/time, and doctor notes.
2. **Interactive Home Recovery Checklist**: Dynamic checkboxes for daily hygiene, fluid hydration targets, rest, and activity guidelines.

## 2. Directory Contents
```
08-followup-recovery/
├── frontend/
│   ├── followup.html        # Appointment card and interactive checklist markup
│   └── followup.js          # DOM population & progress badge calculator
├── backend/
│   └── followup.routes.js   # GET /api/followup and POST /api/followup/checklist
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/followup`
- Returns scheduled follow-up metadata and current checklist states.

### `POST /api/followup/checklist`
- **Request Body**: `{ "index": 0, "completed": true }`
- **Response**: Returns updated checklist map.

## 4. Frontend Component Interface
- `renderFollowupAndChecklist(patientData, checklistState)`:
  - Formats appointment details and builds interactive checkboxes.
- `updateChecklistProgress(total, checklistState)`:
  - Updates progress pill (e.g. `2 of 4 Completed`).
