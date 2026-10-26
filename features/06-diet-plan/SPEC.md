# Feature Specification: 06-Diet-Plan (Clinical Nutrition Breakdown)

## 1. Overview
The **06-Diet-Plan** module translates the post-discharge dietary guidelines into 3 distinct, intuitive categories: **Foods to Eat** (green), **Foods to Limit** (amber), and **Foods to Avoid** (red), each accompanied by clinical rationales.

## 2. Directory Contents
```
06-diet-plan/
├── frontend/
│   ├── diet.html            # 3-column Eat / Limit / Avoid grid
│   └── diet.js              # List population logic
├── backend/
│   └── diet.routes.js       # GET /api/diet-plan endpoint
└── SPEC.md                  # This specification
```

## 3. Backend Endpoints Contract

### `GET /api/diet-plan`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "eat": [{ "food": "Steamed Rice", "reason": "Light, easily digestible carbohydrate." }],
      "limit": [{ "food": "Full-Fat Milk", "reason": "Heavy saturated fats." }],
      "avoid": [{ "food": "Deep-Fried Foods", "reason": "High in trans fats, irritates digestive tract." }]
    }
  }
  ```

## 4. Frontend Component Interface
- `renderDietPlan(dietPlan)`:
  - Takes `{ eat: [...], limit: [...], avoid: [...] }` and dynamically populates the three columns.
