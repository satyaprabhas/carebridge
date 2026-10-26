/**
 * Feature: 08-followup-recovery
 * Frontend Appointment Card & Interactive Recovery Checklist
 */

export function renderFollowupAndChecklist(patientData, checklistState = {}) {
  if (!patientData) return;

  // Appointment details
  if (patientData.followUp) {
    const f = patientData.followUp;
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val || 'Not recorded';
    };
    setText('fol-date', `${f.date || 'TBD'} at ${f.time || 'TBD'}`);
    setText('fol-doctor', f.doctor);
    setText('fol-dept', f.department);
    setText('fol-hosp', f.hospital);
    setText('fol-notes', f.notes);
  }

  // Home-care Checklist
  const ul = document.getElementById('homecare-checklist-items');
  if (!ul) return;
  ul.innerHTML = '';

  const instructions = patientData.homeCare || [];
  instructions.forEach((item, idx) => {
    const isChecked = !!checklistState[idx];
    const li = document.createElement('li');
    li.className = 'checklist-item' + (isChecked ? ' completed' : '');
    li.innerHTML = `
      <label class="custom-checkbox-wrap">
        <input type="checkbox" data-idx="${idx}" ${isChecked ? 'checked' : ''}>
        <span class="checkbox-custom"></span>
        <span class="checklist-text">${escapeHtml(item)}</span>
      </label>
    `;
    ul.appendChild(li);
  });

  updateChecklistProgress(instructions.length, checklistState);
}

export function updateChecklistProgress(total, checklistState) {
  const completed = Object.values(checklistState).filter(Boolean).length;
  const badge = document.getElementById('checklist-progress-badge');
  if (badge) {
    badge.textContent = `${completed} of ${total} Completed`;
    badge.className = `badge ${completed === total ? 'badge-success' : 'badge-secondary'}`;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
