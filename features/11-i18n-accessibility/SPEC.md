# Feature Specification: 11-i18n-Accessibility (Multilingual & Speech Synthesis)

## 1. Overview
The **11-i18n-Accessibility** module ensures inclusivity for patients speaking English, Hindi, and Telugu, and provides Web Speech API (`SpeechSynthesis`) screen-reading capabilities for elderly or visually impaired users.

## 2. Directory Contents
```
11-i18n-accessibility/
├── frontend/
│   ├── i18n.html            # Language selector dropdown & speech toggle markup
│   └── i18n.js              # Localization dictionaries and Web Speech controller
├── backend/
│   └── i18n.routes.js       # GET /api/i18n/:lang localization dictionary API
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/i18n/:lang`
- Parameter: `:lang` (`en`, `hi`, `te`)
- Returns translated interface strings.

## 4. Frontend Component Interface
- `initI18nModule()`:
  - Hooks language switch event and handles real-time text-to-speech audio playback.
