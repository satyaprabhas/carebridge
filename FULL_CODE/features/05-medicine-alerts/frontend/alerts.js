/**
 * Feature: 05-medicine-alerts
 * Frontend Audio Chime Synthesizer, Push Notifications & Alarm Runner
 */

export function initAlertsModule() {
  let alerts = [];
  let doseLog = [];
  let currentActiveAlarmMed = null;
  let activeAlarmTimeout = null;

  function playAlertChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const tones = [
        { f: 587.33, t: 0.0, d: 0.2 }, // D5
        { f: 880.00, t: 0.2, d: 0.3 }  // A5
      ];

      tones.forEach(t => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(t.f, ctx.currentTime + t.t);

        gain.gain.setValueAtTime(0, ctx.currentTime + t.t);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + t.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t.t + t.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t.t);
        osc.stop(ctx.currentTime + t.t + t.d + 0.05);
      });
    } catch(e) {
      console.warn('Audio chime warning:', e);
    }
  }

  function triggerMedicineAlarm(med) {
    currentActiveAlarmMed = med;
    playAlertChime();

    const modal = document.getElementById('medicine-alarm-modal');
    if (modal) {
      document.getElementById('alarm-modal-med-name').textContent = med.medName || med.name;
      document.getElementById('alarm-modal-med-dose').textContent = med.dose || '';
      document.getElementById('alarm-modal-med-notes').textContent = med.instructions || 'Take as prescribed.';
      modal.classList.remove('hidden');
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`Medicine Reminder: ${med.medName || med.name}`, {
          body: `Time for your ${med.dose || ''} dose. ${med.instructions || ''}`,
          icon: '/favicon.ico'
        });
      } catch(e) {}
    }
  }

  function dismissMedicineAlarm() {
    const modal = document.getElementById('medicine-alarm-modal');
    if (modal) modal.classList.add('hidden');
    currentActiveAlarmMed = null;
  }

  function markDoseAsTaken(targetMed) {
    const med = targetMed || currentActiveAlarmMed;
    if (!med) return;

    dismissMedicineAlarm();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    doseLog.unshift({
      id: 'log-' + Date.now(),
      medName: med.medName || med.name,
      dose: med.dose,
      time: timeStr,
      timestamp: now.toISOString()
    });

    renderIntakeLog();

    // Call backend log
    fetch('/api/alerts/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doseLog[0])
    }).catch(e => console.warn(e));
  }

  function snoozeMedicineAlarm(minutes = 5) {
    const med = currentActiveAlarmMed;
    dismissMedicineAlarm();
    if (!med) return;

    if (activeAlarmTimeout) clearTimeout(activeAlarmTimeout);
    activeAlarmTimeout = setTimeout(() => {
      triggerMedicineAlarm(med);
    }, minutes * 60 * 1000);
  }

  function renderIntakeLog() {
    const list = document.getElementById('intake-log-list');
    const badge = document.getElementById('dose-intake-badge');
    if (badge) badge.textContent = `${doseLog.length} Doses Taken Today`;
    if (!list) return;

    if (doseLog.length === 0) {
      list.innerHTML = `<li style="text-align: center; color: var(--slate-400); padding: 1rem;">No medications logged today yet.</li>`;
      return;
    }

    list.innerHTML = doseLog.map(item => `
      <li class="intake-log-item">
        <span class="intake-check">✅</span>
        <div>
          <strong>${item.medName}</strong> (${item.dose || '-'})
          <div style="font-size: 0.775rem; color: var(--slate-400);">Taken at ${item.time}</div>
        </div>
      </li>
    `).join('');
  }

  function requestBrowserNotifications() {
    if (!('Notification' in window)) {
      alert('Browser notifications are not supported in this browser.');
      return;
    }
    Notification.requestPermission().then(permission => {
      const banner = document.getElementById('notif-status-text');
      if (permission === 'granted') {
        if (banner) banner.innerHTML = '<strong>Notifications Active:</strong> You will receive pop-up alerts even if CareBridge is minimized.';
      } else {
        if (banner) banner.innerHTML = '<strong>Notification Access Blocked:</strong> Screen banners and audio alarms will continue inside this tab.';
      }
    });
  }

  // Hook UI buttons
  document.getElementById('btn-request-browser-notif')?.addEventListener('click', requestBrowserNotifications);
  document.getElementById('btn-trigger-demo-alert')?.addEventListener('click', () => {
    triggerMedicineAlarm({
      name: 'Sample Med A (Demo Tab)',
      dose: '500 mg',
      instructions: 'Take with water after breakfast.'
    });
  });

  document.getElementById('btn-alarm-take')?.addEventListener('click', () => markDoseAsTaken());
  document.getElementById('btn-alarm-snooze')?.addEventListener('click', () => snoozeMedicineAlarm(5));
  document.getElementById('btn-alarm-dismiss')?.addEventListener('click', dismissMedicineAlarm);

  return {
    triggerMedicineAlarm,
    markDoseAsTaken,
    snoozeMedicineAlarm,
    dismissMedicineAlarm
  };
}
