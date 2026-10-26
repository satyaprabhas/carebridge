# Feature Specification: 05-Medicine-Alerts (Audio Alarms & Dose Log)

## 1. Overview
The **05-Medicine-Alerts** module delivers real-time medication reminders using the Web Audio API (synthetic dual-frequency sine chime) and HTML5 Desktop Push Notifications. It features an interactive alarm dialog with "Mark as Taken", "Snooze (5 mins)", and "Dismiss" options, tracking adherence in an intake log.

## 2. Directory Contents
```
05-medicine-alerts/
├── frontend/
│   ├── alerts.html          # Alerts dashboard, add custom reminder, alarm dialog
│   └── alerts.js            # Web Audio API chime synthesis, push notifications, timer runner
├── backend/
│   └── alerts.routes.js     # /api/alerts/log (GET adherence logs, POST new dose logs)
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/alerts/log`
- Returns array of doses logged today.

### `POST /api/alerts/log`
- **Request Body**:
  ```json
  { "medName": "Sample Med A", "dose": "500 mg", "time": "08:30 AM" }
  ```
- **Response (201 Created)**:
  ```json
  { "success": true, "message": "Dose intake logged successfully.", "data": { ... } }
  ```

## 4. Frontend Component Interface
- `initAlertsModule()`:
  - Initializes the Web Audio API context for gentle hospital-grade chimes.
  - Returns controls: `{ triggerMedicineAlarm, markDoseAsTaken, snoozeMedicineAlarm, dismissMedicineAlarm }`.
