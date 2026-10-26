(function() {
  'use strict';

  // ============================================================
  // APPLICATION STATE
  // ============================================================
  const state = {
    isLoggedIn: false,
    currentPage: 'dashboard',
    currentLang: 'en',
    patientData: null,
    homeCareChecklist: {},
    selectedFile: null,
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
    diagnosis: 'Fictional example of recovery following an uncomplicated hospital admission. This document is for software testing only.',
    allergies: ['Not provided in this fictional sample'],
    medicines: [
      {
        name: 'Sample Med A (Demo Tab)',
        dose: '500 mg',
        timing: 'Twice daily with meals',
        duration: '5 days',
        instructions: 'DEMO ONLY — NOT A REAL PRESCRIPTION. Take with food.'
      },
      {
        name: 'Sample Med B (Demo Cap)',
        dose: '20 mg',
        timing: 'Once daily in morning',
        duration: '14 days',
        instructions: 'DEMO ONLY — NOT A REAL PRESCRIPTION. Swallow whole with water.'
      },
      {
        name: 'Sample Med C (Demo Susp)',
        dose: '10 ml',
        timing: 'At bedtime as needed',
        duration: 'As needed (Max 3 days)',
        instructions: 'DEMO ONLY — NOT A REAL PRESCRIPTION. Shake well before use.'
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
  // MULTI-LANGUAGE STRINGS (ENGLISH, HINDI, TELUGU)
  // ============================================================
  const I18N = {
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

  function handleLogin(username, password) {
    username = (username || '').trim();
    password = password || '';

    // Check default demo account
    if (username.toLowerCase() === 'patient' && password === 'CareBridge123') {
      state.isLoggedIn = true;
      state.patientData = JSON.parse(JSON.stringify(SAMPLE_PATIENT));
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
      // Personalise patient record with registered demographics
      const userPatient = JSON.parse(JSON.stringify(SAMPLE_PATIENT));
      userPatient.patientName = matchedLocal.fullName;
      userPatient.patientId = matchedLocal.patientId;
      if (matchedLocal.age) userPatient.age = matchedLocal.age;
      if (matchedLocal.gender) userPatient.gender = matchedLocal.gender;
      state.patientData = userPatient;
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
        const userPatient = JSON.parse(JSON.stringify(SAMPLE_PATIENT));
        if (result.user) {
          userPatient.patientName = result.user.name || userPatient.patientName;
          userPatient.patientId = result.user.patientId || userPatient.patientId;
          if (result.user.age) userPatient.age = result.user.age;
          if (result.user.gender) userPatient.gender = result.user.gender;
        }
        state.patientData = userPatient;
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

    if (!fullName || !username || !password) {
      showAuthAlert('danger', 'Full Name, Username, and Password are required.');
      return;
    }

    // Check existing in local storage
    const localUsers = getRegisteredUsers();
    if (localUsers.some(u => u.username.toLowerCase() === username.toLowerCase()) || username.toLowerCase() === 'patient') {
      showAuthAlert('danger', 'This username is already taken. Please choose another username.');
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

    // Log the new user in immediately and personalise dashboard
    state.isLoggedIn = true;
    const userPatient = JSON.parse(JSON.stringify(SAMPLE_PATIENT));
    userPatient.patientName = newUser.fullName;
    userPatient.patientId = newUser.patientId;
    userPatient.age = newUser.age;
    userPatient.gender = newUser.gender;
    state.patientData = userPatient;

    showApp();
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

    if (loginPage) loginPage.classList.add('hidden');
    if (appContainer) appContainer.classList.remove('hidden');

    renderAllViews();
    navigateTo('dashboard');
  }

  function handleLogout() {
    state.isLoggedIn = false;
    state.patientData = null;
    state.currentPage = 'dashboard';
    state.selectedFile = null;
    state.extractedData = null;

    const appContainer = $('app-container');
    const loginPage = $('login-page');

    if (appContainer) appContainer.classList.add('hidden');
    if (loginPage) loginPage.classList.remove('hidden');

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
    if (!p.dietPlan || !p.dietPlan.conditionName) {
      p.dietPlan = generatePersonalizedDiet(p.diagnosis, p.medicines, p.dietInstructions);
    }
    renderDietPlan(p.dietPlan);

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

  function renderMedicineTable(medicines) {
    const tbody = $('medicine-table-rows');
    if (!tbody) return;

    if (!medicines || medicines.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--slate-400); padding: 2.5rem;">📋 No active prescription loaded. Upload or process your discharge summary above to see your prescribed medicine schedule.</td></tr>';
      return;
    }

    let html = '';
    medicines.forEach(m => {
      html += `
        <tr>
          <td class="med-name-cell">
            <strong>${m.name}</strong>
            <span class="tag">Prescribed Dose</span>
          </td>
          <td><strong>${m.dose || 'Please confirm with your healthcare professional.'}</strong></td>
          <td>${m.timing || 'Please confirm with your healthcare professional.'}</td>
          <td>${m.duration || 'Please confirm with your healthcare professional.'}</td>
          <td class="instructions-cell">
            ${m.instructions ? `<span class="caution">${m.instructions}</span>` : 'Please confirm with your healthcare professional.'}
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
        proto.conditionName = proto.name;
        proto.key = selectedKey;
        const meds = (state.patientData && state.patientData.medicines) || [];
        const remedies = evaluateMedicationRemedies(meds);
        const fullPlan = { ...proto, medicationRemedies: remedies };
        if (state.patientData) {
          state.patientData.dietPlan = fullPlan;
        }
        renderDietPlan(fullPlan);
      }
    });
  }

  function renderDietPlan(dietPlan) {
    if (!dietPlan) return;
    initDietConditionSelector();

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

    // Medication Remedies Card
    const medListEl = $('diet-med-remedies-list');
    const medBadge = $('diet-med-count-badge');
    const remedies = dietPlan.medicationRemedies || [];

    if (medBadge) {
      medBadge.textContent = remedies.length > 0 ? `${remedies.length} Medication Defenses Active` : 'No Medication Conflicts';
    }

    if (medListEl) {
      if (remedies.length === 0) {
        medListEl.innerHTML = `
          <div style="grid-column: 1 / -1; color: var(--slate-500); font-size: 0.875rem; padding: 0.5rem 0;">
            No critical drug-food interactions detected for currently active medicines. Maintain standard convalescent hydration and light nutrition.
          </div>
        `;
      } else {
        medListEl.innerHTML = remedies.map(r => `
          <div style="background: #ffffff; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <strong style="color: #92400e; font-size: 0.95rem;">💊 ${escapeHtml(r.remedyTitle || r.medName)}</strong>
            </div>
            <div style="font-size: 0.825rem; color: #b45309; margin-bottom: 0.4rem;">
              <strong>Possible Side Effect:</strong> ${escapeHtml(r.sideEffect)}
            </div>
            <div style="font-size: 0.825rem; color: var(--slate-700); margin-bottom: 0.4rem;">
              <strong>🛡️ Dietary Remedy:</strong> ${escapeHtml(r.remedy)}
            </div>
            <div style="font-size: 0.8rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 0.4rem; color: #166534; margin-bottom: 0.3rem;">
              <strong>Foods to Include:</strong> ${escapeHtml(r.include)}
            </div>
            <div style="font-size: 0.8rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 0.4rem; color: #991b1b;">
              <strong>Foods to Avoid:</strong> ${escapeHtml(r.avoid)}
            </div>
          </div>
        `).join('');
      }
    }

    // 3 Columns: Eat, Limit, Avoid
    const listEat = $('diet-list-eat');
    const listLimit = $('diet-list-limit');
    const listAvoid = $('diet-list-avoid');

    if (listEat && dietPlan.eat) {
      listEat.innerHTML = dietPlan.eat.map(item => `
        <li class="diet-item">
          <strong>${escapeHtml(item.food)}</strong>
          <p>${escapeHtml(item.reason)}</p>
        </li>
      `).join('');
    }

    if (listLimit && dietPlan.limit) {
      listLimit.innerHTML = dietPlan.limit.map(item => `
        <li class="diet-item">
          <strong>${escapeHtml(item.food)}</strong>
          <p>${escapeHtml(item.reason)}</p>
        </li>
      `).join('');
    }

    if (listAvoid && dietPlan.avoid) {
      listAvoid.innerHTML = dietPlan.avoid.map(item => `
        <li class="diet-item">
          <strong>${escapeHtml(item.food)}</strong>
          <p>${escapeHtml(item.reason)}</p>
        </li>
      `).join('');
    }
  }

  function renderFollowupAndChecklist(p) {
    if (p.followUp) {
      setText('fol-date', `${formatDate(p.followUp.date)} at ${p.followUp.time || '10:30 AM'}`);
      setText('fol-doctor', p.followUp.doctor);
      setText('fol-dept', p.followUp.department);
      setText('fol-hosp', p.followUp.hospital);
      setText('fol-notes', p.followUp.notes || 'Not available in the sample record.');
    }

    const checklistContainer = $('homecare-checklist-items');
    if (checklistContainer && p.homeCare) {
      checklistContainer.innerHTML = p.homeCare.map((item, idx) => {
        const isChecked = state.homeCareChecklist[idx] ? 'checked' : '';
        return `
          <li class="check-item">
            <input type="checkbox" id="chk-homecare-${idx}" data-idx="${idx}" ${isChecked}>
            <label for="chk-homecare-${idx}">${item}</label>
          </li>
        `;
      }).join('');
      updateChecklistProgress(p.homeCare.length);
    }
  }

  function updateChecklistProgress(total) {
    const checked = Object.values(state.homeCareChecklist).filter(Boolean).length;
    const badge = $('checklist-progress-badge');
    if (badge) {
      badge.textContent = `${checked} of ${total} Completed`;
      badge.className = checked === total ? 'badge badge-success' : 'badge badge-secondary';
    }
  }

  function renderWarningSigns(p) {
    const urgentList = $('warning-urgent-list');
    const cautionList = $('warning-caution-list');

    if (urgentList && p.warningSignsUrgent) {
      urgentList.innerHTML = p.warningSignsUrgent.map(w => `
        <li><strong>•</strong> ${w}</li>
      `).join('');
    }

    if (cautionList && p.warningSigns) {
      cautionList.innerHTML = p.warningSigns.map(w => `
        <li><strong>•</strong> ${w}</li>
      `).join('');
    }
  }

  // ============================================================
  // MEDICINE ALERTS & DOSAGE REMINDERS ENGINE
  // ============================================================
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
        isCustom: false
      });
    });

    state.medicineAlerts = generated;
    syncMedicineAlertsToBackend();
  }

  function renderMedicineAlerts() {
    const container = $('alerts-cards-container');
    if (!container) return;

    if (!state.medicineAlerts || state.medicineAlerts.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p style="color: var(--slate-500); margin: 0;">No active medication reminders configured. Add a custom reminder below or upload a discharge summary.</p>
        </div>
      `;
      renderIntakeLog();
      return;
    }

    container.innerHTML = state.medicineAlerts.map(alert => {
      const timeClass = alert.slotType === 'morning' ? 'time-morning' : (alert.slotType === 'afternoon' ? 'time-afternoon' : 'time-night');
      const timeIcon = alert.slotType === 'morning' ? '☀️' : (alert.slotType === 'afternoon' ? '⛅' : '🌙');

      return `
        <div class="med-alert-card ${alert.takenToday ? 'alert-taken' : ''}" id="card-${alert.id}">
          <div class="med-alert-header">
            <div class="med-alert-title-wrap">
              <div class="med-alert-icon" aria-hidden="true">💊</div>
              <div>
                <h3 class="med-alert-name">${alert.medName}</h3>
                <div class="med-alert-dose">${alert.dose || 'Standard Dose'}</div>
              </div>
            </div>
            <span class="badge ${alert.takenToday ? 'badge-success' : 'badge-secondary'}" style="font-size: 0.75rem;">
              ${alert.takenToday ? '✓ Taken Today' : 'Scheduled'}
            </span>
          </div>

          <div class="med-alert-body">
            <!-- Scheduled Time with Inline Time Edit -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
              <div class="alert-time-pill ${timeClass}">
                <span>${timeIcon}</span>
                <span><strong>${alert.displayTime || alert.time}</strong> (${alert.slot || 'Dose'})</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                <input type="time" class="form-control form-control-sm alert-time-input" data-alert-id="${alert.id}" value="${alert.time || '08:00'}" style="width: 105px; padding: 0.2rem 0.4rem; font-size: 0.85rem; height: 32px;" title="Set reminder time">
                <button type="button" class="btn btn-sm btn-primary btn-save-time" data-alert-id="${alert.id}" style="padding: 0.2rem 0.6rem; font-size: 0.78rem; height: 32px; white-space: nowrap;" title="Save new reminder time">
                  💾 Save Time
                </button>
              </div>
            </div>

            <div class="med-alert-instructions">
              <strong>Instructions:</strong> ${alert.instructions}
            </div>
            <div style="font-size: 0.775rem; color: var(--teal-700, #0f766e); margin-top: 0.4rem; display: flex; align-items: center; gap: 0.35rem;">
              <span>📱</span>
              <span>Automated Alert: <strong>Scheduled at ${alert.time} (All connected phones)</strong></span>
            </div>
          </div>

          <div class="med-alert-actions">
            <label class="alert-toggle-label">
              <input type="checkbox" class="alert-toggle-input" data-alert-id="${alert.id}" ${alert.enabled ? 'checked' : ''}>
              <span>${alert.enabled ? 'Alarm Active' : 'Off'}</span>
            </label>

            <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn btn-outline btn-sm btn-trigger-alert" data-alert-id="${alert.id}" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" title="Send this exact medicine reminder alert to all phones now">
                🔔 Alert Phone Now
              </button>
              ${alert.isCustom ? `<button type="button" class="btn btn-text btn-sm text-danger btn-delete-alert" data-alert-id="${alert.id}" title="Delete alert">🗑️</button>` : ''}
              <button type="button" class="btn btn-teal btn-sm btn-quick-take" data-alert-id="${alert.id}">
                ${alert.takenToday ? 'Taken Again' : 'Take Now'}
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
          enabled: a.enabled
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
    if (img) img.style.transform = `scale(${currentOcrZoom})`;
  }

  // ============================================================
  // UPLOAD WORKFLOW & "TRY WITH SAMPLE DISCHARGE SUMMARY"
  // ============================================================
  function handleFileSelected(file) {
    const validExts = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    const maxBytes = 10 * 1024 * 1024; // 10MB

    if (!validExts.includes(file.type)) {
      showUploadAlert('danger', 'Unsupported file type. Please upload a PDF, JPG, JPEG, PNG, or WebP document.');
      return false;
    }

    if (file.size > maxBytes) {
      showUploadAlert('danger', 'File size exceeds 10MB limit. Please upload a smaller document.');
      return false;
    }

    state.selectedFile = file;

    // Display banner
    const banner = $('selected-file-banner');
    if (banner) banner.classList.remove('hidden');

    setText('selected-filename', file.name);
    setText('selected-filesize', formatBytes(file.size));

    const procBtn = $('btn-process-file');
    if (procBtn) procBtn.disabled = false;

    clearUploadAlert();
    return true;
  }

  function removeSelectedFile() {
    state.selectedFile = null;
    const fileInput = $('discharge-file-input');
    if (fileInput) fileInput.value = '';

    const banner = $('selected-file-banner');
    if (banner) banner.classList.add('hidden');

    const procBtn = $('btn-process-file');
    if (procBtn) procBtn.disabled = true;

    clearUploadAlert();
  }

  function processDocument() {
    if (!state.selectedFile) return;

    showUploadAlert('info', '⏳ Enhancing document image & running OCR across English, Hindi, and Telugu...');
    const procBtn = $('btn-process-file');
    if (procBtn) procBtn.disabled = true;

    const formData = new FormData();
    formData.append('discharge', state.selectedFile);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        showUploadAlert('success', result.message || '✓ Document scanned successfully with OCR. Verify values against original document below.');
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
        }
      } else {
        showUploadAlert('danger', result.message || 'Failed to process document.');
      }
      if (procBtn) procBtn.disabled = false;
    })
    .catch((err) => {
      showUploadAlert('danger', 'Network error while uploading: ' + (err.message || 'Please check connection.'));
      if (procBtn) procBtn.disabled = false;
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

    // Document Preview
    const imgEl = $('ocr-preview-img');
    const iframeEl = $('ocr-preview-iframe');
    const placeholderEl = $('ocr-preview-placeholder');

    currentOcrZoom = 1;
    updateImageZoom();

    let fileUrl = payload.uploadedFile?.url;
    if (!fileUrl && isSample) {
      fileUrl = '/sample/CareBridge_Sample_Discharge_Summary.pdf';
    }

    if (fileUrl) {
      const isPdf = fileUrl.toLowerCase().endsWith('.pdf') || payload.uploadedFile?.mimetype === 'application/pdf';
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

          return `
            <div class="ocr-field-card ${badgeClass}">
              <div class="ocr-field-header">
                <span class="ocr-field-title">${escapeHtml(f.title || f.key)}</span>
                <span class="ocr-field-badge ${badgeClass}">${badgeText}</span>
              </div>
              <input 
                type="text" 
                class="ocr-field-input" 
                data-key="${escapeHtml(f.key)}" 
                value="${escapeHtml(f.value === 'Not found' ? '' : f.value)}" 
                placeholder="${f.status === 'missing' ? 'Not found in document' : ''}"
              >
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
      const doseM = item.match(/\b([0-9]+(?:\.[0-9]+)?\s*(?:mg|mcg|g|ml|iu|tablets?|capsules?))\b/i);
      const dose = doseM ? doseM[1].trim() : 'As prescribed';

      let timing = 'Once daily';
      const timeM = item.match(/\b(Once\s+daily(?:\s*\([^\)]+\))?|Twice\s+daily(?:\s*\([^\)]+\))?|Three\s+times\s+a\s+day|At\s+night|Bedtime|In\s+morning|As\s+needed|Every\s+[0-9]+\s+hours?)/i);
      if (timeM) timing = timeM[1].trim();

      let name = item.split(/—|:|\b(?:Once|Twice|At night|Bedtime)\b/i)[0]
        .replace(/\([^)]+\)/g, '')
        .replace(/^[0-9\.\)\s]+/, '')
        .replace(/^(?:Tab\.?|Cap\.?|Syr\.?|Inj\.?)\s+/i, '')
        .trim();
      if (!name || name.length < 2) name = `Prescribed Medication ${idx + 1}`;

      const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seen.has(norm)) return; // Skip duplicates
      seen.add(norm);

      let instructions = item;
      if (timeM) instructions = instructions.replace(timeM[0], '');
      if (doseM) instructions = instructions.replace(doseM[0], '');
      instructions = instructions.replace(name, '').replace(/^[\s\:\-\–\—\,\.\(\)]+/, '').replace(/[\s\:\-\–\—\,\.\(\)]+$/, '').trim();
      if (!instructions || instructions.length < 2) instructions = 'Take as prescribed by attending physician';

      result.push({
        name,
        dose,
        timing,
        duration: 'Ongoing recovery course',
        instructions
      });
    });

    return result;
  }

  function syncSingleFieldToPatientData(key, val) {
    if (!state.patientData) return;

    if (key === 'patientName') {
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
        state.patientData.medicines = parsedMeds;
      } else {
        syncSingleFieldToPatientData(key, val);
      }
    });

    // Re-generate clinical diet plan with updated diagnosis and medicines
    state.patientData.dietPlan = generatePersonalizedDiet(
      state.patientData.diagnosis,
      state.patientData.medicines,
      state.patientData.dietInstructions
    );

    if (state.patientData.medicines && state.patientData.medicines.length > 0) {
      renderMedicineTable(state.patientData.medicines);
      initMedicineAlerts(true);
      renderMedicineAlerts();
    }

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
  // "CAN I EAT THIS?" FOOD SEARCH ENGINE
  // Transparent rule-based testing dataset
  // ============================================================
  function handleFoodSearch(query) {
    query = (query || '').trim().toLowerCase();
    if (!query) return;

    let match = null;
    const activeDiag = (state.patientData && state.patientData.diagnosis) || '';
    const selectedKey = $('diet-condition-select') ? $('diet-condition-select').value : '';
    const condKey = selectedKey || (window.matchDiseaseCondition ? window.matchDiseaseCondition(activeDiag) : '');

    // 1. Search in 1,000+ Extended Food Safety Database
    if (window.EXTENDED_FOOD_DATABASE) {
      let extItem = null;
      // Direct key match
      if (window.EXTENDED_FOOD_DATABASE[query]) {
        extItem = window.EXTENDED_FOOD_DATABASE[query];
      } else {
        // Search by alias or substring
        for (const [key, item] of Object.entries(window.EXTENDED_FOOD_DATABASE)) {
          if (item.aliases && item.aliases.some(a => a === query || a.includes(query) || query.includes(a))) {
            extItem = item;
            break;
          }
          if (key.includes(query) || query.includes(key)) {
            extItem = item;
            break;
          }
        }
      }

      if (extItem) {
        let finalVerdict = extItem.verdict;
        let finalExplanation = extItem.explanation;
        let finalNotes = extItem.notes;

        // Apply active disease override if present
        if (condKey && extItem.diseaseOverrides) {
          for (const [disKey, override] of Object.entries(extItem.diseaseOverrides)) {
            if (condKey.toLowerCase().includes(disKey.toLowerCase()) || disKey.toLowerCase().includes(condKey.toLowerCase())) {
              finalVerdict = override.verdict || finalVerdict;
              finalExplanation = override.explanation || finalExplanation;
              finalNotes = `Clinical Caution for ${condKey}: ${override.explanation}`;
              break;
            }
          }
        }

        match = {
          food: extItem.food,
          category: extItem.category,
          verdict: finalVerdict,
          explanation: finalExplanation,
          notes: finalNotes || `Category: ${extItem.category}`
        };
      }
    }

    // 2. Direct key match in curated common food database
    if (!match && FOOD_DATABASE[query]) {
      match = { food: query, ...FOOD_DATABASE[query] };
    }

    // 3. Check active patient condition / selected condition in CLINICAL_DISEASES_DB
    if (!match && window.CLINICAL_DISEASES_DB) {
      const activeProto = condKey ? window.CLINICAL_DISEASES_DB[condKey] : null;

      if (activeProto) {
        // Check avoid list of active condition
        if (activeProto.avoid) {
          for (const item of activeProto.avoid) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(query) || query.includes(f)) {
              match = {
                food: item.food,
                verdict: 'avoid',
                explanation: item.reason,
                notes: `Clinical Protocol for ${activeProto.name}: Documented Restriction`
              };
              break;
            }
          }
        }
        // Check limit list
        if (!match && activeProto.limit) {
          for (const item of activeProto.limit) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(query) || query.includes(f)) {
              match = {
                food: item.food,
                verdict: 'limit',
                explanation: item.reason,
                notes: `Clinical Protocol for ${activeProto.name}: Moderate Intake`
              };
              break;
            }
          }
        }
        // Check eat list
        if (!match && activeProto.eat) {
          for (const item of activeProto.eat) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(query) || query.includes(f)) {
              match = {
                food: item.food,
                verdict: 'suitable',
                explanation: item.reason,
                notes: `Clinical Protocol for ${activeProto.name}: Recommended Recovery Food`
              };
              break;
            }
          }
        }
      }
    }

    // 4. Partial substring search in FOOD_DATABASE
    if (!match) {
      for (const [key, val] of Object.entries(FOOD_DATABASE)) {
        if (key.includes(query) || query.includes(key)) {
          match = { food: key, ...val };
          break;
        }
      }
    }

    // 5. Global search across all 271 Clinical Operations & Diseases
    if (!match && window.CLINICAL_DISEASES_DB) {
      for (const [key, proto] of Object.entries(window.CLINICAL_DISEASES_DB)) {
        if (proto.avoid) {
          for (const item of proto.avoid) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(query) || query.includes(f)) {
              match = {
                food: item.food,
                verdict: 'avoid',
                explanation: item.reason,
                notes: `Source: Protocol for ${proto.name} (${proto.category || 'Clinical Guidance'})`
              };
              break;
            }
          }
        }
        if (match) break;
        if (proto.limit) {
          for (const item of proto.limit) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(query) || query.includes(f)) {
              match = {
                food: item.food,
                verdict: 'limit',
                explanation: item.reason,
                notes: `Source: Protocol for ${proto.name} (${proto.category || 'Clinical Guidance'})`
              };
              break;
            }
          }
        }
        if (match) break;
        if (proto.eat) {
          for (const item of proto.eat) {
            const f = (item.food || '').toLowerCase();
            if (f.includes(query) || query.includes(f)) {
              match = {
                food: item.food,
                verdict: 'suitable',
                explanation: item.reason,
                notes: `Source: Protocol for ${proto.name} (${proto.category || 'Clinical Guidance'})`
              };
              break;
            }
          }
        }
        if (match) break;
      }
    }

    // 6. Fallback: Unable to confirm
    if (!match) {
      match = {
        food: query,
        verdict: 'unknown',
        explanation: `Unable to confirm based on the available information. Please consult your doctor or dietitian.`,
        notes: `Our database of 1,000+ foods and 271 clinical surgical/disease protocols does not contain verified specific guidance for "${query}".`
      };
    }

    renderSearchVerdict(match);
  }

    renderSearchVerdict(match);
  }

  function renderSearchVerdict(result) {
    const container = $('food-search-result');
    if (!container) return;

    container.classList.remove('hidden');

    // Color and border mapping
    const configs = {
      suitable: {
        badgeText: 'Suitable according to available information',
        badgeClass: 'badge-success',
        icon: '✅',
        borderClass: 'res-suitable'
      },
      limit: {
        badgeText: 'Eat with caution or limit',
        badgeClass: 'badge-warning',
        icon: '⚠️',
        borderClass: 'res-limit'
      },
      avoid: {
        badgeText: 'Avoid according to documented restrictions',
        badgeClass: 'badge-danger',
        icon: '🚫',
        borderClass: 'res-avoid'
      },
      unknown: {
        badgeText: 'Unable to confirm — consult your healthcare provider',
        badgeClass: 'badge-secondary',
        icon: '❓',
        borderClass: 'res-unknown'
      }
    };

    const cfg = configs[result.verdict] || configs.unknown;

    // Remove old border classes
    container.className = `search-verdict-card ${cfg.borderClass}`;

    setText('verdict-icon', cfg.icon);
    setText('verdict-food-name', capitalise(result.food));

    const badge = $('verdict-badge');
    if (badge) {
      badge.textContent = cfg.badgeText;
      badge.className = `badge ${cfg.badgeClass}`;
    }

    setText('verdict-explanation', result.explanation);

    const notesWrap = $('verdict-notes-wrap');
    if (notesWrap) {
      if (result.notes) {
        notesWrap.classList.remove('hidden');
        setText('verdict-notes-text', result.notes);
      } else {
        notesWrap.classList.add('hidden');
      }
    }

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ============================================================
  // CARE SHEET GENERATION & DOWNLOAD (PDFKit Backend)
  // ============================================================
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
      body: JSON.stringify(p)
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
  // LANGUAGE SWITCHER
  // ============================================================
  function switchLanguage(lang) {
    state.currentLang = lang;
    const str = I18N[lang] || I18N.en;

    const btn = $('btn-header-care-sheet');
    if (btn) btn.textContent = str.careSheetTitle;

    const sel = $('lang-select');
    if (sel) sel.value = lang;
  }

  // ============================================================
  // EVENT BINDINGS (DOMContentLoaded)
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initDietConditionSelector();

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
        if (e.target.files && e.target.files[0]) {
          handleFileSelected(e.target.files[0]);
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileSelected(e.dataTransfer.files[0]);
        }
      });
    }

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
