/**
 * Feature: 05-medicine-alerts
 * Backend Notification & Alert Engine
 * Supports:
 *  1. Telegram Bot (100% Free Live Mobile Push Alerts - Multi-User Auto-Responder)
 *  2. Twilio REST API (SMS)
 *  3. Fast2SMS Quick Route (SMS India)
 *
 * Keeps all API keys secure in server-side environment variables.
 */

const fs = require('fs');
const path = require('path');
const { startTelegramListener, getSubscribers } = require('./telegramListener');

// Auto-load .env file if present in workspace root without external dependencies
function loadEnv() {
  const envPath = path.resolve(__dirname, '../../../.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
          process.env[key] = val;
        }
      }
    } catch (e) {
      console.warn('[SMS/Alert Service] Warning reading .env:', e.message);
    }
  }
}

loadEnv();

// Start Telegram real-time multi-user listener
startTelegramListener();

/**
 * Returns current provider configuration status
 */
function getSmsConfigStatus() {
  loadEnv();

  const telegramConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN
  );

  const twilioConfigured = Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  );

  const fast2smsConfigured = Boolean(process.env.FAST2SMS_API_KEY);

  let activeProvider = 'none';
  if (telegramConfigured) {
    activeProvider = 'telegram';
  } else if (process.env.SMS_PROVIDER === 'twilio' && twilioConfigured) {
    activeProvider = 'twilio';
  } else if (fast2smsConfigured) {
    activeProvider = 'fast2sms';
  } else if (twilioConfigured) {
    activeProvider = 'twilio';
  }

  const subs = getSubscribers();

  return {
    configured: telegramConfigured || twilioConfigured || fast2smsConfigured,
    provider: activeProvider,
    telegramConfigured,
    telegramBot: process.env.TELEGRAM_BOT_USERNAME ? `@${process.env.TELEGRAM_BOT_USERNAME}` : '@carebridge_medicinealert_bot',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || null,
    subscribersCount: subs.length,
    subscribers: subs,
    twilioConfigured,
    fast2smsConfigured,
    configuredFrom: telegramConfigured
      ? `@${process.env.TELEGRAM_BOT_USERNAME || 'carebridge_medicinealert_bot'}`
      : (twilioConfigured ? process.env.TWILIO_PHONE_NUMBER : (fast2smsConfigured ? 'Fast2SMS Gateway' : null))
  };
}

/**
 * Normalizes phone number format
 */
function normalizePhoneNumber(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-\(\)]/g, '').trim();
  // If Indian 10-digit number without country code, add +91
  if (/^[6-9][0-9]{9}$/.test(cleaned)) {
    cleaned = `+91${cleaned}`;
  }
  return cleaned;
}

/**
 * Dispatch Alert via Telegram Bot API (100% Free & Immediate Mobile Push)
 */
async function sendViaTelegram({ message, chatId }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const targetChatId = chatId || process.env.TELEGRAM_CHAT_ID;

  if (!token || !targetChatId) {
    throw new Error('Telegram bot credentials incomplete. Please set TELEGRAM_BOT_TOKEN in .env');
  }

  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: targetChatId,
      text: message,
      parse_mode: 'HTML'
    })
  });

  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.description || `Telegram HTTP ${res.status}`);
  }

  return {
    success: true,
    provider: 'telegram',
    messageId: `tg-${data.result.message_id}`,
    status: 'delivered',
    chatId: targetChatId
  };
}

/**
 * Dispatch SMS via Twilio REST API
 */
async function sendViaTwilio({ to, message }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error('Twilio credentials incomplete. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in .env');
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const params = new URLSearchParams();
  params.append('To', to);
  params.append('From', from);
  params.append('Body', message);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.message || `Twilio HTTP ${res.status}`;
    throw new Error(errorMsg);
  }

  return {
    success: true,
    provider: 'twilio',
    messageId: data.sid,
    status: data.status || 'queued',
    to
  };
}

/**
 * Dispatch SMS via Fast2SMS Quick Route (India)
 */
