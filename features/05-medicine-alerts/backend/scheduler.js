/**
 * Feature: 05-medicine-alerts
 * Autonomous Server-Side Medicine Reminder Scheduler
 * Runs continuously in the background independently of the browser or website
 * Prevents duplicate messages, logs delivery history, and sends real SMS
 */

const fs = require('fs');
const path = require('path');
const { sendSms, normalizePhoneNumber } = require('./smsService');

const STORAGE_FILE = path.resolve(__dirname, 'reminders_store.json');

// Default initial state
let store = {
  registeredMobile: '',
  reminders: [],
  deliveryLogs: [],
  subscribers: []
};

function loadStore() {
  if (fs.existsSync(STORAGE_FILE)) {
    try {
      const raw = fs.readFileSync(STORAGE_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      store = {
        registeredMobile: parsed.registeredMobile || '',
        reminders: Array.isArray(parsed.reminders) ? parsed.reminders : [],
        deliveryLogs: Array.isArray(parsed.deliveryLogs) ? parsed.deliveryLogs : [],
        subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : []
      };
    } catch (e) {
      console.warn('[CareBridge Scheduler] Error reading reminders store:', e.message);
    }
  }
}

function saveStore() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      try {
        const disk = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
        if (Array.isArray(disk.subscribers)) {
          const map = new Map();
          (store.subscribers || []).forEach(s => map.set(String(s.chatId), s));
          disk.subscribers.forEach(s => map.set(String(s.chatId), s));
          store.subscribers = Array.from(map.values());
        }
      } catch (_) {}
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {
    console.error('[CareBridge Scheduler] Error saving reminders store:', e.message);
  }
}

// Initial load
loadStore();

/**
 * Checks due reminders and dispatches SMS alerts
 */
