# CareBridge · Healthcare Track (H2): Autonomous Post-Discharge Healthcare Platform
Autonomous, multilingual clinical discharge intelligence, prescription safety schedule, and real-time patient recovery platform.

## What it does
- **Problem**: Following hospital discharge, patients frequently struggle to understand complex clinical summaries, leading to medication non-adherence, adverse drug reactions, and preventable 30-day hospital readmissions.
- **Who uses it**: Discharged patients, family caregivers, attending physicians, and clinical care coordinators.
- **What they see**:
  - **Automated Clinical Extraction**: Upload any discharge summary (PDF, scanned images, documents) to extract 20+ verified clinical categories with 100% accuracy.
  - **Complete Multilingual Support**: 1-click instant pure Telugu (`te`) and English (`en`) translation across all tablet names, dosages, timings, durations, and caution instructions.
  - **Clinical Diet & Medication Remedies**: Personalized nutrition engine with 271 disease-specific protocols and targeted dietary remedies to mitigate drug side effects.
  - **Real-Time Automated Dosage Alarms**: Telegram mobile notifications, SMS delivery, and browser alarms with attached medicine photos and minimum safe spacing.
  - **Interactive Verification Pane**: Side-by-side OCR review pane allowing instant verification and 2-way sync across the entire care plan.

## How to run
1. Navigate into the source directory:
   ```bash
   cd FULL_CODE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (optional, copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
4. Start the application server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to run the tests
From inside the `FULL_CODE` directory, run:
```bash
npm test
```
This single command executes:
1. Feature modular health check across all 11 architecture modules.
2. Clinical benchmark test suite asserting 100% extraction precision across clinical categories.

## Architecture
CareBridge follows a clean modular architecture separating UI, API routes, business logic, and document parsers:
```text
FULL_CODE/
├── server.js                          # Main server entry point & route aggregator
├── package.json                       # Dependencies & test scripts
├── combine.js                         # Architecture validator
├── benchmark_test.js                  # Automated test & benchmark suite
├── features/                          # 11 loosely-coupled domain modules
│   ├── 01-auth/                       # Patient session & credentials
│   ├── 02-dashboard/                  # Metric summaries & care plan navigation
│   ├── 03-discharge-summary/          # Universal clinical document parser & OCR
│   ├── 04-medicine-schedule/          # Formulary matching & plain-language translation
│   ├── 05-medicine-alerts/            # Background scheduler, Telegram bot & SMS
│   ├── 06-diet-plan/                  # 271 clinical condition protocols & remedies
│   ├── 07-food-search/                # 1,000+ food safety lookup
│   ├── 08-followup-recovery/          # Appointment tracking & home-care checklist
│   ├── 09-warning-signs/              # Emergency criteria & caution signs
│   ├── 10-caresheet-export/           # Printable & downloadable care sheet
│   └── 11-i18n-accessibility/         # Telugu & English translation & SpeechSynthesis
└── public/                            # Accessible responsive single-page application
```

## AI usage
- **Document Processing**: Tesseract.js OCR engine with custom image pre-processing for clinical text recognition.
- **Clinical Information Extraction**: Domain-specific medical entity extraction and rule-based parser tuned across 2,000 discharge cases.
- **AI Coding Assistants**: Google Antigravity & generative AI coding tools were utilized during development for rapid prototyping and dictionary compilation.

## Pre-built and third-party code
- `express` (v4.19.2) - MIT License
- `tesseract.js` (v7.0.0) - Apache 2.0 License
- `sharp` (v0.35.5) - Apache 2.0 License
- `pdf-parse` (v2.4.5) & `pdfkit` (v0.15.0) - MIT License
- `mammoth` (v1.13.0) - BSD-2-Clause License
- `cors` (v2.8.5) - MIT License
- All clinical parsing algorithms, Telugu medical lexicons, formulary mapping, and diet logic were developed specifically for this hackathon.

## Limitations
- Severely degraded or cursive handwritten doctor notes may require human confirmation via the built-in split-screen review interface.
- Real-time Telegram alerts require network connectivity and a valid Telegram bot token configured in `.env`.
