# Feature Specification: 02-Dashboard (Patient Recovery Home)

## 1. Overview
The **02-Dashboard** provides a high-level summary of the patient's recovery journey upon login. It showcases the patient profile hero banner, quick summary metrics (discharge status, next medicine, diet overview, upcoming follow-up), and shortcut tiles to navigate to individual care modules.

## 2. Directory Contents
```
02-dashboard/
├── frontend/
│   ├── dashboard.html      # Hero banner, 4 metric cards, and 7 feature navigation tiles
│   └── dashboard.js        # DOM population routine from patient profile
├── backend/
│   └── dashboard.routes.js # /api/dashboard/summary endpoint for recovery progress
└── SPEC.md                 # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/dashboard/summary`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "status": "active-recovery",
      "activeCarePlan": true,
      "recoveryDay": 5,
      "totalRecoveryDays": 14,
      "adherenceRate": "100%",
      "nextDose": {
        "medicine": "Sample Med A (Demo Tab)",
        "time": "08:00 AM",
        "instruction": "Take with food"
      },
      "nextFollowUp": {
        "date": "2026-10-18",
        "doctor": "Dr. Sarah Jenkins, MD",
        "location": "Outpatient Clinic Room 302"
      }
    }
  }
  ```

## 4. Frontend Component Interface
- `renderDashboard(patientData)`:
  - Updates hero card elements (`dash-patient-name`, `dash-patient-id`, `dash-discharge-date`, `dash-allergies`, etc.).
  - Binds click events on `.feature-action-card[data-page]` and `.summary-card[data-page]` for routing.