async function checkDueReminders() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  const todayStr = now.toISOString().slice(0, 10);

  const dueReminders = store.reminders.filter(r => {
    if (!r.enabled) return false;
    if (r.time !== currentTime) return false;
    // Check duplicate prevention: must not have already sent today
    if (r.lastSentDate === todayStr) return false;
    return true;
  });

  if (dueReminders.length === 0) return;

  console.log(`[CareBridge Scheduler] Found ${dueReminders.length} due medicine reminder(s) at ${currentTime}`);

  for (const rem of dueReminders) {
    const targetPhone = rem.mobileNumber || store.registeredMobile;
    if (!targetPhone) {
      console.warn(`[CareBridge Scheduler] Skipping reminder "${rem.medName}": No registered mobile number.`);
      continue;
    }

    const message = `[CareBridge Alert] Time for your medication: ${rem.medName} (${rem.dose || 'Prescribed dose'}). Scheduled time: ${rem.time}. Please take with water as instructed.`;

    // Mark as sent immediately to prevent race conditions during async send
    rem.lastSentDate = todayStr;
    rem.lastSentTime = `${currentTime} (${todayStr})`;

    try {
      const sendResult = await sendSms({ to: targetPhone, message });
      rem.lastStatus = sendResult.success ? 'DELIVERED' : (sendResult.unconfigured ? 'CONFIG_REQUIRED' : 'FAILED');
      rem.lastMessageId = sendResult.messageId || null;

      const logEntry = {
        id: `del-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        reminderId: rem.id,
        medName: rem.medName,
        dose: rem.dose,
        phone: normalizePhoneNumber(targetPhone),
        scheduledTime: rem.time,
        sentAt: new Date().toISOString(),
        displayTime: new Date().toLocaleTimeString(),
        status: sendResult.success ? 'DELIVERED' : (sendResult.unconfigured ? 'CONFIG_REQUIRED' : 'FAILED'),
        provider: sendResult.provider || 'none',
        messageId: sendResult.messageId || null,
        error: sendResult.error || null,
        messagePreview: message
      };

      store.deliveryLogs.unshift(logEntry);
      // Keep last 100 delivery logs
      if (store.deliveryLogs.length > 100) {
        store.deliveryLogs = store.deliveryLogs.slice(0, 100);
      }
    } catch (sendErr) {
      console.error(`[CareBridge Scheduler] Failed dispatching reminder for ${rem.medName}:`, sendErr.message);
      rem.lastStatus = 'FAILED';
      rem.lastError = sendErr.message;
    }
  }

  saveStore();
}

// Start autonomous background interval: checks every 30 seconds
let schedulerInterval = null;
function startScheduler() {
  if (schedulerInterval) return;
  console.log('[CareBridge Scheduler] Autonomous server-side background medicine scheduler started.');
  // Run once shortly after startup
  const initTimeout = setTimeout(checkDueReminders, 2000);
  if (initTimeout && initTimeout.unref) initTimeout.unref();

  schedulerInterval = setInterval(checkDueReminders, 30000);
  if (schedulerInterval && schedulerInterval.unref) {
    schedulerInterval.unref();
  }
}

// Public API for route handlers
function getStore() {
  return store;
}

function updateRegisteredMobile(mobile) {
  store.registeredMobile = normalizePhoneNumber(mobile);
  saveStore();
  return store.registeredMobile;
}

function addReminder(rem) {
  const newReminder = {
    id: rem.id || `rem-${Date.now()}`,
    medName: rem.medName || 'Medication',
    dose: rem.dose || 'As prescribed',
    time: rem.time, // 'HH:MM'
    mobileNumber: normalizePhoneNumber(rem.mobileNumber || store.registeredMobile),
    enabled: rem.enabled !== false,
    createdAt: new Date().toISOString(),
    lastSentDate: null,
    lastSentTime: null,
    lastStatus: 'PENDING'
  };

  store.reminders.push(newReminder);
  saveStore();
  return newReminder;
}

function syncReminders(remindersList) {
  if (!Array.isArray(remindersList)) return store.reminders;

  // Deduplicate by clean medicine name & time
  const seen = new Set();
  const dedupedList = [];

  for (const r of remindersList) {
    if (!r.medName) continue;
    const cleanName = (r.medName || '').toLowerCase().replace(/^(?:tab\.?|cap\.?|syr\.?|inj\.?)\s+/i, '').trim();
    if (!seen.has(cleanName)) {
      seen.add(cleanName);
      dedupedList.push(r);
    }
  }

  // Preserve lastSentDate for existing items
  const existingMap = new Map(store.reminders.map(r => [r.id, r]));

  store.reminders = dedupedList.map(r => {
    const existing = existingMap.get(r.id);
    return {
      id: r.id || `rem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      medName: r.medName || 'Medication',
      dose: r.dose || 'As prescribed',
      time: r.time || '09:00',
      mobileNumber: normalizePhoneNumber(r.mobileNumber || store.registeredMobile),
      enabled: r.enabled !== false,
      createdAt: existing?.createdAt || new Date().toISOString(),
      lastSentDate: existing?.lastSentDate || null,
      lastSentTime: existing?.lastSentTime || null,
      lastStatus: existing?.lastStatus || 'PENDING',
      photoUrl: r.photoUrl || existing?.photoUrl || null
    };
  });

  // Maintain a minimum 10-minute gap between reminders scheduled at the same time
  const occupiedMinutes = new Set();
  store.reminders.forEach(r => {
    let t = r.time || '09:00';
    if (!/^\d{1,2}:\d{2}$/.test(t)) t = '09:00';
    let [h, m] = t.split(':').map(Number);
    let total = (h || 0) * 60 + (m || 0);
    while (occupiedMinutes.has(total)) {
      total = (total + 10) % 1440;
    }
    occupiedMinutes.add(total);
    const newH = Math.floor(total / 60);
    const newM = total % 60;
    r.time = String(newH).padStart(2, '0') + ':' + String(newM).padStart(2, '0');
  });

  saveStore();
  return store.reminders;
}

function toggleReminder(id, enabled) {
  const rem = store.reminders.find(r => r.id === id);
  if (rem) {
    rem.enabled = enabled !== undefined ? enabled : !rem.enabled;
    saveStore();
    return rem;
  }
  return null;
}

function deleteReminder(id) {
  const initialLen = store.reminders.length;
  store.reminders = store.reminders.filter(r => r.id !== id);
  if (store.reminders.length !== initialLen) {
    saveStore();
    return true;
  }
  return false;
}

function updateReminder(id, updates) {
  const rem = store.reminders.find(r => r.id === id);
  if (rem) {
    if (updates.time) {
      rem.time = updates.time;
      rem.lastSentDate = null; // Reset so it can trigger at the new time today!
      rem.lastSentTime = null;
      rem.lastStatus = 'PENDING';
    }
    if (updates.medName) rem.medName = updates.medName;
    if (updates.dose) rem.dose = updates.dose;
    if (updates.enabled !== undefined) rem.enabled = updates.enabled;
    if (updates.mobileNumber) rem.mobileNumber = normalizePhoneNumber(updates.mobileNumber);
    if (updates.photoUrl !== undefined) rem.photoUrl = updates.photoUrl;
    saveStore();
    return rem;
  }
  return null;
}

// Auto-start scheduler on module load
startScheduler();

module.exports = {
  getStore,
  updateRegisteredMobile,
  addReminder,
  syncReminders,
  toggleReminder,
  updateReminder,
  deleteReminder,
  checkDueReminders
};
