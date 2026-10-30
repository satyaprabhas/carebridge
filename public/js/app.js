
  // ============================================================
  // SIMPLE INDIAN HOUSEHOLD FOOD CONVERTER
  // Converts complex/Western food terms to everyday Indian names
  // ============================================================
        function convertToSimpleIndianFoodName(text) {
    if (!text || typeof text !== 'string') return text;
    let s = text;
    const map = [
      // Complex general terms
      [/\b(?:and\s+)?lean\s+proteins?\b/gi, 'Moong Dal, Paneer & Boiled Egg Whites'],
      [/\b(?:and\s+)?lean\s+protein\s+sources?\b/gi, 'Moong Dal, Paneer & Boiled Egg Whites'],
      [/\b(?:and\s+)?legumes\b/gi, 'Dals & Pulses (Moong Dal, Chana)'],
      [/\b(?:smooth\s+|soft\s+)?porridge\b/gi, 'Dalia / Khichdi'],
      [/\bwholegrains?\b/gi, 'Whole Wheat Roti & Dalia'],
      [/\bwhole\s+grains?\b/gi, 'Whole Wheat Roti & Dalia'],
      [/\btextured?-?modified\s+foods?\b/gi, 'Soft Mashed Food (Khichdi, Dal)'],

      // Grains & Breakfast
      [/oatmeal\s*(?:&|and)?\s*oat\s*bran/gi, 'Oatmeal & Poha (Flattened Rice)'],
      [/oatmeal\s*gruel/gi, 'Warm Oatmeal Gruel / Rice Kanji'],
      [/oatmeal/gi, 'Oatmeal / Dalia / Poha'],
      [/quinoa/gi, 'Dalia / Foxtail Millet'],
      [/chia\s*seeds/gi, 'Sweet Basil Seeds'],
      [/flaxseeds/gi, 'Flaxseeds'],

      // Vegetables
      [/zucchini/gi, 'Ridge Gourd / Bottle Gourd'],
      [/kale/gi, 'Spinach'],
      [/broccoli/gi, 'Broccoli / Cauliflower'],
      [/artichoke/gi, 'Bottle Gourd'],
      [/asparagus/gi, 'Green Beans'],

      // Dairy & proteins
      [/greek\s*yogurt/gi, 'Fresh Homemade Curd / Yogurt'],
      [/cottage\s*cheese/gi, 'Fresh Soft Paneer'],
      [/buttermilk/gi, 'Fresh Buttermilk'],
      [/clarified\s*butter/gi, 'Pure Ghee'],

      // Liquids & fruits
      [/coconut\s*water/gi, 'Tender Coconut Water'],
      [/bottle\s*gourd/gi, 'Bottle Gourd'],
      [/ridge\s*gourd/gi, 'Ridge Gourd'],
      [/bitter\s*gourd/gi, 'Bitter Gourd'],
      [/fenugreek/gi, 'Fenugreek'],
      [/gooseberry/gi, 'Indian Gooseberry (Amla)'],
      [/pomegranate/gi, 'Fresh Pomegranate'],
      [/papaya/gi, 'Ripe Papaya'],
      [/guava/gi, 'Fresh Guava'],
      [/bone\s*broth/gi, 'Warm Moong Dal Soup / Clear Veg Rasam'],
      [/broth/gi, 'Clear Dal Soup / Rasam'],

      // Pulses & grains
      [/lentils/gi, 'Moong Dal / Masoor Dal'],
      [/chickpeas/gi, 'Chickpeas'],
      [/kidney\s*beans/gi, 'Kidney Beans'],
      [/black\s*gram/gi, 'Urad Dal']
    ];
    for (const [re, rep] of map) {
      s = s.replace(re, rep);
    }
    return s;
  }

