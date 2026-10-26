/**
 * Feature: 04-medicine-schedule
 * Backend Medicine Schedule & Adherence Router
 */

const express = require('express');
const router = express.Router();

let activeMedicines = [
  {
    id: 'med-1',
    name: "Sample Med A (Demo Tab)",
    dose: "500 mg",
    timing: "Twice daily with meals",
    duration: "5 days",
    instructions: "DEMO ONLY — NOT A REAL PRESCRIPTION. Take with food."
  },
  {
    id: 'med-2',
    name: "Sample Med B (Demo Cap)",
    dose: "20 mg",
    timing: "Once daily in morning",
    duration: "14 days",
    instructions: "DEMO ONLY — NOT A REAL PRESCRIPTION. Swallow whole with water."
  },
  {
    id: 'med-3',
    name: "Sample Med C (Demo Susp)",
    dose: "10 ml",
    timing: "At bedtime as needed",
    duration: "As needed (Max 3 days)",
    instructions: "DEMO ONLY — NOT A REAL PRESCRIPTION. Shake well before use."
  }
];

// GET /api/medicines
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: activeMedicines
  });
});

// POST /api/medicines/update
router.post('/update', (req, res) => {
  if (req.body.medicines && Array.isArray(req.body.medicines)) {
    activeMedicines = req.body.medicines;
    return res.status(200).json({
      success: true,
      message: 'Medication schedule updated successfully.',
      data: activeMedicines
    });
  }
  return res.status(400).json({
    success: false,
    message: 'Invalid medicines array payload.'
  });
});

module.exports = router;
