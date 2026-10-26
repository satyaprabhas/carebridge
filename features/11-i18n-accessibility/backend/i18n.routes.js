/**
 * Feature: 11-i18n-accessibility
 * Backend Language Dictionaries API Router
 */

const express = require('express');
const router = express.Router();

const dictionaries = {
  en: {
    welcome: 'Welcome to CareBridge',
    subtitle: 'Your discharge instructions, organised for recovery at home.',
    menuDashboard: 'Dashboard',
    menuDischarge: 'Discharge Summary',
    menuMeds: 'Medicine Schedule',
    menuDiet: 'Personalised Diet Plan',
    menuFood: 'Can I Eat This?',
    menuFollowup: 'Follow-up & Recovery',
    menuWarnings: 'Warning Signs'
  },
  hi: {
    welcome: 'CareBridge में आपका स्वागत है',
    subtitle: 'घर पर सुधार के लिए आपके डिस्चार्ज निर्देश व्यवस्थित हैं।',
    menuDashboard: 'डैशबोर्ड',
    menuDischarge: 'डिस्चार्ज सारांश',
    menuMeds: 'दवाओं का समय',
    menuDiet: 'आहार योजना',
    menuFood: 'क्या मैं यह खा सकता हूँ?',
    menuFollowup: 'अनुवर्ती व रिकवरी',
    menuWarnings: 'चेतावनी संकेत'
  },
  te: {
    welcome: 'CareBridge కి స్వాగతం',
    subtitle: 'ఇంటి వద్ద కోలుకోవడానికి మీ డిశ్చార్జ్ సూచనలు సిద్ధంగా ఉన్నాయి.',
    menuDashboard: 'డాష్‌బోర్డ్',
    menuDischarge: 'డిశ్చార్జ్ సారాంశం',
    menuMeds: 'మందుల షెడ్యూల్',
    menuDiet: 'ఆహార ప్రణాళిక',
    menuFood: 'నేను ఇది తినవచ్చా?',
    menuFollowup: 'ఫాలో-అప్ & రికవరీ',
    menuWarnings: 'హెచ్చరిక సంకేతాలు'
  }
};

// GET /api/i18n/:lang
router.get('/:lang', (req, res) => {
  const lang = req.params.lang || 'en';
  res.status(200).json({
    success: true,
    language: lang,
    dictionary: dictionaries[lang] || dictionaries.en
  });
});

module.exports = router;