(function() {
  'use strict';

  // Smart API URL Resolver for Render Static Site + Web Service split
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    if (typeof input === 'string' && input.startsWith('/api/')) {
      const apiBase = window.CAREBRIDGE_API_BASE || localStorage.getItem('carebridge_api_url') || '';
      if (apiBase) {
        input = apiBase.replace(/\/+$/, '') + input;
      }
    }
    return originalFetch.call(this, input, init);
  };

  // ============================================================
  // APPLICATION STATE
  // ============================================================
  const state = {
    isLoggedIn: false,
    currentUser: '',
    currentPage: 'dashboard',
    currentLang: 'en',
    patientData: null,
    homeCareChecklist: {},
    selectedFile: null,
    selectedFiles: [],
    activeDocumentPages: [],
    extractedData: null,
    medicineAlerts: [],
    doseLog: [],
    registeredMobile: '',
    smsProviderConfig: { configured: false, provider: 'none' },
    smsDeliveryLogs: [],
    alertSoundEnabled: true,
    browserNotifGranted: false,
    activeAlarmTimeout: null,
    currentActiveAlarmMed: null
  };

  // ============================================================
  // REALISTIC FICTIONAL SAMPLE PATIENT (SURESH, CB-DEMO-001)
  // Matching the bundled Sample Discharge Summary PDF exactly
  // ============================================================
  const SAMPLE_PATIENT = {
    patientName: 'Suresh',
    patientId: 'CB-DEMO-001',
    age: 55,
    gender: 'Male',
    admissionDate: '2026-10-05',
    dischargeDate: '2026-10-10',
    diagnosis: 'Post-Operative Recovery & Mild Hypertension (Clinical Recovery)',
    allergies: ['No known drug allergies (NKDA)'],
    medicines: [
      {
        name: 'Tab. Augmentin 625mg',
        dose: '625 mg',
        timing: 'Twice daily with meals (Morning & Night)',
        duration: '7 days',
        instructions: 'Take at start of meals with water. Consume curd or buttermilk.'
      },
      {
        name: 'Tab. Dolo 650mg (Paracetamol)',
        dose: '650 mg',
        timing: 'Three times a day as needed',
        duration: '5 days',
        instructions: 'Take after meals with warm water for pain/fever. Do not exceed prescribed dose.'
      },
      {
        name: 'Cap. Pan-40 (Pantoprazole)',
        dose: '40 mg',
        timing: 'Once daily in morning (Empty Stomach)',
        duration: '14 days',
        instructions: 'Take 30 minutes before breakfast with a glass of water.'
      },
      {
        name: 'Tab. Telma 40mg (Telmisartan)',
        dose: '40 mg',
        timing: 'Once daily in morning',
        duration: 'Ongoing recovery course',
        instructions: 'Maintain appropriate hydration and avoid potassium salt substitutes.'
      },
      {
        name: 'Tab. Rosuvas 10mg (Rosuvastatin)',
        dose: '10 mg',
        timing: 'At bedtime (Night)',
        duration: 'Ongoing recovery course',
        instructions: 'Take at night. Avoid grapefruit or grapefruit juice completely.'
      }
    ],
    dietInstructions: 'Fictional testing rules, not medical advice. Eat light digestible meals (steamed rice, oats, clear soups, steamed vegetables). Limit full-fat dairy, eggs, caffeine and sodium. Avoid deep-fried, heavily spiced foods, processed chips and alcohol.',
    dietPlan: {
      eat: [
        { food: 'Steamed Rice', reason: 'Light, easily digestible carbohydrate supporting smooth recovery.' },
        { food: 'Oatmeal', reason: 'High in soluble fibre, gentle on digestive system.' },
        { food: 'Clear Vegetable Soups', reason: 'Maintains electrolyte balance and promotes hydration.' },
        { food: 'Steamed Vegetables', reason: 'Provides micronutrients and vitamins without digestive strain.' },
        { food: 'Bananas (moderate)', reason: 'Good source of potassium; easy to digest in moderate portions.' }
      ],
      limit: [
        { food: 'Full-Fat Milk', reason: 'Heavy saturated fats; prefer low-fat or skimmed milk.' },
        { food: 'Eggs', reason: 'Limit to 1 boiled egg daily to moderate lipid intake.' },
        { food: 'Tea / Coffee', reason: 'Limit caffeine to 1 cup daily; avoid added sugar.' },
        { food: 'Table Salt', reason: 'Keep sodium intake low to support stable blood pressure during recovery.' }
      ],
      avoid: [
        { food: 'Deep-Fried Foods', reason: 'High in trans fats, irritates digestive tract and delays recovery.' },
        { food: 'Heavily Spiced Curries', reason: 'Can trigger gastric irritation and discomfort post-discharge.' },
        { food: 'Packaged Chips & Snacks', reason: 'Excessive sodium and preservatives conflict with home-care guidance.' },
        { food: 'Sugary Sodas & Drinks', reason: 'Rapid sugar spikes without nutritional benefit.' },
        { food: 'Alcohol', reason: 'Conflicts with recovery protocol and medication safety.' }
      ]
    },
    followUp: {
      date: '2026-10-18',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Jenkins, MD',
      department: 'Internal Medicine (Outpatient Clinic Room 302)',
      hospital: 'Metropolitan General Hospital',
      notes: 'Bring this discharge record and daily symptom journal. (Sample Follow-up Date)'
    },
    homeCare: [
      'Rest adequately and avoid strenuous physical exertion or heavy lifting (>5 kg) for 7 days.',
      'Maintain adequate hydration (drink 2 litres of water throughout the day unless restricted).',
      'Keep recovery site clean and dry; follow normal personal hygiene routine.',
      'Resume normal light daily activities gradually as comfort allows.'
    ],
    warningSignsUrgent: [
      'Sudden high fever (>101°F / 38.3°C) or severe chills',
      'Severe sharp chest pain or acute abdominal pain',
      'Sudden shortness of breath or difficulty breathing at rest',
      'Loss of consciousness, severe dizziness, or fainting'
    ],
    warningSigns: [
      'Persistent low-grade temperature not responding to rest',
      'Inability to tolerate oral fluids or food for over 24 hours',
      'New or worsening redness, swelling, or drainage around recovery site',
      'Persistent headache or unexplained lightheadedness'
    ]
  };

  // ============================================================
  // TRANSPARENT NUTRITION RULES ENGINE (FOR "CAN I EAT THIS?")
  // Calibrated for post-discharge recovery demo testing
  // ============================================================
  const FOOD_DATABASE = {
    // SUITABLE
    'rice': { verdict: 'suitable', explanation: 'Plain steamed rice is easily digestible and gentle on the stomach during recovery.', notes: 'Prefer plain or steamed preparations without heavy oils or ghee.' },
    'steamed rice': { verdict: 'suitable', explanation: 'Steamed white or brown rice is easily digestible and recommended for gentle post-discharge recovery.', notes: 'Consume in moderate portion sizes.' },
    'oatmeal': { verdict: 'suitable', explanation: 'Oatmeal is rich in soluble fibre, helps restore digestive rhythm, and provides sustained energy.', notes: 'Prepare with water or skimmed milk without excessive added sugar.' },
    'oats': { verdict: 'suitable', explanation: 'Oats are gentle on the digestive tract and provide healthy complex carbohydrates.', notes: 'Avoid heavily sweetened instant varieties.' },
    'soup': { verdict: 'suitable', explanation: 'Clear vegetable or light broth soups provide essential hydration and electrolytes.', notes: 'Keep salt low; avoid heavy cream or cornstarch thickeners.' },
    'vegetable soup': { verdict: 'suitable', explanation: 'Clear vegetable broth promotes hydration and supplies vitamins.', notes: 'Best consumed warm with light seasoning.' },
    'banana': { verdict: 'suitable', explanation: 'Bananas are easily digestible and provide potassium and dietary fibre.', notes: 'Limit to 1 ripe banana per day as part of a balanced diet.' },
    'bananas': { verdict: 'suitable', explanation: 'Bananas are easily digestible and provide potassium and dietary fibre.', notes: 'Limit to 1 ripe banana per day as part of a balanced diet.' },
    'steamed vegetables': { verdict: 'suitable', explanation: 'Steamed carrots, green beans, and zucchini are easily absorbed without digestive strain.', notes: 'Steam or boil lightly; avoid frying or heavy butter.' },
    'carrots': { verdict: 'suitable', explanation: 'Cooked carrots are soft, easily digested, and rich in beta-carotene.', notes: 'Prefer steamed or cooked over raw crunchy carrots during early recovery.' },
    'apple': { verdict: 'suitable', explanation: 'Applesauce or peeled stewed apples are very gentle on the stomach.', notes: 'Peeled or stewed is preferred during initial recovery.' },
    'khichdi': { verdict: 'suitable', explanation: 'Mild lentil and rice porridge (khichdi) is a standard, easily digestible convalescent food.', notes: 'Prepare with minimal oil or ghee and mild cumin seasoning.' },
    'toast': { verdict: 'suitable', explanation: 'Plain toasted bread is light and digestible for recovery.', notes: 'Avoid heavy butter or sugary jams.' },
    'water': { verdict: 'suitable', explanation: 'Water is essential for recovery, medication absorption, and renal clearance.', notes: 'Aim for 2 litres throughout the day unless fluids are restricted.' },

    // LIMIT
    'milk': { verdict: 'limit', explanation: 'Full-fat dairy milk contains heavier saturated fats that can be harder to digest during recovery.', notes: 'Choose low-fat or skimmed milk in moderation (1 cup/day).' },
    'dairy': { verdict: 'limit', explanation: 'Full-fat dairy products may cause bloating or slow digestion post-discharge.', notes: 'Switch to low-fat or probiotic alternatives.' },
    'eggs': { verdict: 'limit', explanation: 'Eggs are a good source of protein, but full yolks should be moderated to avoid digestive heaviness.', notes: 'Limit to 1 boiled or poached egg per day; avoid frying in oil.' },
    'egg': { verdict: 'limit', explanation: 'Eggs are a good protein source; limit to 1 boiled egg daily to moderate lipid intake.', notes: 'Boiled or poached is preferred over fried.' },
    'tea': { verdict: 'limit', explanation: 'Caffeine can stimulate stomach acid and mildly impact hydration.', notes: 'Limit to 1 small cup daily; do not add refined sugar.' },
    'coffee': { verdict: 'limit', explanation: 'Coffee has stimulant and acidic properties that can irritate the stomach lining.', notes: 'Limit to 1 cup daily; take after food, never on an empty stomach.' },
    'salt': { verdict: 'limit', explanation: 'High sodium intake can contribute to fluid retention and elevated blood pressure.', notes: 'Keep cooking salt minimal and avoid table shakers.' },
    'cheese': { verdict: 'limit', explanation: 'Processed or aged cheese is high in sodium and saturated fats.', notes: 'Consume small portions of fresh, low-fat paneer or cottage cheese if desired.' },
    'curd': { verdict: 'suitable', explanation: 'Low-fat plain curd/yogurt provides beneficial probiotics for gut recovery.', notes: 'Consume unsweetened low-fat curd.' },
    'yogurt': { verdict: 'suitable', explanation: 'Plain low-fat yogurt supports healthy digestive flora post-discharge.', notes: 'Choose unsweetened varieties.' },
    'potato': { verdict: 'limit', explanation: 'Potatoes are high in starchy carbohydrates; boiled potatoes are acceptable in moderation.', notes: 'Avoid fried potatoes, fries, or chips.' },
    'potatoes': { verdict: 'limit', explanation: 'Potatoes are high in starch; acceptable in small boiled portions.', notes: 'Avoid fried potatoes, fries, or chips.' },

    // AVOID
    'chips': { verdict: 'avoid', explanation: 'Packaged chips are deep-fried, heavily salted, and contain artificial preservatives that conflict with home recovery.', notes: 'Documented restriction: Avoid packaged chips and snacks.' },
    'potato chips': { verdict: 'avoid', explanation: 'Deep-fried chips are high in sodium and unhealthy fats, stressing the digestive system.', notes: 'Avoid completely during recovery.' },
    'fried food': { verdict: 'avoid', explanation: 'Deep-fried foods (pakoras, samosas, fries) are high in trans fats and can cause nausea and indigestion.', notes: 'Documented restriction: Strictly avoid all deep-fried foods.' },
    'samosa': { verdict: 'avoid', explanation: 'Deep-fried snacks made with refined flour and spices can trigger severe gastric irritation.', notes: 'Avoid completely.' },
    'pakora': { verdict: 'avoid', explanation: 'Deep-fried snacks delay stomach emptying and conflict with discharge instructions.', notes: 'Avoid completely.' },
    'spicy food': { verdict: 'avoid', explanation: 'Heavily spiced curries and hot chillies irritate the gastrointestinal mucosa.', notes: 'Documented restriction: Avoid heavily spiced curries.' },
    'curry': { verdict: 'avoid', explanation: 'Rich, oily, or heavily spiced curries can cause severe heartburn or gastrointestinal upset.', notes: 'Opt for mildly seasoned clear broths or steamed foods.' },
    'soda': { verdict: 'avoid', explanation: 'Sugary carbonated sodas cause rapid glucose spikes, gas, and abdominal distension.', notes: 'Documented restriction: Strictly avoid sugary sodas and drinks.' },
    'cold drink': { verdict: 'avoid', explanation: 'Commercial soft drinks contain high refined sugar and no nutritional value.', notes: 'Replace with water or clear broths.' },
    'alcohol': { verdict: 'avoid', explanation: 'Alcohol interferes with medication metabolism, delays tissue recovery, and dehydrates the body.', notes: 'Documented restriction: Strictly avoid all alcohol.' },
    'beer': { verdict: 'avoid', explanation: 'Alcoholic beverages conflict directly with prescribed recovery protocol.', notes: 'Avoid completely.' },
    'wine': { verdict: 'avoid', explanation: 'Alcoholic drinks interfere with medication clearance and delay recovery.', notes: 'Avoid completely.' },
    'sweets': { verdict: 'avoid', explanation: 'Concentrated Indian sweets (gulab jamun, jalebi) have excessive refined sugar and fats.', notes: 'Avoid completely during recovery.' },
    'sugar': { verdict: 'limit', explanation: 'Refined sugar can cause energy spikes and fluctuations.', notes: 'Minimize added sugars.' }
  };

  // ============================================================
  // MULTI-LANGUAGE SYSTEM (ENGLISH & TELUGU)
  // Full UI & Dynamic View Translation
  // ============================================================
  const I18N = {
    en: {
      langName: 'English',
      welcome: 'Welcome to CareBridge',
      subtitle: 'Your discharge instructions, organised for recovery at home.',
      menuDashboard: 'Dashboard',
      menuDischarge: 'Discharge Summary',
      menuMeds: 'Medicine Schedule',
      menuAlerts: 'Dosage Reminders',
      menuDiet: 'Personalised Diet Plan',
      menuFood: 'Can I Eat This?',
      menuFollowup: 'Follow-up & Recovery',
      menuWarnings: 'Warning Signs',
      careSheetTitle: '📥 Download Care Sheet',
      generatingPdf: '⏳ Generating PDF...',
      activeCarePlan: 'Active Care Plan',
      awaitingUpload: 'Awaiting Document Upload',
      secPatientInfo: 'Patient Information & Discharge Summary',
      secPrescribedMeds: 'Prescribed Medications & Schedule',
      secDietHomeCare: 'Diet & Daily Home Care Instructions',
      secEmergencyHelp: 'When to Seek Immediate Medical Help',
      secFollowupTitle: 'Follow-up & Recovery Milestones',
      dietEatTitle: 'Foods to Eat',
      dietLimitTitle: 'Foods to Limit',
      dietAvoidTitle: 'Foods to Avoid & Drug Warnings',
      lblPatientName: 'Patient Name:',
      lblPatientId: 'Patient ID:',
      lblAgeGender: 'Age / Gender:',
      lblDisDate: 'Discharge Date:',
      lblDiagnosis: 'Diagnosis:',
      lblAllergies: 'Known Allergies:',
      colMedName: 'Medication Name & Strength',
      colDose: 'Dosage',
      colTiming: 'Timing',
      colDuration: 'Duration',
      colInstructions: 'Special Instructions',
      btnTakeDose: 'Take Dose',
      btnSnooze: 'Snooze 15m',
      btnSearchFood: '🔍 Search Food',
      searchPlaceholder: 'Search 1,000+ foods (e.g., paneer, chicken, coconut water, papaya, samosa, oats, fish)...',
      searchVerdictSuitable: 'Suitable according to available information',
      searchVerdictLimit: 'Eat with caution or limit',
      searchVerdictAvoid: 'Avoid according to documented restrictions'
    },
    te: {
      langName: 'తెలుగు (Telugu)',
      welcome: 'CareBridge కి స్వాగతం',
      subtitle: 'ఇంటి వద్ద ఆరోగ్యంగా కోలుకోవడానికి మీ సమగ్ర డిశ్చార్జ్ మార్గదర్శిని.',
      menuDashboard: 'డాష్‌బోర్డ్',
      menuDischarge: 'డిశ్చార్జ్ సారాంశం',
      menuMeds: 'మందుల షెడ్యూల్',
      menuAlerts: 'మందుల రిమైండర్లు',
      menuDiet: 'వ్యక్తిగత ఆహార ప్రణాళిక',
      menuFood: 'నేను ఇది తినవచ్చా?',
      menuFollowup: 'ఫాలో-అప్ & కోలుకునే మార్గదర్శకాలు',
      menuWarnings: 'హెచ్చరిక సంకేతాలు',
      careSheetTitle: '📥 కేర్ షీట్ డౌన్‌లోడ్',
      generatingPdf: '⏳ PDF సిద్ధమవుతోంది...',
      activeCarePlan: 'యాక్టివ్ కేర్ ప్లాన్',
      awaitingUpload: 'డిశ్చార్జ్ పత్రం అప్‌లోడ్ చేయండి',
      secPatientInfo: 'రోగి వివరాలు & డిశ్చార్జ్ సారాంశం',
      secPrescribedMeds: 'సూచించిన మందుల వివరాలు & సమయ పట్టిక',
      secDietHomeCare: 'ఆహారం & రోజువారీ గృహ సంరక్షణ మార్గదర్శకాలు',
      secEmergencyHelp: 'తక్షణ అత్యవసర వైద్య సహాయం ఎప్పుడు పొందాలి',
      secFollowupTitle: 'తదుపరి డాక్టర్ అపాయింట్‌మెంట్ & రికవరీ పురోగతి',
      dietEatTitle: 'తినవలసిన మంచి ఆహారాలు',
      dietLimitTitle: 'పరిమితంగా తీసుకోవలసిన ఆహారాలు',
      dietAvoidTitle: 'తప్పక నివారించవలసిన ఆహారాలు & హెచ్చరికలు',
      lblPatientName: 'రోగి పేరు:',
      lblPatientId: 'రోగి ఐడి (ID):',
      lblAgeGender: 'వయస్సు / లింగం:',
      lblDisDate: 'డిశ్చార్జ్ తేదీ:',
      lblDiagnosis: 'రోగ నిర్ధారణ (Diagnosis):',
      lblAllergies: 'అలెర్జీ వివరాలు:',
      colMedName: 'మందు పేరు & మోతాదు',
      colDose: 'మోతాదు',
      colTiming: 'తీసుకోవాల్సిన సమయం',
      colDuration: 'వ్యవధి (రోజులు)',
      colInstructions: 'ప్రత్యేక సూచనలు',
      btnTakeDose: 'మందు తీసుకున్నాను',
      btnSnooze: '15 ని॥ వాయిదా',
      btnSearchFood: '🔍 ఆహారాన్ని వెతకండి',
      searchPlaceholder: 'ఆహారం లేదా పానీయం వెతకండి (ఉదా: పనీర్, చికెన్, కొబ్బరి నీళ్ళు, బొప్పాయి, సమోసా, ఓట్స్, చేపలు)...',
      searchVerdictSuitable: 'కోలుకోవడానికి అనుకూలమైన మంచి ఆహారం',
      searchVerdictLimit: 'పరిమిత పరిమాణంలో మాత్రమే తీసుకోవాలి',
      searchVerdictAvoid: 'కోలుకునే సమయంలో తప్పక నివారించాలి'
    }
  };
  // ============================================================
  // DOM UTILITY HELPERS
  // ============================================================
  function $(id) { return document.getElementById(id); }
  function $$(selector) { return document.querySelectorAll(selector); }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text || '';
  }

  function formatDate(str) {
    if (!str) return 'Not available in sample record.';
    if (typeof str !== 'string') return String(str);
    if (str.includes('day') || str.includes('TBD') || str.includes('Soon') || str.includes('Follow') || str.includes('Recently')) {
      return str;
    }
    const dmy = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
    if (dmy) {
      const d = new Date(parseInt(dmy[3], 10), parseInt(dmy[2], 10) - 1, parseInt(dmy[1], 10));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    }
    try {
      const d = new Date(str.includes('T') ? str : (str + 'T00:00:00'));
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    } catch(e) {}
    return str;
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function capitalise(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // ============================================================
  // NAVIGATION ROUTER
  // ============================================================
  function navigateTo(pageId) {
    // Hide all sections
    $$('.page-section').forEach(sec => {
      sec.classList.add('hidden');
    });

    const targetSec = $('page-' + pageId);
    if (targetSec) {
      targetSec.classList.remove('hidden');
      state.currentPage = pageId;

      // Update sidebar active highlights
      $$('.sidebar-menu-item').forEach(item => {
        if (item.getAttribute('data-page') === pageId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      if (pageId === 'medicines') {
        renderMedicineTable(state.patientData?.medicines || []);
      } else if (pageId === 'alerts') {
        renderMedicineAlerts();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile drawer if open
    const sidebar = $('sidebar');
    if (sidebar) sidebar.classList.remove('show-mobile');
  }

  // ============================================================
  // AUTHENTICATION (LOGIN & REGISTRATION)
  // Local storage cache + Server API support
  // ============================================================
  function getRegisteredUsers() {
    try {
      const stored = localStorage.getItem('carebridge_registered_users');
      return stored ? JSON.parse(stored) : [];
    } catch(e) {
      return [];
    }
  }

  function saveRegisteredUser(user) {
    try {
      const users = getRegisteredUsers();
      users.push(user);
      localStorage.setItem('carebridge_registered_users', JSON.stringify(users));
    } catch(e) {}
  }

  function saveCurrentPatientData() {
    if (!state.currentUser || !state.patientData) return;
    try {
      const u = state.currentUser.toLowerCase();
      localStorage.setItem('carebridge_patient_' + u, JSON.stringify(state.patientData));
      if (state.homeCareChecklist) {
        localStorage.setItem('carebridge_checklist_' + u, JSON.stringify(state.homeCareChecklist));
      }
      if (state.medicineAlerts && state.medicineAlerts.length > 0) {
        localStorage.setItem('carebridge_alerts_' + u, JSON.stringify(state.medicineAlerts));
      }
    } catch(e) {
      console.warn('Could not save patient data to localStorage:', e);
    }
  }

  function loadSavedPatientData(username) {
    if (!username) return null;
    try {
      const u = username.toLowerCase();
      const raw = localStorage.getItem('carebridge_patient_' + u);
      if (raw) {
        const data = JSON.parse(raw);
        // Automatically upgrade stale demo placeholder medicines to realistic clinical medications
        const hasDummyMeds = Array.isArray(data.medicines) && data.medicines.some(m => {
          const nm = (typeof m === 'string' ? m : (m?.name || '')).toLowerCase();
          return nm.includes('sample med') || nm.includes('demo tab') || nm.includes('demo cap') || nm.includes('demo susp');
        });
        if (hasDummyMeds || !data.medicines || data.medicines.length === 0) {
          data.medicines = JSON.parse(JSON.stringify(SAMPLE_PATIENT.medicines));
          data.dietPlan = generatePersonalizedDiet(data.diagnosis || SAMPLE_PATIENT.diagnosis, data.medicines, data.dietInstructions);
          savePatientData(u, data);
        }
        return data;
      }
    } catch(e) {
      console.warn('Could not load patient data from localStorage:', e);
    }
    return null;
  }

  function loadSavedUserData(username) {
    if (!username) return;
    try {
      const u = username.toLowerCase();
      const chk = localStorage.getItem('carebridge_checklist_' + u);
      if (chk) state.homeCareChecklist = JSON.parse(chk);
      const alt = localStorage.getItem('carebridge_alerts_' + u);
      if (alt) state.medicineAlerts = JSON.parse(alt);
    } catch(e) {}
  }


  function switchAuthTab(mode) {
    const tabLogin = $('tab-login');
    const tabRegister = $('tab-register');
    const paneLogin = $('login-pane');
    const paneRegister = $('register-pane');

    clearAuthAlert();

    if (mode === 'register') {
      tabLogin?.classList.remove('active');
      tabLogin?.setAttribute('aria-selected', 'false');
      tabRegister?.classList.add('active');
      tabRegister?.setAttribute('aria-selected', 'true');

      paneLogin?.classList.add('hidden');
      paneRegister?.classList.remove('hidden');
    } else {
      tabRegister?.classList.remove('active');
      tabRegister?.setAttribute('aria-selected', 'false');
      tabLogin?.classList.add('active');
      tabLogin?.setAttribute('aria-selected', 'true');

      paneRegister?.classList.add('hidden');
      paneLogin?.classList.remove('hidden');
    }
  }

  function createCleanPatientRecord(patientName, patientId, age, gender) {
    return {
      patientName: patientName || 'Patient',
      patientId: patientId || 'CB-PENDING',
      age: age ? parseInt(age, 10) : null,
      gender: gender || 'Not Specified',
      admissionDate: '',
      dischargeDate: '',
      hospital: '',
      doctor: '',
      diagnosis: '',
      reasonForAdmission: '',
      surgeryDetails: '',
      dischargeCondition: '',
      dietInstructions: '',
      allergies: [],
      medicines: [],
      dietPlan: null,
      followUp: null,
      homeCare: [],
      warningSigns: [],
      isCleanNewPatient: true
    };
  }

  function handleLogin(username, password) {
    username = (username || '').trim();
    password = password || '';

    // Check default demo account
    if (username.toLowerCase() === 'patient' && password === 'CareBridge123') {
      state.isLoggedIn = true;
      state.currentUser = 'patient';
      const saved = loadSavedPatientData('patient');
      state.patientData = saved ? saved : JSON.parse(JSON.stringify(SAMPLE_PATIENT));
      loadSavedUserData('patient');
      showApp();
      return;
    }

    // Check locally registered accounts in browser
    const localUsers = getRegisteredUsers();
    const matchedLocal = localUsers.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (matchedLocal) {
      state.isLoggedIn = true;
      state.currentUser = matchedLocal.username.toLowerCase();
      const saved = loadSavedPatientData(state.currentUser);
      if (saved) {
        state.patientData = saved;
      } else {
        const userPatient = createCleanPatientRecord(
          matchedLocal.fullName,
          matchedLocal.patientId,
          matchedLocal.age,
          matchedLocal.gender
        );
        state.patientData = userPatient;
        saveCurrentPatientData();
      }
      loadSavedUserData(state.currentUser);
      showApp();
      return;
    }

    // Check with server if available
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        state.isLoggedIn = true;
        state.currentUser = username.toLowerCase();
        const saved = loadSavedPatientData(state.currentUser);
        if (saved) {
          state.patientData = saved;
        } else {
          const userPatient = createCleanPatientRecord(
            result.user?.name || username,
            result.user?.patientId,
            result.user?.age,
            result.user?.gender
          );
          state.patientData = userPatient;
          saveCurrentPatientData();
        }
        loadSavedUserData(state.currentUser);
        showApp();
      } else {
        showAuthAlert('danger', result.message || 'Invalid credentials. Please verify your details or use the demo account.');
      }
    })
    .catch(() => {
      showAuthAlert('danger', 'Invalid credentials. Use demo account (patient / CareBridge123) or register a new patient.');
    });
  }

  function handleRegistration(formData) {
    const { fullName, username, password, age, gender } = formData;

    const cleanFullName = (fullName || '').trim();
    const cleanUsername = (username || '').trim();
    const cleanPassword = password || '';

    if (!cleanFullName || !cleanUsername || !cleanPassword) {
      showAuthAlert('danger', 'Full Name, Username, and Password are required.');
      return;
    }

    // Check existing in local storage (clean duplicate usernames safely)
    const localUsers = getRegisteredUsers();
    const isTaken = localUsers.some(u => (u.username || '').toLowerCase() === cleanUsername.toLowerCase()) || cleanUsername.toLowerCase() === 'patient';
    if (isTaken) {
      showAuthAlert('danger', `Username "${cleanUsername}" is already taken. Please choose a different username.`);
      return;
    }

    const randomId = `CB-REG-${Math.floor(100 + Math.random() * 900)}`;
    const newUser = {
      fullName,
      username,
      password,
      patientId: randomId,
      age: age ? parseInt(age, 10) : 45,
      gender: gender || 'Female'
    };

    // Save locally
    saveRegisteredUser(newUser);

    // Also attempt server sync if running
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    }).catch(() => {});

    // Log the new user in immediately with their own fresh record
    state.isLoggedIn = true;
    state.currentUser = newUser.username.toLowerCase();
    const userPatient = createCleanPatientRecord(
      newUser.fullName,
      newUser.patientId,
      newUser.age,
      newUser.gender
    );
    state.patientData = userPatient;
    saveCurrentPatientData();

    showApp();
  }

  function initBackendUrlConfig() {
    const toggleBackendBtn = $('toggle-backend-config');
    const backendBox = $('backend-config-box');
    const customApiInput = $('custom-api-input');
    const saveCustomApiBtn = $('btn-save-custom-api');
    const backendStatusMsg = $('backend-status-msg');

    if (customApiInput) {
      customApiInput.value = localStorage.getItem('carebridge_api_url') || '';
    }

    if (toggleBackendBtn && backendBox) {
      toggleBackendBtn.onclick = (e) => {
        e.preventDefault();
        backendBox.classList.toggle('hidden');
      };
    }

    if (saveCustomApiBtn && customApiInput) {
      saveCustomApiBtn.onclick = () => {
        const val = customApiInput.value.trim().replace(/\/+$/, '');
        if (val) {
          localStorage.setItem('carebridge_api_url', val);
          if (backendStatusMsg) backendStatusMsg.textContent = '✅ Connected to: ' + val;
        } else {
          localStorage.removeItem('carebridge_api_url');
          if (backendStatusMsg) backendStatusMsg.textContent = 'Using default /api proxy';
        }
      };
    }
  }

  function handleDemoLogin() {
    const u = $('login-username');
    const p = $('login-password');
    if (u) u.value = 'patient';
    if (p) p.value = 'CareBridge123';
    setTimeout(() => {
      handleLogin('patient', 'CareBridge123');
    }, 150);
  }

  function showApp() {
    const loginPage = $('login-page');
    const appContainer = $('app-container');

    if (loginPage) {
      loginPage.classList.add('hidden');
      loginPage.style.display = 'none';
    }
    if (appContainer) {
      appContainer.classList.remove('hidden');
      appContainer.style.display = 'flex';
    }

    try {
      renderAllViews();
    } catch (err) {
      console.warn('Error during renderAllViews:', err);
    }

    try {
      navigateTo('dashboard');
    } catch (err) {
      console.warn('Error during navigateTo dashboard:', err);
    }
  }

  function handleLogout() {
    saveCurrentPatientData();
    state.isLoggedIn = false;
    state.patientData = null;
    state.currentUser = '';
    state.currentPage = 'dashboard';
    state.selectedFile = null;
    state.extractedData = null;

    const appContainer = $('app-container');
    const loginPage = $('login-page');

    if (appContainer) {
      appContainer.classList.add('hidden');
      appContainer.style.display = 'none';
    }
    if (loginPage) {
      loginPage.classList.remove('hidden');
      loginPage.style.display = 'flex';
    }

    const u = $('login-username');
    const p = $('login-password');
    if (u) u.value = '';
    if (p) p.value = '';

    const regU = $('reg-username');
    const regP = $('reg-password');
    const regF = $('reg-fullname');
    if (regU) regU.value = '';
    if (regP) regP.value = '';
    if (regF) regF.value = '';

    switchAuthTab('login');
    clearAuthAlert();
  }

  function showAuthAlert(type, msg) {
    const el = $('auth-alert');
    if (el) {
      el.className = `alert alert-${type}`;
      el.textContent = msg;
      el.classList.remove('hidden');
    }
  }

  function clearAuthAlert() {
    const el = $('auth-alert');
    if (el) el.classList.add('hidden');
  }

  // ============================================================
  // RENDER COMPLETE PATIENT VIEWS
  // ============================================================
  function renderAllViews() {
    const p = state.patientData;

    if (!p) {
      // Clean Initial State: Before Document Upload
      setText('header-patient-name', 'No Active Record');
      setText('header-patient-id', 'Upload Required');
      const avatarEl = $('header-avatar-circle');
      if (avatarEl) avatarEl.textContent = '?';

      // Dashboard Hero Card
      setText('dash-patient-name', 'No Active Record');
      setText('dash-patient-id', 'Pending Upload');
      setText('dash-patient-age', '--');
      setText('dash-discharge-date', '--');
      setText('dash-diagnosis', 'No discharge summary uploaded yet. Choose a document above to process with OCR.');
      setText('dash-allergies', '--');
      const dashBadge = $('dash-status-badge');
      if (dashBadge) {
        dashBadge.textContent = 'Awaiting Document Upload';
        dashBadge.className = 'badge badge-secondary';
      }

      // Dashboard Summary Cards
      setText('dash-sum-discharge', 'Pending Upload');
      setText('dash-sum-medicine', 'No Prescriptions');
      setText('dash-sum-diet', 'Pending Diagnosis');
      setText('dash-sum-followup', 'No Appointment');

      // Active Discharge Summary Record
      setText('rec-patient-name', 'No Document Uploaded');
      setText('rec-patient-id', 'Pending Upload');
      setText('rec-patient-age', '--');
      setText('rec-patient-gender', '--');
      setText('rec-patient-ward', '--');
      setText('rec-adm-date', '--');
      setText('rec-dis-date', '--');
      setText('rec-hospital-address', '--');
      setText('rec-diagnosis', 'No active discharge summary uploaded. Please choose and process an image or document above to populate clinical details.');
      setText('rec-doctor', '--');
      setText('rec-complaints', 'Awaiting document processing...');
      setText('rec-surgery', '--');
      setText('rec-vitals', '--');
      setText('rec-diet', '--');
      setText('rec-activity', '--');
      setText('rec-followup', '--');
      setText('rec-warnings', '--');
      const recBadge = $('rec-status-badge');
      if (recBadge) {
        recBadge.textContent = 'Awaiting Document Upload';
        recBadge.className = 'badge badge-secondary';
      }

      // Empty states for Medicine Table, Alerts, and Diet Plan
      renderMedicineTable([]);
      renderMedicineAlerts();
      renderDietPlan({
        conditionName: "Awaiting Discharge Summary Upload",
        description: "Upload your hospital discharge summary above. CareBridge will automatically analyze your diagnosis across 60+ diseases and tailor specific foods to eat, limit, and avoid.",
        medicationRemedies: [],
        eat: [
          { food: "Awaiting Clinical Analysis", reason: "Specific foods to eat will be recommended based on your verified diagnosis." }
        ],
        limit: [
          { food: "Awaiting Clinical Analysis", reason: "Food restrictions will be calibrated to your active medical condition." }
        ],
        avoid: [
          { food: "Awaiting Clinical Analysis", reason: "Dangerous drug-food interactions will be checked once medications are scanned." }
        ]
      });
      return;
    }

    // Active Record Loaded
    const avatarEl = $('header-avatar-circle');
    if (avatarEl && p.patientName) {
      avatarEl.textContent = p.patientName.charAt(0).toUpperCase();
    }
    const dashBadge = $('dash-status-badge');
    if (dashBadge) {
      dashBadge.textContent = 'Active Care Plan';
      dashBadge.className = 'badge badge-teal';
    }
    const recBadge = $('rec-status-badge');
    if (recBadge) {
      recBadge.textContent = 'Active in CareBridge';
      recBadge.className = 'badge badge-success';
    }

    // Header Profile
    setText('header-patient-name', p.patientName || 'Patient');
    setText('header-patient-id', p.patientId || 'N/A');

    // Dashboard Hero Card
    setText('dash-patient-name', p.patientName || 'Patient');
    setText('dash-patient-id', p.patientId || 'N/A');
    setText('dash-patient-age', p.age ? (String(p.age).includes('Yr') ? p.age : `${p.age} Yrs (${p.gender || 'N/A'})`) : 'N/A');
    setText('dash-discharge-date', formatDate(p.dischargeDate));
    setText('dash-diagnosis', p.diagnosis || 'Clinical evaluation and recovery.');
    setText('dash-allergies', Array.isArray(p.allergies) ? p.allergies.join(', ') : (p.allergies || 'None documented'));

    // Dashboard Summary Cards
    setText('dash-sum-discharge', p.hospital || 'Verified Hospital');
    if (p.medicines && p.medicines.length > 0) {
      setText('dash-sum-medicine', `${p.medicines[0].name} (${p.medicines.length} prescribed)`);
    } else {
      setText('dash-sum-medicine', 'Consult physician at follow-up.');
    }
    setText('dash-sum-diet', p.diagnosis ? `Tailored for ${p.diagnosis.split(' ')[0]}` : 'Clinical Protocol');
    if (p.followUp && p.followUp.date) {
      setText('dash-sum-followup', `${formatDate(p.followUp.date)} (${p.followUp.doctor || 'Clinic'})`);
    } else {
      setText('dash-sum-followup', 'Follow-up as advised.');
    }

    // Active Discharge Summary Record
    updateActiveDischargeRecord(p);

    // Medicine Schedule Table
    renderMedicineTable(p.medicines || []);

    // Diet Plan
    if (!p.diagnosis && (!p.medicines || p.medicines.length === 0)) {
      renderDietPlan({
        conditionName: "Awaiting Discharge Summary Upload",
        description: "Upload your hospital discharge summary above. CareBridge will automatically analyze your diagnosis across 270+ conditions and tailor specific foods to eat, limit, and avoid.",
        medicationRemedies: [],
        eat: [
          { food: "Awaiting Clinical Analysis", reason: "Specific foods to eat will be recommended based on your verified diagnosis." }
        ],
        limit: [
          { food: "Awaiting Clinical Analysis", reason: "Food restrictions will be calibrated to your active medical condition." }
        ],
        avoid: [
          { food: "Awaiting Clinical Analysis", reason: "Dangerous drug-food interactions will be checked once medications are scanned." }
        ]
      });
    } else {
      if (!p.dietPlan || !p.dietPlan.conditionName || !Array.isArray(p.dietPlan.medicationRemedies) || p.dietPlan.medicationRemedies.length === 0) {
        p.dietPlan = generatePersonalizedDiet(p.diagnosis, p.medicines, p.dietInstructions);
      } else {
        p.dietPlan.medicationRemedies = evaluateMedicationRemedies(p.medicines || []);
      }
      renderDietPlan(p.dietPlan);
    }

    // Follow-up & Checklist
    renderFollowupAndChecklist(p);

    // Warning Signs
    renderWarningSigns(p);

    // Medicine Alerts & Reminders
    if (!state.medicineAlerts || state.medicineAlerts.length === 0) {
      initMedicineAlerts();
    }
    renderMedicineAlerts();
  }



    // ============================================================
  // TELUGU TRANSLATION ENGINE (PURE TELUGU LOCALISATION)
  // Clean medical and nutritional Telugu without mixed clutter
  // ============================================================

  const TELUGU_FOOD_MAP = [
    [new RegExp('moong\\s*dal\\s*khichdi', 'i'), 'పెసరపప్పు కిచిడీ'],
    [new RegExp('boiled\\s*(?:white\\s*\/\\s*brown\\s*)?rice', 'i'), 'ఉడికించిన అన్నం'],
    [new RegExp('steamed\\s*rice', 'i'), 'ఉడికించిన అన్నం'],
    [new RegExp('plain\\s*toast\\s*(?:\/\\s*rusk)?', 'i'), 'ప్లెయిన్ టోస్ట్ బ్రెడ్ / రస్క్'],
    [new RegExp('toast', 'i'), 'టోస్ట్ బ్రెడ్'],
    [new RegExp('crackers', 'i'), 'బిస్కెట్లు'],
    [new RegExp('light\\s*crackers', 'i'), 'తేలికపాటి బిస్కెట్లు'],
    [new RegExp('ripe\\s*bananas?', 'i'), 'బాగా పండిన అరటిపండ్లు'],
    [new RegExp('bananas?', 'i'), 'అరటిపండ్లు'],
    [new RegExp('apple\\s*stew', 'i'), 'ఉడికించిన యాపిల్ పండు'],
    [new RegExp('apples?', 'i'), 'యాపిల్స్'],
    [new RegExp('steamed\\s*(?:lauki\\s*\\(?bottle\\s*gourd\\)?|bottle\\s*gourd)\\s*(?:&|and)?\\s*turai', 'i'), 'ఉడికించిన సొరకాయ మరియు బీరకాయ'],
    [new RegExp('bottle\\s*gourd', 'i'), 'సొరకాయ'],
    [new RegExp('ridge\\s*gourd', 'i'), 'బీరకాయ'],
    [new RegExp('bitter\\s*gourd', 'i'), 'కాకరకాయ'],
    [new RegExp('steamed\\s*pumpkin\\s*(?:\\(?kaddu\\)?\\s*)?(?:&|and)?\\s*carrots?', 'i'), 'ఉడికించిన గుమ్మడికాయ మరియు క్యారెట్లు'],
    [new RegExp('steamed\\s*squash\\s*(?:&|and)?\\s*carrots?', 'i'), 'ఉడికించిన గుమ్మడికాయ మరియు క్యారెట్లు'],
    [new RegExp('carrots?', 'i'), 'క్యారెట్లు'],
    [new RegExp('fresh\\s*(?:homemade\\s*)?(?:curd|dahi|yogurt)', 'i'), 'తాజా పెరుగు'],
    [new RegExp('curd|yogurt', 'i'), 'పెరుగు'],
    [new RegExp('chaas|buttermilk', 'i'), 'తాజా మజ్జిగ'],
    [new RegExp('dalia\\s*\\(?broken\\s*wheat\\s*porridge\\)?|dalia|broken\\s*wheat', 'i'), 'గోధుమ రవ్వ జావ / ఉప్మా'],
    [new RegExp('oatmeal\\s*(?:&|and)?\\s*oat\\s*bran', 'i'), 'ఓట్స్ మరియు ఓట్స్ ఊక'],
    [new RegExp('warm\\s*oatmeal\\s*(?:&|and)?\\s*soothing\\s*bananas', 'i'), 'గోరువెచ్చని ఓట్స్ మరియు అరటిపండ్లు'],
    [new RegExp('oatmeal|oats', 'i'), 'ఓట్స్ అంబలి'],
    [new RegExp('poha', 'i'), 'అటుకులు'],
    [new RegExp('clear\\s*moong\\s*dal\\s*soup\\s*(?:&|and)?\\s*vegetable\\s*shorba', 'i'), 'తేలికపాటి పెసరపప్పు సూప్ మరియు కూరగాయల చారు'],
    [new RegExp('clear\\s*garlic-ginger\\s*vegetable\\s*broth', 'i'), 'వెల్లుల్లి-అల్లం కూరగాయల చారు'],
    [new RegExp('clear\\s*vegetable\\s*broth|vegetable\\s*soup', 'i'), 'కూరగాయల సూప్ / చారు'],
    [new RegExp('fresh\\s*soft\\s*paneer\\s*\\(?cottage\\s*cheese\\)?|fresh\\s*soft\\s*paneer|paneer', 'i'), 'తాజా మెత్తని పనీర్'],
    [new RegExp('boiled\\s*egg\\s*whites?', 'i'), 'ఉడికించిన గుడ్డు తెల్లసొన'],
    [new RegExp('eggs?\\s*\\(limit\\s*to\\s*boiled\\s*egg\\s*whites?\\)', 'i'), 'ఉడికించిన గుడ్డు తెల్లసొన మాత్రమే'],
    [new RegExp('tender\\s*coconut\\s*water', 'i'), 'లేత కొబ్బరి నీళ్ళు'],
    [new RegExp('coconut\\s*water', 'i'), 'కొబ్బరి నీళ్ళు'],
    [new RegExp('warm\\s*water\\s*with\\s*roasted\\s*cumin', 'i'), 'జీలకర్ర వేసిన గోరువెచ్చని నీరు'],
    [new RegExp('adequate\\s*plain\\s*warm\\s*water', 'i'), 'సరిపడా గోరువెచ్చని నీళ్ళు'],
    [new RegExp('water|fluids', 'i'), 'మంచి నీళ్ళు'],
    [new RegExp('diluted\\s*lemon\\s*water', 'i'), 'తేలికపాటి నిమ్మరసం నీళ్ళు'],
    [new RegExp('oral\\s*rehydration\\s*solution|ors', 'i'), 'ఓ.ఆర్.ఎస్ (ORS) ద్రావణం'],
    [new RegExp('pomegranate\\s*(?:&|and)?\\s*berries', 'i'), 'దానిమ్మ మరియు తాజా పండ్లు'],
    [new RegExp('pomegranate', 'i'), 'దానిమ్మ పండు'],
    [new RegExp('papaya', 'i'), 'బొప్పాయి పండు'],
    [new RegExp('guava', 'i'), 'జామపండు'],
    [new RegExp('flaxseeds\\s*(?:&|and)?\\s*chia\\s*seeds', 'i'), 'అవిసె గింజలు మరియు సబ్జా గింజలు'],
    [new RegExp('flaxseeds', 'i'), 'అవిసె గింజలు'],
    [new RegExp('chia\\s*seeds|basil\\s*seeds', 'i'), 'సబ్జా గింజలు'],
    [new RegExp('spinach', 'i'), 'పాలకూర'],
    [new RegExp('moong\\s*dal', 'i'), 'పెసరపప్పు'],
    [new RegExp('masoor\\s*dal', 'i'), 'ఎర్ర కందిపప్పు'],
    [new RegExp('lentils|dals?\\s*(?:&|and)?\\s*pulses', 'i'), 'పప్పు ధాన్యాలు (పెసరపప్పు, కందిపప్పు)'],
    [new RegExp('whole\\s*wheat\\s*roti', 'i'), 'మెత్తని గోధుమ రొట్టె'],
    [new RegExp('skimmed\\s*milk|low-fat\\s*milk', 'i'), 'తక్కువ కొవ్వు గల పాలు'],
    [new RegExp('milk', 'i'), 'పాలు'],
    [new RegExp('deep-fried\\s*snacks\\s*\\(samosas?,\\s*pakoras?,\\s*vada\\)', 'i'), 'నూనె వేపుడు పదార్థాలు (సమోసాలు, పకోడీలు, వడలు)'],
    [new RegExp('red\\s*meat,\\s*mutton\\s*(?:&|and)?\\s*organ\\s*meats?', 'i'), 'రెడ్ మీట్, మటన్ మరియు నాన్-వెజ్ వేపుళ్ళు'],
    [new RegExp('pickles?,\\s*papads?\\s*(?:&|and)?\\s*salt-cured\\s*items', 'i'), 'ఊరగాయలు, అప్పడాలు మరియు నిల్వ పచ్చళ్ళు'],
    [new RegExp('table\\s*salt\\s*(?:&|and)?\\s*cooking\\s*salt|excess\\s*salt', 'i'), 'వంట ఉప్పు మరియు అదనపు ఉప్పు'],
    [new RegExp('bakery\\s*pastries?\\s*(?:&|and)?\\s*commercial\\s*ghee\\s*sweets?', 'i'), 'బేకరీ పేస్ట్రీలు మరియు స్వీట్లు'],
    [new RegExp('alcohol\\s*(?:&|and)?\\s*aerated\\s*sodas?', 'i'), 'మద్యపానం మరియు కూల్ డ్రింక్స్'],
    [new RegExp('alcohol', 'i'), 'మద్యపానం'],
    [new RegExp('tea\\s*\\/\\s*coffee|coffee|tea', 'i'), 'టీ / కాఫీ'],
    [new RegExp('potassium\\s*salt\\s*substitutes\\s*\\(lite\\s*salt\\s*\\/\\s*nosalt\\)', 'i'), 'పొటాషియం ఆధారిత ఉప్పు ప్రత్యామ్నాయాలు (లైట్ సాల్ట్)'],
    [new RegExp('grapefruit\\s*(?:&|and)?\\s*grapefruit\\s*juice', 'i'), 'గ్రేప్‌ఫ్రూట్ (పంపరపనస) మరియు దాని రసం'],
    [new RegExp('overeating', 'i'), 'అధికంగా తినడం'],
    [new RegExp('heavy\\s*oily\\s*foods', 'i'), 'నూనె మరియు వేపుడు పదార్థాలు'],
    [new RegExp('hot\\s*spices|sour\\s*citrus\\s*juices', 'i'), 'కారం, మసాలాలు మరియు పుల్లని రసాలు'],

    // Clinical Enriched Items
    [new RegExp('methi\\s*\\(?fenugreek\\)?\\s*water\\s*(?:&|and)?\\s*methi\\s*paratha', 'i'), 'మెంతుల నీళ్ళు మరియు మెంతి పరోటా'],
    [new RegExp('methi\\s*\\(?fenugreek\\)?\\s*seed\\s*water', 'i'), 'మెంతుల నీళ్ళు'],
    [new RegExp('gond\\s*(?:&|and)?\\s*dry\\s*fruit', 'i'), 'గోండ్ మరియు డ్రై ఫ్రూట్ లడ్డూ / హల్వా'],
    [new RegExp('ragi\\s*\\(?finger\\s*millet\\)?\\s*(?:porridge|ambali|dosa|mudde)', 'i'), 'రాగి జావ / రాగి అంబలి / రాగి రొట్టె'],
    [new RegExp('ragi\\s*\\(?finger\\s*millet\\)?', 'i'), 'రాగి జావ'],
    [new RegExp('moringa\\s*\\(?drumstick\\)?\\s*leaf\\s*soup', 'i'), 'మునగాకు సూప్ / రసం'],
    [new RegExp('moringa\\s*\\(?drumstick\\)?', 'i'), 'మునగాకు / మునక్కాయలు'],
    [new RegExp('garlic\\s*dal\\s*(?:&|and)?\\s*garlic\\s*infused\\s*cow\'?s\\s*milk', 'i'), 'వెల్లుల్లి పప్పు మరియు వెల్లుల్లి పాలు'],
    [new RegExp('garlic\\s*infused\\s*warm\\s*water', 'i'), 'వెల్లుల్లి వేసిన గోరువెచ్చని నీరు'],
    [new RegExp('crushed\\s*raw\\s*garlic', 'i'), 'వెల్లుల్లి రెబ్బలు'],
    [new RegExp('garlic', 'i'), 'వెల్లుల్లి'],
    [new RegExp('soaked\\s*almonds\\s*(?:&|and)?\\s*walnuts', 'i'), 'నానబెట్టిన బాదం మరియు అక్రూట్లు (వాల్‌నట్స్)'],
    [new RegExp('soaked\\s*(?:&|and)?\\s*peeled\\s*almonds|soaked\\s*almonds', 'i'), 'నానబెట్టిన బాదం పప్పులు'],
    [new RegExp('walnuts', 'i'), 'అక్రూట్లు (వాల్‌నట్స్)'],
    [new RegExp('warm\\s*saunf\\s*\\(?fennel\\)?\\s*(?:&|and)?\\s*ajwain\\s*water', 'i'), 'సోంపు మరియు వాము వేసిన గోరువెచ్చని నీళ్ళు'],
    [new RegExp('fennel\\s*\\(?saunf\\)?\\s*(?:&|and)?\\s*cumin\\s*\\(?jeera\\)?\\s*water', 'i'), 'సోంపు మరియు జీలకర్ర నీళ్ళు'],
    [new RegExp('karela\\s*\\(?bitter\\s*gourd\\)?\\s*juice', 'i'), 'కాకరకాయ రసం'],
    [new RegExp('karela', 'i'), 'కాకరకాయ'],
    [new RegExp('jamun\\s*\\(?indian\\s*blackberry\\)?\\s*(?:&|and)?\\s*guava', 'i'), 'నేరేడు పండ్లు మరియు జామపండ్లు'],
    [new RegExp('jamun', 'i'), 'నేరేడు పండ్లు'],
    [new RegExp('jowar,\\s*bajra\\s*(?:&|and)?\\s*ragi\\s*multi-millet\\s*rotis', 'i'), 'జొన్న, సజ్జ మరియు రాగి రొట్టెలు'],
    [new RegExp('sprouted\\s*green\\s*moong\\s*(?:&|and)?\\s*kala\\s*chana', 'i'), 'మొలకెత్తిన పెసలు మరియు నల్ల శనగలు'],
    [new RegExp('sprouted\\s*green\\s*moong', 'i'), 'మొలకెత్తిన పెసలు'],
    [new RegExp('cinnamon\\s*\\(?dalchini\\)?\\s*infused\\s*warm\\s*water', 'i'), 'దాల్చిన చెక్క వేసిన గోరువెచ్చని నీరు'],
    [new RegExp('barley\\s*water\\s*\\(?jau\\s*ka\\s*pani\\)?', 'i'), 'బార్లీ నీళ్ళు'],
    [new RegExp('papaya\\s*leaf\\s*extract', 'i'), 'బొప్పాయి ఆకు రసం'],
    [new RegExp('haldi\\s*doodh|golden\\s*turmeric\\s*milk', 'i'), 'పసుపు, మిరియాలు వేసిన గోరువెచ్చని పాలు'],
    [new RegExp('ginger,\\s*tulsi\\s*(?:&|and)?\\s*clove\\s*herbal\\s*kashayam', 'i'), 'అల్లం, తులసి మరియు లవంగాల కషాయం'],
    [new RegExp('tulsi\\s*(?:&|and)?\\s*fresh\\s*ginger\\s*herbal\\s*tea', 'i'), 'తులసి మరియు అల్లం హెర్బల్ టీ'],
    [new RegExp('amla\\s*\\(?indian\\s*gooseberry\\)?\\s*juice', 'i'), 'ఉసిరికాయ రసం'],
    [new RegExp('amla', 'i'), 'ఉసిరికాయ'],
    [new RegExp('diluted\\s*mosambi\\s*\\(?sweet\\s*lime\\)?\\s*juice', 'i'), 'తేలికపాటి బత్తాయి రసం'],
    [new RegExp('unsweetened\\s*cranberry\\s*juice', 'i'), 'తీపి లేని క్రాన్‌బెర్రీ రసం'],
    [new RegExp('fresh\\s*pomegranate\\s*\\(?anar\\)?\\s*(?:&|and)?\\s*black\\s*raisins', 'i'), 'తాజా దానిమ్మ మరియు నల్ల ఎండుద్రాక్ష'],
    [new RegExp('fresh\\s*dates\\s*\\(?khajoor\\)?\\s*(?:&|and)?\\s*dried\\s*figs', 'i'), 'తాజా ఖర్జూరాలు మరియు అంజీర పండ్లు'],
    [new RegExp('white\\s*sugar,\\s*jaggery\\s*\\(?gur\\)?', 'i'), 'తెల్ల పంచదార, బెల్లం మరియు తేనె'],
    [new RegExp('indian\\s*sweets\\s*\\(gulab\\s*jamun', 'i'), 'స్వీట్లు (గులాబ్ జామూన్, లడ్డూ, హల్వా)'],
    [new RegExp('potassium\\s*salt\\s*substitutes', 'i'), 'పొటాషియం ఉప్పు ప్రత్యామ్నాయాలు (Lite Salt / Lona Salt - ప్రమాదకరం)'],
    [new RegExp('grapefruit\\s*(?:&|and)?\\s*fresh\\s*grapefruit\\s*juice', 'i'), 'గ్రేప్‌ఫ్రూట్ (పంపరపనస) పండు మరియు రసం'],
    [new RegExp('high-oxalate\\s*foods', 'i'), 'అధిక ఆక్సలేట్ ఆహారాలు (పాలకూర, బీట్‌రూట్, టమాటాలు)'],
    [new RegExp('deep-fried\\s*snacks\\s*\\(samosa', 'i'), 'నూనెలో వేయించిన చిరుతిళ్ళు (సమోసా, పకోడీ, మురుకులు)'],
    [new RegExp('hot\\s*red\\s*chili\\s*powder', 'i'), 'ఎర్ర కారం పొడి మరియు పచ్చి మిరపకాయలు'],
    [new RegExp('carbonated\\s*sodas\\s*(?:&|and)?\\s*sparkling\\s*water', 'i'), 'సోడాలు, కూల్‌డ్రింక్స్ మరియు కార్బోనేటెడ్ వాటర్'],
    [new RegExp('aspirin\\s*(?:&|and)?\\s*nsaid-containing', 'i'), 'ఆస్పిరిన్ మరియు నొప్పి నివారణ మందులు (రక్తస్రావ ప్రమాదం)'],
    [new RegExp('high-purine\\s*foods', 'i'), 'హై ప్యూరిన్ మాంసాహారం (మటన్, సార్డైన్లు - గౌట్ రోగులకు ప్రమాదం)'],
    [new RegExp('ice-cold\\s*water', 'i'), 'చల్లటి ఫ్రిజ్ నీళ్ళు మరియు ఐస్ డ్రింక్స్'],
    [new RegExp('natural\\s*table\\s*salt', 'i'), 'వంట ఉప్పు (రోజుకు 1/2 చెంచా కన్నా తక్కువగా)']
  ];

  function translateFoodToTelugu(text) {
    if (!text || typeof text !== 'string') return text;
    let s = text;
    for (let i = 0; i < TELUGU_FOOD_MAP.length; i++) {
      const [re, rep] = TELUGU_FOOD_MAP[i];
      if (re.test(s)) {
        s = s.replace(re, rep);
      }
    }
    return s;
  }

  const TELUGU_REASON_MAP = [
    [new RegExp('Light, easily digestible protein and carbohydrate blend gentle on the stomach', 'i'), 'కడుపుకు సున్నితంగా ఉంటూ తేలికగా జీర్ణమయ్యే మంచి ప్రొటీన్ మరియు కార్బోహైడ్రేట్లు అందిస్తుంది.'],
    [new RegExp('Clean, easily absorbed energy without gastrointestinal strain', 'i'), 'జీర్ణవ్యవస్థపై భారం లేకుండా తేలికగా శరీరానికి శక్తినందిస్తుంది.'],
    [new RegExp('High water content and cooling properties that soothe the digestive tract', 'i'), 'అధిక నీటి శాతం మరియు చలువ చేసే గుణం వల్ల జీర్ణవ్యవస్థను శాంతింపజేస్తుంది.'],
    [new RegExp('Probiotics replenish healthy gut flora post-antibiotics and improve digestion', 'i'), 'యాంటీబయాటిక్స్ వాడిన తర్వాత పేగుల్లో ఆరోగ్యకరమైన బ్యాక్టీరియాను పునరుద్ధరించి జీర్ణక్రియను మెరుగుపరుస్తుంది.'],
    [new RegExp('Hydrates, reduces acidity, and calms medication stomach burning', 'i'), 'శరీరానికి నీటిని అందిస్తుంది, ఎసిడిటీని తగ్గిస్తుంది మరియు మందుల వల్ల కలిగే కడుపు మంటను తగ్గిస్తుంది.'],
    [new RegExp('High soluble fiber supporting regular bowel movements during bed rest', 'i'), 'మంచంపై విశ్రాంతి తీసుకునే సమయంలో మలబద్ధకం రాకుండా సహాయపడే పీచు పదార్థం అందిస్తుంది.'],
    [new RegExp('Natural potassium and gentle pectin fiber that soothe digestive mucosa', 'i'), 'సహజసిద్ధమైన పొటాషియం మరియు పెక్టిన్ ఫైబర్ కడుపు లోపలి పొరను శాంతింపజేస్తాయి.'],
    [new RegExp('Provides systemic hydration, minerals, and light protein', 'i'), 'శరీరానికి అవసరమైన ఖనిజాలు, తేలికపాటి ప్రొటీన్ మరియు నీటిని అందిస్తుంది.'],
    [new RegExp('Clean lean protein vital for post-operative wound healing and cellular repair', 'i'), 'శస్త్రచికిత్స తర్వాత గాయాలు త్వరగా మానడానికి అవసరమైన స్వచ్ఛమైన ప్రొటీన్ అందిస్తుంది.'],
    [new RegExp('Pure albumin protein that accelerates tissue regeneration and surgical healing', 'i'), 'కణజాల పునరుత్పత్తి మరియు శస్త్రచికిత్స గాయాలు వేగంగా మానడానికి స్వచ్ఛమైన ఆల్బుమిన్ ప్రొటీన్ అందిస్తుంది.'],
    [new RegExp('Natural isotonic electrolytes balancing sodium, potassium, and magnesium', 'i'), 'సోడియం, పొటాషియం మరియు మెగ్నీషియం సమతుల్యతను కాపాడే సహజ ఎలక్ట్రోలైట్లు.'],
    [new RegExp('Absorbs excess gastric acid and prevents morning nausea', 'i'), 'అదనపు కడుపు ఆమ్లాన్ని పీల్చుకుని ఉదయం వేళ వచ్చే వికారాన్ని నివారిస్తుంది.'],
    [new RegExp('Rich in beta-carotene and vitamin A for tissue recovery and immune defense', 'i'), 'కణాల రికవరీ మరియు రోగనిరోధక శక్తికి అవసరమైన బీటా-కెరోటిన్ మరియు విటమిన్-ఎ పుష్కలంగా ఉంటాయి.'],
    [new RegExp('Relieves gas, abdominal bloating, and post-meal heaviness', 'i'), 'గ్యాస్, కడుపుబ్బరం మరియు భోజనం తర్వాత అనిపించే బరువును తగ్గిస్తుంది.'],
    [new RegExp('Trans fats and oxidized lipids trigger acute vascular inflammation and accelerate arterial plaque formation', 'i'), 'ట్రాన్స్ ఫ్యాట్స్ రక్తనాళాలలో వాపును కలిగిస్తాయి మరియు గుండెపై భారాన్ని పెంచుతాయి.'],
    [new RegExp('Very high saturated fats and cholesterol; increases post-surgery cardiac stress', 'i'), 'అధిక కొవ్వు మరియు కొలెస్ట్రాల్ వల్ల శస్త్రచికిత్స తర్వాత గుండెపై ఒత్తిడి పెరుగుతుంది.'],
    [new RegExp('Concentrated sodium causes acute fluid retention, hypertension, and graft strain', 'i'), 'అధిక సోడియం రక్తపోటును పెంచుతుంది మరియు శరీరంలో నీరు చేరేలా చేస్తుంది.'],
    [new RegExp('Hydrogenated fats and refined sugars trigger oxidative stress in healing coronary vessels', 'i'), 'హైడ్రోజనేటెడ్ కొవ్వులు మరియు శుద్ధి చేసిన చక్కెరలు రక్తనాళాల రికవరీని దెబ్బతీస్తాయి.'],
    [new RegExp('Cardiac depressant, dehydrating, and disrupts cardiac rhythm and anticoagulant therapy', 'i'), 'శరీరాన్ని డీహైడ్రేట్ చేస్తుంది మరియు గుండె లయను దెబ్బతీస్తుంది.'],
    [new RegExp('Strict limit: Under 1500 mg sodium daily \\(about 2\\/3 teaspoon\\) to avoid fluid overload and sternal edema', 'i'), 'కఠినమైన పరిమితి: శరీరంలో నీరు చేరకుండా ఉండటానికి రోజుకు 1500 మి.గ్రా కంటే తక్కువ ఉప్పు తీసుకోవాలి.'],
    [new RegExp('Avoid cholesterol-heavy whole yolks during early CABG recovery; prefer egg whites', 'i'), 'గుండె శస్త్రచికిత్స తర్వాత పచ్చసొనను నివారించండి; కేవలం గుడ్డు తెల్లసొన మాత్రమే తీసుకోండి.'],
    [new RegExp('Limit to 1 small cup \\(150 ml\\) daily to moderate saturated fat', 'i'), 'సంతృప్త కొవ్వును తగ్గించడానికి రోజుకు 1 చిన్న కప్పు (150 మి.లీ) పాలకు పరిమితం చేయండి.'],
    [new RegExp('Limit to 1 cup daily; excessive caffeine elevates resting heart rate and counteracts beta-blockers', 'i'), 'రోజుకు 1 కప్పుకు పరిమితం చేయండి; అధిక కెఫిన్ గుండె వేగాన్ని పెంచుతుంది.'],
    [new RegExp('STRICT DRUG INTERACTION: Blocks CYP3A4 enzyme, causing dangerous toxic blood levels of statins and muscle injury', 'i'), 'కఠినమైన మందుల హెచ్చరిక: స్టాటిన్ మందుల ప్రభావాన్ని ప్రమాదకరంగా పెంచి కండరాల నష్టాన్ని కలిగిస్తుంది.'],
    [new RegExp('STRICT DRUG INTERACTION: High danger of severe hyperkalemia \\(cardiac arrest risk\\) when combined with ACE inhibitors', 'i'), 'కఠినమైన మందుల హెచ్చరిక: రక్తంలో పొటాషియం ప్రమాదకర స్థాయికి చేరి గుండెపోటు వచ్చే ప్రమాదం ఉంది.'],
    [new RegExp('TABLET REMEDY: Protects gastric mucosa from micro-ulceration and acid burning caused by regular Aspirin intake', 'i'), 'టాబ్లెట్ రక్షణ: ఆస్పిరిన్ వల్ల కడుపులో కలిగే అల్సర్లు మరియు మంట నుండి రక్షిస్తుంది.'],

    // Clinical Enriched Reasons
    [new RegExp('prolactin.*milk production|uterine involution', 'i'), 'తల్లిపాలు సమృద్ధిగా రావడానికి, గర్భాశయ రికవరీకి మరియు డెలివరీ వాపులు తగ్గడానికి సహాయపడుతుంది.'],
    [new RegExp('postpartum stamina booster.*pelvic floor', 'i'), 'డెలివరీ తర్వాత శక్తినిచ్చి కటి కండరాలు, వెన్ను మరియు కణజాలాల రికవరీని వేగవంతం చేస్తుంది.'],
    [new RegExp('calcium and iron.*breast milk composition', 'i'), 'తల్లిపాలలో కాల్షియం, ఐరన్ అందించడానికి మరియు ఎముకల బలానికి అద్భుతమైన పోషకాహారం.'],
    [new RegExp('charantin.*mimic endogenous insulin', 'i'), 'రక్తంలో గ్లూకోజ్ స్థాయిలను తగ్గించడానికి ఇన్సులిన్ లాగా పనిచేసే సహజ గుణాలు కలిగి ఉంది.'],
    [new RegExp('stimulates glucose-dependent insulin secretion', 'i'), 'ఇన్సులిన్ స్రావాన్ని ప్రేరేపించి చక్కెర శోషణను నియంత్రించడంలో సహాయపడుతుంది.'],
    [new RegExp('potassium.*balances sodium.*peripheral resistance', 'i'), 'సహజ పొటాషియం రక్తనాళాల ఒత్తిడిని తగ్గించి రక్తపోటును (BP) నియంత్రణలో ఉంచుతుంది.'],
    [new RegExp('nitrates convert to nitric oxide.*coronary arteries', 'i'), 'రక్తనాళాలను వ్యాకోచింపజేసి గుండెపై భారాన్ని తగ్గిస్తుంది మరియు గుండెకు రక్తప్రసరణను మెరుగుపరుస్తుంది.'],
    [new RegExp('stimulate megakaryocytes.*platelet recovery in Dengue', 'i'), 'ఎముక మజ్జను ప్రేరేపించి డెంగ్యూ జ్వరంలో రక్తంలోని ప్లేట్‌లెట్ల సంఖ్యను వేగంగా పెంచుతుంది.'],
    [new RegExp('natural diuretic.*flushes urinary passages.*dissolves micro-calculi', 'i'), 'సహజ మూత్రవిసర్జనను పెంచి మూత్రపిండాల్లోని చిన్న రాళ్ళను, వ్యర్థాలను కరిగించి బయటకు పంపుతుంది.'],
    [new RegExp('calcium density.*accelerates fracture callus.*bone fusion', 'i'), 'ఎముక విరుపులు త్వరగా అతుక్కోవడానికి మరియు కీళ్ళ పటిష్టతకు అవసరమైన సహజ కాల్షియం అందిస్తుంది.'],
    [new RegExp('suppresses bronchial mucosal inflammation', 'i'), 'శ్వాసనాళాల వాపును తగ్గించి, ఆయాసం మరియు దగ్గును నివారిస్తుంది.'],
    [new RegExp('pure albumin protein.*surgical incision healing|tissue repair', 'i'), 'శస్త్రచికిత్స కుట్లు మరియు గాయాలు త్వరగా మానడానికి అవసరమైన స్వచ్ఛమైన ప్రొటీన్‌ను అందిస్తుంది.'],
    [new RegExp('concentrated simple sugars.*hyperglycemic spikes', 'i'), 'రక్తంలో షుగర్ స్థాయిలు ఒక్కసారిగా ప్రమాదకరంగా పెరిగిపోవడానికి కారణమవుతుంది.'],
    [new RegExp('massive salt loading.*fluid retention.*arterial walls', 'i'), 'శరీరంలో నీరు చేరి రక్తపోటు మరియు గుండెపై భారం విపరీతంగా పెరగడానికి దారితీస్తుంది.'],
    [new RegExp('high fats delay gastric emptying.*esophagus', 'i'), 'జీర్ణక్రియను ఆలస్యం చేసి తీవ్రమైన ఎసిడిటీ, గుండెల్లో మంట మరియు వాంతులకు దారితీస్తుంది.'],
    [new RegExp('high-oxalate.*calcium oxalate kidney stones', 'i'), 'మూత్రపిండాలలో కాల్షియం ఆక్సలేట్ రాళ్ళు ఏర్పడటానికి ప్రధాన కారణమవుతుంది.'],
    [new RegExp('STRICT WARNING in Dengue: Inhibits platelets', 'i'), 'కఠినమైన హెచ్చరిక: డెంగ్యూలో ప్లేట్‌లెట్లను దెబ్బతీసి తీవ్రమైన అంతర్గత రక్తస్రావానికి దారితీస్తుంది.']
  ];

  function translateReasonToTelugu(text) {
    if (!text || typeof text !== 'string') return text;
    let s = text;
    for (let i = 0; i < TELUGU_REASON_MAP.length; i++) {
      const [re, rep] = TELUGU_REASON_MAP[i];
      if (re.test(s)) return rep;
    }
    return translateFoodToTelugu(s);
  }

  const TELUGU_MED_NAMES = {
    'paracetamol': 'పారాసిటమాల్',
    'dolo': 'డోలో 650 (పారాసిటమాల్)',
    'ibuprofen': 'ఇబుప్రోఫెన్',
    'naproxen': 'నాప్రాక్సెన్',
    'diclofenac': 'డిక్లోఫెనాక్',
    'aspirin': 'ఆస్పిరిన్',
    'celecoxib': 'సెలెకాక్సిబ్',
    'etoricoxib': 'ఎటోరికాక్సిబ్',
    'amoxicillin and clavulanic acid': 'అమోక్సిసిలిన్ మరియు క్లావులానిక్ యాసిడ్',
    'augmentin': 'ఆగ్‌మెంటిన్ 625',
    'amoxicillin': 'అమోక్సిసిలిన్',
    'azithromycin': 'అజిత్రోమైసిన్',
    'doxycycline': 'డాక్సీసైక్లిన్',
    'ciprofloxacin': 'సిప్రోఫ్లోక్సాసిన్',
    'cefixime': 'సెఫిక్సిమ్',
    'metronidazole': 'మెట్రోనిడాజోల్',
    'pantoprazole': 'పాంటోప్రజోల్ (పాన్-40)',
    'omeprazole': 'ఒమెప్రజోల్',
    'famotidine': 'ఫామోటిడిన్',
    'ondansetron': 'ఒండాన్‌సెట్రాన్',
    'domperidone': 'డాంపెరిడోన్',
    'metoclopramide': 'మెటోక్లోప్రమైడ్',
    'telmisartan': 'టెల్మిసార్టన్ (టెల్మా)',
    'rosuvastatin': 'రోసువాస్టాటిన్ (రోసువాస్)',
    'atorvastatin': 'అటోర్వాస్టాటిన్',
    'metoprolol': 'మెటోప్రొలోల్',
    'ramipril': 'రామిప్రిల్',
    'clopidogrel': 'క్లోపిడోగ్రెల్',
    'furosemide': 'ఫ్యూరోసెమైడ్ (లాసిక్స్)'
  };

  function translateMedNameToTelugu(name) {
    if (!name) return '';
    const low = name.toLowerCase();
    for (const [key, val] of Object.entries(TELUGU_MED_NAMES)) {
      if (low.includes(key)) return val;
    }
    return name;
  }

  const TELUGU_SIDE_EFFECTS = [
    [new RegExp('nausea', 'gi'), 'వికారం'],
    [new RegExp('stomach\\s*discomfort', 'gi'), 'కడుపులో అసౌకర్యం'],
    [new RegExp('stomach\\s*irritation', 'gi'), 'కడుపులో మంట'],
    [new RegExp('stomach\\s*pain|abdominal\\s*pain', 'gi'), 'కడుపు నొప్పి'],
    [new RegExp('heartburn', 'gi'), 'గుండెల్లో మంట (ఎసిడిటీ)'],
    [new RegExp('skin\\s*rash', 'gi'), 'చర్మంపై దద్దుర్లు'],
    [new RegExp('liver\\s*damage\\s*in\\s*overdose', 'gi'), 'అధిక మోతాదు వల్ల కాలేయ నష్టం'],
    [new RegExp('constipation\\s*or\\s*diarrhoea', 'gi'), 'మలబద్ధకం లేదా విరేచనాలు'],
    [new RegExp('constipation', 'gi'), 'మలబద్ధకం'],
    [new RegExp('diarrhoea', 'gi'), 'విరేచనాలు'],
    [new RegExp('fluid\\s*retention|swelling\\s*or\\s*fluid\\s*retention', 'gi'), 'శరీరంలో నీరు చేరడం (వాపు)'],
    [new RegExp('swelling', 'gi'), 'వాపు'],
    [new RegExp('indigestion', 'gi'), 'అజీర్ణం'],
    [new RegExp('increased\\s*bleeding\\s*risk', 'gi'), 'రక్తస్రావ ప్రమాదం పెరుగుదల'],
    [new RegExp('headache', 'gi'), 'తలనొప్పి'],
    [new RegExp('dizziness', 'gi'), 'తలతిరుగుడు'],
    [new RegExp('vomiting', 'gi'), 'వాంతులు'],
    [new RegExp('dry\\s*mouth', 'gi'), 'నోరు ఎండిపోవడం'],
    [new RegExp('metallic\\s*taste', 'gi'), 'నోటిలో లోహపు రుచి'],
    [new RegExp('abdominal\\s*cramps', 'gi'), 'కడుపులో తిమ్మిరి / నొప్పులు'],
    [new RegExp('drowsiness', 'gi'), 'నిద్రమత్తు'],
    [new RegExp('increased\\s*sensitivity\\s*to\\s*sunlight', 'gi'), 'ఎండకు చర్మం సున్నితంగా మారడం'],
    [new RegExp('muscle\\s*aches', 'gi'), 'కండరాల నొప్పులు'],
    [new RegExp('fatigue', 'gi'), 'అలసట'],
    [new RegExp('gas', 'gi'), 'గ్యాస్'],
    [new RegExp('abdominal\\s*bloating', 'gi'), 'కడుపు ఉబ్బరం'],
    [new RegExp('ankle\\s*swelling', 'gi'), 'చీలమండల వాపు'],
    [new RegExp('low\\s*blood\\s*pressure', 'gi'), 'తక్కువ రక్తపోటు']
  ];

  function translateSideEffectToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_SIDE_EFFECTS.length; i++) {
      s = s.replace(TELUGU_SIDE_EFFECTS[i][0], TELUGU_SIDE_EFFECTS[i][1]);
    }
    return s;
  }

  const TELUGU_REMEDY_PHRASES = [
    [new RegExp('Plain toast, crackers, bananas, and small frequent meals\\.?', 'gi'), 'ప్లెయిన్ టోస్ట్, బిస్కెట్లు, అరటిపండ్లు మరియు చిన్న మొత్తాలలో తరచుగా భోజనం.'],
    [new RegExp('Simple foods such as rice, oatmeal, and toast may be easier to tolerate\\.?', 'gi'), 'ఉడికించిన అన్నం, ఓట్స్ మరియు టోస్ట్ బ్రెడ్ వంటి తేలికపాటి ఆహారాలు కడుపుకు సులభంగా ఉంటాయి.'],
    [new RegExp('No specific food reliably prevents a medicine-related rash\\. Seek medical advice if a rash develops\\.?', 'gi'), 'మందుల వల్ల వచ్చే దద్దుర్లను నివారించే ఆహారం ఏదీ లేదు. దద్దుర్లు వస్తే వెంటనే డాక్టర్‌ను సంప్రదించండి.'],
    [new RegExp('No food prevents this\\. Avoid exceeding the prescribed dose and seek urgent medical help after an overdose\\.?', 'gi'), 'ఆహారం దీనిని నివారించదు. సూచించిన మోతాదు కంటే ఎక్కువ తీసుకోవద్దు; అధిక మోతాదు తీసుకుంటే వెంటనే ఆసుపత్రికి వెళ్ళండి.'],
    [new RegExp('Take with food or milk if permitted by the product instructions\\.?', 'gi'), 'మందుల సూచనల ప్రకారం ఆహారంతో లేదా పాలతో కలిపి తీసుకోండి.'],
    [new RegExp('Oatmeal, bananas, and other non-spicy foods may be easier to tolerate\\.?', 'gi'), 'ఓట్స్, అరటిపండ్లు మరియు కారం లేని ఆహారాలు సులభంగా జీర్ణమవుతాయి.'],
    [new RegExp('Crackers, toast, rice, and small meals\\.?', 'gi'), 'బిస్కెట్లు, టోస్ట్ బ్రెడ్, అన్నం మరియు చిన్న చిన్న భోజనాలు.'],
    [new RegExp('Drink adequate fluids; oats and other soluble-fibre foods may help, depending on the symptom\\.?', 'gi'), 'సరిపడా ద్రవాలు తాగండి; ఓట్స్ మరియు కరిగే పీచు పదార్థాలు లక్షణాలను బట్టి సహాయపడతాయి.'],
    [new RegExp('Take with food if directed; bland foods may be easier to tolerate\\.?', 'gi'), 'సూచించినట్లయితే ఆహారంతో పాటు తీసుకోండి; చప్పని తేలికపాటి ఆహారాలు సులభంగా ఉంటాయి.'],
    [new RegExp('Oatmeal, rice, and non-spicy foods\\.?', 'gi'), 'ఓట్స్, అన్నం మరియు కారం లేని సాత్విక ఆహారం.'],
    [new RegExp('Crackers, toast, bananas, and small meals\\.?', 'gi'), 'బిస్కెట్లు, టోస్ట్, అరటిపండ్లు మరియు తేలికపాటి ఆహారం.'],
    [new RegExp('Limit excess sodium in packaged foods\\. New or worsening swelling needs medical assessment\\.?', 'gi'), 'ప్యాక్ చేసిన ఆహారాలలో ఉప్పును తగ్గించండి. కొత్తగా వాపు వస్తే డాక్టర్‌కు చూపించండి.'],
    [new RegExp('Simple meals and taking the medicine with food if instructed\\.?', 'gi'), 'తేలికపాటి భోజనం మరియు సూచనల ప్రకారం ఆహారంతో పాటు మందు తీసుకోవడం.'],
    [new RegExp('Fluids, oral rehydration solution when needed, and easily tolerated foods\\.?', 'gi'), 'మంచినీరు, అవసరమైనప్పుడు ఓ.ఆర్.ఎస్ ద్రావణం మరియు తేలికగా జీర్ణమయ్యే ఆహారం.'],
    [new RegExp('Reduce excess salt; contact a healthcare professional if swelling develops\\.?', 'gi'), 'అదనపు ఉప్పును తగ్గించండి; వాపు వస్తే డాక్టర్‌ను సంప్రదించండి.'],
    [new RegExp('Take with food if the product instructions allow\\.?', 'gi'), 'మందుల సూచనలు అనుమతిస్తే ఆహారంతో కలిపి తీసుకోండి.'],
    [new RegExp('No food reliably prevents bleeding\\. Avoid taking additional aspirin or similar painkillers unless advised; seek urgent care for black stools or vomiting blood\\.?', 'gi'), 'రక్తస్రావాన్ని ఆహారం నివారించలేదు. సలహా లేకుండా అదనపు పెయిన్ కిల్లర్స్ వాడవద్దు; నల్లటి మలవిసర్జన లేదా రక్తం వాంతి అయితే వెంటనే అత్యవసర వైద్యం పొందండి.'],
    [new RegExp('Small, simple meals\\.?', 'gi'), 'చిన్న, తేలికపాటి భోజనాలు.'],
    [new RegExp('Bland foods may be easier to tolerate, but persistent pain needs medical review\\.?', 'gi'), 'చప్పని ఆహారాలు సులభంగా ఉంటాయి, కానీ నొప్పి తగ్గకపోతే డాక్టర్‌ను సంప్రదించండి.'],
    [new RegExp('Fluids, rice, bananas, and other easily tolerated foods\\.?', 'gi'), 'నీరు, అన్నం, అరటిపండ్లు మరియు తేలికపాటి ఆహారం.'],
    [new RegExp('Reduce excess sodium\\. New or worsening swelling should be assessed\\.?', 'gi'), 'ఉప్పును తగ్గించండి. వాపు పెరిగితే తప్పనిసరిగా డాక్టర్‌కు చూపించాలి.'],
    [new RegExp('Simple meals and adequate hydration\\.?', 'gi'), 'తేలికపాటి భోజనం మరియు తగినంత మంచినీరు త్రాగడం.'],
    [new RegExp('Drink water regularly and eat balanced meals\\.?', 'gi'), 'క్రమం తప్పకుండా నీరు త్రాగండి మరియు సమతుల్య ఆహారం తీసుకోండి.'],
    [new RegExp('Maintain hydration and eat regular meals; sit down if dizzy\\.?', 'gi'), 'శరీరంలో నీటి శాతం తగ్గకుండా చూసుకోండి; తల తిరిగినప్పుడు వెంటనే కూర్చోండి.'],
    [new RegExp('Limit excess salt\\. Food cannot reliably prevent this effect; seek medical advice if it occurs\\.?', 'gi'), 'అదనపు ఉప్పును తగ్గించండి. ఈ పరిస్థితి వస్తే డాక్టర్ సలహా తీసుకోండి.'],
    [new RegExp('Plain toast, rice, bananas, and small meals\\.?', 'gi'), 'టోస్ట్ బ్రెడ్, అన్నం, అరటిపండ్లు మరియు చిన్న భోజనాలు.'],
    [new RegExp('Drink fluids; oral rehydration solution may help if fluid loss occurs\\.?', 'gi'), 'ద్రవాలు త్రాగండి; నీరసం తగ్గడానికి ఓ.ఆర్.ఎస్ (ORS) ద్రావణం సహాయపడుతుంది.'],
    [new RegExp('Take small sips of fluid and eat small amounts when tolerated\\.?', 'gi'), 'కొద్దికొద్దిగా నీరు సిప్ చేయండి మరియు ఓపిక ఉన్నప్పుడు తక్కువ పరిమాణంలో ఆహారం తినండి.'],
    [new RegExp('No specific food treats a drug-related rash\\. Seek medical advice; facial swelling or breathing difficulty is an emergency\\.?', 'gi'), 'మందుల వల్ల వచ్చే దద్దుర్లకు ప్రత్యేక ఆహారం లేదు. ముఖం వాపు లేదా శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంటే వెంటనే అత్యవసర చికిత్స పొందండి.'],
    [new RegExp('Drink fluids and use oral rehydration solution when needed\\.?', 'gi'), 'నీరు, ద్రవాలు త్రాగండి మరియు అవసరమైనప్పుడు ఓ.ఆర్.ఎస్ ద్రావణం వాడండి.'],
    [new RegExp('Take at the start of a meal as directed by the product instructions\\.?', 'gi'), 'సూచనల ప్రకారం భోజనం ప్రారంభించే ముందు తీసుకోండి.'],
    [new RegExp('Take small sips of water or oral rehydration solution\\.?', 'gi'), 'కొద్దికొద్దిగా నీరు లేదా ఓ.ఆర్.ఎస్ ద్రావణం త్రాగండి.'],
    [new RegExp('Simple meals such as rice, toast, and bananas may be easier to tolerate\\.?', 'gi'), 'అన్నం, టోస్ట్ బ్రెడ్ మరియు అరటిపండ్లు వంటి సాధారణ ఆహారాలు కడుపుకు తేలికగా ఉంటాయి.'],
    [new RegExp('Toast, crackers, rice, and small meals\\.?', 'gi'), 'టోస్ట్ బ్రెడ్, బిస్కెట్లు, అన్నం మరియు తేలికపాటి భోజనం.'],
    [new RegExp('Fluids and oral rehydration solution if needed\\.?', 'gi'), 'ద్రవాలు మరియు అవసరమైతే ఓ.ఆర్.ఎస్ ద్రావణం.'],
    [new RegExp('Bland foods and smaller meals may help\\.?', 'gi'), 'చప్పని ఆహారం మరియు చిన్న భోజనాలు సహాయపడతాయి.'],
    [new RegExp('Take small sips of fluid and resume food gradually as tolerated\\.?', 'gi'), 'కొద్దికొద్దిగా నీరు త్రాగండి మరియు నెమ్మదిగా తేలికపాటి ఆహారాన్ని ప్రారంభించండి.'],
    [new RegExp('Small meals and bland foods, following the medicine\'s food instructions\\.?', 'gi'), 'మందుల సూచనల ప్రకారం చిన్న భోజనాలు మరియు తేలికపాటి ఆహారాలు తీసుకోండి.'],
    [new RegExp('Swallow with a full glass of water and remain upright for at least 30 minutes\\. Food instructions vary by product\\.?', 'gi'), 'పూర్తి గ్లాసు నీటితో మింగండి మరియు కనీసం 30 నిమిషాల పాటు నిటారుగా కూర్చోండి.'],
    [new RegExp('Drink fluids and consider oral rehydration solution if needed\\.?', 'gi'), 'ద్రవాలు త్రాగండి మరియు అవసరమైతే ఓ.ఆర్.ఎస్ ద్రావణం తీసుకోండి.'],
    [new RegExp('No food reliably prevents it\\. Use sunscreen, protective clothing, and avoid excessive sun exposure\\.?', 'gi'), 'ఆహారం దీనిని నివారించదు. సన్‌స్క్రీన్, రక్షణ దుస్తులు ధరించండి మరియు అధిక ఎండను నివారించండి.'],
    [new RegExp('Bland foods and small meals\\.?', 'gi'), 'చప్పని ఆహారం మరియు చిన్న చిన్న భోజనాలు.'],
    [new RegExp('Simple meals may help\\.?', 'gi'), 'తేలికపాటి భోజనాలు సహాయపడతాయి.'],
    [new RegExp('Drink enough water and avoid driving if dizzy\\.?', 'gi'), 'తగినంత నీరు త్రాగండి మరియు తల తిరుగుతున్నప్పుడు డ్రైవింగ్ చేయవద్దు.'],
    [new RegExp('Take with food if directed; bland meals may help\\.?', 'gi'), 'సూచించినట్లయితే ఆహారంతో పాటు తీసుకోండి; తేలికపాటి భోజనం మేలు చేస్తుంది.'],
    [new RegExp('Sugar-free gum or sweets may temporarily mask the taste\\.?', 'gi'), 'షుగర్-ఫ్రీ చూయింగ్ గమ్ లేదా పిప్పర్‌మెంట్లు తాత్కాలికంగా ఆ రుచిని తగ్గిస్తాయి.'],
    [new RegExp('Rice, toast, and small meals\\.?', 'gi'), 'అన్నం, టోస్ట్ బ్రెడ్ మరియు చిన్న భోజనాలు.'],
    [new RegExp('Maintain hydration and eat regular balanced meals\\.?', 'gi'), 'శరీరానికి తగినంత నీరందించండి మరియు సమయానికి సమతుల్య భోజనం చేయండి.'],
    [new RegExp('Small, bland meals\\.?', 'gi'), 'చిన్న, సాత్విక భోజనాలు.'],
    [new RegExp('Choose foods that you tolerate well and avoid personal reflux triggers\\.?', 'gi'), 'మీకు సరిపడే ఆహారాన్ని ఎంచుకోండి మరియు ఎసిడిటీ కలిగించే పదార్థాలను నివారించండి.'],
    [new RegExp('Water and regular balanced meals may help if dehydration or missed meals contribute\\.?', 'gi'), 'సమయానికి భోజనం చేయడం మరియు తగినంత నీరు త్రాగడం సహాయపడుతుంది.'],
    [new RegExp('Toast, rice, crackers, and small meals\\.?', 'gi'), 'టోస్ట్, అన్నం, బిస్కెట్లు మరియు చిన్న భోజనాలు.'],
    [new RegExp('Bland foods and smaller meals may be easier to tolerate\\.?', 'gi'), 'చప్పని ఆహారాలు మరియు చిన్న భోజనాలు తేలికగా ఉంటాయి.'],
    [new RegExp('Drink water and eat regular meals\\.?', 'gi'), 'నీరు త్రాగండి మరియు సమయానికి ఆహారం తీసుకోండి.'],
    [new RegExp('Maintain hydration and avoid sudden standing if light-headed\\.?', 'gi'), 'శరీరంలో నీటిని కాపాడుకోండి మరియు తల తిరిగినప్పుడు ఒక్కసారిగా పైకి లేవకండి.'],
    [new RegExp('Oats, vegetables, fruit, and adequate water\\.?', 'gi'), 'ఓట్స్, కూరగాయలు, పండ్లు మరియు సరిపడా మంచినీరు.'],
    [new RegExp('Oats, fruit, vegetables, and adequate water\\.?', 'gi'), 'ఓట్స్, పండ్లు, కూరగాయలు మరియు తగినంత నీరు.'],
    [new RegExp('Hydration and regular meals may help\\.?', 'gi'), 'తగినంత నీరు మరియు సమయానికి భోజనం సహాయపడతాయి.'],
    [new RegExp('Drink fluids and rise slowly from sitting or lying down\\.?', 'gi'), 'ద్రవాలు త్రాగండి మరియు కూర్చున్న లేదా పడుకున్న స్థితి నుండి నెమ్మదిగా లేవండి.'],
    [new RegExp('Sip water regularly and use sugar-free gum\\.?', 'gi'), 'క్రమం తప్పకుండా నీరు సిప్ చేయండి మరియు షుగర్-ఫ్రీ చూయింగ్ గమ్ వాడండి.'],
    [new RegExp('Small, simple meals may be easier to tolerate\\.?', 'gi'), 'చిన్న, తేలికపాటి భోజనాలు జీర్ణక్రియకు సులభంగా ఉంటాయి.']
  ];

  function translateRemedyTextToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_REMEDY_PHRASES.length; i++) {
      if (TELUGU_REMEDY_PHRASES[i][0].test(s)) return TELUGU_REMEDY_PHRASES[i][1];
    }
    return translateFoodToTelugu(s);
  }

  function translateFoodListToTelugu(text) {
    if (!text) return '';
    return translateFoodToTelugu(text);
  }

  const TELUGU_WARNING_MAP = [
    [new RegExp('Do not take ciprofloxacin together with milk, yoghurt, or calcium-fortified drinks alone.*reduces? absorption\\.?', 'i'), 'సిప్రోఫ్లోక్సాసిన్‌ను పాలు, పెరుగు లేదా కాల్షియం పానీయాలతో నేరుగా కలిపి తీసుకోవద్దు. డైరీ ఉత్పత్తులు, ఐరన్ మరియు యాంటాసిడ్లకు మందు తీసుకునే సమయానికి మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి.'],
    [new RegExp('Avoid alcohol during treatment and for the period specified in the medicine\'s instructions after the final dose\\.?', 'i'), 'చికిత్స సమయంలో మరియు కోర్సు పూర్తయిన తర్వాత సూచించిన వ్యవధి వరకు మద్యపానం పూర్తిగా నివారించండి.'],
    [new RegExp('Domperidone can cause serious heart-rhythm problems.*irregular heartbeat\\.?', 'i'), 'డాంపెరిడోన్ కొందరిలో గుండె లయ సమస్యలను కలిగిస్తుంది. సూచించిన మేరకే వాడండి; మూర్ఛ లేదా వేగవంతమైన గుండె కొట్టుకోవడం ఉంటే వెంటనే ఆసుపత్రికి వెళ్ళండి.'],
    [new RegExp('STRICT WARNING: Avoid Grapefruit and grapefruit juice completely.*muscle health', 'i'), 'కఠిన హెచ్చరిక: గ్రేప్‌ఫ్రూట్ రసాన్ని పూర్తిగా నివారించండి. ఇది రక్తాన్ని విషపూరితం చేస్తుంది.'],
    [new RegExp('STRICT WARNING: Do NOT use potassium-based salt substitutes', 'i'), 'కఠిన హెచ్చరిక: పొటాషియం ఆధారిత సాల్ట్ (లైట్ సాల్ట్) ఖచ్చితంగా వాడవద్దు.'],
    [new RegExp('Take only as prescribed immediately before bed', 'i'), 'పడుకునే ముందు మాత్రమే సూచించిన మోతాదులో తీసుకోండి.']
  ];

  function translateWarningTextToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_WARNING_MAP.length; i++) {
      if (TELUGU_WARNING_MAP[i][0].test(s)) return TELUGU_WARNING_MAP[i][1];
    }
    return translateFoodToTelugu(s);
  }

  const TELUGU_SCHEDULE_MAP = [
    [new RegExp('Twice daily with meals \\(Morning & Night\\)', 'i'), 'భోజనంతో పాటు రోజుకు రెండుసార్లు (ఉదయం & రాత్రి)'],
    [new RegExp('Twice daily after food \\(1-0-1\\)', 'i'), 'భోజనం తర్వాత రోజుకు రెండుసార్లు (ఉదయం & రాత్రి)'],
    [new RegExp('Twice daily after food', 'i'), 'భోజనం తర్వాత రోజుకు రెండుసార్లు'],
    [new RegExp('Three times a day as needed', 'i'), 'అవసరమైనప్పుడు రోజుకు మూడుసార్లు'],
    [new RegExp('Three times daily after food', 'i'), 'భోజనం తర్వాత రోజుకు మూడుసార్లు'],
    [new RegExp('Once daily in morning \\(Empty Stomach\\)', 'i'), 'ఉదయం ఖాళీ కడుపుతో ఒకసారి'],
    [new RegExp('Once daily before breakfast \\(1-0-0\\)', 'i'), 'అల్పాహారానికి ముందు ఉదయం ఒకసారి'],
    [new RegExp('Once daily in morning', 'i'), 'ఉదయం పూట రోజుకు ఒకసారి'],
    [new RegExp('At bedtime \\(Night\\)', 'i'), 'రాత్రి పడుకునే ముందు'],
    [new RegExp('Ongoing recovery course', 'i'), 'రికవరీ కోర్సు కొనసాగుతోంది'],
    [new RegExp('(\\d+)\\s*days', 'i'), '$1 రోజులు']
  ];

  function translateTimingToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_SCHEDULE_MAP.length; i++) {
      s = s.replace(TELUGU_SCHEDULE_MAP[i][0], TELUGU_SCHEDULE_MAP[i][1]);
    }
    return s;
  }

  function translateDurationToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_SCHEDULE_MAP.length; i++) {
      s = s.replace(TELUGU_SCHEDULE_MAP[i][0], TELUGU_SCHEDULE_MAP[i][1]);
    }
    return s;
  }

  function translateInstructionsToTelugu(text) {
    if (!text) return '';
    let s = text;
    s = s.replace(/Take at start of meals with water\. Consume curd or buttermilk\.?/gi, 'భోజనం ప్రారంభంలో నీటితో తీసుకోండి. తాజా పెరుగు లేదా మజ్జిగ వాడండి.');
    s = s.replace(/Take after meals with warm water for pain\/fever\. Do not exceed prescribed dose\.?/gi, 'నొప్పి/జ్వరం కోసం భోజనం తర్వాత గోరువెచ్చని నీటితో తీసుకోండి. మోతాదు మించవద్దు.');
    s = s.replace(/Take 30 minutes before breakfast with a glass of water\.?/gi, 'అల్పాహారానికి 30 నిమిషాల ముందు గ్లాసు నీటితో తీసుకోండి.');
    s = s.replace(/Maintain appropriate hydration and avoid potassium salt substitutes\.?/gi, 'తగినంత మంచినీరు త్రాగండి మరియు పొటాషియం ఉప్పు ప్రత్యామ్నాయాలను నివారించండి.');
    s = s.replace(/Take at night\. Avoid grapefruit or grapefruit juice completely\.?/gi, 'రాత్రి తీసుకోండి. గ్రేప్‌ఫ్రూట్ లేదా దాని రసాన్ని పూర్తిగా నివారించండి.');
    s = s.replace(/With a full glass of water/gi, 'పూర్తి గ్లాసు నీటితో');
    s = s.replace(/After food/gi, 'భోజనం తర్వాత');
    s = s.replace(/Before food/gi, 'భోజనానికి ముందు');
    return translateFoodToTelugu(s);
  }

  function translateDoseToTelugu(text) {
    if (!text) return 'ప్రామాణిక మోతాదు';
    return text;
  }

  const TELUGU_CHECKLIST_MAP = [
    [new RegExp('Take medications strictly as prescribed', 'i'), 'సూచించిన మందులను సమయానికి ఖచ్చితంగా తీసుకోండి'],
    [new RegExp('Check surgical wound daily for redness or discharge', 'i'), 'కుట్లు లేదా గాయం వద్ద ఎరుపుదనం లేదా చీము ఉందో లేదో రోజూ చూడండి'],
    [new RegExp('Walk gently for 15 minutes twice daily', 'i'), 'రోజుకు రెండుసార్లు 15 నిమిషాల పాటు నెమ్మదిగా నడవండి'],
    [new RegExp('Measure and log blood pressure every morning', 'i'), 'ప్రతిరోజూ ఉదయం రక్తపోటును కొలిచి నమోదు చేసుకోండి'],
    [new RegExp('Avoid lifting objects heavier than 5 kg', 'i'), '5 కిలోల కంటే ఎక్కువ బరువున్న వస్తువులను ఎత్తవద్దు'],
    [new RegExp('Drink at least 2 litres of water daily', 'i'), 'రోజుకు కనీసం 2 లీటర్ల మంచినీరు త్రాగండి'],
    [new RegExp('Maintain low-salt and low-oil diet', 'i'), 'తక్కువ ఉప్పు మరియు తక్కువ నూనెతో కూడిన ఆహారాన్ని తీసుకోండి']
  ];

  function translateChecklistItemToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_CHECKLIST_MAP.length; i++) {
      if (TELUGU_CHECKLIST_MAP[i][0].test(s)) return TELUGU_CHECKLIST_MAP[i][1];
    }
    return s;
  }

  const TELUGU_WARNING_ITEMS = [
    [new RegExp('Severe or sudden chest pain radiating to left arm or jaw', 'i'), 'ఎడమ చేయి లేదా దవడకు వ్యాపించే తీవ్రమైన లేదా ఆకస్మిక ఛాతీ నొప్పి'],
    [new RegExp('Shortness of breath at rest or when lying flat', 'i'), 'విశ్రాంతి సమయంలో లేదా పడుకున్నప్పుడు శ్వాస తీసుకోవడంలో తీవ్ర ఇబ్బంది'],
    [new RegExp('Sudden weakness, numbness, or facial drooping', 'i'), 'ఆకస్మిక బలహీనత, తిమ్మిరి లేదా ముఖం ఒకవైపు వంకరపోవడం'],
    [new RegExp('High fever over 101°F \\(38\\.3°C\\) with severe shaking chills', 'i'), 'వణుకుతో కూడిన 101°F (38.3°C) కంటే ఎక్కువ తీవ్రమైన జ్వరం'],
    [new RegExp('Heavy wound bleeding, separation, or foul-smelling discharge', 'i'), 'గాయం నుండి అధిక రక్తస్రావం, కుట్లు ఊడిపోవడం లేదా దుర్వాసనతో కూడిన చీము'],
    [new RegExp('Coughing up blood or vomiting bright red blood', 'i'), 'దగ్గులో రక్తం పడటం లేదా ఎర్రటి రక్తం వాంతి కావడం'],
    [new RegExp('Persistent mild nausea, loss of appetite, or dizziness upon standing', 'i'), 'నిలబడినప్పుడు తలతిరుగుడు, నిరంతర వికారం లేదా ఆకలి లేకపోవడం'],
    [new RegExp('Mild swelling around ankles or feet that improves with elevation', 'i'), 'కాళ్ళు పైకి పెట్టినప్పుడు తగ్గే చీలమండల వద్ద తేలికపాటి వాపు'],
    [new RegExp('Constipation lasting more than 3 days despite hydration', 'i'), 'మంచినీరు తాగినప్పటికీ 3 రోజులకు పైగా మలబద్ధకం ఉండటం'],
    [new RegExp('Mild redness or itchiness around the incision site', 'i'), 'కుట్ల వద్ద తేలికపాటి ఎరుపు లేదా దురద'],
    [new RegExp('Dry hacking cough developed after starting medication', 'i'), 'కొత్త మందులు ప్రారంభించిన తర్వాత వచ్చే పొడి దగ్గు']
  ];

  function translateWarningItemToTelugu(text) {
    if (!text) return '';
    let s = text;
    for (let i = 0; i < TELUGU_WARNING_ITEMS.length; i++) {
      if (TELUGU_WARNING_ITEMS[i][0].test(s)) return TELUGU_WARNING_ITEMS[i][1];
    }
    return s;
  }

  function translateDeptToTelugu(text) {
    if (!text) return '';
    if (/outpatient/gi.test(text)) return 'రూమ్ 302, ఔట్‌పేషెంట్ క్లినిక్';
    if (/cardio/gi.test(text)) return 'కార్డియాలజీ విభాగం';
    return text;
  }

  function translateHospToTelugu(text) {
    if (!text) return '';
    if (/metropolitan/gi.test(text)) return 'మెట్రోపాలిటన్ జనరల్ హాస్పిటల్';
    return text;
  }

  function translateNotesToTelugu(text) {
    if (!text) return 'నమూనా రికార్డులో అందుబాటులో లేదు.';
    return 'ఈ డిశ్చార్జ్ రికార్డు మరియు రోజువారీ లక్షణాల డైరీని వెంట తీసుకురండి.';
  }

  function renderMedicineTable(medicines) {
    const tbody = $('medicine-table-rows');
    if (!tbody) return;
    const isTe = (state.currentLang === 'te');

    if (!medicines || medicines.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--slate-400); padding: 2.5rem;">${isTe ? '📋 ప్రిస్క్రిప్షన్ వివరాలు లోడ్ కాలేదు. మీ మందుల సమయ పట్టికను చూడటానికి పైన మీ డిశ్చార్జ్ సారాంశాన్ని అప్‌లోడ్ చేయండి.' : '📋 No active prescription loaded. Upload or process your discharge summary above to see your prescribed medicine schedule.'}</td></tr>`;
      return;
    }

    let html = '';
    medicines.forEach(m => {
      const name = isTe ? translateMedNameToTelugu(m.name) : m.name;
      const dose = m.dose ? (isTe ? translateDoseToTelugu(m.dose) : m.dose) : (isTe ? 'దయచేసి డాక్టర్‌ను సంప్రదించండి.' : 'Please confirm with your healthcare professional.');
      const timing = m.timing ? (isTe ? translateTimingToTelugu(m.timing) : m.timing) : (isTe ? 'దయచేసి డాక్టర్‌ను సంప్రదించండి.' : 'Please confirm with your healthcare professional.');
      const duration = m.duration ? (isTe ? translateDurationToTelugu(m.duration) : m.duration) : (isTe ? 'దయచేసి డాక్టర్‌ను సంప్రదించండి.' : 'Please confirm with your healthcare professional.');
      const instructions = m.instructions ? (isTe ? translateInstructionsToTelugu(m.instructions) : m.instructions) : (isTe ? 'దయచేసి డాక్టర్‌ను సంప్రదించండి.' : 'Please confirm with your healthcare professional.');

      html += `
        <tr>
          <td class="med-name-cell">
            <strong>${escapeHtml(name)}</strong>
            <span class="tag">${isTe ? 'సూచించిన మోతాదు' : 'Prescribed Dose'}</span>
          </td>
          <td><strong>${escapeHtml(dose)}</strong></td>
          <td>${escapeHtml(timing)}</td>
          <td>${escapeHtml(duration)}</td>
          <td class="instructions-cell">
            <span class="caution">${escapeHtml(instructions)}</span>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  // ============================================================
  // CLINICAL DIET ENGINE: CONDITION-SPECIFIC & MEDICATION REMEDIES
  // ============================================================
  const CLINICAL_DIET_PLANS = {
    cardiac: {
      conditionName: "Cardiovascular Recovery & Post-Cardiac Surgery Protocol",
      description: "Low-sodium, heart-healthy fats, high soluble fiber, and vascular anti-inflammatory nutrition designed to protect bypass grafts and coronary arteries.",
      eat: [
        { food: "Oatmeal & Oat Bran", reason: "Rich in beta-glucan soluble fiber; binds cholesterol in digestive tract and lowers LDL levels." },
        { food: "Steamed / Boiled Vegetables (Bottle gourd, Zucchini, Green beans)", reason: "Easily digestible, high in antioxidants without placing mechanical strain on the heart." },
        { food: "Flaxseeds & Chia Seeds (Ground)", reason: "Plant-based Omega-3 alpha-linolenic acid (ALA) supports arterial flexibility and vascular healing." },
        { food: "Pomegranate & Berries (Fresh)", reason: "Potent polyphenols and anthocyanins enhance nitric oxide bioavailability and protect graft endothelium." },
        { food: "Clear Garlic-Ginger Vegetable Broth", reason: "Promotes circulation, anti-inflammatory support, and prevents fluid retention when prepared with minimal salt." },
        { food: "Moong Dal Khichdi (Mildly spiced)", reason: "Light, balanced convalescent protein-carbohydrate ratio that does not trigger postprandial cardiovascular workload." }
      ],
      limit: [
        { food: "Table Salt & Cooking Salt", reason: "Strict limit: Under 1500 mg sodium daily (about 2/3 teaspoon) to avoid fluid overload and sternal edema." },
        { food: "Eggs (Limit to boiled egg whites)", reason: "Avoid cholesterol-heavy whole yolks during early CABG recovery; prefer egg whites." },
        { food: "Low-Fat Skimmed Milk", reason: "Limit to 1 small cup (150 ml) daily to moderate saturated fat." },
        { food: "Tea / Coffee", reason: "Limit to 1 cup daily; excessive caffeine elevates resting heart rate and counteracts beta-blockers." }
      ],
      avoid: [
        { food: "Deep-Fried Snacks (Samosas, Pakoras, Vada)", reason: "Trans fats and oxidized lipids trigger acute vascular inflammation and accelerate arterial plaque formation." },
        { food: "Red Meat, Mutton & Organ Meats", reason: "Very high saturated fats and cholesterol; increases post-surgery cardiac stress." },
        { food: "Pickles, Papads & Salt-Cured Items", reason: "Concentrated sodium causes acute fluid retention, hypertension, and graft strain." },
        { food: "Bakery Pastries & Commercial Ghee Sweets", reason: "Hydrogenated fats and refined sugars trigger oxidative stress in healing coronary vessels." },
        { food: "Alcohol & Aerated Sodas", reason: "Cardiac depressant, dehydrating, and disrupts cardiac rhythm and anticoagulant therapy." }
      ]
    },
    hypertension: {
      conditionName: "Hypertension & Vascular DASH Protocol",
      description: "Dietary Approaches to Stop Hypertension: High magnesium, controlled potassium, strictly restricted sodium, and nitrate-rich vasodilators.",
      eat: [
        { food: "Steamed Spinach & Leafy Greens", reason: "Rich in dietary nitrates and magnesium that naturally relax arterial walls." },
        { food: "Beetroot (Steamed or Soup)", reason: "Nitric oxide precursor that demonstrably lowers systolic and diastolic pressure." },
        { food: "Unsalted Almonds & Walnuts (Soaked)", reason: "Delivers magnesium, healthy monounsaturated fats, and Vitamin E for vascular health." },
        { food: "Fresh Coconut Water (Moderate)", reason: "Natural source of potassium to counterbalance sodium levels (avoid if on ACE-inhibitors with elevated potassium)." },
        { food: "Brown Rice & Millets (Foxtail, Ragi)", reason: "Complex carbohydrates with high fiber to prevent insulin spikes that stiffen arteries." }
      ],
      limit: [
        { food: "Salt / Added Sodium", reason: "Strict sodium restriction below 1500 mg per day." },
        { food: "Caffeine & Black Tea", reason: "Transiently constricts peripheral blood vessels." },
        { food: "Dairy Cheese / Butter", reason: "High sodium and saturated fats." }
      ],
      avoid: [
        { food: "Processed Canned Soups & Instant Noodles", reason: "Extremely high hidden sodium (>1000 mg per serving)." },
        { food: "Pickles, Salted Nuts & Chips", reason: "Acute sodium load elevates blood pressure within hours." },
        { food: "Processed Meats (Sausages, Salami)", reason: "Sodium nitrates stiffen vascular linings." },
        { food: "Licorice & Heavy Salt Substitutes without doctor approval", reason: "Can cause severe potassium imbalance and paradoxical hypertension." }
      ]
    },
    diabetes: {
      conditionName: "Glycemic Balance & Metabolic Stabilization Diet",
      description: "Low-glycemic-index whole grains, viscous soluble fiber, and blood-sugar stabilizing botanicals to maintain euglycemia post-discharge.",
      eat: [
        { food: "Methi (Fenugreek) Seeds & Greens", reason: "Slows carbohydrate absorption and improves insulin sensitivity." },
        { food: "Bitter Gourd (Karela) Steamed / Curry", reason: "Contains polypeptide-p and charantin with natural insulin-mimetic properties." },
        { food: "Steel-Cut Oats & Barley (Jau)", reason: "Low glycemic index, rich in beta-glucans preventing postprandial glucose spikes." },
        { food: "Sprouted Moong Dal & Chana", reason: "High protein and fiber profile moderates glucose release." },
        { food: "Guava & Green Apple (Unsweetened)", reason: "Low glycemic fruits rich in dietary fiber and pectin." }
      ],
      limit: [
        { food: "White Rice / Polished Grains", reason: "Rapid starch breakdown causes sugar spikes; replace with brown rice or quinoa." },
        { food: "Potatoes & Root Vegetables", reason: "Moderate portions; always boil or steam rather than fry." },
        { food: "Sweet Fruits (Mango, Grapes, Chiku)", reason: "High natural fructose; limit to small occasional portions." }
      ],
      avoid: [
        { food: "Refined White Sugar, Jaggery & Honey", reason: "Triggers immediate glycemic excursions and stresses pancreatic beta-cells." },
        { food: "Packaged Fruit Juices & Sodas", reason: "Concentrated liquid sugar causes dangerous hyperglycemia." },
        { food: "Maida / White Flour Bakery Products", reason: "Refined starches trigger rapid glucose absorption." },
        { food: "Deep-Fried Sweets (Jalebi, Gulab Jamun)", reason: "Combination of trans fats and sugar triggers severe insulin resistance." }
      ]
    },
    gastrointestinal: {
      conditionName: "Gastroprotective & Acid-Neutralizing Diet",
      description: "Non-acidic, gentle alkaline and mucosal-coating foods designed to soothe gastric lining, reduce acid reflux, and promote ulcer healing.",
      eat: [
        { food: "Tender Coconut Water", reason: "Natural soothing electrolyte with alkaline pH that neutralizes excess stomach acid." },
        { food: "Oatmeal Gruel with Water", reason: "Mucilaginous fiber coats the stomach lining and absorbs excess gastric acid." },
        { food: "Ripe Bananas", reason: "Contains natural antacid properties and stimulates mucus production in the gastric wall." },
        { food: "Fresh Homemade Buttermilk (Plain, no chili)", reason: "Lactic acid probiotics calm gut inflammation and restore microbiome." },
        { food: "Steamed Bottle Gourd (Lauki) & Pumpkin", reason: "Soft, alkaline, extremely easy to digest without causing gastric distension." }
      ],
      limit: [
        { food: "Dairy Milk", reason: "May temporarily soothe but triggers rebound acid secretion 2 hours later." },
        { food: "Mild Ginger / Cumin Seasoning", reason: "Use sparingly for digestive aid; avoid excessive heat." },
        { food: "Wheat / Chapati", reason: "Keep chapatis thin and soft without oil or ghee." }
      ],
      avoid: [
        { food: "Red Chili Powder, Black Pepper & Garam Masala", reason: "Direct chemical irritant to gastric mucosa; worsens ulcers and reflux." },
        { food: "Citrus Fruits (Lemons, Oranges, Tomatoes)", reason: "High citric acid content aggravates erosive gastritis and heartburn." },
        { food: "Coffee, Strong Tea & Carbonated Drinks", reason: "Relaxes lower esophageal sphincter (LES) causing severe acid reflux." },
        { food: "Deep-Fried & Greasy Foods", reason: "Delays gastric emptying time, increasing acid exposure to stomach wall." }
      ]
    },
    renal: {
      conditionName: "Renal Protective & Electrolyte Controlled Diet",
      description: "Carefully calibrated protein, low sodium, restricted potassium and phosphorus to minimize renal filtration workload.",
      eat: [
        { food: "Boiled White Rice & White Bread", reason: "Lower in potassium and phosphorus compared to whole wheat/millets." },
        { food: "Egg Whites (Boiled)", reason: "Highest biological value protein with minimal phosphorus waste products." },
        { food: "Leached Steamed Vegetables (Cauliflower, Cabbage)", reason: "Soaking and double-boiling removes excess potassium." },
        { food: "Apples & Blueberries", reason: "Kidney-friendly low-potassium fruits." }
      ],
      limit: [
        { food: "Fluid & Water Intake", reason: "Strictly adhere to doctor's daily fluid prescription (usually 1000 - 1500 ml total)." },
        { food: "Lentils & Dals", reason: "Limit portions to control nitrogenous waste (BUN and creatinine)." }
      ],
      avoid: [
        { food: "Potassium Salt Substitutes (Lite Salt / NoSalt)", reason: "Can cause fatal cardiac arrest due to acute hyperkalemia." },
        { food: "Bananas, Coconut Water & Oranges", reason: "Very high potassium content; kidneys cannot filter excess potassium." },
        { food: "Cola Beverages & Processed Cheeses", reason: "High in inorganic phosphorus which leaches calcium from bones." },
        { food: "Spinach & Dried Fruits", reason: "High oxalates and potassium." }
      ]
    },
    post_surgery: {
      conditionName: "Post-Surgical Tissue Repair & Wound Healing Diet",
      description: "High-protein healing matrix, Vitamin C, Zinc, and gentle roughage to rebuild tissues and prevent post-anesthesia constipation.",
      eat: [
        { food: "Moong Dal & Paneer (Soft, unsalted)", reason: "Provides essential amino acids (arginine, glutamine) for wound closure." },
        { food: "Amla (Indian Gooseberry) & Guava", reason: "Concentrated Vitamin C essential for collagen synthesis and tensile wound strength." },
        { food: "Warm Clear Bone Broth / Lentil Soup", reason: "Delivers glycine, proline, and hydration for cellular regeneration." },
        { food: "Papaya (Ripe, peeled)", reason: "Soft fruit with papain enzyme aiding digestion and bowel motility." },
        { food: "Pumpkin Seeds & Sunflower Seeds (Crushed)", reason: "Rich in zinc, a key cofactor for cellular division and re-epithelialization." }
      ],
      limit: [
        { food: "Dairy Milk", reason: "Limit to 1 glass to prevent gas and sluggish bowels after surgery." },
        { food: "Refined Starches", reason: "Can cause constipation when pain medications are being taken." }
      ],
      avoid: [
        { food: "Heavily Spiced & Oily Curries", reason: "Causes nausea, heartburn, and digestive discomfort while recumbent." },
        { food: "Gas-Producing Legumes (Rajma, Chana, Raw Cabbage)", reason: "Excess intestinal gas puts pressure on surgical incisions." },
        { food: "Alcohol & Nicotine", reason: "Constricts microvasculature, starving healing surgical wounds of oxygen." },
        { food: "Hard, Tough Raw Foods", reason: "Difficult to chew and digest during early recovery." }
      ]
    },
    liver: {
      conditionName: "Hepato-Biliary Sparing & Detoxification Diet",
      description: "Ultra-low-fat, non-taxing carbohydrates, clean antioxidants to allow hepatocytes to regenerate.",
      eat: [
        { food: "Fresh Sugarcane Juice / Coconut Water (Hygienic)", reason: "Easily metabolizable simple glucose without requiring heavy bile emulsification." },
        { food: "Boiled Vegetables (Bottle gourd, Ridge gourd)", reason: "Zero lipid load on liver; gentle on bile ducts." },
        { food: "Steamed White Rice with Curd", reason: "Light carbohydrate and probiotic to support liver-gut axis." },
        { food: "Papaya & Radish Leaves Juice", reason: "Traditional hepatic tonics aiding bile flow and liver enzyme stabilization." }
      ],
      limit: [
        { food: "Cooking Oils & Ghee", reason: "Strict limit to less than 1 teaspoon per day." },
        { food: "Proteins", reason: "Moderate light proteins; avoid heavy protein loads that generate ammonia." }
      ],
      avoid: [
        { food: "All Alcohol Products", reason: "Direct hepatocellular toxin; absolutely prohibited." },
        { food: "Fried Foods, Pakoras & Butter", reason: "Stresses impaired bile production and triggers hepatic inflammation." },
        { food: "Stale or Street Foods", reason: "Risk of viral hepatitis or bacterial endotoxin burden." }
      ]
    },
    respiratory: {
      conditionName: "Pulmonary Anti-Inflammatory & Airway Support Diet",
      description: "Mucus-clearing, antioxidant-rich, warm anti-inflammatory foods supporting bronchial dilation and diaphragmatic endurance.",
      eat: [
        { food: "Warm Ginger, Turmeric & Tulsi Tea", reason: "Natural bronchodilating, antimicrobial and airway soothing properties." },
        { food: "Warm Soups with Crushed Black Pepper", reason: "Piperine and warm vapors help thin and expel bronchial secretions." },
        { food: "Walnuts & Flaxseeds", reason: "Omega-3s reduce airway inflammation and reactive spasms." },
        { food: "Garlic (Cooked lightly)", reason: "Contains allicin with pulmonary antibacterial and anti-inflammatory action." }
      ],
      limit: [
        { food: "Chilled Foods & Ice Water", reason: "Can trigger reflexive bronchospasm and coughing fits." },
        { food: "Heavy Gassy Foods", reason: "Abdominal bloating pushes against diaphragm, impairing full lung expansion." }
      ],
      avoid: [
        { food: "Refrigerated Curd & Cold Ice Creams", reason: "Stimulates thick mucus secretion in sensitive airways." },
        { food: "Sulfite-Containing Preserved Foods (Wine, Dried Fruits)", reason: "Known triggers for acute bronchial wheezing." },
        { food: "Excess Sodium & Salty Chips", reason: "Can promote airway edema." }
      ]
    },
    convalescent: {
      conditionName: "Post-Discharge Restorative & Convalescent Diet",
      description: "Light, easily digestible, nutrient-dense nutrition to restore strength, energy, and gastrointestinal equilibrium.",
      eat: [
        { food: "Steamed Rice & Moong Khichdi", reason: "Gentle carbohydrate-protein combination supporting cellular recovery." },
        { food: "Oatmeal with Light Milk or Water", reason: "Soluble fiber restores regular bowel rhythm." },
        { food: "Clear Vegetable Soups", reason: "Provides vital electrolytes, sodium balance, and systemic hydration." },
        { food: "Steamed Seasonal Vegetables", reason: "Delivers essential vitamins and minerals without gastrointestinal fatigue." },
        { food: "Ripe Bananas & Stewed Apples", reason: "Provides potassium and gentle pectin fiber." }
      ],
      limit: [
        { food: "Full-Fat Dairy", reason: "Prefer low-fat or skimmed milk during initial convalescence." },
        { food: "Tea & Coffee", reason: "Limit to 1 small cup daily; avoid taking with iron-rich meals." },
        { food: "Table Salt", reason: "Maintain mild seasoning to support balanced blood pressure." },
        { food: "Eggs", reason: "Limit to 1 boiled egg daily." }
      ],
      avoid: [
        { food: "Deep-Fried Foods", reason: "High in trans fats, irritates digestive tract and delays convalescence." },
        { food: "Heavily Spiced Curries", reason: "Triggers heartburn and gastrointestinal upset post-discharge." },
        { food: "Packaged Salty Chips & Snacks", reason: "Excessive chemical preservatives and sodium." },
        { food: "Sugary Carbonated Sodas", reason: "Rapid sugar spikes without nutritional benefit." },
        { food: "Alcohol", reason: "Interferes with medication clearance and delays tissue recovery." }
      ]
    }
  };

  const MEDICATION_REMEDIES = [
    {
      pattern: /aspirin|ecosprin|disprin/i,
      name: "Aspirin (Blood Thinner)",
      sideEffect: "Stomach lining irritation, gastric burning, micro-ulceration, and nausea.",
      remedy: "Take after food with water. Eat soothing mucilage foods (warm oatmeal, ripe bananas, tender coconut water).",
      include: "Warm oatmeal, ripe bananas, coconut water, steamed gourd",
      avoid: "Taking on an empty stomach, sour citrus juices, hot spices, alcohol"
    },
    {
      pattern: /clopidogrel|plavix/i,
      name: "Clopidogrel (Antiplatelet)",
      sideEffect: "Increased bleeding time, easy bruising, mild abdominal distress.",
      remedy: "Pair with bland, cooked convalescent meals. Avoid taking with unverified high-dose herbal blood-thinners.",
      include: "Boiled rice and dal, steamed pumpkin, light broths",
      avoid: "High-dose Ginkgo Biloba, excess raw garlic supplements, alcohol"
    },
    {
      pattern: /atorvastatin|rosuvastatin|simvastatin|lipitor/i,
      name: "Atorvastatin / Statins (Cholesterol)",
      sideEffect: "Muscle aches (myopathy), liver metabolism load. Dangerous interaction with grapefruit.",
      remedy: "STRICT WARNING: Avoid Grapefruit and grapefruit juice completely (blocks CYP3A4 enzyme). Support muscle health with CoQ10 foods and water.",
      include: "Steamed broccoli, lentils, soaked walnuts, chia seeds, adequate water (2L/day)",
      avoid: "Grapefruit & Grapefruit Juice (STRICTLY PROHIBITED), excessive saturated animal fat"
    },
    {
      pattern: /metoprolol|atenolol|bisoprolol|carvedilol|betaloc/i,
      name: "Metoprolol (Beta-Blocker)",
      sideEffect: "Fatigue, slowed heart rate, postural dizziness, mild potassium retention.",
      remedy: "Eat regular small meals to prevent sudden energy dips. Avoid excessive caffeine which opposes heart-rate regulation.",
      include: "Whole grains, moong dal, magnesium-rich soaked almonds, clear broths",
      avoid: "Excessive coffee, tea or energy drinks; skipping meals; unverified potassium supplements"
    },
    {
      pattern: /ramipril|enalapril|lisinopril|telmisartan|losartan/i,
      name: "Ramipril (ACE-Inhibitor)",
      sideEffect: "Hyperkalemia (high blood potassium), dry cough, postural dizziness.",
      remedy: "STRICT WARNING: Do NOT use potassium-based salt substitutes (like Lite Salt / NoSalt). Moderate intake of heavy potassium foods.",
      include: "Steamed squash, light rice and dal, peeled apples, adequate plain water",
      avoid: "Potassium-based salt substitutes (Lite Salt), excessive dried apricots, unmonitored banana binging"
    },
    {
      pattern: /pantoprazole|omeprazole|rabeprazole|esomeprazole|pan-40/i,
      name: "Pantoprazole (Antacid / PPI)",
      sideEffect: "Reduced gastric acid; lowers absorption of Vitamin B12, Calcium, and Iron over extended use.",
      remedy: "Take 30 minutes before breakfast. Include fortified foods, curd/yogurt, and soaked seeds to support micronutrient absorption.",
      include: "Fresh homemade curd/yogurt, soaked almonds, fortified oats, stewed apples",
      avoid: "Taking immediately after meals (must take on empty stomach), late-night heavy oily dinners"
    },
    {
      pattern: /paracetamol|acetaminophen|tylenol|dolo/i,
      name: "Paracetamol / Dolo (Pain / Fever)",
      sideEffect: "Hepatic metabolic load if combined with alcohol or prolonged fasting.",
      remedy: "Always drink water; take with light crackers, toast, or khichdi.",
      include: "Clear vegetable soups, toast, warm water, electrolyte fluids",
      avoid: "Alcohol (severe risk of liver toxicity), exceeding 4000 mg daily"
    },
    {
      pattern: /amoxicillin|azithromycin|ciprofloxacin|cefixime|augmentin/i,
      name: "Antibiotics",
      sideEffect: "Depletion of gut flora, loose stools, abdominal cramping.",
      remedy: "Consume probiotic foods (fresh curd, buttermilk) separated by 2 hours from the antibiotic dose.",
      include: "Fresh unsweetened curd/yogurt, probiotic buttermilk, rice gruel (kanji)",
      avoid: "Taking at the exact same minute as high-calcium dairy (separate by 2 hours), alcohol"
    },
    {
      pattern: /furosemide|lasix|torsemide|hydrochlorothiazide/i,
      name: "Furosemide / Diuretics (Lasix)",
      sideEffect: "Excessive urinary fluid loss, loss of electrolytes (potassium, sodium, magnesium), dehydration.",
      remedy: "Monitor fluid output. Replenish natural electrolytes with coconut water or diluted lemon water under doctor supervision.",
      include: "Diluted lemon water with a pinch of rock salt, coconut water (if potassium is normal)",
      avoid: "Excess salt (defeats water removal), dehydrating alcohol"
    }
  ];

  function detectConditionKey(diagnosisText) {
    const d = (diagnosisText || '').toLowerCase();
    if (/card|coronary|cabg|bypass|angio|heart|myocardial|infarct|artery disease|cad\b/i.test(d)) return 'cardiac';
    if (/hypertens|high blood pressure|htn\b|bp\b/i.test(d)) return 'hypertension';
    if (/diabet|sugar|glucose|glycem|t2dm|t1dm/i.test(d)) return 'diabetes';
    if (/gerd|gastric|gastritis|ulcer|acid|reflux|peptic|stomach/i.test(d)) return 'gastrointestinal';
    if (/kidney|renal|ckd|nephro|creatinine|dialysis/i.test(d)) return 'renal';
    if (/surg|post-op|wound|incision|laparoscop|cholecyst|append/i.test(d)) return 'post_surgery';
    if (/liver|hepat|jaundice|cirrhosis|fatty liver|steatosis|sgpt/i.test(d)) return 'liver';
    if (/respir|asthma|copd|bronch|pneumon|lung|cough|pulmon/i.test(d)) return 'respiratory';
    return 'convalescent';
  }

  function evaluateMedicationRemedies(medicinesList) {
    if (typeof window !== "undefined" && typeof window.evaluateMedicationRemedies === "function") {
      return window.evaluateMedicationRemedies(medicinesList);
    }
    const remedies = [];
    const seenPatterns = new Set();

    if (Array.isArray(medicinesList)) {
      medicinesList.forEach(m => {
        const name = typeof m === 'string' ? m : (m?.name || '');
        MEDICATION_REMEDIES.forEach((rem, idx) => {
          if (rem.pattern.test(name) && !seenPatterns.has(idx)) {
            seenPatterns.add(idx);
            remedies.push({
              medName: name,
              remedyTitle: rem.name,
              sideEffect: rem.sideEffect,
              remedy: rem.remedy,
              include: rem.include,
              avoid: rem.avoid
            });
          }
        });
      });
    }

    return remedies;
  }

  function generatePersonalizedDiet(diagnosis, medicines, rawDietText) {
    let basePlan;
    if (window.CLINICAL_DISEASES_DB && window.matchDiseaseCondition) {
      const conditionKey = window.matchDiseaseCondition(diagnosis);
      const matched = window.CLINICAL_DISEASES_DB[conditionKey] || window.CLINICAL_DISEASES_DB.general_convalescence;
      basePlan = JSON.parse(JSON.stringify(matched));
      basePlan.conditionName = basePlan.name;
    } else {
      const conditionKey = detectConditionKey(diagnosis);
      basePlan = JSON.parse(JSON.stringify(CLINICAL_DIET_PLANS[conditionKey] || CLINICAL_DIET_PLANS.convalescent));
    }
    const medRemedies = evaluateMedicationRemedies(medicines);

    // Inject medication specific countermeasures into avoid/eat lists
    medRemedies.forEach(r => {
      if (r.remedyTitle && r.remedyTitle.includes('Statin')) {
        basePlan.avoid.unshift({
          food: "Grapefruit & Grapefruit Juice",
          reason: "STRICT DRUG INTERACTION: Blocks CYP3A4 enzyme, causing dangerous toxic blood levels of statins and muscle injury."
        });
      }
      if (r.remedyTitle && r.remedyTitle.includes('ACE-Inhibitor')) {
        basePlan.avoid.unshift({
          food: "Potassium Salt Substitutes (Lite Salt / NoSalt)",
          reason: "STRICT DRUG INTERACTION: High danger of severe hyperkalemia (cardiac arrest risk) when combined with ACE inhibitors."
        });
      }
      if (r.remedyTitle && r.remedyTitle.includes('Aspirin')) {
        basePlan.eat.unshift({
          food: "Warm Oatmeal & Soothing Bananas",
          reason: "TABLET REMEDY: Protects gastric mucosa from micro-ulceration and acid burning caused by regular Aspirin intake."
        });
      }
    });

    if (rawDietText && typeof rawDietText === 'string' && rawDietText.trim().length > 3) {
      basePlan.customHospitalAdvice = rawDietText.trim();
    }

    // Enrich Diet Options with comprehensive, wholesome simple Indian foods
    const commonIndianEat = [
      { food: "Moong Dal Khichdi", reason: "Light, easily digestible protein and carbohydrate blend gentle on the stomach." },
      { food: "Boiled White / Brown Rice", reason: "Clean, easily absorbed energy without gastrointestinal strain." },
      { food: "Steamed Lauki (Bottle Gourd) & Turai", reason: "High water content and cooling properties that soothe the digestive tract." },
      { food: "Fresh Homemade Dahi (Curd)", reason: "Probiotics replenish healthy gut flora post-antibiotics and improve digestion." },
      { food: "Chaas (Fresh Buttermilk with Jeera)", reason: "Hydrates, reduces acidity, and calms medication stomach burning." },
      { food: "Dalia (Broken Wheat Porridge)", reason: "High soluble fiber supporting regular bowel movements during bed rest." },
      { food: "Ripe Bananas (Kela)", reason: "Natural potassium and gentle pectin fiber that soothe digestive mucosa." },
      { food: "Clear Moong Dal Soup & Vegetable Shorba", reason: "Provides systemic hydration, minerals, and light protein." },
      { food: "Fresh Soft Paneer (Cottage Cheese)", reason: "Clean lean protein vital for post-operative wound healing and cellular repair." },
      { food: "Boiled Egg Whites", reason: "Pure albumin protein that accelerates tissue regeneration and surgical healing." },
      { food: "Tender Coconut Water (Nariyal Pani)", reason: "Natural isotonic electrolytes balancing sodium, potassium, and magnesium." },
      { food: "Plain Toast / Rusk", reason: "Absorbs excess gastric acid and prevents morning nausea." },
      { food: "Steamed Pumpkin (Kaddu) & Carrots", reason: "Rich in beta-carotene and vitamin A for tissue recovery and immune defense." },
      { food: "Warm Water with Roasted Cumin (Jeera)", reason: "Relieves gas, abdominal bloating, and post-meal heaviness." }
    ];

    const commonIndianLimit = [
      { food: "Full-Fat Buffalo Milk & Malai", reason: "Heavy saturated fats slow down stomach emptying; prefer skimmed cow's milk." },
      { food: "Tea & Filter Coffee", reason: "Limit to 1 small cup; excess caffeine causes dehydration and increases acidity." },
      { food: "Cooking Oil & Desi Ghee", reason: "Limit to 1-2 teaspoons daily; avoid heavy greasy tadkas during recovery." },
      { food: "Table Salt (Sodium)", reason: "Keep under 1 teaspoon daily to prevent fluid retention and ankle swelling." },
      { food: "Whole Egg Yolks", reason: "Limit to 1 egg daily; egg whites preferred to prevent digestive heaviness." },
      { food: "Refined Flour (Maida, White Bread)", reason: "Lacks fiber and can induce post-operative constipation." },
      { food: "Raw Crunchy Salads", reason: "Difficult for healing intestines to digest; prefer boiled or steamed vegetables." },
      { food: "Heavy Pulses (Rajma, Chana, Urad)", reason: "Produces gas and abdominal fullness; prefer light moong dal." }
    ];

    const commonIndianAvoid = [
      { food: "Deep-Fried Snacks (Samosas, Pakoras, Vada)", reason: "Trans fats and oxidized oils trigger acute indigestion, reflux, and inflammation." },
      { food: "Heavily Spiced & Oily Curries", reason: "Hot red chilies, garam masala, and excess garlic irritate stomach lining." },
      { food: "Pickles (Achar), Papads & Salted Chips", reason: "Extreme sodium concentration increases blood pressure and causes water retention." },
      { food: "Alcohol & Tobacco (Strict Prohibition)", reason: "Interferes with medication clearance, burdens liver, and stops healing." },
      { food: "Carbonated Sodas & Fizzy Drinks", reason: "Carbonic acid and high refined sugar produce acute abdominal gas." },
      { food: "Street Food & Roadside Chaat", reason: "High risk of bacterial food poisoning and waterborne infections during recovery." },
      { food: "Very Sour Foods (Imli, Raw Mango, Vinegar)", reason: "High acid concentration aggravates post-discharge reflux and heartburn." },
      { food: "Late-Night Heavy Dinners", reason: "Disrupts sleep and triggers nocturnal acid reflux; finish dinner 2 hours before bed." }
    ];

    // Combine basePlan items with commonIndian items without duplicates as a safety fallback
    // Each condition now has 10-14 rich, condition-specific items in CLINICAL_DISEASES_DB.
    // We only merge standard gentle staples as a fallback if the condition list is unusually sparse (< 8 items).
    const mergeItems = (baseItems, defaultItems, minCount) => {
      const result = Array.isArray(baseItems) ? [...baseItems] : [];
      if (result.length >= minCount) return result;
      const seen = new Set(result.map(i => (i.food || i.name || '').toLowerCase().trim()));
      for (const item of defaultItems) {
        const key = item.food.toLowerCase().trim();
        if (!seen.has(key)) {
          seen.add(key);
          result.push(item);
        }
        if (result.length >= minCount) break;
      }
      return result;
    };

    basePlan.eat = mergeItems(basePlan.eat, commonIndianEat, 8);
    basePlan.limit = mergeItems(basePlan.limit, commonIndianLimit, 4);
    basePlan.avoid = mergeItems(basePlan.avoid, commonIndianAvoid, 4);

    return {
      ...basePlan,
      medicationRemedies: medRemedies
    };
  }

  function initDietConditionSelector() {
    const select = $('diet-condition-select');
    if (!select || !window.CLINICAL_DISEASES_DB) return;
    if (select.children.length > 0) return; // already populated

    const operations = [];
    const diseases = [];
    const others = [];

    for (const [key, item] of Object.entries(window.CLINICAL_DISEASES_DB)) {
      if (item.type === 'operation' || key.startsWith('op_')) {
        operations.push({ key, name: item.name });
      } else if (item.type === 'disease' || key.startsWith('dis_')) {
        diseases.push({ key, name: item.name });
      } else {
        others.push({ key, name: item.name });
      }
    }

    operations.sort((a, b) => a.name.localeCompare(b.name));
    diseases.sort((a, b) => a.name.localeCompare(b.name));

    let html = '';
    if (operations.length > 0) {
      html += `<optgroup label="Surgical Operations & Procedures (${operations.length})">`;
      operations.forEach(op => {
        html += `<option value="${op.key}">🔪 ${escapeHtml(op.name)}</option>`;
      });
      html += `</optgroup>`;
    }
    if (diseases.length > 0) {
      html += `<optgroup label="Medical Conditions & Diseases (${diseases.length})">`;
      diseases.forEach(dis => {
        html += `<option value="${dis.key}">🩺 ${escapeHtml(dis.name)}</option>`;
      });
      html += `</optgroup>`;
    }
    if (others.length > 0) {
      html += `<optgroup label="General Nutrition Protocols">`;
      others.forEach(oth => {
        html += `<option value="${oth.key}">📋 ${escapeHtml(oth.name)}</option>`;
      });
      html += `</optgroup>`;
    }

    select.innerHTML = html;

    const countBadge = $('diet-total-conditions-badge');
    if (countBadge) {
      countBadge.textContent = `${operations.length + diseases.length + others.length} Protocols (${operations.length} Surgeries + ${diseases.length} Diseases)`;
    }

    select.addEventListener('change', (e) => {
      const selectedKey = e.target.value;
      if (window.CLINICAL_DISEASES_DB && window.CLINICAL_DISEASES_DB[selectedKey]) {
        const proto = JSON.parse(JSON.stringify(window.CLINICAL_DISEASES_DB[selectedKey]));
        const meds = (state.patientData && state.patientData.medicines) || (SAMPLE_PATIENT && SAMPLE_PATIENT.medicines) || [];
        const advice = (state.patientData && state.patientData.dietInstructions) || (state.patientData && state.patientData.rawDietText) || '';
        // Dynamically generate personalized diet for newly selected condition
        const fullPlan = generatePersonalizedDiet(proto.name, meds, advice);
        fullPlan.key = selectedKey;
        fullPlan.conditionName = proto.name;
        fullPlan.description = proto.description;
        if (state.patientData) {
          state.patientData.dietPlan = fullPlan;
        }
        renderDietPlan(fullPlan);
      }
    });
  }

    function renderMedicationRemediesCards(remediesList, isSearchResult) {
    const medListEl = $('diet-med-remedies-list');
    const medBadge = $('diet-med-count-badge');
    if (!medListEl) return;
    const isTe = (state.currentLang === 'te');

    if (medBadge) {
      if (isSearchResult) {
        medBadge.textContent = isTe ? `${remediesList.length} సరిపోలిన మందులు` : `${remediesList.length} Matching Medicines`;
      } else {
        medBadge.textContent = remediesList.length > 0
          ? (isTe ? `${remediesList.length} క్రియాశీల రక్షణలు` : `${remediesList.length} Active Defenses`)
          : (isTe ? 'ప్రామాణిక మార్గదర్శకాలు' : 'Standard Safe Guidance');
      }
    }

    if (!remediesList || remediesList.length === 0) {
      medListEl.innerHTML = `
        <div style="grid-column: 1 / -1; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 0.85rem 1rem; color: #92400e; font-size: 0.85rem;">
          <strong style="font-size: 0.9rem;">${isTe ? '🛡️ సాధారణ టాబ్లెట్ రక్షణ మార్గదర్శకాలు:' : '🛡️ General Convalescent Tablet Defense:'}</strong>
          <ul style="margin: 0.35rem 0 0 0; padding-left: 1.25rem; font-size: 0.82rem; color: var(--slate-700); line-height: 1.5;">
            <li><strong>${isTe ? 'పూర్తి గ్లాసు నీటితో మింగండి:' : 'Swallow with full glass of water:'}</strong> ${isTe ? 'గొంతులో మంటను నివారిస్తుంది మరియు ఔషధం చక్కగా గ్రహించబడేలా చేస్తుంది.' : 'Prevents throat irritation and aids proper absorption.'}</li>
            <li><strong>${isTe ? 'తేలికపాటి ఆహారంతో తీసుకోండి:' : 'Take with light meals:'}</strong> ${isTe ? 'కడుపును శాంతింపజేయడానికి పెసరపప్పు కిచిడీ, ఉడికించిన అన్నం లేదా బ్రెడ్ టోస్ట్‌తో కలిపి తీసుకోండి.' : 'Pair with Moong Dal Khichdi, Boiled Rice, or Toast to soothe stomach.'}</li>
            <li><strong>${isTe ? 'మద్యపానం పూర్తిగా నివారించండి:' : 'Zero Alcohol:'}</strong> ${isTe ? 'మద్యపానం ఖచ్చితంగా నివారించండి; డాక్టర్ సలహా లేకుండా అదనపు మోతాదులు తీసుకోకండి.' : 'Strictly avoid alcohol; never take extra doses without clinical review.'}</li>
          </ul>
        </div>
      `;
      return;
    }

    medListEl.innerHTML = remediesList.map(r => {
      const name = isTe ? translateMedNameToTelugu(r.remedyTitle || r.medName) : (r.remedyTitle || r.medName);
      const sideEffects = isTe ? translateSideEffectToTelugu(r.sideEffect) : r.sideEffect;
      const remedy = isTe ? translateRemedyTextToTelugu(r.remedy) : r.remedy;
      const include = r.include ? (isTe ? translateFoodListToTelugu(r.include) : convertToSimpleIndianFoodName(r.include)) : '';
      const avoid = r.avoid ? (isTe ? translateFoodListToTelugu(r.avoid) : convertToSimpleIndianFoodName(r.avoid)) : '';
      const warning = r.warning ? (isTe ? translateWarningTextToTelugu(r.warning) : r.warning) : '';

      return `
      <div style="background: #ffffff; border: 1px solid #fed7aa; border-radius: 8px; padding: 0.85rem 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 0.3rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ffedd5; padding-bottom: 0.35rem;">
          <strong style="color: #9a3412; font-size: 0.92rem;">💊 ${escapeHtml(name)}</strong>
          <span style="font-size: 0.72rem; background: #fff7ed; color: #c2410c; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 600; border: 1px solid #ffedd5;">${isTe ? 'ఆరోగ్య రక్షణ' : 'Care Defense'}</span>
        </div>
        <div style="font-size: 0.8rem; color: #9a3412;">
          <strong>${isTe ? 'దుష్ప్రభావాలు:' : 'Effects:'}</strong> ${escapeHtml(sideEffects)}
        </div>
        <div style="font-size: 0.8rem; color: var(--slate-700); line-height: 1.4;">
          <strong>${isTe ? '🛡️ ఆహార పరిష్కారం:' : '🛡️ Remedy:'}</strong> ${escapeHtml(remedy)}
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.2rem; margin-top: 0.15rem;">
          ${include ? `
          <div style="font-size: 0.76rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 0.25rem 0.5rem; color: #166534;">
            <strong>${isTe ? '✅ తీసుకోవలసిన ఆహారాలు:' : '✅ Include:'}</strong> ${escapeHtml(include)}
          </div>` : ''}
          ${avoid ? `
          <div style="font-size: 0.76rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 0.25rem 0.5rem; color: #991b1b;">
            <strong>${isTe ? '❌ నివారించవలసిన ఆహారాలు:' : '❌ Avoid:'}</strong> ${escapeHtml(avoid)}
          </div>` : ''}
        </div>
        ${warning ? `
        <div style="font-size: 0.75rem; background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 0.25rem 0.5rem; color: #92400e; margin-top: 0.15rem;">
          <strong>${isTe ? '⚠️ సూచన:' : '⚠️ Note:'}</strong> ${escapeHtml(warning)}
        </div>` : ''}
      </div>
      `;
    }).join('');
  }

  function renderDietPlan(dietPlan) {
    if (!dietPlan) return;
    initDietConditionSelector();
    initBackendUrlConfig();

    // Condition Banner
    const condTitle = $('diet-condition-title');
    if (condTitle && dietPlan.conditionName) {
      condTitle.textContent = dietPlan.conditionName;
    }
    const condDesc = $('diet-condition-desc');
    if (condDesc && dietPlan.description) {
      condDesc.textContent = dietPlan.description;
    }
    const condBadge = $('diet-plan-condition-badge');
    if (condBadge && dietPlan.conditionName) {
      condBadge.textContent = dietPlan.conditionName.split('&')[0].trim();
    }

    // Sync select dropdown if conditionName matches
    const condSelect = $('diet-condition-select');
    if (condSelect && dietPlan.conditionName) {
      const targetName = dietPlan.conditionName.toLowerCase();
      for (let i = 0; i < condSelect.options.length; i++) {
        const optText = condSelect.options[i].text.replace(/^[^\w]+/, '').trim().toLowerCase();
        if (optText.includes(targetName) || targetName.includes(optText) || condSelect.options[i].value === dietPlan.key) {
          condSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Medication Remedies Card & Real-Time Directory Lookup
    let remedies = dietPlan.medicationRemedies;
    if (!Array.isArray(remedies) || remedies.length === 0) {
      const activeMeds = (state.patientData && state.patientData.medicines) || (SAMPLE_PATIENT && SAMPLE_PATIENT.medicines) || [];
      remedies = evaluateMedicationRemedies(activeMeds);
      dietPlan.medicationRemedies = remedies;
    }

    renderMedicationRemediesCards(remedies, false);

    const searchInput = $('med-remedy-search-input');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          const activeMeds = (state.patientData && state.patientData.medicines) || (SAMPLE_PATIENT && SAMPLE_PATIENT.medicines) || [];
          renderMedicationRemediesCards(dietPlan.medicationRemedies || evaluateMedicationRemedies(activeMeds), false);
          return;
        }
        const db = window.MEDICATION_REMEDIES || [];
        const matches = [];
        for (let i = 0; i < db.length; i++) {
          const item = db[i];
          if (item.name.toLowerCase().includes(query) || (item.pattern && item.pattern.test(query))) {
            matches.push({
              medName: item.name,
              remedyTitle: item.name,
              sideEffect: item.sideEffect,
              remedy: item.remedy,
              include: item.include,
              avoid: item.avoid,
              warning: item.warning || ''
            });
            if (matches.length >= 12) break;
          }
        }
        renderMedicationRemediesCards(matches, true);
      });
    }

    // 3 Columns: Eat, Limit, Avoid
    const listEat = $('diet-list-eat');
    const listLimit = $('diet-list-limit');
    const listAvoid = $('diet-list-avoid');
    const isTe = (state.currentLang === 'te');

    if (listEat && dietPlan.eat) {
      listEat.innerHTML = dietPlan.eat.map(item => `
        <li class="diet-item">
          <strong>${escapeHtml(isTe ? translateFoodToTelugu(item.food) : convertToSimpleIndianFoodName(item.food))}</strong>
          <p>${escapeHtml(isTe ? translateReasonToTelugu(item.reason) : convertToSimpleIndianFoodName(item.reason))}</p>
        </li>
      `).join('');
    }

    if (listLimit && dietPlan.limit) {
      listLimit.innerHTML = dietPlan.limit.map(item => `
        <li class="diet-item">
          <strong>${escapeHtml(isTe ? translateFoodToTelugu(item.food) : convertToSimpleIndianFoodName(item.food))}</strong>
          <p>${escapeHtml(isTe ? translateReasonToTelugu(item.reason) : convertToSimpleIndianFoodName(item.reason))}</p>
        </li>
      `).join('');
    }

    if (listAvoid && dietPlan.avoid) {
      listAvoid.innerHTML = dietPlan.avoid.map(item => `
        <li class="diet-item">
          <strong>${escapeHtml(isTe ? translateFoodToTelugu(item.food) : convertToSimpleIndianFoodName(item.food))}</strong>
          <p>${escapeHtml(isTe ? translateReasonToTelugu(item.reason) : convertToSimpleIndianFoodName(item.reason))}</p>
        </li>
      `).join('');
    }
  }

  function renderFollowupAndChecklist(p) {
    const isTe = (state.currentLang === 'te');
    if (p.followUp) {
      setText('fol-date', `${formatDate(p.followUp.date)} at ${p.followUp.time || '10:30 AM'}`);
      setText('fol-doctor', p.followUp.doctor);
      setText('fol-dept', isTe ? translateDeptToTelugu(p.followUp.department) : p.followUp.department);
      setText('fol-hosp', isTe ? translateHospToTelugu(p.followUp.hospital) : p.followUp.hospital);
      setText('fol-notes', isTe ? translateNotesToTelugu(p.followUp.notes) : (p.followUp.notes || 'Not available in the sample record.'));
    }

    const checklistContainer = $('homecare-checklist-items');
    if (checklistContainer && p.homeCare) {
      checklistContainer.innerHTML = p.homeCare.map((item, idx) => {
        const isChecked = state.homeCareChecklist[idx] ? 'checked' : '';
        const itemText = isTe ? translateChecklistItemToTelugu(item) : item;
        return `
          <li class="check-item">
            <input type="checkbox" id="chk-homecare-${idx}" data-idx="${idx}" ${isChecked}>
            <label for="chk-homecare-${idx}">${escapeHtml(itemText)}</label>
          </li>
        `;
      }).join('');
      updateChecklistProgress(p.homeCare.length);
    }
  }

  function updateChecklistProgress(total) {
    const checked = Object.values(state.homeCareChecklist).filter(Boolean).length;
    const badge = $('checklist-progress-badge');
    const isTe = (state.currentLang === 'te');
    if (badge) {
      badge.textContent = isTe ? `${total} లో ${checked} పూర్తయ్యాయి` : `${checked} of ${total} Completed`;
      badge.className = checked === total ? 'badge badge-success' : 'badge badge-secondary';
    }
  }

  function renderWarningSigns(p) {
    const urgentList = $('warning-urgent-list');
    const cautionList = $('warning-caution-list');
    const isTe = (state.currentLang === 'te');

    if (urgentList && p.warningSignsUrgent) {
      urgentList.innerHTML = p.warningSignsUrgent.map(w => {
        const text = isTe ? translateWarningItemToTelugu(w) : w;
        return `
        <li><strong>•</strong> ${escapeHtml(text)}</li>
      `;
      }).join('');
    }

    const cList = p.warningSignsCaution || p.warningSigns;
    if (cautionList && cList) {
      cautionList.innerHTML = cList.map(w => {
        const text = isTe ? translateWarningItemToTelugu(w) : w;
        return `
        <li><strong>•</strong> ${escapeHtml(text)}</li>
      `;
      }).join('');
    }
  }

  // ============================================================
  // MEDICINE ALERTS & DOSAGE REMINDERS ENGINE
  // ============================================================
  // Helper: Maintain minimum gap (default 10 minutes) between medicines scheduled at the same time
  function staggerMedicineTimes(alertsList, gapMinutes = 10) {
    if (!Array.isArray(alertsList) || alertsList.length <= 1) return alertsList;
    const occupiedMinutes = new Set();
    alertsList.forEach(alert => {
      let t = alert.time || '09:00';
      if (!/^\d{1,2}:\d{2}$/.test(t)) t = '09:00';
      let [h, m] = t.split(':').map(Number);
      let total = (h || 0) * 60 + (m || 0);
      let wasAdjusted = false;
      while (occupiedMinutes.has(total)) {
        total = (total + gapMinutes) % 1440;
        wasAdjusted = true;
      }
      occupiedMinutes.add(total);
      if (wasAdjusted) {
        alert.hasTenMinGap = true;
      }
      const newH = Math.floor(total / 60);
      const newM = total % 60;
      alert.time = String(newH).padStart(2, '0') + ':' + String(newM).padStart(2, '0');
      const period = newH >= 12 ? 'PM' : 'AM';
      const displayH = newH % 12 || 12;
      alert.displayTime = String(displayH).padStart(2, '0') + ':' + String(newM).padStart(2, '0') + ' ' + period;
    });
    return alertsList;
  }

  function initMedicineAlerts(forceReload) {
    if (state.medicineAlerts && state.medicineAlerts.length > 0 && !forceReload) {
      return;
    }

    const p = state.patientData;
    if (!p || !p.medicines || p.medicines.length === 0) {
      state.medicineAlerts = [];
      return;
    }
    const meds = p.medicines || [];
    const generated = [];
    const seenNames = new Set();
    const existingAlertPhotos = new Map();
    if (state.medicineAlerts) {
      state.medicineAlerts.forEach(a => {
        if (a.photoUrl) existingAlertPhotos.set((a.medName || '').toLowerCase().replace(/[^a-z0-9]/g, ''), a.photoUrl);
      });
    }

    meds.forEach((m, idx) => {
      const cleanName = (m.name || `Medication ${idx + 1}`)
        .replace(/^(?:Tab\.?|Cap\.?|Syr\.?|Inj\.?)\s+/i, '')
        .trim();
      const normKey = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');

      // Strictly prevent duplicate cards for the same medicine
      if (seenNames.has(normKey)) return;
      seenNames.add(normKey);

      const timingLower = (m.timing || '').toLowerCase();
      let defaultTime = '09:00';
      let slot = 'Morning Dose';
      let slotType = 'morning';

      if (timingLower.includes('twice daily') || timingLower.includes('two times')) {
        defaultTime = '08:00';
        slot = 'Morning & Evening';
        slotType = 'morning';
      } else if (timingLower.includes('bedtime') || timingLower.includes('night')) {
        defaultTime = '21:30';
        slot = 'Bedtime Dose';
        slotType = 'night';
      } else if (timingLower.includes('afternoon') || timingLower.includes('lunch')) {
        defaultTime = '13:30';
        slot = 'Afternoon Dose';
        slotType = 'afternoon';
      } else if (timingLower.includes('dinner') || timingLower.includes('evening')) {
        defaultTime = '20:00';
        slot = 'Evening Dose';
        slotType = 'night';
      }

      const [hStr, mStr] = defaultTime.split(':');
      const h = parseInt(hStr, 10);
      const mVal = parseInt(mStr, 10);
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 || 12;
      const displayTime = `${String(displayH).padStart(2, '0')}:${String(mVal).padStart(2, '0')} ${period}`;

      generated.push({
        id: `alert-${idx}`,
        medName: cleanName,
        dose: m.dose || 'As prescribed',
        time: defaultTime,
        displayTime: displayTime,
        slot: slot,
        slotType: slotType,
        instructions: m.instructions || (m.timing ? `Take ${m.timing.toLowerCase()}` : 'Take as directed.'),
        enabled: true,
        takenToday: false,
        isCustom: false,
        photoUrl: m.photoUrl || (existingAlertPhotos.get(normKey) || null)
      });
    });

    staggerMedicineTimes(generated, 10);
    state.medicineAlerts = generated;
    syncMedicineAlertsToBackend();
  }

  function renderMedicineAlerts() {
    const container = $('alerts-cards-container');
    if (!container) return;
    const isTe = (state.currentLang === 'te');

    if (!state.medicineAlerts || state.medicineAlerts.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p style="color: var(--slate-500); margin: 0;">${isTe ? 'మందుల రిమైండర్లు ఏవీ కాన్ఫిగర్ చేయబడలేదు. క్రింద కొత్త రిమైండర్‌ను జోడించండి లేదా డిశ్చార్జ్ సారాంశాన్ని అప్‌లోడ్ చేయండి.' : 'No active medication reminders configured. Add a custom reminder below or upload a discharge summary.'}</p>
        </div>
      `;
      renderIntakeLog();
      return;
    }

    container.innerHTML = state.medicineAlerts.map(alert => {
      const timeClass = alert.slotType === 'morning' ? 'time-morning' : (alert.slotType === 'afternoon' ? 'time-afternoon' : 'time-night');
      const timeIcon = alert.slotType === 'morning' ? '☀️' : (alert.slotType === 'afternoon' ? '⛅' : '🌙');
      const slotText = isTe ? (alert.slotType === 'morning' ? 'ఉదయం' : (alert.slotType === 'afternoon' ? 'మధ్యాహ్నం' : 'రాత్రి')) : (alert.slot || 'Dose');
      const takenBadge = alert.takenToday
        ? (isTe ? '✓ నేడు తీసుకున్నారు' : '✓ Taken Today')
        : (isTe ? 'షెడ్యూల్ చేయబడింది' : 'Scheduled');
      const medName = isTe ? translateMedNameToTelugu(alert.medName) : alert.medName;
      const dose = alert.dose ? (isTe ? translateDoseToTelugu(alert.dose) : alert.dose) : (isTe ? 'ప్రామాణిక మోతాదు' : 'Standard Dose');
      const instructions = alert.instructions ? (isTe ? translateInstructionsToTelugu(alert.instructions) : alert.instructions) : '';

      return `
        <div class="med-alert-card ${alert.takenToday ? 'alert-taken' : ''}" id="card-${alert.id}">
          <div class="med-alert-header">
            <div class="med-alert-title-wrap">
              <div class="med-alert-icon" aria-hidden="true">💊</div>
              <div>
                <h3 class="med-alert-name">${escapeHtml(medName)}</h3>
                <div class="med-alert-dose">${escapeHtml(dose)}</div>
              </div>
            </div>
            <span class="badge ${alert.takenToday ? 'badge-success' : 'badge-secondary'}" style="font-size: 0.75rem;">
              ${takenBadge}
            </span>
          </div>

          <div class="med-alert-body">
            <!-- Scheduled Time with Inline Time Edit -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
              <div class="alert-time-pill ${timeClass}">
                <span>${timeIcon}</span>
                <span><strong>${alert.displayTime || alert.time}</strong> (${slotText})</span>${alert.hasTenMinGap ? ` <span class="badge badge-warning" style="font-size: 0.65rem; margin-left: 0.35rem; padding: 2px 6px; background: #fef3c7; color: #92400e; border: 1px solid #fcd34d;" title="10-minute safe gap maintained between medicines">${isTe ? '⏱️ 10ని॥ వ్యవధి' : '⏱️ 10m Spaced'}</span>` : ''}
              </div>
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <input type="time" class="form-control form-control-sm alert-time-input" data-alert-id="${alert.id}" value="${alert.time || '08:00'}" style="width: 105px; padding: 0.2rem 0.4rem; font-size: 0.85rem; height: 32px;" title="${isTe ? 'రిమైండర్ సమయాన్ని సెట్ చేయండి' : 'Set reminder time'}">
                <button type="button" class="btn btn-sm btn-primary btn-save-time" data-alert-id="${alert.id}" style="padding: 0.2rem 0.6rem; font-size: 0.78rem; height: 32px; white-space: nowrap;" title="${isTe ? 'కొత్త సమయాన్ని భద్రపరచండి' : 'Save new reminder time'}">
                  ${isTe ? '💾 సమయం భద్రపరచు' : '💾 Save Time'}
                </button>
              </div>
            </div>

            <div class="med-alert-instructions">
              <strong>${isTe ? 'సూచనలు:' : 'Instructions:'}</strong> ${escapeHtml(instructions)}
            </div>
            ${alert.photoUrl ? `
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-top: 0.6rem; background: #f0fdf4; padding: 0.45rem 0.65rem; border-radius: 8px; border: 1.5px solid #86efac;">
                <img src="${alert.photoUrl}" alt="${alert.medName}" class="med-alert-card-photo" data-alert-id="${alert.id}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 2px solid var(--teal-500); background: #fff; cursor: pointer;" title="Attached Medicine Photo">
                <div style="flex: 1; min-width: 0;">
                  <div style="font-weight: 600; color: #166534; font-size: 0.78rem; display: flex; align-items: center; gap: 4px;">
                    <span>📸</span> <span>${isTe ? 'మందు ఫోటో జతచేయబడింది' : 'Medicine Photo Attached'}</span>
                  </div>
                  <div style="font-size: 0.7rem; color: #4b5563;">${isTe ? 'అలారం సమయంలో ప్రదర్శించబడుతుంది' : 'Displays on alarm screen'}</div>
                </div>
              </div>
            ` : `
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-top: 0.5rem; background: var(--slate-50, #f8fafc); padding: 0.35rem 0.6rem; border-radius: 6px; border: 1px dashed var(--slate-300);">
                <div style="font-size: 0.75rem; color: var(--slate-500); display: flex; align-items: center; gap: 4px;">
                  <span>📷</span> <span>${isTe ? 'మందు ఫోటో జతచేయబడలేదు' : 'No medicine photo attached'}</span>
                </div>
                <label class="btn btn-xs btn-outline" style="cursor: pointer; font-size: 0.72rem; padding: 2px 8px; white-space: nowrap;">
                  ${isTe ? '+ ఫోటో జతచేయండి' : '+ Add Photo'}
                  <input type="file" accept="image/*" class="med-photo-input hidden" data-alert-id="${alert.id}">
                </label>
              </div>
            `}
            <div style="font-size: 0.775rem; color: var(--teal-700, #0f766e); margin-top: 0.4rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>📱</span>
              <span>${isTe ? `స్వయంచాలక అలర్ట్: <strong>షెడ్యూల్ ${alert.time} (అన్ని కనెక్ట్ చేయబడిన ఫోన్లు)</strong>` : `Automated Alert: <strong>Scheduled at ${alert.time} (All connected phones)</strong>`}</span>
            </div>
          </div>

          <div class="med-alert-actions">
            <label class="alert-toggle-label">
              <input type="checkbox" class="alert-toggle-input" data-alert-id="${alert.id}" ${alert.enabled ? 'checked' : ''}>
              <span>${alert.enabled ? (isTe ? 'అలారం ఆన్‌లో ఉంది' : 'Alarm Active') : (isTe ? 'ఆఫ్' : 'Off')}</span>
            </label>

            <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline btn-sm btn-trigger-alert" data-alert-id="${alert.id}" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" title="${isTe ? 'ఈ రిమైండర్‌ను ఫోన్‌కు పంపండి' : 'Send this exact medicine reminder alert to all phones now'}">
                ${isTe ? '🔔 ఫోన్ అలర్ట్ పంపండి' : '🔔 Alert Phone Now'}
              </button>
              ${alert.isCustom ? `<button type="button" class="btn btn-text btn-sm text-danger btn-delete-alert" data-alert-id="${alert.id}" title="${isTe ? 'తొలగించు' : 'Delete alert'}">🗑️</button>` : ''}
              <button type="button" class="btn btn-teal btn-sm btn-quick-take" data-alert-id="${alert.id}">
                ${alert.takenToday ? (isTe ? 'మళ్ళీ తీసుకున్నారు' : 'Taken Again') : (isTe ? 'ఇప్పుడే తీసుకోండి' : 'Take Now')}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    renderIntakeLog();
    loadSmsDeliveryLogs();
  }

  function renderIntakeLog() {
    const list = $('intake-log-list');
    const badge = $('dose-intake-badge');
    if (!list) return;

    if (!state.doseLog || state.doseLog.length === 0) {
      list.innerHTML = `
        <li style="text-align: center; color: var(--slate-400); padding: 1.5rem 0; font-size: 0.875rem;">
          No doses logged yet today. Click "Take Now" on any alert card or confirm the live alarm when it chimes.
        </li>
      `;
      if (badge) {
        badge.textContent = '0 Doses Taken Today';
        badge.className = 'badge badge-secondary';
      }
      return;
    }

    if (badge) {
      badge.textContent = `${state.doseLog.length} Dose${state.doseLog.length > 1 ? 's' : ''} Taken Today`;
      badge.className = 'badge badge-success';
    }

    list.innerHTML = state.doseLog.slice().reverse().map(item => `
      <li class="intake-log-item">
        <div class="intake-log-left">
          <span class="intake-log-check">✓</span>
          <div>
            <strong>${item.medName}</strong>
            <span style="color: var(--slate-500); font-size: 0.8rem;">(${item.dose})</span>
          </div>
        </div>
        <div class="intake-log-time">
          <span>Taken at <strong>${item.time}</strong></span>
        </div>
      </li>
    `).join('');
  }

  let globalAudioCtx = null;
  function getAudioContext() {
    try {
      if (!globalAudioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) globalAudioCtx = new AudioCtx();
      }
      if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
      }
    } catch (_) {}
    return globalAudioCtx;
  }

  // Pre-unlock audio on any user interaction
  document.addEventListener('click', () => getAudioContext(), { passive: true });
  document.addEventListener('keydown', () => getAudioContext(), { passive: true });

  function playAlertChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = window._careBridgeAudioCtx || new AudioCtx();
      window._careBridgeAudioCtx = ctx;

      const runBeeps = () => {
        const now = ctx.currentTime;
        // Loud, crisp 2-cycle healthcare alarm chime
        const beeps = [
          { f: 880, start: 0.00, dur: 0.15 },
          { f: 1200, start: 0.18, dur: 0.20 },
          { f: 880, start: 0.45, dur: 0.15 },
          { f: 1200, start: 0.63, dur: 0.20 },
          { f: 880, start: 0.90, dur: 0.15 },
          { f: 1200, start: 1.08, dur: 0.35 }
        ];

        beeps.forEach(b => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(b.f, now + b.start);
          gain.gain.setValueAtTime(0.35, now + b.start);
          gain.gain.exponentialRampToValueAtTime(0.001, now + b.start + b.dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + b.start);
          osc.stop(now + b.start + b.dur + 0.05);
        });
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(runBeeps).catch(runBeeps);
      } else {
        runBeeps();
      }
    } catch(e) {
      console.warn('Audio chime warning:', e);
    }
  }

  function triggerMedicineAlarm(med) {
    const target = med || (state.medicineAlerts && state.medicineAlerts[0]) || {
      medName: 'Sample Med A (Demo Tab)',
      dose: '500 mg',
      slot: 'Scheduled Dose',
      instructions: 'Take with water as directed in your prescription.'
    };
    state.currentActiveAlarmMed = target;

    setText('alarm-modal-med-name', target.medName || 'Prescribed Medicine');
    setText('alarm-modal-med-dose', `${target.dose || 'Standard dose'} • ${target.slot || 'Scheduled'}`);
    setText('alarm-modal-med-notes', target.instructions || 'Take with water as directed in your discharge instructions.');

    // Show medicine photo in alarm modal if available
    const photoWrap = $('alarm-modal-photo-wrap');
    const photoImg = $('alarm-modal-photo');
    if (photoWrap && photoImg) {
      if (target.photoUrl) {
        photoImg.src = target.photoUrl;
        photoWrap.classList.remove('hidden');
      } else {
        photoImg.src = '';
        photoWrap.classList.add('hidden');
      }
    }

    const modal = $('medicine-alarm-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.zIndex = '99999';
    }

    // Play loud alarm chime
    playAlertChime();

    // Trigger Browser Notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('⏰ CareBridge Medicine Reminder', {
          body: `It's time to take ${target.medName} (${target.dose || ''}).\n${target.instructions || ''}`,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💊</text></svg>'
        });
      } catch(e) {}
    }
  }

  function dismissMedicineAlarm() {
    const modal = $('medicine-alarm-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    state.currentActiveAlarmMed = null;
  }

  function markDoseAsTaken(med) {
    const targetMed = med || state.currentActiveAlarmMed || state.medicineAlerts[0];
    if (!targetMed) return;

    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Add to dose log
    state.doseLog.push({
      id: 'log-' + Date.now(),
      medName: targetMed.medName,
      dose: targetMed.dose || 'Standard dose',
      time: timeStr,
      date: new Date().toISOString().split('T')[0]
    });

    // Mark matching alert as taken today
    const foundAlert = state.medicineAlerts.find(a => a.id === targetMed.id || a.medName === targetMed.medName);
    if (foundAlert) {
      foundAlert.takenToday = true;
    }

    dismissMedicineAlarm();
    renderMedicineAlerts();
  }

  function snoozeMedicineAlarm(minutes) {
    dismissMedicineAlarm();
    const medToSnooze = state.currentActiveAlarmMed;

    // Show temporary feedback banner in notification status
    const banner = $('notif-status-text');
    if (banner) {
      const origText = banner.innerHTML;
      banner.innerHTML = `<strong>⏰ Snoozed:</strong> Reminder for ${medToSnooze?.medName || 'your medication'} snoozed for ${minutes} minute${minutes > 1 ? 's' : ''}.`;
      setTimeout(() => {
        banner.innerHTML = origText;
      }, 5000);
    }

    // Set timeout to re-trigger
    if (state.activeAlarmTimeout) clearTimeout(state.activeAlarmTimeout);
    state.activeAlarmTimeout = setTimeout(() => {
      triggerMedicineAlarm(medToSnooze || state.medicineAlerts[0]);
    }, minutes * 60 * 1000);
  }

  function requestBrowserNotifications() {
    if (!('Notification' in window)) {
      alert('Browser notifications are not supported by this browser. Visual alarms and audio chimes will continue to work inside this tab.');
      return;
    }

    Notification.requestPermission().then(permission => {
      const btn = $('btn-request-browser-notif');
      const banner = $('notif-status-text');

      if (permission === 'granted') {
        state.browserNotifGranted = true;
        if (btn) {
          btn.textContent = '🔔 Notifications Active';
          btn.className = 'btn btn-teal btn-sm';
        }
        if (banner) {
          banner.innerHTML = '<strong>✓ Background Notifications Active:</strong> You will receive system alerts even when browsing in other tabs or windows.';
        }
        try {
          new Notification('CareBridge Notifications Enabled', {
            body: 'You will receive timely reminders for your prescribed medicines.',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏥</text></svg>'
          });
        } catch(e) {}
      } else {
        if (btn) btn.textContent = '🔔 Notifications Blocked';
      }
    });
  }

  function handleAddCustomAlert(e) {
    e.preventDefault();
    const nameInput = $('alert-med-name');
    const doseInput = $('alert-med-dose');
    const timeInput = $('alert-med-time');

    if (!nameInput || !nameInput.value.trim()) {
      alert('Please enter a medicine name.');
      return;
    }

    if (!timeInput || !timeInput.value) {
      alert('Please select an alert time.');
      return;
    }

    const timeVal = timeInput.value; // "HH:mm"
    const [h, m] = timeVal.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    const displayTime = `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
    const slotType = h < 12 ? 'morning' : (h < 18 ? 'afternoon' : 'night');
    const slotName = h < 12 ? 'Morning' : (h < 18 ? 'Afternoon' : 'Night');

    const phoneInput = $('alert-med-phone');
    const customPhone = phoneInput ? phoneInput.value.trim() : '';
    if (customPhone) {
      state.registeredMobile = customPhone;
      const regInput = $('registered-phone-input');
      if (regInput) regInput.value = customPhone;
    }

    const newAlert = {
      id: 'custom-' + Date.now(),
      medName: nameInput.value.trim(),
      dose: doseInput ? doseInput.value.trim() || 'Prescribed dose' : 'Prescribed dose',
      time: timeVal,
      displayTime: displayTime,
      slot: `${slotName} Custom`,
      slotType: slotType,
      instructions: 'Custom schedule set by patient.',
      mobileNumber: customPhone || state.registeredMobile,
      enabled: true,
      takenToday: false,
      isCustom: true
    };

    state.medicineAlerts.push(newAlert);
    staggerMedicineTimes(state.medicineAlerts, 10);
    saveCurrentPatientData();
    renderMedicineAlerts();
    syncMedicineAlertsToBackend();

    nameInput.value = '';
    if (doseInput) doseInput.value = '';
    timeInput.value = '';
    if (phoneInput) phoneInput.value = '';

    // Scroll to the new card
    const newCard = $(`card-${newAlert.id}`);
    if (newCard) newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ============================================================
  // SERVER-SIDE SMS REMINDER ENGINE
  // ============================================================
  function loadSmsConfig() {
    fetch('/api/alerts/config')
      .then(res => res.json())
      .then(data => {
        state.smsProviderConfig = data;
        const badge = $('sms-provider-badge');
        const phoneInput = $('registered-phone-input');
        const customPhoneInput = $('alert-med-phone');

        if (data.registeredMobile) {
          state.registeredMobile = data.registeredMobile;
          if (phoneInput && !phoneInput.value) phoneInput.value = data.registeredMobile;
          if (customPhoneInput && !customPhoneInput.value) customPhoneInput.value = data.registeredMobile;
        }

        if (badge) {
          if (data.provider === 'telegram') {
            const countStr = data.subscribersCount ? ` (${data.subscribersCount} Phone${data.subscribersCount > 1 ? 's' : ''} Connected)` : '';
            badge.textContent = `🟢 Live Mobile Alerts Active${countStr}`;
            badge.className = 'badge badge-success';
          } else if (data.provider === 'twilio') {
            badge.textContent = `🟢 Twilio SMS Active (${data.configuredFrom || 'Ready'})`;
            badge.className = 'badge badge-success';
          } else if (data.provider === 'fast2sms') {
            badge.textContent = '🟢 Fast2SMS Active (India Route)';
            badge.className = 'badge badge-success';
          } else {
            badge.textContent = '⚠️ SMS Keys Not Set (.env)';
            badge.className = 'badge badge-warning';
            badge.title = 'Add TWILIO_ACCOUNT_SID or FAST2SMS_API_KEY in .env to enable real carrier delivery';
          }
        }
      })
      .catch(err => console.warn('Error loading SMS config:', err));

    // Also sync reminders from backend into client state so alarms can run
    fetch('/api/alerts/reminders')
      .then(res => res.json())
      .then(data => {
        if (data.reminders && Array.isArray(data.reminders) && data.reminders.length > 0) {
          if (!state.medicineAlerts || state.medicineAlerts.length === 0) {
            state.medicineAlerts = data.reminders.map(r => {
              const [hStr, mStr] = (r.time || '08:00').split(':');
              const h = parseInt(hStr, 10);
              const m = parseInt(mStr, 10);
              const period = h >= 12 ? 'PM' : 'AM';
              const displayH = h % 12 || 12;
              const displayTime = `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
              const slotType = h < 12 ? 'morning' : (h < 18 ? 'afternoon' : 'night');
              return {
                id: r.id,
                medName: r.medName,
                dose: r.dose,
                time: r.time,
                displayTime: displayTime,
                slot: `${slotType.toUpperCase()} Dose`,
                slotType: slotType,
                instructions: 'Take as prescribed with water.',
                mobileNumber: r.mobileNumber || state.registeredMobile,
                enabled: r.enabled !== false,
                takenToday: false
              };
            });
            renderMedicineAlerts();
          }
        }
      })
      .catch(e => console.warn('Error loading backend reminders:', e));

    loadSmsDeliveryLogs();
  }

  function saveRegisteredPhone() {
    const input = $('registered-phone-input');
    const phone = input ? input.value.trim() : '';
    const statusEl = $('sms-test-status');

    if (!phone) {
      if (statusEl) {
        statusEl.className = 'alert alert-danger';
        statusEl.textContent = 'Please enter your mobile phone number (with country code, e.g. +91XXXXXXXXXX).';
        statusEl.classList.remove('hidden');
      }
      return;
    }

    fetch('/api/alerts/save-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        state.registeredMobile = result.registeredMobile;
        if (input) input.value = result.registeredMobile;
        const customPhone = $('alert-med-phone');
        if (customPhone) customPhone.value = result.registeredMobile;

        if (statusEl) {
          statusEl.className = 'alert alert-success';
          statusEl.textContent = `✓ Mobile number ${result.registeredMobile} saved! All scheduled medicine reminders will be sent to this number.`;
          statusEl.classList.remove('hidden');
        }

        renderMedicineAlerts();
        syncMedicineAlertsToBackend();
      } else {
        if (statusEl) {
          statusEl.className = 'alert alert-danger';
          statusEl.textContent = result.message || 'Failed to save mobile number.';
          statusEl.classList.remove('hidden');
        }
      }
    })
    .catch(err => {
      if (statusEl) {
        statusEl.className = 'alert alert-danger';
        statusEl.textContent = 'Connection error saving phone number: ' + err.message;
        statusEl.classList.remove('hidden');
      }
    });
  }

  function sendTestSms() {
    const input = $('registered-phone-input');
    const phone = input ? input.value.trim() : state.registeredMobile;
    const statusEl = $('sms-test-status');

    // Trigger full screen alarm modal & loud audio alarm on website!
    const targetMed = (state.medicineAlerts && state.medicineAlerts[0]) || {
      medName: 'Sample Med A (Demo Tab)',
      dose: '500 mg',
      slot: 'Morning Dose',
      instructions: 'Take with water after breakfast.'
    };
    triggerMedicineAlarm(targetMed);

    if (!phone) {
      if (statusEl) {
        statusEl.className = 'alert alert-danger';
        statusEl.textContent = 'Please enter a recipient mobile number (e.g. +91XXXXXXXXXX) to test.';
        statusEl.classList.remove('hidden');
      }
      return;
    }

    if (statusEl) {
      statusEl.className = 'alert alert-info';
      statusEl.textContent = `⏳ Dispatching live test SMS to ${phone}...`;
      statusEl.classList.remove('hidden');
    }

    fetch('/api/alerts/test-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, medName: state.medicineAlerts[0]?.medName || 'Aspirin (75 mg)' })
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        if (statusEl) {
          statusEl.className = 'alert alert-success';
          statusEl.textContent = result.message || `✓ Test SMS sent to ${phone}! Check your phone for the message.`;
        }
      } else if (result.unconfigured) {
        if (statusEl) {
          statusEl.className = 'alert alert-warning';
          statusEl.innerHTML = `<strong>⚠️ SMS Provider Credentials Needed:</strong> The server simulated the dispatch flow to <code>${escapeHtml(phone)}</code>, but no live API keys are set in <code>.env</code> yet. To receive real carrier SMS on your phone for free, set your free <code>TWILIO_ACCOUNT_SID</code> and <code>TWILIO_AUTH_TOKEN</code> in your <code>.env</code> file (or on Render).`;
        }
      } else {
        if (statusEl) {
          statusEl.className = 'alert alert-danger';
          statusEl.textContent = result.message || 'Failed to send test SMS.';
        }
      }
      loadSmsDeliveryLogs();
    })
    .catch(err => {
      if (statusEl) {
        statusEl.className = 'alert alert-danger';
        statusEl.textContent = 'Connection error sending test SMS: ' + err.message;
      }
    });
  }

  function syncMedicineAlertsToBackend() {
    if (!state.medicineAlerts) return;
    const phone = state.registeredMobile || ($('registered-phone-input') ? $('registered-phone-input').value.trim() : '');

    fetch('/api/alerts/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobileNumber: phone,
        reminders: state.medicineAlerts.map(a => ({
          id: a.id,
          medName: a.medName,
          dose: a.dose,
          time: a.time,
          mobileNumber: a.mobileNumber || phone,
          enabled: a.enabled,
          photoUrl: a.photoUrl || null
        }))
      })
    })
    .catch(err => console.warn('Background sync error:', err));
  }

  function loadSmsDeliveryLogs() {
    fetch('/api/alerts/delivery-log')
      .then(res => res.json())
      .then(result => {
        if (!result.success) return;
        state.smsDeliveryLogs = result.data || [];
        renderSmsDeliveryLogList();
      })
      .catch(() => {});
  }

  function renderSmsDeliveryLogList() {
    const list = $('sms-delivery-log-list');
    const badge = $('sms-delivery-badge');
    if (!list) return;

    const logs = state.smsDeliveryLogs || [];
    if (badge) {
      badge.textContent = `${logs.length} Dispatch${logs.length === 1 ? '' : 'es'} Logged`;
      badge.className = logs.length > 0 ? 'badge badge-teal' : 'badge badge-secondary';
    }

    if (logs.length === 0) {
      list.innerHTML = `
        <li style="text-align: center; color: var(--slate-400); padding: 1.5rem 0; font-size: 0.875rem;">
          No SMS dispatches yet. Use "Send Test SMS Now" or await scheduled dose times.
        </li>
      `;
      return;
    }

    list.innerHTML = logs.map(item => {
      let statusBadge = '<span class="badge badge-success" style="font-size: 0.725rem;">✓ DELIVERED</span>';
      if (item.status === 'CONFIG_REQUIRED') {
        statusBadge = '<span class="badge badge-warning" style="font-size: 0.725rem;">⚠️ KEYS NEEDED</span>';
      } else if (item.status === 'FAILED') {
        statusBadge = '<span class="badge badge-danger" style="font-size: 0.725rem;">✕ FAILED</span>';
      }

      return `
        <li class="intake-log-item" style="border-left: 3px solid ${item.status === 'DELIVERED' ? '#10b981' : (item.status === 'CONFIG_REQUIRED' ? '#f59e0b' : '#ef4444')};">
          <div class="intake-log-left" style="flex: 1;">
            <span style="font-size: 1.1rem;">📱</span>
            <div>
              <strong>${escapeHtml(item.medName)}</strong> &nbsp;
              <span style="color: var(--slate-500); font-size: 0.8rem;">(${escapeHtml(item.dose || 'Standard dose')})</span>
              <div style="font-size: 0.775rem; color: var(--slate-600); margin-top: 0.15rem;">
                To: <strong>${escapeHtml(item.phone || 'N/A')}</strong> • Scheduled: <strong>${escapeHtml(item.scheduledTime)}</strong>
              </div>
              ${item.error ? `<div style="font-size: 0.75rem; color: #ef4444; margin-top: 0.2rem;">${escapeHtml(item.error)}</div>` : ''}
            </div>
          </div>
          <div style="text-align: right;">
            ${statusBadge}
            <div style="font-size: 0.75rem; color: var(--slate-400); margin-top: 0.25rem;">${escapeHtml(item.displayTime || '')}</div>
          </div>
        </li>
      `;
    }).join('');
  }

  // Periodic alert time-checker (runs every 2 seconds for instantaneous trigger)
  setInterval(() => {
    if (!state.medicineAlerts || state.medicineAlerts.length === 0) return;
    const now = new Date();
    const currentHHMM = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const todayStr = now.toISOString().split('T')[0];

    state.medicineAlerts.forEach(alert => {
      if (alert.enabled !== false && alert.time === currentHHMM) {
        const triggerKey = `${todayStr}_${currentHHMM}_${alert.id}`;
        if (!state.triggeredAlertKeys) state.triggeredAlertKeys = new Set();
        if (!state.triggeredAlertKeys.has(triggerKey)) {
          state.triggeredAlertKeys.add(triggerKey);
          console.log(`[CareBridge Alarm] Ringing website alarm for ${alert.medName} at ${currentHHMM}`);
          triggerMedicineAlarm(alert);
        }
      }
    });
  }, 2000);

  let currentOcrZoom = 1;
  function updateImageZoom() {
    const img = $('ocr-preview-img');
    if (img) {
      img.style.transform = `scale(${currentOcrZoom})`;
      img.style.transformOrigin = 'top center';
    }
  }

  // ============================================================
  // UPLOAD WORKFLOW & "TRY WITH SAMPLE DISCHARGE SUMMARY"
  // ============================================================
  // Multi-Document / Multi-Photo Selection & Preview Handler
  function handleFilesSelected(fileList) {
    if (!fileList || fileList.length === 0) return;
    if (!state.selectedFiles) state.selectedFiles = [];

    const validExts = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    const maxBytes = 10 * 1024 * 1024; // 10MB per file

    Array.from(fileList).forEach(file => {
      if (!validExts.includes(file.type)) {
        showUploadAlert('warning', `Skipped "${file.name}": Unsupported format. Please select PDF, JPG, PNG, or WebP.`);
        return;
      }
      if (file.size > maxBytes) {
        showUploadAlert('warning', `Skipped "${file.name}": File size exceeds 10MB limit.`);
        return;
      }
      // Deduplicate by name and size
      const exists = state.selectedFiles.some(f => f.name === file.name && f.size === file.size);
      if (!exists) {
        state.selectedFiles.push(file);
      }
    });

    state.selectedFile = state.selectedFiles[0] || null;
    renderSelectedFilesList();
  }

  // Backwards compatibility wrapper for single file
  function handleFileSelected(file) {
    if (file) handleFilesSelected([file]);
  }

  function renderSelectedFilesList() {
    const wrap = $('selected-files-list-wrap');
    const grid = $('selected-files-grid');
    const countEl = $('selected-files-count');
    const procBtn = $('btn-process-file');
    const legacyBanner = $('selected-file-banner');

    if (legacyBanner) legacyBanner.classList.add('hidden');

    if (!state.selectedFiles || state.selectedFiles.length === 0) {
      if (wrap) wrap.classList.add('hidden');
      if (procBtn) {
        procBtn.disabled = true;
        procBtn.textContent = '⚙️ Process Document(s)';
      }
      return;
    }

    if (wrap) wrap.classList.remove('hidden');
    if (countEl) countEl.textContent = state.selectedFiles.length;

    if (procBtn) {
      procBtn.disabled = false;
      procBtn.textContent = state.selectedFiles.length > 1
        ? `⚙️ Process All ${state.selectedFiles.length} Documents / Photos`
        : '⚙️ Process Document';
    }

    if (grid) {
      grid.innerHTML = state.selectedFiles.map((file, idx) => {
        const isImg = (file.type && file.type.startsWith('image/')) || /\.(jpg|jpeg|png|webp)$/i.test(file.name);
        const isWord = /\.(docx|doc)$/i.test(file.name) || file.type.includes('word');
        const isHtml = /\.(html|htm)$/i.test(file.name) || file.type.includes('html');
        let icon = '📄';
        let typeLabel = 'PDF Document';
        if (isImg) { icon = '🖼️'; typeLabel = 'Photo / Image'; }
        else if (isWord) { icon = '📝'; typeLabel = 'Word Document (.docx)'; }
        else if (isHtml) { icon = '🌐'; typeLabel = 'HTML Summary (.html)'; }

        return `
          <div class="selected-file-row" style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.35rem 0.65rem; gap: 0.5rem; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1; min-width: 0;">
              <span style="font-size: 1.1rem;">${icon}</span>
              <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${file.name}">
                  Doc ${idx + 1}: ${file.name}
                </div>
                <div style="color: #64748b; font-size: 0.72rem;">${formatBytes(file.size)} • ${typeLabel}</div>
              </div>
            </div>
            <button type="button" class="btn btn-xs btn-text text-danger btn-remove-single-file" data-file-index="${idx}" style="padding: 2px 6px; font-size: 0.75rem;" title="Remove this document">
              ✕
            </button>
          </div>
        `;
      }).join('');
    }

    clearUploadAlert();
  }

  function removeSelectedFile(index) {
    if (index !== undefined && !isNaN(index)) {
      state.selectedFiles.splice(index, 1);
    } else {
      state.selectedFiles = [];
    }
    state.selectedFile = (state.selectedFiles && state.selectedFiles.length > 0) ? state.selectedFiles[0] : null;

    const fileInput = $('discharge-file-input');
    if (fileInput && (!state.selectedFiles || state.selectedFiles.length === 0)) {
      fileInput.value = '';
    }

    renderSelectedFilesList();
  }

  function clearAllSelectedFiles() {
    state.selectedFiles = [];
    state.selectedFile = null;
    const fileInput = $('discharge-file-input');
    if (fileInput) fileInput.value = '';
    renderSelectedFilesList();
  }

  function processDocument() {
    if (!state.selectedFiles || state.selectedFiles.length === 0) {
      showUploadAlert('warning', 'Please select at least one document or photo to analyze.');
      return;
    }

    const count = state.selectedFiles.length;
    showUploadAlert('info', `⏳ Scanning and analyzing ${count} document page${count > 1 ? 's' : ''} with clinical OCR engine...`);
    const procBtn = $('btn-process-file');
    if (procBtn) {
      procBtn.disabled = true;
      procBtn.textContent = '⏳ Scanning OCR...';
    }

    const formData = new FormData();
    state.selectedFiles.forEach(f => {
      formData.append('discharge', f);
    });

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        showUploadAlert('success', result.message || `✓ Successfully scanned and consolidated ${count} document page${count > 1 ? 's' : ''}.`);
        displayExtractedReview(result, false);

        // Immediately update Current Active Discharge Record with real extracted document details!
        if (result.data) {
          state.patientData = JSON.parse(JSON.stringify(result.data));
          updateActiveDischargeRecord(result.data);

          if (result.data.medicines && result.data.medicines.length > 0) {
            renderMedicineTable(result.data.medicines);
            initMedicineAlerts(true);
            renderMedicineAlerts();
          }

          renderAllViews();
          saveCurrentPatientData();
        }
      } else {
        showUploadAlert('danger', result.message || 'Failed to process document(s).');
      }
      if (procBtn) {
        procBtn.disabled = false;
        procBtn.textContent = state.selectedFiles.length > 1
          ? `⚙️ Process All ${state.selectedFiles.length} Documents / Photos`
          : '⚙️ Process Document';
      }
    })
    .catch((err) => {
      showUploadAlert('danger', 'Network error while uploading: ' + (err.message || 'Please check connection.'));
      if (procBtn) {
        procBtn.disabled = false;
        procBtn.textContent = '⚙️ Process Document(s)';
      }
    });
  }

  // Load the Bundled Realistic Fictional Sample
  function loadSampleDischargeSummary() {
    showUploadAlert('info', '⏳ Loading bundled fictional sample summary (CareBridge_Sample_Discharge_Summary.pdf)...');

    fetch('/api/sample-discharge')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const banner = $('selected-file-banner');
          if (banner) banner.classList.remove('hidden');

          setText('selected-filename', result.sampleFileName);
          setText('selected-filesize', 'Bundled Fictional Sample (PDF)');

          showUploadAlert('success', '✓ Sample discharge summary loaded for Suresh. Review the care plan parameters below.');
          displayExtractedReview(result, true);

          const revSec = $('extracted-review-section');
          if (revSec) revSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      })
      .catch(() => {
        displayExtractedReview({ data: SAMPLE_PATIENT }, true);
        showUploadAlert('success', '✓ Fictional sample loaded. Review the extracted parameters below.');
      });
  }

  function displayExtractedReview(payload, isSample) {
    const data = payload.data || payload;
    const fields = payload.fields || [];
    const docTypeName = payload.documentTypeName || (isSample ? 'Sample Discharge Summary' : 'Hospital Discharge Summary');
    const overallConf = payload.overallConfidence || (isSample ? 98 : 85);
    const verifiedCount = payload.verifiedCount ?? (fields.filter(f => f.status === 'verified').length);
    const missingCount = payload.missingCount ?? (fields.filter(f => f.status === 'missing').length);

    state.extractedData = data;
    const reviewSec = $('extracted-review-section');
    if (!reviewSec) return;

    reviewSec.classList.remove('hidden');

    const typeBadge = $('review-doc-type-badge');
    if (typeBadge) typeBadge.textContent = docTypeName;

    const modeBadge = $('review-mode-badge');
    if (modeBadge) {
      modeBadge.textContent = isSample ? 'Sample Demo' : 'Live OCR Engine';
      modeBadge.className = isSample ? 'badge badge-demo' : 'badge badge-success';
    }

    const titleEl = $('ocr-doc-title');
    if (titleEl) titleEl.textContent = docTypeName;

    const confEl = $('ocr-overall-conf');
    if (confEl) confEl.textContent = `${overallConf}%`;

    const verEl = $('ocr-verified-count');
    if (verEl) verEl.textContent = verifiedCount;

    const missEl = $('ocr-missing-count');
    if (missEl) missEl.textContent = missingCount;

    // Document Preview & Multi-Page Switcher
    const imgEl = $('ocr-preview-img');
    const iframeEl = $('ocr-preview-iframe');
    const placeholderEl = $('ocr-preview-placeholder');
    const pageTabsBar = $('ocr-page-tabs-bar');
    const pagesBadge = $('ocr-pages-badge');

    currentOcrZoom = 1;
    updateImageZoom();

    const pages = (payload.uploadedFiles && payload.uploadedFiles.length > 0)
      ? payload.uploadedFiles
      : (payload.uploadedFile ? [payload.uploadedFile] : []);

    state.activeDocumentPages = pages;

    if (pagesBadge) {
      if (pages.length > 1) {
        pagesBadge.textContent = `${pages.length} Pages Consolidated`;
        pagesBadge.classList.remove('hidden');
      } else {
        pagesBadge.textContent = '1 Page';
        pagesBadge.classList.add('hidden');
      }
    }

    function renderPagePreview(pageIdx) {
      const activeFile = pages[pageIdx] || pages[0];
      let fileUrl = activeFile?.url;
      if (!fileUrl && isSample) {
        fileUrl = '/sample/CareBridge_Sample_Discharge_Summary.pdf';
      }

      if (fileUrl) {
        const isPdf = fileUrl.toLowerCase().endsWith('.pdf') || activeFile?.mimetype === 'application/pdf';
        if (isPdf) {
          if (imgEl) imgEl.classList.add('hidden');
          if (iframeEl) {
            iframeEl.src = fileUrl;
            iframeEl.classList.remove('hidden');
          }
        } else {
          if (iframeEl) iframeEl.classList.add('hidden');
          if (imgEl) {
            imgEl.src = fileUrl;
            imgEl.classList.remove('hidden');
          }
        }
        if (placeholderEl) placeholderEl.classList.add('hidden');
      } else {
        if (imgEl) imgEl.classList.add('hidden');
        if (iframeEl) iframeEl.classList.add('hidden');
        if (placeholderEl) placeholderEl.classList.remove('hidden');
      }

      // Update active state on tab buttons
      if (pageTabsBar) {
        const tabBtns = pageTabsBar.querySelectorAll('.ocr-page-tab');
        tabBtns.forEach((btn, idx) => {
          if (idx === pageIdx) {
            btn.className = 'ocr-page-tab active-tab';
          } else {
            btn.className = 'ocr-page-tab';
          }
        });
      }
    }

    if (pageTabsBar) {
      if (pages.length > 1) {
        pageTabsBar.classList.remove('hidden');
        pageTabsBar.innerHTML = pages.map((p, idx) => `
          <button type="button" class="ocr-page-tab ${idx === 0 ? 'active-tab' : ''}" data-page-idx="${idx}" title="${p.originalName}">
            📄 Page ${p.page || idx + 1}: ${p.originalName || ('Photo ' + (idx + 1))}
          </button>
        `).join('');
      } else {
        pageTabsBar.classList.add('hidden');
        pageTabsBar.innerHTML = '';
      }
    }

    renderPagePreview(0);

    // Render Fields List (Side-by-side right pane)
    const fieldsList = $('extracted-fields-list');
    if (fieldsList) {
      if (fields && fields.length > 0) {
        fieldsList.innerHTML = fields.map(f => {
          let badgeText = '✓ Verified';
          let badgeClass = 'verified';
          if (f.status === 'needs_verification') {
            badgeText = `⚠️ Needs verification (${f.confidence || 0}%)`;
            badgeClass = 'needs_verification';
          } else if (f.status === 'missing') {
            badgeText = 'Not found';
            badgeClass = 'missing';
          } else if (f.confidence) {
            badgeText = `✓ Verified (${f.confidence}%)`;
          }

          const isMultiLine = f.key === 'medicines' || f.key === 'woundCare' || f.key === 'surgeryDetails' || (f.value && f.value.length > 80);
          return `
            <div class="ocr-field-card ${badgeClass}">
              <div class="ocr-field-header">
                <span class="ocr-field-title">${escapeHtml(f.title || f.key)}</span>
                <span class="ocr-field-badge ${badgeClass}">${badgeText}</span>
              </div>
              ${isMultiLine ? `
                <textarea 
                  class="ocr-field-input" 
                  data-key="${escapeHtml(f.key)}" 
                  rows="3"
                  style="width: 100%; border: 1px solid var(--slate-300); border-radius: 6px; padding: 0.5rem; font-family: inherit; font-size: 0.875rem; resize: vertical;"
                  placeholder="${f.status === 'missing' ? 'Not found in document' : ''}"
                >${escapeHtml(f.value === 'Not found' ? '' : f.value)}</textarea>
              ` : `
                <input 
                  type="text" 
                  class="ocr-field-input" 
                  data-key="${escapeHtml(f.key)}" 
                  value="${escapeHtml(f.value === 'Not found' ? '' : f.value)}" 
                  placeholder="${f.status === 'missing' ? 'Not found in document' : ''}"
                >
              `}
            </div>
          `;
        }).join('');
      } else {
        // Fallback for sample summary
        fieldsList.innerHTML = `
          <div class="ocr-field-card verified">
            <div class="ocr-field-header"><span class="ocr-field-title">Patient Name</span><span class="ocr-field-badge verified">✓ Verified</span></div>
            <input type="text" class="ocr-field-input" data-key="patientName" value="${escapeHtml(data.patientName || '')}">
          </div>
          <div class="ocr-field-card verified">
            <div class="ocr-field-header"><span class="ocr-field-title">Patient ID</span><span class="ocr-field-badge verified">✓ Verified</span></div>
            <input type="text" class="ocr-field-input" data-key="patientId" value="${escapeHtml(data.patientId || '')}">
          </div>
          <div class="ocr-field-card verified">
            <div class="ocr-field-header"><span class="ocr-field-title">Diagnosis</span><span class="ocr-field-badge verified">✓ Verified</span></div>
            <input type="text" class="ocr-field-input" data-key="diagnosis" value="${escapeHtml(data.diagnosis || '')}">
          </div>
          <div class="ocr-field-card verified">
            <div class="ocr-field-header"><span class="ocr-field-title">Admission Date</span><span class="ocr-field-badge verified">✓ Verified</span></div>
            <input type="text" class="ocr-field-input" data-key="admissionDate" value="${escapeHtml(data.admissionDate || '')}">
          </div>
          <div class="ocr-field-card verified">
            <div class="ocr-field-header"><span class="ocr-field-title">Discharge Date</span><span class="ocr-field-badge verified">✓ Verified</span></div>
            <input type="text" class="ocr-field-input" data-key="dischargeDate" value="${escapeHtml(data.dischargeDate || '')}">
          </div>
        `;
      }
    }

    // Attach real-time 2-way sync to all editable OCR review inputs
    const inputEls = document.querySelectorAll('.ocr-field-input');
    inputEls.forEach(inp => {
      const handleInput = () => {
        const key = inp.dataset.key;
        const val = inp.value.trim();
        if (!key) return;

        if (state.extractedData) {
          state.extractedData[key] = val;
        }
        if (state.patientData) {
          syncSingleFieldToPatientData(key, val);
        }
      };
      inp.addEventListener('input', handleInput);
      inp.addEventListener('change', handleInput);
    });

    // Set raw OCR text dump
    const rawDump = $('ocr-raw-text-dump');
    if (rawDump) {
      rawDump.textContent = payload.rawText || data.rawText || 'Raw text preview not available for this entry.';
    }

    reviewSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function parseMedicinesFromInput(medStr, fallbackMeds) {
    if (!medStr || typeof medStr !== 'string') {
      return Array.isArray(fallbackMeds) ? fallbackMeds : [];
    }

    const rawItems = medStr.split(/[;\n]/).map(s => s.trim()).filter(s => s.length > 2);
    if (rawItems.length === 0) {
      return Array.isArray(fallbackMeds) ? fallbackMeds : [];
    }

    const seen = new Set();
    const result = [];

    rawItems.forEach((item, idx) => {
      // 1. Extract duration
      let duration = '';
      const bracketDur = item.match(/\[([^\]]+)\]/);
      if (bracketDur) {
        duration = bracketDur[1].trim();
      } else {
        const durM = item.match(/\b(?:FOR\s+|X\s*)?([0-9]+\s*(?:DAYS?|WEEKS?|MONTHS?))\b/i);
        if (durM) {
          duration = durM[1].trim().toLowerCase().startsWith('for ') ? durM[1].trim() : `For ${durM[1].trim()}`;
        }
      }

      // 2. Extract dose
      const doseM = item.match(/\b([0-9]+(?:\.[0-9]+)?\s*(?:mg|mcg|g|ml|iu|tablets?|capsules?))\b/i);
      const dose = doseM ? doseM[1].trim() : 'As prescribed';

      // 3. Extract timing
      let timing = 'Once daily';
      const timeM = item.match(/\b(Once\s+daily(?:\s*\([^\)]+\))?|Twice\s+daily(?:\s*\([^\)]+\))?|Three\s+times\s+a\s+day|At\s+night|Bedtime|In\s+morning|As\s+needed|Every\s+[0-9]+\s+hours?)/i);
      if (timeM) timing = timeM[1].trim();

      // 4. Extract name
      let name = item.split(/—|:|\b(?:Once|Twice|At night|Bedtime)\b/i)[0]
        .replace(/\[[^\]]+\]/g, '')
        .replace(/\([^)]+\)/g, '')
        .replace(/^[0-9\.\)\s]+/, '')
        .replace(/^(?:Tab\.?|Cap\.?|Syp\.?|Syr\.?|Inj\.?)\s+/i, '')
        .trim();
      if (!name || name.length < 2) name = `Prescribed Medication ${idx + 1}`;

      const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(norm)) return; // Skip duplicates
      seen.add(norm);

      // 5. Clean instructions
      let instructions = item;
      if (bracketDur) instructions = instructions.replace(bracketDur[0], '');
      if (timeM) instructions = instructions.replace(timeM[0], '');
      if (doseM) instructions = instructions.replace(doseM[0], '');
      const durCleanup = instructions.match(/\b(?:FOR\s+|X\s*)?([0-9]+\s*(?:DAYS?|WEEKS?|MONTHS?))\b/i);
      if (durCleanup) instructions = instructions.replace(durCleanup[0], '');
      instructions = instructions.replace(name, '').replace(/^[\s\:\-\–\—\,\.\(\)\[\]]+/, '').replace(/[\s\:\-\–\—\,\.\(\)\[\]]+$/, '').trim();
      if (!instructions || instructions.length < 2) instructions = 'Take as prescribed by attending physician';

      result.push({
        name,
        dose,
        timing,
        duration: duration || 'Ongoing recovery course',
        instructions
      });
    });

    return result;
  }

  function syncSingleFieldToPatientData(key, val) {
    if (!state.patientData) return;
    setTimeout(saveCurrentPatientData, 300);

    if (key === 'medicines') {
      const parsedMeds = parseMedicinesFromInput(val, state.extractedData?.medicines || []);
      state.patientData.medicines = parsedMeds;
      renderMedicineTable(parsedMeds);
      initMedicineAlerts(true);
      renderMedicineAlerts();
      return;
    }

    if (key === 'department') {
      state.patientData.department = val;
    } else if (key === 'patientName') {
      state.patientData.patientName = val;
      setText('rec-patient-name', val || 'N/A');
      setText('dash-patient-name', val || 'N/A');
      setText('header-patient-name', val || 'N/A');
    } else if (key === 'patientId') {
      state.patientData.patientId = val;
      setText('rec-patient-id', val || 'N/A');
      setText('dash-patient-id', val || 'N/A');
      setText('header-patient-id', val || 'N/A');
    } else if (key === 'hospitalName' || key === 'hospital') {
      state.patientData.hospital = val;
      state.patientData.hospitalName = val;
      setText('rec-doctor', state.patientData.doctor ? `${state.patientData.doctor} • ${val}` : val);
      setText('dash-sum-discharge', val || 'Verified Hospital');
    } else if (key === 'doctor') {
      state.patientData.doctor = val;
      setText('rec-doctor', state.patientData.hospital ? `${val} • ${state.patientData.hospital}` : val);
    } else if (key === 'diagnosis') {
      state.patientData.diagnosis = val;
      setText('rec-diagnosis', val || 'Clinical evaluation and recovery.');
      setText('dash-diagnosis', val || 'Clinical evaluation and recovery.');
      setText('dash-sum-diet', val ? `Tailored for ${val.split(' ')[0]}` : 'Convalescent Diet');
      state.patientData.dietPlan = generatePersonalizedDiet(val, state.patientData.medicines, state.patientData.dietInstructions);
      renderDietPlan(state.patientData.dietPlan);
    } else if (key === 'admissionDate') {
      state.patientData.admissionDate = val;
      setText('rec-adm-date', formatDate(val));
    } else if (key === 'dischargeDate') {
      state.patientData.dischargeDate = val;
      setText('rec-dis-date', formatDate(val));
      setText('dash-discharge-date', formatDate(val));
    } else if (key === 'age') {
      state.patientData.age = val;
      setText('rec-patient-age', val ? `${val} Yrs` : 'N/A');
      setText('dash-patient-age', `${val || ''} Yrs (${state.patientData.gender || 'Not specified'})`);
    } else if (key === 'gender') {
      state.patientData.gender = val;
      setText('rec-patient-gender', val || 'Not specified');
      setText('dash-patient-age', `${state.patientData.age || ''} Yrs (${val || 'Not specified'})`);
    } else if (key === 'wardBed') {
      state.patientData.wardBed = val;
      setText('rec-patient-ward', val || 'N/A');
    } else if (key === 'address') {
      state.patientData.address = val;
      setText('rec-hospital-address', val || 'N/A');
    } else if (key === 'reasonForAdmission') {
      state.patientData.reasonForAdmission = val;
      setText('rec-complaints', val || 'Documented symptoms and hospital course.');
    } else if (key === 'surgeryDetails') {
      state.patientData.surgeryDetails = val;
      setText('rec-surgery', val || 'N/A');
    } else if (key === 'dischargeCondition') {
      state.patientData.dischargeCondition = val;
      setText('rec-vitals', val || 'N/A');
    } else if (key === 'activityLifestyle') {
      state.patientData.activityLifestyle = val;
      setText('rec-activity', val || 'N/A');
    } else if (key === 'treatmentSummary' || key === 'clinicalSummary') {
      state.patientData.clinicalSummary = val;
      state.patientData.treatmentSummary = val;
      setText('rec-complaints', val || 'Documented symptoms and hospital course.');
    } else if (key === 'dietInstructions') {
      state.patientData.dietInstructions = val;
      setText('rec-diet', val || 'Standard balanced nutrition.');
      state.patientData.dietPlan = generatePersonalizedDiet(state.patientData.diagnosis, state.patientData.medicines, val);
      renderDietPlan(state.patientData.dietPlan);
    } else if (key === 'followUp') {
      if (!state.patientData.followUp) state.patientData.followUp = {};
      state.patientData.followUp.notes = val;
      setText('rec-followup', val || 'N/A');
    } else if (key === 'warningSigns') {
      state.patientData.warningSigns = [val];
      setText('rec-warnings', val || 'N/A');
    }
  }

  function updateActiveDischargeRecord(p) {
    if (!p) return;
    setText('rec-patient-name', p.patientName || 'N/A');
    setText('rec-patient-id', p.patientId || 'N/A');
    setText('rec-patient-age', p.age ? (String(p.age).includes('Yr') ? p.age : `${p.age} Yrs`) : 'N/A');
    setText('rec-patient-gender', p.gender || 'Not specified');
    setText('rec-patient-ward', p.wardBed || 'N/A');
    setText('rec-adm-date', formatDate(p.admissionDate));
    setText('rec-dis-date', formatDate(p.dischargeDate));
    setText('rec-hospital-address', p.address || 'N/A');
    setText('rec-diagnosis', p.diagnosis || 'Clinical evaluation and recovery.');
    setText('rec-doctor', p.doctor ? (p.hospital ? `${p.doctor} • ${p.hospital}` : p.doctor) : (p.followUp?.doctor ? `${p.followUp.doctor} • ${p.followUp.hospital}` : 'Attending Physician'));
    setText('rec-complaints', p.reasonForAdmission || p.clinicalSummary || p.courseInHospital || 'Documented symptoms and hospital course.');
    setText('rec-surgery', p.surgeryDetails || p.treatmentSummary || 'No surgical intervention documented.');
    setText('rec-vitals', p.dischargeCondition || 'Stable condition at discharge.');
    setText('rec-diet', p.dietInstructions || 'Standard balanced nutrition.');
    setText('rec-activity', p.activityLifestyle || 'Light activity as tolerated; avoid strenuous lifting.');
    setText('rec-wound-care', p.woundCare || 'Maintain sterile hygiene, keep dressing clean and dry, wash hands before touching dressing, avoid rubbing.');
    
    let followUpText = '';
    if (typeof p.followUp === 'string') {
      followUpText = p.followUp;
    } else if (p.followUp && typeof p.followUp === 'object') {
      followUpText = [
        p.followUp.date ? `Date: ${p.followUp.date}` : '',
        p.followUp.doctor ? `Doctor: ${p.followUp.doctor}` : '',
        p.followUp.notes || ''
      ].filter(Boolean).join(' • ');
    }
    setText('rec-followup', followUpText || 'Schedule follow-up appointment with primary care provider.');

    let warningsText = '';
    if (Array.isArray(p.warningSigns)) {
      warningsText = p.warningSigns.join('; ');
    } else if (p.warningSigns) {
      warningsText = String(p.warningSigns);
    }
    setText('rec-warnings', warningsText || 'Seek immediate medical attention for sudden chest pain, shortness of breath, high fever, or fainting.');

    const recBadge = $('rec-status-badge');
    if (recBadge) {
      recBadge.textContent = 'Active Verified Record';
      recBadge.className = 'badge badge-success';
    }
  }

  function confirmExtractedCarePlan() {
    if (!state.extractedData && !state.patientData) return;

    if (!state.patientData) {
      state.patientData = JSON.parse(JSON.stringify(state.extractedData || {}));
    }

    // Collect user edits from all .ocr-field-input fields
    const inputs = document.querySelectorAll('.ocr-field-input');
    inputs.forEach(input => {
      const key = input.dataset.key;
      const val = input.value.trim();
      if (!key) return;

      if (key === 'medicines') {
        const parsedMeds = parseMedicinesFromInput(val, state.extractedData?.medicines || state.patientData?.medicines);
        state.patientData.medicines = (parsedMeds && parsedMeds.length > 0) ? parsedMeds : (state.extractedData?.medicines || []);
      } else {
        syncSingleFieldToPatientData(key, val);
      }
    });

    if (state.extractedData && Array.isArray(state.extractedData.medicines) && state.extractedData.medicines.length > 0) {
      state.patientData.medicines = JSON.parse(JSON.stringify(state.extractedData.medicines));
    }

    // Re-generate clinical diet plan with updated diagnosis and medicines
    state.patientData.dietPlan = generatePersonalizedDiet(
      state.patientData.diagnosis,
      state.patientData.medicines,
      state.patientData.dietInstructions
    );

    renderMedicineTable(state.patientData.medicines || []);
    initMedicineAlerts(true);
    renderMedicineAlerts();
    saveCurrentPatientData();

    renderDietPlan(state.patientData.dietPlan);
    renderAllViews();
    updateActiveDischargeRecord(state.patientData);

    const reviewSec = $('extracted-review-section');
    if (reviewSec) reviewSec.classList.add('hidden');

    showUploadAlert('success', '✓ All changes confirmed and updated across CareBridge! Active Discharge Record, Medicines, Alerts, and Diet Plan are synchronized.');
    removeSelectedFile();
  }

  function discardExtractedData() {
    state.extractedData = null;
    const reviewSec = $('extracted-review-section');
    if (reviewSec) reviewSec.classList.add('hidden');

    showUploadAlert('info', 'Extracted preview discarded. Current care plan maintained.');
  }

  function showUploadAlert(type, msg) {
    const el = $('upload-status-alert');
    if (el) {
      el.className = `alert alert-${type}`;
      el.textContent = msg;
      el.classList.remove('hidden');
    }
  }

  function clearUploadAlert() {
    const el = $('upload-status-alert');
    if (el) el.classList.add('hidden');
  }

  // ============================================================
  // ============================================================
  // "CAN I EAT THIS?" FOOD SEARCH ENGINE
  // Smart multi-strategy matching: Direct match, Natural Language,
  // Diet plan check, Category fallback, and Substring matching
  // ============================================================
  function handleFoodSearch(rawQuery) {
    if (!rawQuery || !rawQuery.trim()) return;

    let raw = rawQuery.trim();
    // Normalize string: lowercase, remove punctuation
    let query = raw.toLowerCase().replace(/[?!.,;:()'"]/g, '').trim();

    // Check if user is asking general questions like "what we eat", "what can I eat", "diet plan"
    const isGeneralDietQuery = /^(what\s+(can\s+)?(we|i)\s+eat|what\s+to\s+eat|what\s+foods?\s+to\s+eat|what\s+should\s+i\s+eat|can\s+we\s+eat(\s+food)?|diet\s*plan|healthy\s+diet|food\s+menu|my\s+diet|what\s+we\s+eat|foods?\s+to\s+eat)/i.test(query);

    const activeDiag = (state.patientData && state.patientData.diagnosis) || 'General Convalescence';
    const selectedKey = $('diet-condition-select') ? $('diet-condition-select').value : '';
    const condKey = selectedKey || (window.matchDiseaseCondition ? window.matchDiseaseCondition(activeDiag) : '');
    const currentDiet = (state.patientData && state.patientData.dietPlan) || null;

    // A) If user asked "what we eat" / "what can we eat" -> Return their personalized recovery diet directly!
    if (isGeneralDietQuery) {
      let topFoods = [];
      if (currentDiet && currentDiet.eat && currentDiet.eat.length > 0) {
        topFoods = currentDiet.eat.slice(0, 8).map(item => item.food);
      } else {
        topFoods = ['Moong Dal Khichdi', 'Plain Steamed Rice', 'Soft Idli', 'Fresh Curd / Chaas', 'Boiled Egg Whites', 'Tender Coconut Water', 'Ripe Bananas', 'Boiled Bottle Gourd (Lauki)'];
      }

      renderSearchVerdict({
        food: 'Personalized Recovery Diet (' + (condKey || activeDiag) + ')',
        verdict: 'suitable',
        explanation: 'Recommended wholesome foods for your condition: ' + topFoods.join(', ') + '.',
        notes: 'These gentle staples support tissue repair and smooth digestion. Check your Personalized Diet Plan tab for all 14 recommended foods.'
      });
      return;
    }

    // Strip leading conversational phrases: "can i eat...", "is it safe to eat...", "should i have..."
    let cleanQuery = query
      .replace(/^(can\s+i\s+eat|what\s+can\s+i\s+eat|what\s+can\s+we\s+eat|what\s+to\s+eat|can\s+we\s+eat|is\s+it\s+safe\s+to\s+eat|should\s+i\s+eat|can\s+i\s+have|can\s+i\s+drink|is\s+it\s+ok\s+to\s+eat|do\s+we\s+eat|how\s+about)\s+/i, '')
      .replace(/^(is|are|a|an|the|any|some)\s+/i, '')
      .trim();

    if (!cleanQuery) cleanQuery = query;

    let match = null;

    // Helper: Category and broad term map for common Indian terms and broad food groups
    const CATEGORY_MAP = {
      'legumes': {
        food: 'Legumes & Pulses (Dals)',
        verdict: 'suitable',
        explanation: 'Yellow Moong Dal, Masoor Dal, and Toor Dal are easily digested plant proteins.',
        notes: 'Cook well with a pinch of cumin (jeera) or asafoetida (hing). Avoid heavy unsoaked rajma or chole during acute digestion issues.'
      },
      'lean protein': {
        food: 'Lean Protein Sources',
        verdict: 'suitable',
        explanation: 'Boiled egg whites, fresh paneer, mild chicken stew, steamed fish, and moong dal provide high-quality tissue-healing protein.',
        notes: 'Prepare without deep frying or heavy oily gravies.'
      },
      'protein': {
        food: 'Protein Rich Foods',
        verdict: 'suitable',
        explanation: 'Boiled egg whites, fresh paneer, well-cooked dal, and steamed fish/chicken help wound recovery and muscle strength.',
        notes: 'Opt for steamed or lightly boiled preparations.'
      },
      'porridge': {
        food: 'Porridge (Daliya / Oats / Kanji)',
        verdict: 'suitable',
        explanation: 'Warm broken wheat daliya, soft oatmeal, and rice kanji are exceptionally soothing on the stomach.',
        notes: 'Serve warm with a touch of milk or light vegetable seasoning.'
      },
      'dry fruits': {
        food: 'Dry Fruits & Nuts',
        verdict: 'limit',
        explanation: 'Soaked almonds and walnuts are nutritious. Avoid unsoaked whole hard nuts if chewing or digestion is impaired.',
        notes: 'Soak 4-5 almonds overnight and peel skins for effortless digestion.'
      },
      'nuts': {
        food: 'Nuts & Seeds',
        verdict: 'limit',
        explanation: 'Soaked almonds, roasted makhana, and walnuts provide healthy fats in small controlled portions.',
        notes: 'Consume roasted or soaked; avoid salted, sugar-coated, or heavily spiced nuts.'
      },
      'sweets': {
        food: 'Sweets & Desserts',
        verdict: 'avoid',
        explanation: 'Heavy sugar sweets (gulab jamun, jalebi, halwa) spike blood sugar and delay surgical wound recovery.',
        notes: 'Satisfy sweet cravings with naturally sweet ripe banana, papaya, or stewed apple.'
      },
      'spicy food': {
        food: 'Spicy & Chilli-Heavy Foods',
        verdict: 'avoid',
        explanation: 'Red chilli, street chat, and heavy garam masala irritate gastrointestinal lining and worsen medication acidity.',
        notes: 'Favor gentle cumin, coriander, and turmeric seasoning.'
      },
      'snacks': {
        food: 'Healthy Convalescent Snacks',
        verdict: 'suitable',
        explanation: 'Roasted makhana (foxnuts), puffed rice (murmura), soft idli, and plain poha are gentle and low-oil.',
        notes: 'Avoid fried samosas, pakoras, bhujia, or chips.'
      },
      'fruits': {
        food: 'Fresh Fruits',
        verdict: 'suitable',
        explanation: 'Bananas, apples, papayas, and sweet oranges offer essential recovery vitamins, potassium, and hydration.',
        notes: 'Wash well and eat fresh; avoid excessively sour unpeeled fruits if throat is sensitive.'
      },
      'vegetables': {
        food: 'Fresh Vegetables',
        verdict: 'suitable',
        explanation: 'Bottle gourd (lauki), ridge gourd (turai), carrots, potatoes, and spinach provide vital electrolytes and fiber.',
        notes: 'Consume boiled or lightly steamed; avoid raw unwashed salads during early recovery.'
      },
      'dairy': {
        food: 'Dairy Products',
        verdict: 'suitable',
        explanation: 'Fresh homemade curd, diluted buttermilk (chaas), and toned milk provide natural probiotics and calcium.',
        notes: 'Avoid heavy cream, malai, or high-fat cheese.'
      },
      'curry': {
        food: 'Curries & Gravies',
        verdict: 'limit',
        explanation: 'Mild home-cooked dal and light vegetable stew are beneficial. Heavy oily restaurant curries should be avoided.',
        notes: 'Prepare with minimal oil and gentle spices.'
      }
    };

    // 1. Check Category Map first
    for (const [catKey, catVal] of Object.entries(CATEGORY_MAP)) {
      if (cleanQuery === catKey || cleanQuery.includes(catKey) || catKey.includes(cleanQuery)) {
        match = { ...catVal };
        break;
      }
    }

    // 2. Search in Current Active Patient Diet Plan (Eat, Limit, Avoid)
    if (!match && currentDiet) {
      if (currentDiet.avoid) {
        for (const item of currentDiet.avoid) {
          const fn = (item.food || '').toLowerCase();
          if (fn.includes(cleanQuery) || cleanQuery.includes(fn)) {
            match = {
              food: item.food,
              verdict: 'avoid',
              explanation: item.reason,
              notes: 'Documented in your Personalized Care Plan as an item to strictly avoid.'
            };
            break;
          }
        }
      }
      if (!match && currentDiet.limit) {
        for (const item of currentDiet.limit) {
          const fn = (item.food || '').toLowerCase();
          if (fn.includes(cleanQuery) || cleanQuery.includes(fn)) {
            match = {
              food: item.food,
              verdict: 'limit',
              explanation: item.reason,
              notes: 'Documented in your Personalized Care Plan as an item to consume in strict moderation.'
            };
            break;
          }
        }
      }
      if (!match && currentDiet.eat) {
        for (const item of currentDiet.eat) {
          const fn = (item.food || '').toLowerCase();
          if (fn.includes(cleanQuery) || cleanQuery.includes(fn)) {
            match = {
              food: item.food,
              verdict: 'suitable',
              explanation: item.reason,
              notes: 'Recommended in your Personalized Care Plan as a supportive healing food.'
            };
            break;
          }
        }
      }
    }

    // 3. Search in EXTENDED_FOOD_DATABASE (1,000+ Items)
    if (!match && window.EXTENDED_FOOD_DATABASE) {
      let extItem = null;

      // Direct key match
      if (window.EXTENDED_FOOD_DATABASE[cleanQuery]) {
        extItem = window.EXTENDED_FOOD_DATABASE[cleanQuery];
      } else {
        // Alias match or Substring match
        for (const [key, item] of Object.entries(window.EXTENDED_FOOD_DATABASE)) {
          if (item.aliases && item.aliases.some(a => a === cleanQuery || a.includes(cleanQuery) || cleanQuery.includes(a))) {
            extItem = item;
            break;
          }
          if (key.includes(cleanQuery) || cleanQuery.includes(key)) {
            extItem = item;
            break;
          }
        }
      }

      // If still not found, do token word matching (e.g. "moong dal", "coconut")
      if (!extItem) {
        const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 2);
        if (queryTokens.length > 0) {
          let maxScore = 0;
          for (const [key, item] of Object.entries(window.EXTENDED_FOOD_DATABASE)) {
            const allTokens = [key, ...(item.aliases || [])].join(' ').toLowerCase();
            let score = 0;
            for (const t of queryTokens) {
              if (allTokens.includes(t)) score++;
            }
            if (score > maxScore && score >= Math.min(queryTokens.length, 1)) {
              maxScore = score;
              extItem = item;
              if (maxScore === queryTokens.length) break;
            }
          }
        }
      }

      if (extItem) {
        let finalVerdict = extItem.verdict;
        let finalExplanation = extItem.explanation;
        let finalNotes = extItem.notes;

        if (condKey && extItem.diseaseOverrides) {
          for (const [disKey, override] of Object.entries(extItem.diseaseOverrides)) {
            if (condKey.toLowerCase().includes(disKey.toLowerCase()) || disKey.toLowerCase().includes(condKey.toLowerCase())) {
              finalVerdict = override.verdict || finalVerdict;
              finalExplanation = override.explanation || finalExplanation;
              finalNotes = 'Clinical Caution for ' + condKey + ': ' + override.explanation;
              break;
            }
          }
        }

        match = {
          food: extItem.food,
          category: extItem.category,
          verdict: finalVerdict,
          explanation: finalExplanation,
          notes: finalNotes || ('Category: ' + (extItem.category || 'Clinical Nutrition'))
        };
      }
    }

    // 4. Search in CLINICAL_DISEASES_DB (271 Protocols)
    if (!match && window.CLINICAL_DISEASES_DB) {
      for (const [key, proto] of Object.entries(window.CLINICAL_DISEASES_DB)) {
        if (proto.avoid) {
          for (const item of proto.avoid) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(cleanQuery) || cleanQuery.includes(f)) {
              match = {
                food: item.food,
                verdict: 'avoid',
                explanation: item.reason,
                notes: 'Source: Protocol for ' + proto.name + ' (' + (proto.category || 'Clinical Guidance') + ')'
              };
              break;
            }
          }
        }
        if (match) break;
        if (proto.limit) {
          for (const item of proto.limit) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(cleanQuery) || cleanQuery.includes(f)) {
              match = {
                food: item.food,
                verdict: 'limit',
                explanation: item.reason,
                notes: 'Source: Protocol for ' + proto.name + ' (' + (proto.category || 'Clinical Guidance') + ')'
              };
              break;
            }
          }
        }
        if (match) break;
        if (proto.eat) {
          for (const item of proto.eat) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(cleanQuery) || cleanQuery.includes(f)) {
              match = {
                food: item.food,
                verdict: 'suitable',
                explanation: item.reason,
                notes: 'Source: Protocol for ' + proto.name + ' (' + (proto.category || 'Clinical Guidance') + ')'
              };
              break;
            }
          }
        }
        if (match) break;
      }
    }

    // 5. Intelligent Convalescent Guidance Fallback
    // Never show an unhelpful blank error; provide practical guidance based on general clinical nutrition principles
    if (!match) {
      // Analyze food keywords for safety cues
      const isLikelyAvoid = /(fried|deep\s*fried|alcohol|liquor|beer|whisky|chilli|spicy|masala|soda|cola|carbonated|junk|street\s*food|heavy\s*gravy|creamy)/i.test(cleanQuery);
      const isLikelyGentle = /(boiled|steamed|soup|dal|water|tea|milk|curd|rice|roti|fruit|veg|oats|khichdi|banana|apple)/i.test(cleanQuery);

      if (isLikelyAvoid) {
        match = {
          food: capitalise(raw),
          verdict: 'avoid',
          explanation: 'Heavy, deep-fried, highly spicy, or alcohol-containing items can irritate recovering stomach lining and interfere with medications.',
          notes: 'Standard clinical guidance recommends avoiding this during post-discharge recovery.'
        };
      } else if (isLikelyGentle) {
        match = {
          food: capitalise(raw),
          verdict: 'suitable',
          explanation: 'Light, well-cooked, or steamed foods are generally safe and easily tolerated during convalescence.',
          notes: 'Prepare fresh with minimal oil and gentle seasoning.'
        };
      } else {
        match = {
          food: capitalise(raw),
          verdict: 'limit',
          explanation: 'Moderate intake is recommended during recovery. Introduce in small portions to ensure comfort and smooth digestion.',
          notes: 'Prepare in a simple, low-oil, easily digestible format.'
        };
      }
    }

    renderSearchVerdict(match);
  }

    function renderSearchVerdict(result) {
    const container = $('food-search-result');
    if (!container) return;
    const isTe = (state.currentLang === 'te');

    container.classList.remove('hidden');

    // Color and border mapping
    const configs = {
      suitable: {
        badgeText: isTe ? 'కోలుకోవడానికి అనుకూలమైన మంచి ఆహారం' : 'Suitable according to available information',
        badgeClass: 'badge-success',
        icon: '✅',
        borderClass: 'res-suitable'
      },
      limit: {
        badgeText: isTe ? 'పరిమితంగా లేదా జాగ్రత్తగా తీసుకోవాలి' : 'Eat with caution or limit',
        badgeClass: 'badge-warning',
        icon: '⚠️',
        borderClass: 'res-limit'
      },
      avoid: {
        badgeText: isTe ? 'తప్పక నివారించవలసిన ఆహారం' : 'Avoid according to documented restrictions',
        badgeClass: 'badge-danger',
        icon: '🚫',
        borderClass: 'res-avoid'
      },
      unknown: {
        badgeText: isTe ? 'వైద్యుడిని లేదా డైటీషియన్‌ను సంప్రదించండి' : 'Unable to confirm — consult your healthcare provider',
        badgeClass: 'badge-secondary',
        icon: '❓',
        borderClass: 'res-unknown'
      }
    };

    const cfg = configs[result.verdict] || configs.unknown;

    // Remove old border classes
    container.className = `search-verdict-card ${cfg.borderClass}`;

    setText('verdict-icon', cfg.icon);
    const displayFoodName = isTe ? translateFoodToTelugu(result.food) : capitalise(result.food);
    setText('verdict-food-name', displayFoodName);

    const badge = $('verdict-badge');
    if (badge) {
      badge.textContent = cfg.badgeText;
      badge.className = `badge ${cfg.badgeClass}`;
    }

    const displayExplanation = isTe ? translateReasonToTelugu(result.explanation) : result.explanation;
    setText('verdict-explanation', displayExplanation);

    const notesWrap = $('verdict-notes-wrap');
    if (notesWrap) {
      if (result.notes) {
        notesWrap.classList.remove('hidden');
        const notesLabel = notesWrap.querySelector('strong');
        if (notesLabel) notesLabel.textContent = isTe ? 'సిఫార్సు:' : 'Recommendation:';
        const displayNotes = isTe ? translateReasonToTelugu(result.notes) : result.notes;
        setText('verdict-notes-text', displayNotes);
      } else {
        notesWrap.classList.add('hidden');
      }
    }

    const footerNote = container.querySelector('.verdict-footer-note');
    if (footerNote) {
      footerNote.textContent = isTe
        ? 'పరీక్ష కొరకు నిర్ణయ సహాయక నియమం — వైద్య ప్రిస్క్రిప్షన్ లేదా క్లినికల్ నిర్ధారణ కాదు.'
        : 'Decision support rule for testing — not a medical prescription or clinical diagnosis.';
    }

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function downloadCareSheet() {
    const p = state.patientData || SAMPLE_PATIENT;

    const btn1 = $('btn-header-care-sheet');
    const btn2 = $('dash-btn-caresheet');

    const orig1 = btn1 ? btn1.textContent : '';
    const orig2 = btn2 ? btn2.textContent : '';

    if (btn1) { btn1.textContent = '⏳ Generating PDF...'; btn1.disabled = true; }
    if (btn2) { btn2.textContent = '⏳ Generating PDF...'; btn2.disabled = true; }

    fetch('/api/generate-caresheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({}, p, { lang: state.currentLang }))
    })
    .then(res => {
      if (!res.ok) throw new Error('PDF Generation failed');
      return res.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CareBridge_CareSheet_${p.patientId || 'Demo'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (btn1) { btn1.textContent = orig1; btn1.disabled = false; }
      if (btn2) { btn2.textContent = orig2; btn2.disabled = false; }
    })
    .catch(() => {
      alert('Could not download Care Sheet. Please verify server connection.');
      if (btn1) { btn1.textContent = orig1; btn1.disabled = false; }
      if (btn2) { btn2.textContent = orig2; btn2.disabled = false; }
    });
  }

  // ============================================================
  // LANGUAGE SWITCHER (FULL UI TRANSLATION FOR ENGLISH & TELUGU)
  // Pure translation without combining or meshing languages
  // ============================================================
    function switchLanguage(lang) {
    state.currentLang = (lang === 'te') ? 'te' : 'en';
    const isTe = (state.currentLang === 'te');
    const t = I18N[state.currentLang] || I18N.en;

    // Header buttons & selector
    const btn = $('btn-header-care-sheet');
    if (btn) btn.textContent = isTe ? '📥 కేర్ షీట్ డౌన్‌లోడ్' : '📥 Download Care Sheet';

    const dashBtn = $('dash-btn-caresheet');
    if (dashBtn) dashBtn.textContent = isTe ? '📄 ముద్రించదగిన కేర్ షీట్' : '📄 Printable Care Sheet';

    const sel = $('lang-select');
    if (sel) sel.value = state.currentLang;

    // 1. Sidebar Menu Navigation (Clean, pure Telugu - NO COMBINING, NO MESHING)
    const menuItems = {
      'dashboard': isTe ? 'డాష్‌బోర్డ్' : 'Dashboard',
      'discharge': isTe ? 'డిశ్చార్జ్ సారాంశం' : 'Discharge Summary',
      'medicines': isTe ? 'మందుల షెడ్యూల్' : 'Medicine Schedule',
      'alerts': isTe ? 'మందుల రిమైండర్లు' : 'Dosage Reminders',
      'diet': isTe ? 'వ్యక్తిగత ఆహార ప్రణాళిక' : 'Personalised Diet Plan',
      'food-search': isTe ? 'నేను ఇది తినవచ్చా?' : 'Can I Eat This?',
      'followup': isTe ? 'ఫాలో-అప్ & రికవరీ' : 'Follow-up & Recovery',
      'warnings': isTe ? 'హెచ్చరిక సంకేతాలు' : 'Warning Signs'
    };

    $$('.sidebar-menu-item').forEach(item => {
      const page = item.getAttribute('data-page');
      if (page && menuItems[page]) {
        // Fix: Select .menu-text specifically to avoid touching .menu-icon
        const textSpan = item.querySelector('.menu-text') || item.querySelectorAll('span')[1];
        if (textSpan) textSpan.textContent = menuItems[page];
      }
    });

    const sideAlertBadge = $('sidebar-alert-badge');
    if (sideAlertBadge) sideAlertBadge.textContent = isTe ? 'యాక్టివ్' : 'Active';

    const sideFootNotice = document.querySelector('.sidebar-footer-notice');
    if (sideFootNotice) {
      sideFootNotice.innerHTML = isTe
        ? '<strong>సహాయక సమాచారం:</strong> కేర్‌బ్రిడ్జ్ మీ డిశ్చార్జ్ సూచనలను క్రమబద్ధీకరిస్తుంది. ఇది డాక్టర్ సలహాకు ప్రత్యామ్నాయం కాదు.'
        : '<strong>Decision Support:</strong> CareBridge organises discharge instructions and does not replace doctor advice.';
    }

    // 2. Main Page Headers & Subtitles
    if (isTe) {
      setText('main-title', 'కేర్‌బ్రిడ్జ్');
      setText('main-subtitle', 'ఇంటి వద్ద ఆరోగ్యంగా కోలుకోవడానికి మీ సమగ్ర డిశ్చార్జ్ మార్గదర్శిని.');

      // Dashboard View
      const dashH1 = $('page-dashboard')?.querySelector('h1');
      if (dashH1) dashH1.textContent = 'కేర్‌బ్రిడ్జ్‌కి స్వాగతం';
      const dashSub = $('page-dashboard')?.querySelector('.subtitle');
      if (dashSub) dashSub.textContent = 'ఇంటి వద్ద ఆరోగ్యంగా కోలుకోవడానికి మీ సమగ్ర డిశ్చార్జ్ సూచనలు.';

      // Hero labels
      const diagBar = document.querySelector('.hero-diagnosis-bar span:first-child');
      if (diagBar) diagBar.textContent = 'రోగ నిర్ధారణ:';
      const upBtn = document.querySelector('.patient-hero-card .hero-actions button[data-page="discharge"]');
      if (upBtn) upBtn.textContent = 'పత్రం అప్‌లోడ్ చేయండి →';

      // 4 Dashboard Summary Card Titles
      const sumTitles = $$('.dashboard-summary-grid .summary-card-title');
      if (sumTitles.length >= 4) {
        sumTitles[0].textContent = 'డిశ్చార్జ్ సారాంశం';
        sumTitles[1].textContent = 'మందుల షెడ్యూల్';
        sumTitles[2].textContent = 'ఆహార ప్రణాళిక';
        sumTitles[3].textContent = 'తదుపరి సంప్రదింపు';
      }

      // Feature Action Cards in Dashboard
      const planH2 = document.querySelector('.care-plan-section .section-label-bar h2');
      if (planH2) planH2.textContent = 'మీ ఆరోగ్య సంరక్షణ ప్రణాళిక';
      const planBadge = document.querySelector('.care-plan-section .section-label-bar .badge');
      if (planBadge) planBadge.textContent = 'పూర్తి విభాగాలు';

      const featCards = $$('.feature-action-card');
      const featTitles = [
        { title: 'నా డిశ్చార్జ్ సారాంశం', desc: 'ఆసుపత్రి పత్రం అప్‌లోడ్ చేయండి లేదా క్లినికల్ వివరాలు చూడండి.' },
        { title: 'మందుల షెడ్యూల్', desc: 'మోతాదులు, సమయాలు, వ్యవధి మరియు డాక్టర్ సూచనలను స్పష్టంగా చూడండి.' },
        { title: 'మందుల అలర్ట్‌లు', desc: 'మీ మందులను సరైన సమయానికి తీసుకోవడానికి ఆటోమేటిక్ రిమైండర్లు & అలారాలు.' },
        { title: 'వ్యక్తిగత ఆహార ప్రణాళిక', desc: 'తినవలసిన ఆహారాలు, పరిమితం చేయవలసినవి మరియు నివారించవలసినవి.' },
        { title: 'నేను ఇది తినవచ్చా?', desc: 'ఏదైనా నిర్దిష్ట ఆహార పదార్థాన్ని సురక్షితంగా తినవచ్చో లేదో తక్షణమే తనిఖీ చేయండి.' },
        { title: 'ఫాలో-అప్ & రికవరీ', desc: 'డాక్టర్ అపాయింట్‌మెంట్ వివరాలు మరియు గృహ సంరక్షణ చెక్‌లిస్ట్.' },
        { title: 'హెచ్చరిక సంకేతాలు', desc: 'తక్షణ అత్యవసర వైద్య సహాయం అవసరమైన ప్రమాదకర లక్షణాలను గుర్తించండి.' }
      ];
      featCards.forEach((card, idx) => {
        if (featTitles[idx]) {
          const h3 = card.querySelector('h3');
          if (h3) h3.textContent = featTitles[idx].title;
          const p = card.querySelector('p');
          if (p) p.textContent = featTitles[idx].desc;
        }
      });

      // Discharge Upload View
      const disH1 = $('page-discharge')?.querySelector('h1');
      if (disH1) disH1.textContent = 'ఆసుపత్రి డిశ్చార్జ్ సారాంశం';
      const disSub = $('page-discharge')?.querySelector('.subtitle');
      if (disSub) disSub.textContent = 'మీ ఆసుపత్రి డిశ్చార్జ్ పత్రం నుండి నేరుగా ధృవీకరించబడిన క్లినికల్ వివరాలు.';
      const dropTitle = document.querySelector('.dropzone-title');
      if (dropTitle) dropTitle.textContent = 'డిశ్చార్జ్ సారాంశం ఫైళ్ళను ఇక్కడ వేయండి లేదా ఎంచుకోండి';
      const btnOcr = $('btn-trigger-ocr');
      if (btnOcr) btnOcr.textContent = '📄 పత్రాన్ని స్కాన్ చేయండి';

      // Medicine Schedule View
      const medH1 = $('page-medicines')?.querySelector('h1');
      if (medH1) medH1.textContent = 'నా మందుల సమయ పట్టిక';
      const medSub = $('page-medicines')?.querySelector('.subtitle');
      if (medSub) medSub.textContent = 'సూచించిన మందులు, సమయాలు మరియు రోజువారీ మోతాదు సూచనలు.';
      const ths = $$('#page-medicines table th');
      if (ths.length >= 5) {
        ths[0].textContent = 'మందు పేరు & మోతాదు';
        ths[1].textContent = 'మోతాదు';
        ths[2].textContent = 'సమయం';
        ths[3].textContent = 'వ్యవధి';
        ths[4].textContent = 'ప్రత్యేక సూచనలు';
      }

      // Dosage Reminders View
      const alertH1 = $('page-alerts')?.querySelector('h1');
      if (alertH1) alertH1.textContent = 'మందుల రిమైండర్లు & అలర్ట్‌లు';
      const alertSub = $('page-alerts')?.querySelector('.subtitle');
      if (alertSub) alertSub.textContent = 'మీ మందులను సకాలంలో తీసుకోవడానికి ఆటోమేటిక్ రిమైండర్లు.';

      // Diet Plan View
      const dietH1 = $('page-diet')?.querySelector('h1');
      if (dietH1) dietH1.textContent = 'నా వ్యక్తిగత ఆహార ప్రణాళిక';
      const dietSub = $('page-diet')?.querySelector('.subtitle');
      if (dietSub) dietSub.textContent = 'మీ వ్యాధి నిర్ధారణ ఆధారంగా నిపుణుల పోషకాహార సూచనలు.';
      const colEatH2 = document.querySelector('.col-eat h2');
      if (colEatH2) colEatH2.textContent = 'తినవలసిన మంచి ఆహారాలు';
      const colLimitH2 = document.querySelector('.col-limit h2');
      if (colLimitH2) colLimitH2.textContent = 'పరిమితంగా తీసుకోవలసిన ఆహారాలు';
      const colAvoidH2 = document.querySelector('.col-avoid h2');
      if (colAvoidH2) colAvoidH2.textContent = 'తప్పక నివారించవలసిన ఆహారాలు & హెచ్చరికలు';

      // Protocol selector & banner
      const protLabel = document.querySelector('label[for="diet-condition-select"]');
      if (protLabel) protLabel.textContent = '🏥 క్లినికల్ ప్రోటోకాల్:';
      const totalBadge = $('diet-total-conditions-badge');
      if (totalBadge) totalBadge.textContent = '271 ప్రోటోకాల్‌లు (150 శస్త్రచికిత్సలు + 120 వ్యాధులు)';
      const condTag = $('diet-condition-tag');
      if (condTag) condTag.textContent = '📋 వ్యాధి ప్రోటోకాల్';

      // Remedies header, subtitle & search placeholder
      const remCard = $('diet-med-remedies-card');
      if (remCard) {
        const remH2 = remCard.querySelector('h2');
        if (remH2) remH2.textContent = '💊 మందుల దుష్ప్రభావ రక్షణ & ఆహార పరిష్కారాలు';
        const remP = remCard.querySelector('p');
        if (remP) remP.textContent = 'మందుల దుష్ప్రభావాలు (కడుపులో మంట, వికారం, కండరాల తిమ్మిరి) తగ్గించడానికి మరియు ప్రమాదకర ఆహార కలయికలను నివారించడానికి ఆహార పరిష్కారాలు.';
      }
      const remSearchInp = $('med-remedy-search-input');
      if (remSearchInp) remSearchInp.placeholder = '🔍 ఏ మందుకైనా ఆహార పరిష్కారాలు వెతకండి (ఉదా: పారాసిటమాల్, అమోక్సిసిలిన్, ఇబుప్రోఫెన్, పాంటోప్రజోల్)...';

      // Food Search View
      const searchH1 = $('page-food-search')?.querySelector('h1');
      if (searchH1) searchH1.textContent = 'నేను ఇది తినవచ్చా?';
      const searchSub = $('page-food-search')?.querySelector('.subtitle');
      if (searchSub) searchSub.textContent = '1,000+ ఆహారాలు మరియు 271 క్లినికల్ ప్రోటోకాల్‌ల ప్రకారం ఆహార భద్రతను తనిఖీ చేయండి.';
      const searchInp = $('food-search-input');
      if (searchInp) searchInp.placeholder = 'ఆహారం లేదా పానీయం వెతకండి (ఉదా: పనీర్, చికెన్, కొబ్బరి నీళ్ళు, బొప్పాయి, సమోసా, ఓట్స్, చేపలు)...';
      const btnSearch = $('btn-search-food');
      if (btnSearch) btnSearch.textContent = '🔍 ఆహారాన్ని వెతకండి';
      const quickLbl = document.querySelector('.quick-search-label');
      if (quickLbl) quickLbl.textContent = 'త్వరిత పరీక్ష ఆహారాలు:';

      // Follow-up View
      const folH1 = $('page-followup')?.querySelector('h1');
      if (folH1) folH1.textContent = 'తదుపరి డాక్టర్ సంప్రదింపు & గృహ సంరక్షణ';
      const folSub = $('page-followup')?.querySelector('.subtitle');
      if (folSub) folSub.textContent = 'డాక్టర్ అపాయింట్‌మెంట్ వివరాలు మరియు రోజువారీ సంరక్షణ చెక్‌లిస్ట్.';
      const appH2 = document.querySelector('.appointment-card h2');
      if (appH2) appH2.textContent = 'తదుపరి అపాయింట్‌మెంట్';
      const appBadge = document.querySelector('.appointment-card .badge');
      if (appBadge) appBadge.textContent = 'షెడ్యూల్ చేయబడింది';
      const chkH2 = document.querySelector('.checklist-card h2');
      if (chkH2) chkH2.textContent = 'గృహ సంరక్షణ సూచనలు';

      const appLabels = $$('.appointment-detail-list .app-item label');
      if (appLabels.length >= 4) {
        appLabels[0].textContent = 'ఫాలో-అప్ తేదీ & సమయం';
        appLabels[1].textContent = 'వైద్యుడు';
        appLabels[2].textContent = 'క్లినిక్ లొకేషన్';
        appLabels[3].textContent = 'ఆసుపత్రి';
      }

      // Warnings View
      const warnH1 = $('page-warnings')?.querySelector('h1');
      if (warnH1) warnH1.textContent = 'హెచ్చరిక సంకేతాలు & అత్యవసర మార్గదర్శకాలు';
      const warnSub = $('page-warnings')?.querySelector('.subtitle');
      if (warnSub) warnSub.textContent = 'వెంటనే వైద్య సహాయం పొందాల్సిన అత్యవసర పరిస్థితులు.';
      const warnBadge = $('page-warnings')?.querySelector('.view-header .badge');
      if (warnBadge) warnBadge.textContent = 'అత్యవసర భద్రతా ప్రోటోకాల్';
      const emergH2 = document.querySelector('.warning-urgent-box h2');
      if (emergH2) emergH2.textContent = '🚨 అత్యవసర వైద్య సహాయం వెంటనే పొందండి';
      const emergPrompt = document.querySelector('.warning-urgent-box .prompt');
      if (emergPrompt) emergPrompt.textContent = 'ఈ క్రింది లక్షణాలు కనిపిస్తే వెంటనే అత్యవసర సేవలకు (108 / 112) కాల్ చేయండి లేదా సమీపంలోని ఆసుపత్రి ఎమర్జెన్సీ వార్డుకు వెళ్ళండి:';
      const cautH2 = document.querySelector('.warning-caution-box h2');
      if (cautH2) cautH2.textContent = '⚠️ డాక్టర్‌ను త్వరగా సంప్రదించండి';
      const cautPrompt = document.querySelector('.warning-caution-box .prompt');
      if (cautPrompt) cautPrompt.textContent = 'ఈ క్రింది లక్షణాలు కనిపిస్తే డాక్టర్‌ను లేదా ఔట్‌పేషెంట్ క్లినిక్‌ను సంప్రదించండి:';

      const warnNotice = document.querySelector('#page-warnings .alert-danger div');
      if (warnNotice) {
        warnNotice.innerHTML = '<strong>అత్యవసర సూచన:</strong> ప్రాణాంతక లేదా తీవ్రమైన లక్షణాలు కనిపిస్తే వెబ్‌సైట్ సూచనలపై ఆధారపడకుండా వెంటనే అత్యవసర వైద్య సహాయం పొందండి.';
      }

      // Disclaimer Alert
      const notices = $$('.alert-info div');
      notices.forEach(n => {
        n.innerHTML = '<strong>గమనిక:</strong> కేర్‌బ్రిడ్జ్ మీ డిశ్చార్జ్ సూచనలను అర్థం చేసుకోవడానికి సహాయపడుతుంది. ఇది వైద్యుడి ప్రత్యక్ష సలహాకు ప్రత్యామ్నాయం కాదు.';
      });
    } else {
      setText('main-title', 'CareBridge');
      setText('main-subtitle', t.subtitle);

      const dashH1 = $('page-dashboard')?.querySelector('h1');
      if (dashH1) dashH1.textContent = 'Welcome to CareBridge';
      const dashSub = $('page-dashboard')?.querySelector('.subtitle');
      if (dashSub) dashSub.textContent = 'Your discharge instructions, organised for recovery at home.';

      const diagBar = document.querySelector('.hero-diagnosis-bar span:first-child');
      if (diagBar) diagBar.textContent = 'Diagnosis:';
      const upBtn = document.querySelector('.patient-hero-card .hero-actions button[data-page="discharge"]');
      if (upBtn) upBtn.textContent = 'Upload Document →';

      const sumTitles = $$('.dashboard-summary-grid .summary-card-title');
      if (sumTitles.length >= 4) {
        sumTitles[0].textContent = 'Discharge Summary';
        sumTitles[1].textContent = 'Medicine Schedule';
        sumTitles[2].textContent = 'Diet Plan';
        sumTitles[3].textContent = 'Next Follow-up';
      }

      const planH2 = document.querySelector('.care-plan-section .section-label-bar h2');
      if (planH2) planH2.textContent = 'Your Care Plan';
      const planBadge = document.querySelector('.care-plan-section .section-label-bar .badge');
      if (planBadge) planBadge.textContent = 'Complete Modules';

      const featCards = $$('.feature-action-card');
      const featTitles = [
        { title: 'My Discharge Summary', desc: 'Upload a hospital document or inspect the bundled fictional sample.' },
        { title: 'Medicine Schedule', desc: 'View dosages, timings, durations and doctor instructions clearly.' },
        { title: 'Medicine Alerts', desc: 'Reminders & alarms for taking your prescribed medicines on time.' },
        { title: 'Personalised Diet Plan', desc: 'Foods to Eat, Foods to Limit, and Foods to Avoid with clear rationales.' },
        { title: 'Can I Eat This?', desc: 'Instant decision support check for any specific food item.' },
        { title: 'Follow-up & Recovery', desc: 'Doctor appointment details and home recovery checklist tracking.' },
        { title: 'Warning Signs', desc: 'Recognise urgent symptoms requiring immediate emergency care.' }
      ];
      featCards.forEach((card, idx) => {
        if (featTitles[idx]) {
          const h3 = card.querySelector('h3');
          if (h3) h3.textContent = featTitles[idx].title;
          const p = card.querySelector('p');
          if (p) p.textContent = featTitles[idx].desc;
        }
      });

      const disH1 = $('page-discharge')?.querySelector('h1');
      if (disH1) disH1.textContent = 'Hospital Discharge Summary';
      const disSub = $('page-discharge')?.querySelector('.subtitle');
      if (disSub) disSub.textContent = 'Verified clinical extraction directly from your hospital record.';
      const dropTitle = document.querySelector('.dropzone-title');
      if (dropTitle) dropTitle.textContent = 'Drop discharge summary files here or click to browse';
      const btnOcr = $('btn-trigger-ocr');
      if (btnOcr) btnOcr.textContent = '📄 Process Document with OCR';

      const medH1 = $('page-medicines')?.querySelector('h1');
      if (medH1) medH1.textContent = 'My Medicine Schedule';
      const medSub = $('page-medicines')?.querySelector('.subtitle');
      if (medSub) medSub.textContent = 'Prescribed medications, administration times, and food instructions.';
      const ths = $$('#page-medicines table th');
      if (ths.length >= 5) {
        ths[0].textContent = 'Medication Name & Strength';
        ths[1].textContent = 'Dosage';
        ths[2].textContent = 'Timing';
        ths[3].textContent = 'Duration';
        ths[4].textContent = 'Special Instructions';
      }

      const alertH1 = $('page-alerts')?.querySelector('h1');
      if (alertH1) alertH1.textContent = 'Dosage Reminders & Alerts';
      const alertSub = $('page-alerts')?.querySelector('.subtitle');
      if (alertSub) alertSub.textContent = 'Automated reminders to keep your recovery medications on schedule.';

      const dietH1 = $('page-diet')?.querySelector('h1');
      if (dietH1) dietH1.textContent = 'My Personalised Diet Plan';
      const dietSub = $('page-diet')?.querySelector('.subtitle');
      if (dietSub) dietSub.textContent = 'Recovery nutrition matched directly to your clinical diagnosis.';
      const colEatH2 = document.querySelector('.col-eat h2');
      if (colEatH2) colEatH2.textContent = 'Foods to Eat';
      const colLimitH2 = document.querySelector('.col-limit h2');
      if (colLimitH2) colLimitH2.textContent = 'Foods to Limit';
      const colAvoidH2 = document.querySelector('.col-avoid h2');
      if (colAvoidH2) colAvoidH2.textContent = 'Foods to Avoid & Drug Warnings';

      const protLabel = document.querySelector('label[for="diet-condition-select"]');
      if (protLabel) protLabel.textContent = '🏥 Clinical Protocol:';
      const totalBadge = $('diet-total-conditions-badge');
      if (totalBadge) totalBadge.textContent = '271 Protocols (150 Surgeries + 120 Diseases)';
      const condTag = $('diet-condition-tag');
      if (condTag) condTag.textContent = '📋 Condition Protocol';

      const remCard = $('diet-med-remedies-card');
      if (remCard) {
        const remH2 = remCard.querySelector('h2');
        if (remH2) remH2.textContent = '💊 Medication Side-Effect Defenses & Drug-Food Remedies';
        const remP = remCard.querySelector('p');
        if (remP) remP.textContent = 'Targeted dietary remedies to soothe tablet side-effects (stomach irritation, muscle cramps, potassium retention) and avoid dangerous food interactions.';
      }
      const remSearchInp = $('med-remedy-search-input');
      if (remSearchInp) remSearchInp.placeholder = '🔍 Search remedies for any medicine (e.g. Paracetamol, Augmentin, Metformin, Telmisartan, Pantoprazole, Ibuprofen)...';

      const searchH1 = $('page-food-search')?.querySelector('h1');
      if (searchH1) searchH1.textContent = 'Can I Eat This?';
      const searchSub = $('page-food-search')?.querySelector('.subtitle');
      if (searchSub) searchSub.textContent = 'Search any food, drink, or ingredient to verify suitability against 1,000+ items and 271 clinical surgical/disease protocols.';
      const searchInp = $('food-search-input');
      if (searchInp) searchInp.placeholder = 'Search 1,000+ foods (e.g., paneer, chicken, coconut water, papaya, samosa, oats, fish)...';
      const btnSearch = $('btn-search-food');
      if (btnSearch) btnSearch.textContent = '🔍 Search Food';
      const quickLbl = document.querySelector('.quick-search-label');
      if (quickLbl) quickLbl.textContent = 'Quick test items:';

      const folH1 = $('page-followup')?.querySelector('h1');
      if (folH1) folH1.textContent = 'Follow-up & Recovery';
      const folSub = $('page-followup')?.querySelector('.subtitle');
      if (folSub) folSub.textContent = 'Doctor appointment details and home recovery checklist tracking.';
      const appH2 = document.querySelector('.appointment-card h2');
      if (appH2) appH2.textContent = 'Upcoming Appointment';
      const appBadge = document.querySelector('.appointment-card .badge');
      if (appBadge) appBadge.textContent = 'Scheduled';
      const chkH2 = document.querySelector('.checklist-card h2');
      if (chkH2) chkH2.textContent = 'Home-Care Instructions';

      const appLabels = $$('.appointment-detail-list .app-item label');
      if (appLabels.length >= 4) {
        appLabels[0].textContent = 'Follow-up Date & Time';
        appLabels[1].textContent = 'Physician';
        appLabels[2].textContent = 'Clinic Location';
        appLabels[3].textContent = 'Hospital';
      }

      const warnH1 = $('page-warnings')?.querySelector('h1');
      if (warnH1) warnH1.textContent = 'Warning Signs & When to Seek Help';
      const warnSub = $('page-warnings')?.querySelector('.subtitle');
      if (warnSub) warnSub.textContent = 'Recognise urgent symptoms requiring immediate emergency care.';
      const warnBadge = $('page-warnings')?.querySelector('.view-header .badge');
      if (warnBadge) warnBadge.textContent = 'Emergency Safety Protocol';
      const emergH2 = document.querySelector('.warning-urgent-box h2');
      if (emergH2) emergH2.textContent = '🚨 Seek Emergency Help Immediately';
      const emergPrompt = document.querySelector('.warning-urgent-box .prompt');
      if (emergPrompt) emergPrompt.textContent = 'Call emergency services (112 / 911) or visit the nearest hospital emergency room immediately if you experience:';
      const cautH2 = document.querySelector('.warning-caution-box h2');
      if (cautH2) cautH2.textContent = '⚠️ Contact Your Doctor Soon';
      const cautPrompt = document.querySelector('.warning-caution-box .prompt');
      if (cautPrompt) cautPrompt.textContent = 'Contact Dr. Sarah Jenkins or the outpatient clinic if any of these symptoms develop:';

      const warnNotice = document.querySelector('#page-warnings .alert-danger div');
      if (warnNotice) {
        warnNotice.innerHTML = '<strong>Emergency Instruction:</strong> If you experience severe, potentially life-threatening symptoms, seek immediate emergency medical care rather than relying on website instructions.';
      }

      const notices = $$('.alert-info div');
      notices.forEach(n => {
        n.innerHTML = '<strong>Notice:</strong> CareBridge helps you understand and organise your discharge instructions. It does not replace advice from your healthcare professional.';
      });
    }

    // Update active badges
    const dashBadge = $('dash-status-badge');
    if (dashBadge) dashBadge.textContent = isTe ? 'యాక్టివ్ కేర్ ప్లాన్' : 'Active Care Plan';
    const recBadge = $('rec-status-badge');
    if (recBadge) recBadge.textContent = isTe ? 'కేర్‌బ్రిడ్జ్‌లో యాక్టివ్' : 'Active in CareBridge';

    // 3. TRIGGER IMMEDIATE RE-RENDER OF ALL DATA-DRIVEN COMPONENTS
    const activePatient = state.patientData || SAMPLE_PATIENT;
    if (activePatient) {
      if (activePatient.medicines) renderMedicineTable(activePatient.medicines);
      if (activePatient.dietPlan) renderDietPlan(activePatient.dietPlan);
      renderFollowupAndChecklist(activePatient);
      renderWarningSigns(activePatient);
    }
    renderMedicineAlerts();
  }

  // ============================================================
  // EVENT BINDINGS (DOMContentLoaded)
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDietConditionSelector();
    initBackendUrlConfig();

    // 1. Auth Tabs Switcher
    $('tab-login')?.addEventListener('click', () => switchAuthTab('login'));
    $('tab-register')?.addEventListener('click', () => switchAuthTab('register'));
    $('btn-switch-to-login')?.addEventListener('click', () => switchAuthTab('login'));

    // 2. Login Form Submit
    const loginForm = $('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = ($('login-username')?.value || '').trim();
        const p = $('login-password')?.value || '';
        if (!u || !p) {
          showAuthAlert('danger', 'Please enter both username and password.');
          return;
        }
        handleLogin(u, p);
      });
    }

    // 3. Register Form Submit
    const registerForm = $('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = ($('reg-fullname')?.value || '').trim();
        const username = ($('reg-username')?.value || '').trim();
        const password = $('reg-password')?.value || '';
        const age = $('reg-age')?.value;
        const gender = $('reg-gender')?.value;

        if (!fullName || !username || !password) {
          showAuthAlert('danger', 'Please complete all required fields (*).');
          return;
        }

        handleRegistration({ fullName, username, password, age, gender });
      });
    }

    // 4. Demo Account Button
    const demoBtn = $('btn-demo-login');
    if (demoBtn) {
      demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleDemoLogin();
        initBackendUrlConfig();
      });
    }

    // Clear Auth Error on Input
    $('login-username')?.addEventListener('input', clearAuthAlert);
    $('login-password')?.addEventListener('input', clearAuthAlert);
    $('reg-username')?.addEventListener('input', clearAuthAlert);
    $('reg-password')?.addEventListener('input', clearAuthAlert);
    $('reg-fullname')?.addEventListener('input', clearAuthAlert);

    // 3. Navigation Links (Sidebar & In-Page)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-page]');
      if (target) {
        e.preventDefault();
        const page = target.getAttribute('data-page');
        if (page) navigateTo(page);
      }
    });

    // 4. Mobile Drawer Toggle
    const mobileToggle = $('mobile-sidebar-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const sidebar = $('sidebar');
        if (sidebar) sidebar.classList.toggle('show-mobile');
      });
    }

    // 5. Logout
    const logoutBtn = $('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
      });
    }

    // 6. Care Sheet Download Buttons
    const headerCaresheetBtn = $('btn-header-care-sheet');
    if (headerCaresheetBtn) {
      headerCaresheetBtn.addEventListener('click', downloadCareSheet);
    }

    const dashCaresheetBtn = $('dash-btn-caresheet');
    if (dashCaresheetBtn) {
      dashCaresheetBtn.addEventListener('click', downloadCareSheet);
    }

    // 7. Upload: Choose File & Dropzone
    const chooseFileBtn = $('btn-choose-file');
    const fileInput = $('discharge-file-input');
    const dropzone = $('upload-dropzone');
    const processBtn = $('btn-process-file');
    const removeFileBtn = $('btn-remove-selected-file');
    const loadSampleBtn = $('btn-load-sample');

    if (chooseFileBtn && fileInput) {
      chooseFileBtn.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFilesSelected(e.target.files);
        }
      });
    }

    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFilesSelected(e.dataTransfer.files);
        }
      });
    }

    $('btn-add-more-files')?.addEventListener('click', () => {
      fileInput?.click();
    });

    $('btn-clear-all-files')?.addEventListener('click', clearAllSelectedFiles);

    document.addEventListener('click', (e) => {
      const removeSingleBtn = e.target.closest('.btn-remove-single-file');
      if (removeSingleBtn) {
        const idx = parseInt(removeSingleBtn.getAttribute('data-file-index'), 10);
        removeSelectedFile(idx);
        return;
      }

      const pageTabBtn = e.target.closest('.ocr-page-tab');
      if (pageTabBtn) {
        const pageIdx = parseInt(pageTabBtn.getAttribute('data-page-idx'), 10);
        const activeFile = state.activeDocumentPages && state.activeDocumentPages[pageIdx];
        if (activeFile) {
          const imgEl = $('ocr-preview-img');
          const iframeEl = $('ocr-preview-iframe');
          const fileUrl = activeFile.url;
          const isPdf = fileUrl.toLowerCase().endsWith('.pdf') || activeFile.mimetype === 'application/pdf';
          if (isPdf) {
            if (imgEl) imgEl.classList.add('hidden');
            if (iframeEl) {
              iframeEl.src = fileUrl;
              iframeEl.classList.remove('hidden');
            }
          } else {
            if (iframeEl) iframeEl.classList.add('hidden');
            if (imgEl) {
              imgEl.src = fileUrl;
              imgEl.classList.remove('hidden');
            }
          }
          const pageTabsBar = $('ocr-page-tabs-bar');
          if (pageTabsBar) {
            pageTabsBar.querySelectorAll('.ocr-page-tab').forEach((b, i) => {
              if (i === pageIdx) {
                b.className = 'ocr-page-tab active-tab';
              } else {
                b.className = 'ocr-page-tab';
              }
            });
          }
          currentOcrZoom = 1;
          updateImageZoom();
        }
      }
    });

    if (processBtn) {
      processBtn.addEventListener('click', processDocument);
    }

    if (removeFileBtn) {
      removeFileBtn.addEventListener('click', removeSelectedFile);
    }

    // 8. "Try with Sample Discharge Summary" Button
    if (loadSampleBtn) {
      loadSampleBtn.addEventListener('click', loadSampleDischargeSummary);
    }

    // 9. Extracted Review Actions (Confirm / Discard)
    const confirmExtBtn = $('btn-confirm-extracted');
    if (confirmExtBtn) {
      confirmExtBtn.addEventListener('click', confirmExtractedCarePlan);
    }

    const discardExtBtn = $('btn-discard-extracted');
    if (discardExtBtn) {
      discardExtBtn.addEventListener('click', discardExtractedData);
    }

    document.querySelectorAll('.btn-confirm-extracted-top').forEach(btn => {
      btn.addEventListener('click', confirmExtractedCarePlan);
    });

    document.querySelectorAll('.btn-discard-extracted-top').forEach(btn => {
      btn.addEventListener('click', discardExtractedData);
    });

    $('btn-zoom-in')?.addEventListener('click', () => {
      currentOcrZoom = Math.min(currentOcrZoom + 0.25, 3.0);
      updateImageZoom();
    });
    $('btn-zoom-out')?.addEventListener('click', () => {
      currentOcrZoom = Math.max(currentOcrZoom - 0.25, 0.5);
      updateImageZoom();
    });
    $('btn-zoom-reset')?.addEventListener('click', () => {
      currentOcrZoom = 1;
      updateImageZoom();
    });

    // 10. Food Search Form & Quick Chips
    const foodForm = $('food-search-form');
    if (foodForm) {
      foodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $('food-search-input');
        if (input) handleFoodSearch(input.value);
      });
    }

    document.addEventListener('click', (e) => {
      const tag = e.target.closest('[data-food]');
      if (tag) {
        e.preventDefault();
        const food = tag.getAttribute('data-food');
        const input = $('food-search-input');
        if (input) input.value = food;
        handleFoodSearch(food);
      }
    });

    // 11. Home Care Checklist Persistence
    document.addEventListener('change', (e) => {
      if (e.target.matches('#homecare-checklist-items input[type="checkbox"]')) {
        const idx = e.target.getAttribute('data-idx');
        state.homeCareChecklist[idx] = e.target.checked;
        const total = (state.patientData?.homeCare || SAMPLE_PATIENT.homeCare).length;
        updateChecklistProgress(total);
      }
    });

    // 12. Language Selector
    const langSelect = $('lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        switchLanguage(e.target.value);
      });
    }

    // 14. Medicine Alerts & Dosage Reminders Actions
    $('btn-trigger-demo-alert')?.addEventListener('click', () => {
      const target = (state.medicineAlerts && state.medicineAlerts.length > 0)
        ? state.medicineAlerts[0]
        : {
            id: 'demo-alert',
            medName: 'Sample Med A (Demo Tab)',
            dose: '500 mg • Twice daily',
            slot: 'Morning Dose',
            instructions: 'DEMO ONLY — NOT A REAL PRESCRIPTION. Take with water after breakfast.'
          };
      triggerMedicineAlarm(target);
    });

    $('btn-request-browser-notif')?.addEventListener('click', requestBrowserNotifications);

    $('btn-alarm-take')?.addEventListener('click', () => markDoseAsTaken());
    $('btn-alarm-snooze')?.addEventListener('click', () => snoozeMedicineAlarm(5));
    $('btn-alarm-dismiss')?.addEventListener('click', dismissMedicineAlarm);

    $('btn-save-phone')?.addEventListener('click', saveRegisteredPhone);
    $('btn-test-sms')?.addEventListener('click', sendTestSms);
    $('add-alert-form')?.addEventListener('submit', handleAddCustomAlert);

    // Initial load of server-side SMS configuration
    loadSmsConfig();

    // Interactive Card Controls (Take Now, Delete, Toggle)
    document.addEventListener('click', (e) => {
      const takeBtn = e.target.closest('.btn-quick-take');
      if (takeBtn) {
        const alertId = takeBtn.getAttribute('data-alert-id');
        const med = state.medicineAlerts.find(a => a.id === alertId);
        if (med) markDoseAsTaken(med);
        return;
      }

      const delBtn = e.target.closest('.btn-delete-alert');
      if (delBtn) {
        const alertId = delBtn.getAttribute('data-alert-id');
        state.medicineAlerts = state.medicineAlerts.filter(a => a.id !== alertId);
        renderMedicineAlerts();
        syncMedicineAlertsToBackend();
        return;
      }
      // Remove Photo from Medicine Alert
      const removePhotoBtn = e.target.closest('.btn-remove-photo');
      if (removePhotoBtn) {
        const alertId = removePhotoBtn.getAttribute('data-alert-id');
        const alertItem = (state.medicineAlerts || []).find(a => a.id === alertId);
        if (alertItem) {
          alertItem.photoUrl = null;
        }
        if (state.patientData && Array.isArray(state.patientData.medicines)) {
          const cleanAlertName = (alertItem?.medName || '').toLowerCase().trim();
          const m = state.patientData.medicines.find(x => {
            const cn = (x.name || '').toLowerCase().replace(/^(?:tab\.?|cap\.?|syr\.?|inj\.?)\s+/i, '').trim();
            return cn === cleanAlertName;
          });
          if (m) m.photoUrl = null;
        }
        saveCurrentPatientData();
        renderMedicineAlerts();
        syncMedicineAlertsToBackend();

        fetch('/api/alerts/reminders/' + alertId, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoUrl: null })
        }).catch(err => console.warn('Photo backend patch error:', err));
        return;
      }

      // Clicking Medicine Photo triggers quick preview via alarm modal
      const photoThumb = e.target.closest('.med-alert-card-photo');
      if (photoThumb) {
        const alertId = photoThumb.getAttribute('data-alert-id');
        const alertItem = (state.medicineAlerts || []).find(a => a.id === alertId);
        if (alertItem) triggerMedicineAlarm(alertItem);
        return;
      }

      // ✏️ Edit Medicine Reminder Time
      const saveTimeBtn = e.target.closest('.btn-save-time');
      if (saveTimeBtn) {
        const alertId = saveTimeBtn.getAttribute('data-alert-id');
        const card = document.getElementById(`card-${alertId}`);
        const input = card ? card.querySelector('.alert-time-input') : null;
        const newTime = input ? input.value : null;

        if (!newTime) {
          alert('Please choose a valid time (HH:MM).');
          return;
        }

        saveTimeBtn.disabled = true;
        saveTimeBtn.textContent = '⏳ Saving...';

        fetch(`/api/alerts/reminders/${alertId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ time: newTime })
        })
        .then(res => res.json())
        .then(resData => {
          saveTimeBtn.disabled = false;
          saveTimeBtn.textContent = '💾 Save Time';
          const med = state.medicineAlerts.find(a => a.id === alertId);
          if (med) {
            med.time = newTime;
            const [hStr, mStr] = newTime.split(':');
            const h = parseInt(hStr, 10);
            const m = parseInt(mStr, 10);
            const period = h >= 12 ? 'PM' : 'AM';
            const displayH = h % 12 || 12;
            med.displayTime = `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
            saveCurrentPatientData();
          }
          renderMedicineAlerts();

          const statusEl = $('sms-test-status');
          if (statusEl) {
            statusEl.className = 'alert alert-success';
            statusEl.textContent = `✓ Reminder time for "${med?.medName || 'Medicine'}" updated to ${newTime}! The server will alert your phone at ${newTime}.`;
            statusEl.classList.remove('hidden');
          }
        })
        .catch(err => {
          saveTimeBtn.disabled = false;
          saveTimeBtn.textContent = '💾 Save Time';
          alert('Error saving reminder time: ' + err.message);
        });
        return;
      }

      // 🔔 Trigger Specific Medicine Alert to All Phones Now & Ring Website
      const triggerBtn = e.target.closest('.btn-trigger-alert');
      if (triggerBtn) {
        const alertId = triggerBtn.getAttribute('data-alert-id');
        const med = state.medicineAlerts.find(a => a.id === alertId);

        // Ring the website alarm right away!
        if (med) triggerMedicineAlarm(med);
        else playAlertChime();

        triggerBtn.disabled = true;
        triggerBtn.textContent = '⏳ Sending...';

        fetch(`/api/alerts/reminders/${alertId}/trigger`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(resData => {
          triggerBtn.disabled = false;
          triggerBtn.textContent = '🔔 Alert Phone Now';
          const statusEl = $('sms-test-status');
          if (statusEl) {
            statusEl.className = resData.success ? 'alert alert-success' : 'alert alert-warning';
            statusEl.textContent = resData.message || `Alert sent for ${med?.medName}!`;
            statusEl.classList.remove('hidden');
          }
          loadSmsDeliveryLogs();
        })
        .catch(err => {
          triggerBtn.disabled = false;
          triggerBtn.textContent = '🔔 Alert Phone Now';
          alert('Error sending alert: ' + err.message);
        });
        return;
      }
    });

    document.addEventListener('change', (e) => {
      // Handle Medicine Photo File Input with Canvas Compression
      if (e.target.matches('.med-photo-input')) {
        const file = e.target.files && e.target.files[0];
        const alertId = e.target.getAttribute('data-alert-id');
        if (!file || !alertId) return;

        const reader = new FileReader();
        reader.onload = function(ev) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_DIM = 320;
            let width = img.width;
            let height = img.height;
            if (width > height) {
              if (width > MAX_DIM) {
                height = Math.round((height * MAX_DIM) / width);
                width = MAX_DIM;
              }
            } else {
              if (height > MAX_DIM) {
                width = Math.round((width * MAX_DIM) / height);
                height = MAX_DIM;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.82);

            const alertItem = (state.medicineAlerts || []).find(a => a.id === alertId);
            if (alertItem) {
              alertItem.photoUrl = dataUrl;
            }

            if (state.patientData && Array.isArray(state.patientData.medicines)) {
              const cleanAlertName = (alertItem?.medName || '').toLowerCase().trim();
              const m = state.patientData.medicines.find(x => {
                const cn = (x.name || '').toLowerCase().replace(/^(?:tab\\.?|cap\\.?|syr\\.?|inj\\.?)\\s+/i, '').trim();
                return cn === cleanAlertName;
              });
              if (m) m.photoUrl = dataUrl;
            }

            saveCurrentPatientData();
            renderMedicineAlerts();
            syncMedicineAlertsToBackend();

            fetch('/api/alerts/reminders/' + alertId, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ photoUrl: dataUrl })
            }).catch(err => console.warn('Photo backend patch error:', err));
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
        return;
      }

      if (e.target.matches('.alert-toggle-input')) {
        const alertId = e.target.getAttribute('data-alert-id');
        const med = state.medicineAlerts.find(a => a.id === alertId);
        if (med) {
          med.enabled = e.target.checked;
          const labelSpan = e.target.closest('label')?.querySelector('span');
          if (labelSpan) {
            labelSpan.textContent = med.enabled ? 'Alarm Active' : 'Off';
          }
          syncMedicineAlertsToBackend();
        }
      }
    });

  });

  // Global window exports for external callers if needed
  window.navigateTo = navigateTo;
  window.handleDemoLogin = handleDemoLogin;
  window.loadSampleDischargeSummary = loadSampleDischargeSummary;
  window.downloadCareSheet = downloadCareSheet;
  window.handleLogout = handleLogout;
  window.handleFoodSearch = handleFoodSearch;
  window.triggerMedicineAlarm = triggerMedicineAlarm;
  window.markDoseAsTaken = markDoseAsTaken;
  window.snoozeMedicineAlarm = snoozeMedicineAlarm;
  window.dismissMedicineAlarm = dismissMedicineAlarm;

})();