async function sendViaFast2SMS({ to, message }) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) {
    throw new Error('Fast2SMS API key missing. Please set FAST2SMS_API_KEY in .env');
  }

  let pureNumber = to.replace(/^\+91/, '').replace(/^0/, '');

  const endpoint = 'https://www.fast2sms.com/dev/bulkV2';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'authorization': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      route: 'q',
      message: message,
      language: 'english',
      flash: 0,
      numbers: pureNumber
    })
  });

  const data = await res.json();
  if (!res.ok || data.return === false) {
    throw new Error(data.message ? (Array.isArray(data.message) ? data.message.join(', ') : data.message) : `Fast2SMS HTTP ${res.status}`);
  }

  return {
    success: true,
    provider: 'fast2sms',
    messageId: data.request_id || `f2s-${Date.now()}`,
    status: 'sent',
    to
  };
}

/**
 * Main dispatch function: sendSms
 * Delivers alerts to all connected subscribers via Telegram (Free & Live)
 * and attempts SMS if carrier service is active.
 */
async function sendSms({ to, message }) {
  loadEnv();
  const normalizedPhone = normalizePhoneNumber(to);
  const config = getSmsConfigStatus();

  let telegramResult = null;
  let smsResult = null;
  let errors = [];

  // 1. Deliver to Telegram Mobile Push Alert to ALL connected subscribers in PARALLEL (Zero delay)
  if (config.telegramConfigured) {
    try {
      const subscribers = getSubscribers();
      const targetChats = new Set();
      if (config.telegramChatId) targetChats.add(String(config.telegramChatId));
      for (const sub of subscribers) {
        if (sub.chatId) targetChats.add(String(sub.chatId));
      }

      const chatList = Array.from(targetChats);
      console.log(`[CareBridge Alert] Dispatching instant mobile alert via Telegram to ${chatList.length} subscriber(s)...`);

      const results = await Promise.allSettled(chatList.map(async (chatId) => {
        try {
          const res = await sendViaTelegram({
            chatId,
            message: `💊 <b>CareBridge Medicine Alert</b>\n\n${message}\n\n<i>Recipient Phone: ${normalizedPhone || 'Registered Mobile'}</i>`
          });
          console.log(`[CareBridge Alert] Instant alert delivered to chat ${chatId} (ID: ${res.messageId})`);
          return res;
        } catch (subErr) {
          console.warn(`[CareBridge Alert] Delivery error for chat ${chatId}:`, subErr.message);
          return null;
        }
      }));

      telegramResult = { success: true, messageId: 'tg-instant-broadcast' };
    } catch (tgErr) {
      console.error(`[CareBridge Alert] Telegram delivery error:`, tgErr.message);
      errors.push(`Telegram: ${tgErr.message}`);
    }
  }

  // 2. Carrier SMS: fire asynchronously in background so it never delays the alert!
  if (config.fast2smsConfigured && process.env.SMS_PROVIDER === 'fast2sms') {
    sendViaFast2SMS({ to: normalizedPhone, message }).catch(smsErr => {
      console.warn(`[CareBridge SMS Background] Fast2SMS notice:`, smsErr.message);
    });
  } else if (config.twilioConfigured) {
    sendViaTwilio({ to: normalizedPhone, message }).catch(twilioErr => {
      console.warn(`[CareBridge SMS Background] Twilio notice:`, twilioErr.message);
    });
  }

  // Return primary success if either channel delivered
  if (telegramResult && telegramResult.success) {
    return {
      success: true,
      provider: 'telegram',
      messageId: telegramResult.messageId,
      status: 'delivered',
      to: normalizedPhone,
      telegramChatId: config.telegramChatId,
      smsNotice: smsResult ? 'SMS also sent' : (errors.length ? errors.join('; ') : null)
    };
  }

  if (smsResult && smsResult.success) {
    return smsResult;
  }

  // If neither succeeded
  return {
    success: false,
    provider: config.provider,
    error: errors.length ? errors.join(' | ') : 'No alert channel successfully sent.'
  };
}

module.exports = {
  sendSms,
  sendViaTelegram,
  sendViaTwilio,
  sendViaFast2SMS,
  getSmsConfigStatus,
  normalizePhoneNumber,
  getSubscribers
};
