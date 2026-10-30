# Feature Specification: 01-Auth (Authentication & Patient Onboarding)

## 1. Overview
The **01-Auth** module provides the patient authentication and registration entry point for CareBridge. It supports standard username/password login, account registration with demographic fields (name, age, gender), and a 1-click Demo Account bypass for hackathons and presentations.

## 2. Directory Contents
```
01-auth/
├── frontend/
│   ├── auth.html          # Form markup for Login, Register, and Demo Access
│   └── auth.js            # Client-side validation, fetch calls, and tab switcher
├── backend/
│   └── auth.routes.js     # Express Router with /api/login and /api/register
└── SPEC.md                # This specification
```

## 3. Backend Endpoints Contract

### `POST /api/login`
- **Request Body**:
  ```json
  { "username": "patient", "password": "CareBridge123" }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Authentication successful.",
    "user": {
      "username": "patient",
      "name": "Suresh",
      "patientId": "CB-DEMO-001",
      "age": 55,
      "gender": "Male",
      "role": "patient"
    }
  }
  ```
- **Error Response (401 Unauthorized)**:
  ```json
  { "success": false, "message": "Invalid credentials..." }
  ```

### `POST /api/register`
- **Request Body**:
  ```json
  {
    "fullName": "Ramesh Varma",
    "username": "ramesh",
    "password": "Password123",
    "age": 52,
    "gender": "Male"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Account created successfully!",
    "user": { "username": "ramesh", "name": "Ramesh Varma", "patientId": "CB-REG-482", ... }
  }
  ```

## 4. Frontend Component Interface
- `initAuthModule({ onAuthSuccess, onLogout })`
  - When login/registration succeeds, calls `onAuthSuccess(user)`.
  - Automatically hooks tab navigation between Sign In and Registration.

## 5. How to Test Independently
1. Run `node -e "const r = require('./backend/auth.routes.js'); console.log(r);"` to test route exports.
2. In the browser, test with `patient` / `CareBridge123` or register a new user.
