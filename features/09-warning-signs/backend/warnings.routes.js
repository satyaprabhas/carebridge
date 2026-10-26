/**
 * Feature: 09-warning-signs
 * Backend Emergency Triage Criteria API Router
 */

const express = require('express');
const router = express.Router();

const warningCriteria = {
  emergencyHotlines: [
    { name: "National Emergency Helpline", number: "112" },
    { name: "Ambulance Emergency", number: "108" }
  ],
  urgent: [
    "Sudden high fever (>101°F / 38.3°C) or severe chills",
    "Severe sharp chest pain or acute abdominal pain",
    "Sudden shortness of breath or difficulty breathing at rest",
    "Loss of consciousness, severe dizziness, or fainting"
  ],
  caution: [
    "Persistent low-grade temperature not responding to rest",
    "Inability to tolerate oral fluids or food for over 24 hours",
    "New or worsening redness, swelling, or drainage around recovery site",
    "Persistent headache or unexplained lightheadedness"
  ]
};

// GET /api/warning-signs
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: warningCriteria
  });
});

module.exports = router;
