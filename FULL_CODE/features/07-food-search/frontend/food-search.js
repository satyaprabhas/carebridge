/**
 * Feature: 07-food-search
 * Frontend "Can I Eat This?" Search Controller
 */

export function initFoodSearchModule() {
  const form = document.getElementById('food-search-form');
  const input = document.getElementById('food-search-input');
  const resultCard = document.getElementById('food-search-result');

  async function searchFood(query) {
    if (!query || !query.trim()) return;
    const q = query.trim().toLowerCase();

    try {
      const response = await fetch('/api/food-search/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        renderVerdict(data.result);
      }
    } catch(err) {
      console.warn('Food search error:', err);
    }
  }

  function renderVerdict(result) {
    if (!resultCard) return;

    const verdictConfig = {
      suitable: {
        icon: '✅',
        badgeClass: 'badge-success',
        badgeText: 'Suitable for Recovery',
        cardBorder: 'var(--success-border)',
        cardBg: 'var(--success-bg)'
      },
      limit: {
        icon: '⚠️',
        badgeClass: 'badge-warning',
        badgeText: 'Consume in Moderation',
        cardBorder: 'var(--warning-border)',
        cardBg: 'var(--warning-bg)'
      },
      avoid: {
        icon: '🚫',
        badgeClass: 'badge-danger',
        badgeText: 'Strictly Avoid',
        cardBorder: 'var(--danger-border)',
        cardBg: 'var(--danger-bg)'
      },
      unknown: {
        icon: '❓',
        badgeClass: 'badge-secondary',
        badgeText: 'Consult Doctor / Dietitian',
        cardBorder: 'var(--slate-200)',
        cardBg: 'var(--slate-50)'
      }
    };

    const cfg = verdictConfig[result.verdict] || verdictConfig.unknown;

    document.getElementById('verdict-food-name').textContent = result.food;
    document.getElementById('verdict-icon').textContent = cfg.icon;

    const badge = document.getElementById('verdict-badge');
    badge.className = `badge ${cfg.badgeClass}`;
    badge.textContent = cfg.badgeText;

    document.getElementById('verdict-explanation').textContent = result.explanation;

    const notesWrap = document.getElementById('verdict-notes-wrap');
    if (result.notes) {
      document.getElementById('verdict-notes-text').textContent = result.notes;
      notesWrap.classList.remove('hidden');
    } else {
      notesWrap.classList.add('hidden');
    }

    resultCard.style.borderColor = cfg.cardBorder;
    resultCard.style.backgroundColor = cfg.cardBg;
    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input) searchFood(input.value);
  });

  document.querySelectorAll('.food-tag-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const food = btn.getAttribute('data-food');
      if (input) input.value = food;
      searchFood(food);
    });
  });

  return { searchFood };
}
