/**
 * Feature: 08-followup-recovery
 * Backend Follow-up Appointment & Checklist API Router
 */

const express = require('express');
const router = express.Router();

let storedFollowUp = {
  date: "2026-10-18",
  time: "10:30 AM",
  doctor: "Dr. Sarah Jenkins, MD",
  department: "Internal Medicine (Outpatient Clinic Room 302)",
  hospital: "Metropolitan General Hospital",
  notes: "Bring this discharge record and daily symptom journal. (Sample Follow-up Date)"
};

let storedChecklistProgress = {};

// GET /api/followup
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      followUp: storedFollowUp,
      checklistProgress: storedChecklistProgress
    }
  });
});

// POST /api/followup/checklist
router.post('/checklist', (req, res) => {
  const { index, completed } = req.body;
  if (typeof index !== 'undefined') {
    storedChecklistProgress[index] = !!completed;
    return res.status(200).json({
      success: true,
      data: storedChecklistProgress
    });
  }
  return res.status(400).json({ success: false, message: 'Missing index' });
});

module.exports = router;
