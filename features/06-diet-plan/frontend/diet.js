/**
 * Feature: 06-diet-plan
 * Frontend Diet Plan Rendering Logic
 * Supports Condition-Tailored Guidance & Medication Side-Effect Remedies
 */

export function renderDietPlan(dietPlan) {
  if (!dietPlan) return;

  // Condition banner
  const condTitle = document.getElementById('diet-condition-title');
  if (condTitle && dietPlan.conditionName) {
    condTitle.textContent = dietPlan.conditionName;
  }
  const condDesc = document.getElementById('diet-condition-desc');
  if (condDesc && dietPlan.description) {
    condDesc.textContent = dietPlan.description;
  }
  const condBadge = document.getElementById('diet-plan-condition-badge');
  if (condBadge && dietPlan.conditionName) {
    condBadge.textContent = dietPlan.conditionName.split('&')[0].trim();
  }

  // Medication remedies card
  const medListEl = document.getElementById('diet-med-remedies-list');
  const medBadge = document.getElementById('diet-med-count-badge');
  const remedies = dietPlan.medicationRemedies || [];

  if (medBadge) {
    medBadge.textContent = remedies.length > 0 ? `${remedies.length} Medication Defenses Active` : 'No Medication Interactions Detected';
  }

  if (medListEl) {
    if (remedies.length === 0) {
      medListEl.innerHTML = `
        <div style="grid-column: 1 / -1; color: var(--slate-500); font-size: 0.875rem; padding: 0.5rem 0;">
          No active medication-food interactions detected for currently prescribed medicines. Maintain standard balanced hydration and nutrition.
        </div>
      `;
    } else {
      medListEl.innerHTML = remedies.map(r => `
        <div style="background: #ffffff; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <strong style="color: #92400e; font-size: 0.95rem;">💊 ${escapeHtml(r.remedyTitle || r.medName)}</strong>
          </div>
          <div style="font-size: 0.825rem; color: #b45309; margin-bottom: 0.4rem;">
            <strong>Possible Effect:</strong> ${escapeHtml(r.sideEffect)}
          </div>
          <div style="font-size: 0.825rem; color: var(--slate-700); margin-bottom: 0.4rem;">
            <strong>🛡️ Dietary Remedy:</strong> ${escapeHtml(r.remedy)}
          </div>
          <div style="font-size: 0.8rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 0.4rem; color: #166534; margin-bottom: 0.3rem;">
            <strong>Include:</strong> ${escapeHtml(r.include)}
          </div>
          <div style="font-size: 0.8rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 0.4rem; color: #991b1b;">
            <strong>Avoid:</strong> ${escapeHtml(r.avoid)}
          </div>
          ${r.warning ? `
          <div style="font-size: 0.8rem; background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 0.4rem; color: #92400e; margin-top: 0.3rem;">
            <strong>⚠️ Important Clinical Caution:</strong> ${escapeHtml(r.warning)}
          </div>` : ''}
        </div>
      `).join('');
    }
  }

  const populateList = (id, items) => {
    const ul = document.getElementById(id);
    if (!ul) return;
    ul.innerHTML = '';

    if (!items || items.length === 0) {
      ul.innerHTML = `<li style="color: var(--slate-400); font-size: 0.825rem;">No specific items specified.</li>`;
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'diet-item';
      li.innerHTML = `
        <div class="diet-food-name">${escapeHtml(item.food || item.name || item)}</div>
        ${item.reason ? `<div class="diet-food-reason">${escapeHtml(item.reason)}</div>` : ''}
      `;
      ul.appendChild(li);
    });
  };

  populateList('diet-list-eat', dietPlan.eat);
  populateList('diet-list-limit', dietPlan.limit);
  populateList('diet-list-avoid', dietPlan.avoid);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
