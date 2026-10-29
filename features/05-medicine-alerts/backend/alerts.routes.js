/**
 * Feature: 05-medicine-alerts
 * Backend Medicine Reminders, Server-Side SMS Dispatcher & Intake Log API Router
 */

const express = require('express');
const router = express.Router();
const { sendSms, getSmsConfigStatus, normalizePhoneNumber } = require('./smsService');
const {
  getStore,
  updateRegisteredMobile,
  addReminder,
  syncReminders,
  toggleReminder,
  updateReminder,
  deleteReminder
} = require('./scheduler');

const intakeLogs = [];

// GET /api/alerts/config - Provider configuration & registered phone
router.get('/config', (req, res) => {
  const status = getSmsConfigStatus();
  const store = getStore();

  res.status(200).json({
    success: true,
    configured: status.configured,
    provider: status.provider,
    twilioConfigured: status.twilioConfigured,
    fast2smsConfigured: status.fast2smsConfigured,
    configuredFrom: status.configuredFrom,
    registeredMobile: store.registeredMobile || ''
  });
});

// POST /api/alerts/save-phone - Set/update user's registered phone
router.post('/save-phone', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: 'Please provide a valid mobile number.' });
  }

  const normalized = updateRegisteredMobile(phone);
  res.status(200).json({
    success: true,
    message: `Registered mobile number saved as ${normalized}.`,
    registeredMobile: normalized
  });
});

// GET /api/alerts/reminders - List all scheduled reminders and delivery status
router.get('/reminders', (req, res) => {
  const store = getStore();
  const config = getSmsConfigStatus();

  res.status(200).json({
    success: true,
    registeredMobile: store.registeredMobile,
    remindersCount: store.reminders.length,
    reminders: store.reminders,
    deliveryLogs: store.deliveryLogs.slice(0, 20),
    smsConfig: config
  });
});

// POST /api/alerts/reminders - Add new scheduled reminder
router.post('/reminders', (req, res) => {
  const { medName, dose, time, mobileNumber } = req.body;
  if (!medName || !time) {
    return res.status(400).json({ success: false, message: 'Medicine name and scheduled time (HH:MM) are required.' });
  }

  const reminder = addReminder({
    medName,
    dose,
    time,
    mobileNumber
  });

  res.status(201).json({
    success: true,
    message: `Reminder for ${medName} scheduled at ${time}.`,
    data: reminder
  });
});

// POST /api/alerts/sync - Sync prescription medicine alerts
router.post('/sync', (req, res) => {
  const { reminders, mobileNumber } = req.body;
  if (mobileNumber) {
    updateRegisteredMobile(mobileNumber);
  }

  const updated = syncReminders(reminders);
  res.status(200).json({
    success: true,
    message: `Synchronized ${updated.length} scheduled reminders.`,
    reminders: updated
  });
});

// PATCH /api/alerts/reminders/:id/toggle - Toggle reminder active state
router.patch('/reminders/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;
  const updated = toggleReminder(id, enabled);

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Reminder not found.' });
  }

  res.status(200).json({
    success: true,
    message: `Reminder "${updated.medName}" is now ${updated.enabled ? 'Active' : 'Disabled'}.`,
    data: updated
  });
});

// PATCH /api/alerts/reminders/:id - Update reminder time and details
router.patch('/reminders/:id', (req, res) => {
  const { id } = req.params;
  const { time, medName, dose, enabled, photoUrl } = req.body;
  const updated = updateReminder(id, { time, medName, dose, enabled, photoUrl });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Reminder not found.' });
  }

  res.status(200).json({
    success: true,
    message: `Reminder for "${updated.medName}" updated to ${updated.time}.`,
    data: updated
  });
});

