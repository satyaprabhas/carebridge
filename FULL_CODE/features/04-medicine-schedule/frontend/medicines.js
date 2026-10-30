/**
 * Feature: 04-medicine-schedule
 * Frontend Medicine Table Rendering Logic
 */

export function renderMedicineTable(medicines) {
  const tbody = document.getElementById('medicine-table-rows');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!medicines || medicines.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--slate-400); padding: 2rem;">
          No prescribed medications recorded in the active discharge summary.
        </td>
      </tr>
    `;
    return;
  }

  medicines.forEach(med => {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.innerHTML = `<span class="med-name-cell">${escapeHtml(med.name)}</span>`;

    const tdDose = document.createElement('td');
    tdDose.innerHTML = `<span class="med-dose-pill">${escapeHtml(med.dose || '-')}</span>`;

    const tdTiming = document.createElement('td');
    tdTiming.textContent = med.timing || '-';

    const tdDuration = document.createElement('td');
    tdDuration.textContent = med.duration || '-';

    const tdInstructions = document.createElement('td');
    tdInstructions.className = 'med-instructions';
    tdInstructions.textContent = med.instructions || 'As advised by doctor.';

    tr.appendChild(tdName);
    tr.appendChild(tdDose);
    tr.appendChild(tdTiming);
    tr.appendChild(tdDuration);
    tr.appendChild(tdInstructions);

    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
