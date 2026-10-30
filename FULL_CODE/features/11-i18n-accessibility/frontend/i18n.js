/**
 * Feature: 11-i18n-accessibility
 * Frontend Multi-language Dictionaries & SpeechSynthesis Engine
 */

export const I18N = {
  en: {
    welcome: 'Welcome to CareBridge',
    subtitle: 'Your discharge instructions, organised for recovery at home.',
    menuDashboard: 'Dashboard',
    menuDischarge: 'Discharge Summary',
    menuMeds: 'Medicine Schedule',
    menuDiet: 'Personalised Diet Plan',
    menuFood: 'Can I Eat This?',
    menuFollowup: 'Follow-up & Recovery',
    menuWarnings: 'Warning Signs',
    careSheetTitle: '📥 Download Care Sheet'
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
    menuWarnings: 'चेतावनी संकेत',
    careSheetTitle: '📥 केयर शीट डाउनलोड करें'
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
    menuWarnings: 'హెచ్చరిక సంకేతాలు',
    careSheetTitle: '📥 కేర్ షీట్ డౌన్‌లోడ్'
  }
};

export function initI18nModule() {
  let currentLang = 'en';
  let isSpeaking = false;

  function switchLanguage(lang) {
    currentLang = lang;
    const str = I18N[lang] || I18N.en;

    const btn = document.getElementById('btn-header-care-sheet');
    if (btn) btn.textContent = str.careSheetTitle;

    const sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
  }

  function readAloud(text) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      updateSpeechButton();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'te' ? 'te-IN' : 'en-US');
    utterance.rate = 0.95;

    utterance.onend = () => {
      isSpeaking = false;
      updateSpeechButton();
    };

    isSpeaking = true;
    updateSpeechButton();
    window.speechSynthesis.speak(utterance);
  }

  function updateSpeechButton() {
    const btn = document.getElementById('btn-toggle-speech');
    if (btn) {
      btn.textContent = isSpeaking ? '⏹️ Stop Reading' : '🔊 Read Aloud';
    }
  }

  document.getElementById('lang-select')?.addEventListener('change', (e) => {
    switchLanguage(e.target.value);
  });

  document.getElementById('btn-toggle-speech')?.addEventListener('click', () => {
    const content = document.querySelector('.app-content')?.innerText || 'CareBridge instructions.';
    readAloud(content);
  });

  return { switchLanguage, readAloud, I18N };
}
