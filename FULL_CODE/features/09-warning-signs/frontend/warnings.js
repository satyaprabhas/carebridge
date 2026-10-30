/**
 * Feature: 09-warning-signs
 * Frontend Emergency & Caution Indicators Renderer
 */

export function renderWarningSigns(patientData) {
  if (!patientData) return;

  const urgentUl = document.getElementById('warning-urgent-list');
  const cautionUl = document.getElementById('warning-caution-list');

  if (urgentUl) {
    urgentUl.innerHTML = '';
    const urgentItems = patientData.warningSignsUrgent || [];
    urgentItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="urgent-bullet" aria-hidden="true">!</span><span>${escapeHtml(item)}</span>`;
      urgentUl.appendChild(li);
    });
  }

  if (cautionUl) {
    cautionUl.innerHTML = '';
    const cautionItems = patientData.warningSigns || [];
    cautionItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="caution-bullet" aria-hidden="true">•</span><span>${escapeHtml(item)}</span>`;
      cautionUl.appendChild(li);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
