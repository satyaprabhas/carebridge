# CareBridge — Modular Team Development Guide

This repository has been decoupled into **11 modular feature folders** located inside the [`features/`](file:///d:/santhosh/ap/features) directory.

Each feature folder is self-contained with:
1. `frontend/` — The HTML template and JavaScript controller for that specific option.
2. `backend/` — The Express REST API router and controller handling business logic.
3. `SPEC.md` — Complete requirements, data contracts, and instructions for the developer.

---

## 📁 Feature Folders Overview

| Directory | Feature Name | Description |
|---|---|---|
| [`features/01-auth/`](file:///d:/santhosh/ap/features/01-auth) | Sign In & Registration | Login, patient registration, demo account bypass. |
| [`features/02-dashboard/`](file:///d:/santhosh/ap/features/02-dashboard) | Recovery Dashboard | Overview hero card, 4 summary metric tiles, module shortcuts. |
| [`features/03-discharge-summary/`](file:///d:/santhosh/ap/features/03-discharge-summary) | Discharge Summary | Upload dropzone (PDF/JPG/PNG), sample data loader, review. |
| [`features/04-medicine-schedule/`](file:///d:/santhosh/ap/features/04-medicine-schedule) | Medicine Regimen | Medication schedule table with doses, timings, and caution notes. |
| [`features/05-medicine-alerts/`](file:///d:/santhosh/ap/features/05-medicine-alerts) | Medicine Alerts | Web Audio chime alarms, browser push notifications, adherence log. |
| [`features/06-diet-plan/`](file:///d:/santhosh/ap/features/06-diet-plan) | Diet Plan | 3-column Eat / Limit / Avoid nutrition breakdown with rationales. |
| [`features/07-food-search/`](file:///d:/santhosh/ap/features/07-food-search) | "Can I Eat This?" | Instant food safety search engine and clinical recommendations. |
| [`features/08-followup-recovery/`](file:///d:/santhosh/ap/features/08-followup-recovery) | Follow-up & Recovery | Clinic appointment details and interactive daily care checklist. |
| [`features/09-warning-signs/`](file:///d:/santhosh/ap/features/09-warning-signs) | Warning Signs | Red Emergency alerts (108/112) vs. Amber Doctor Consultation signs. |
| [`features/10-caresheet-export/`](file:///d:/santhosh/ap/features/10-caresheet-export) | Care Sheet PDF | Server-side printable PDF generation with PDFKit. |
| [`features/11-i18n-accessibility/`](file:///d:/santhosh/ap/features/11-i18n-accessibility) | Voice & Multi-language | English/Hindi/Telugu translations and Text-to-Speech audio reader. |

---

## 🚀 How to Share & Collaborate with Your Team

### Step 1: Hand out a feature folder
Copy the desired feature folder (e.g., `features/07-food-search`) and give it to your teammate along with its `SPEC.md`.

### Step 2: Your teammate works on the feature
* They can modify `frontend/` (UI and client script).
* They can enhance `backend/` (API logic, validations, database queries).
* They follow the guide in `SPEC.md`.

### Step 3: Copy back to your laptop
Paste their updated folder back into the `features/` directory replacing the old one.

### Step 4: Validate and run the combined website
Open your terminal in `d:\santhosh\ap` and run:

```bash
# 1. Run the validator / combiner check:
node combine.js

# 2. Start the unified server:
node server.js
```

Open [http://localhost:3000](http://localhost:3000) to view your final combined application.