// POST /api/alerts/reminders/:id/trigger - Trigger immediate alert for specific medicine
router.post('/reminders/:id/trigger', async (req, res) => {
  const { id } = req.params;
  const store = getStore();
  const rem = store.reminders.find(r => r.id === id);
  if (!rem) {
    return res.status(404).json({ success: false, message: 'Reminder not found.' });
  }

  const targetPhone = rem.mobileNumber || store.registeredMobile;
  const message = `[CareBridge Alert] Time for your medication: ${rem.medName} (${rem.dose || 'Prescribed dose'}). Scheduled time: ${rem.time}. Please take with water as instructed.`;

  const sendResult = await sendSms({ to: targetPhone, message });

  res.status(200).json({
    success: sendResult.success,
    message: `✓ Medicine alert for "${rem.medName}" dispatched to all connected phones!`,
    provider: sendResult.provider,
    messageId: sendResult.messageId
  });
});

// DELETE /api/alerts/reminders/:id - Delete a reminder
router.delete('/reminders/:id', (req, res) => {
  const { id } = req.params;
  const deleted = deleteReminder(id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Reminder not found.' });
  }

  res.status(200).json({
    success: true,
    message: 'Reminder deleted successfully.'
  });
});

// POST /api/alerts/test-sms - Send an immediate test SMS to verify phone receipt
router.post('/test-sms', async (req, res) => {
  const { phone, medName } = req.body;
  const store = getStore();
  const targetPhone = phone || store.registeredMobile;

  if (!targetPhone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a recipient mobile number (e.g. +91XXXXXXXXXX) to test.'
    });
  }

  const sampleMed = medName || 'Aspirin (75 mg)';
  const testMessage = `[CareBridge TEST] This is a verification reminder for ${sampleMed}. Your mobile number is registered for automated server-side reminders.`;

  try {
    const result = await sendSms({ to: targetPhone, message: testMessage });

    const logEntry = {
      id: `test-${Date.now()}`,
      reminderId: 'test-ping',
      medName: sampleMed,
      dose: 'Test Dose',
      phone: normalizePhoneNumber(targetPhone),
      scheduledTime: 'Immediate Test',
      sentAt: new Date().toISOString(),
      displayTime: new Date().toLocaleTimeString(),
      status: result.success ? 'DELIVERED' : (result.unconfigured ? 'CONFIG_REQUIRED' : 'FAILED'),
      provider: result.provider || 'none',
      messageId: result.messageId || null,
      error: result.error || null,
      messagePreview: testMessage
    };

    store.deliveryLogs.unshift(logEntry);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `✓ Test SMS successfully dispatched to ${targetPhone} via ${result.provider.toUpperCase()} (ID: ${result.messageId}).`,
        provider: result.provider,
        messageId: result.messageId,
        to: targetPhone
      });
    } else if (result.unconfigured) {
      return res.status(200).json({
        success: false,
        unconfigured: true,
        message: 'SMS provider not configured yet. Set TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN or FAST2SMS_API_KEY in your .env file.',
        simulatedMessage: testMessage,
        to: targetPhone
      });
    } else {
      return res.status(502).json({
        success: false,
        message: `Failed to deliver SMS: ${result.error}`,
        provider: result.provider
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal SMS dispatch error: ${err.message}`
    });
  }
});

// GET /api/alerts/delivery-log - Return message dispatch audit logs
router.get('/delivery-log', (req, res) => {
  const store = getStore();
  res.status(200).json({
    success: true,
    count: store.deliveryLogs.length,
    data: store.deliveryLogs
  });
});

// GET /api/alerts/log - Preserved intake log
router.get('/log', (req, res) => {
  res.status(200).json({
    success: true,
    count: intakeLogs.length,
    data: intakeLogs
  });
});

// POST /api/alerts/log - Preserved intake logging
router.post('/log', (req, res) => {
  const { medName, dose, time, timestamp } = req.body;
  const entry = {
    id: `log-${Date.now()}`,
    medName: medName || 'Medication',
    dose: dose || '',
    time: time || new Date().toLocaleTimeString(),
    timestamp: timestamp || new Date().toISOString()
  };

  intakeLogs.unshift(entry);

  res.status(201).json({
    success: true,
    message: 'Dose intake logged successfully.',
    data: entry
  });
});

module.exports = router;
