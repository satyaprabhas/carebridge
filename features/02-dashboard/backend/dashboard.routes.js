/**
 * Feature: 02-dashboard
 * Backend Dashboard API Router
 */

const express = require('express');
const router = express.Router();

// GET /api/dashboard/summary
router.get('/summary', (req, res) => {
  // Returns high-level recovery milestones and stats for dashboard widgets
  res.status(200).json({
    success: true,
    data: {
      status: 'active-recovery',
      activeCarePlan: true,
      recoveryDay: 5,
      totalRecoveryDays: 14,
      adherenceRate: '100%',
      nextDose: {
        medicine: 'Sample Med A (Demo Tab)',
        time: '08:00 AM',
        instruction: 'Take with food'
      },
      nextFollowUp: {
        date: '2026-10-18',
        doctor: 'Dr. Sarah Jenkins, MD',
        location: 'Outpatient Clinic Room 302'
      }
    }
  });
});

module.exports = router;
