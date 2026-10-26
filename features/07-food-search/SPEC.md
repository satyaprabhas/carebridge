# Feature Specification: 07-Food-Search ("Can I Eat This?")

## 1. Overview
The **07-Food-Search** module acts as an instant decision support system for patients asking whether a specific food (e.g., *chips*, *milk*, *banana*, *khichdi*, *coffee*) is safe during their recovery period. It returns a rated verdict (`suitable`, `limit`, `avoid`, or `unknown`), clinical explanations, and preparation notes.

## 2. Directory Contents
```
07-food-search/
├── frontend/
│   ├── food-search.html      # Search bar, quick tags, and verdict card
│   └── food-search.js        # Form handler and UI verdict card renderer
├── backend/
│   └── food-search.routes.js # Rule matching engine & POST /api/food-search/check
└── SPEC.md                   # This specification
```

## 3. Backend Endpoints Contract

### `POST /api/food-search/check`
- **Request Body**:
  ```json
  { "query": "chips" }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "result": {
      "food": "Chips",
      "verdict": "avoid",
      "explanation": "Packaged chips are deep-fried, heavily salted, and contain artificial preservatives...",
      "notes": "Documented restriction: Avoid packaged chips and snacks."
    }
  }
  ```

## 4. Frontend Component Interface
- `initFoodSearchModule()`:
  - Hooks search form submission and `.food-tag-btn` sample chips.
  - Dynamically renders verdicts with green, yellow, or red clinical color-coding.
