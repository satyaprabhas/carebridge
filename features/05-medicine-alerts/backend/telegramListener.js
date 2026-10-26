/**
 * Feature: 05-medicine-alerts
 * Telegram Bot Real-Time Multi-User Listener & Auto-Responder
 * Automatically greets new patients when they tap Start,
 * registers their Chat ID in the subscribers list,
 * and replies to commands like /start, /test, /status.
 */

const fs = require('fs');
const path = require('path');

const STORAGE_FILE = path.resolve(__dirname, 'reminders_store.json');
let lastUpdateId = 0;
let isPolling = false;

function loadStore() {
  if (fs.existsSync(STORAGE_FILE)) {
    try {
      const raw = fs.readFileSync(STORAGE_FILE, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[Telegram Listener] Error reading store:', e.message);
    }
  }
  return { registeredMobile: '', reminders: [], deliveryLogs: [], subscribers: [] };
}

function saveStore(data) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('[Telegram Listener] Error saving store:', e.message);
  }
}

/**
 * Send a message to a specific Telegram chat
 */
async function sendTelegramMessage(token, chatId, text) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML'
      })
    });
    return await res.json();
  } catch (err) {
    console.error(`[Telegram Listener] Failed to send message to ${chatId}:`, err.message);
    return null;
  }
}

/**
 * Register or update a subscriber
 */
function registerSubscriber(chatId, user) {
  const store = loadStore();
  if (!store.subscribers) store.subscribers = [];

  const existingIdx = store.subscribers.findIndex(s => String(s.chatId) === String(chatId));
  const subscriberData = {
    chatId: String(chatId),
    name: [user.first_name, user.last_name].filter(Boolean).join(' ') || 'CareBridge Patient',
    username: user.username ? `@${user.username}` : null,
    joinedAt: new Date().toISOString(),
    lastActive: new Date().toISOString()
  };

  if (existingIdx !== -1) {
    store.subscribers[existingIdx].lastActive = new Date().toISOString();
    store.subscribers[existingIdx].name = subscriberData.name;
  } else {
    store.subscribers.push(subscriberData);
    console.log(`[Telegram Listener] 🎉 New patient subscribed: ${subscriberData.name} (Chat ID: ${chatId})`);
  }

  saveStore(store);
  return subscriberData;
}

/**
 * Poll for new messages from Telegram
 */
async function pollUpdates() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  try {
    const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=5`;
    const res = await fetch(url);
    if (!res.ok) return;

    const data = await res.json();
    if (!data.ok || !Array.isArray(data.result)) return;

    for (const update of data.result) {
      if (update.update_id >= lastUpdateId) {
        lastUpdateId = update.update_id;
      }

      const msg = update.message;
      if (!msg || !msg.chat) continue;

      const chatId = msg.chat.id;
      const text = (msg.text || '').trim();
      const user = msg.from || {};
      const userName = [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Patient';

      // Always register the user
      registerSubscriber(chatId, user);

      // Handle commands
      if (text.startsWith('/start') || text.toLowerCase() === 'hi' || text.toLowerCase() === 'hello') {
        const welcomeText = `👋 <b>Hello ${userName}!</b>\n\n` +
          `✅ <b>CareBridge Connected Successfully!</b>\n\n` +
          `Your phone is now registered to receive automated medicine alerts and reminders directly here.\n\n` +
          `⏰ <b>How it works:</b>\n` +
          `• When your prescribed medicine time arrives, you will receive an alert here even when the website is closed.\n` +
          `• Type <b>/test</b> anytime to test your medicine alert.\n` +
          `• Type <b>/status</b> to check your active connection.\n\n` +
          `<i>CareBridge Automated Health Monitoring</i>`;

        await sendTelegramMessage(token, chatId, welcomeText);
      } else if (text === '/test') {
        const testText = `💊 <b>CareBridge Medicine Alert Test</b>\n\n` +
          `Hello ${userName}! This is a test reminder alert.\n` +
          `Scheduled medication alerts will look like this at your prescribed times.\n\n` +
          `Status: 🟢 <b>Active & Ready</b>`;

        await sendTelegramMessage(token, chatId, testText);
      } else if (text === '/status') {
        const statusText = `ℹ️ <b>CareBridge Status: Connected</b>\n\n` +
          `👤 Patient: <b>${userName}</b>\n` +
          `🆔 Chat ID: <code>${chatId}</code>\n` +
          `🟢 Automated Server Scheduler: <b>RUNNING</b>\n\n` +
          `You will receive all scheduled medicine reminders automatically.`;

        await sendTelegramMessage(token, chatId, statusText);
      }
    }
  } catch (err) {
    // Network or fetch hiccup, silently ignore and retry next cycle
  }
}

/**
 * Start the polling listener
 */
function startTelegramListener() {
  if (isPolling) return;
  isPolling = true;

  console.log('[Telegram Listener] Multi-user listener started for @carebridge_medicinealert_bot');

  // Initial check
  pollUpdates();

  // Run poll loop every 3 seconds
  const interval = setInterval(pollUpdates, 3000);
  if (interval.unref) interval.unref();
}

/**
 * Returns all active subscribers
 */
function getSubscribers() {
  const store = loadStore();
  return store.subscribers || [];
}

module.exports = {
  startTelegramListener,
  getSubscribers,
  sendTelegramMessage
};
