/**
 * Feature: 01-auth
 * Frontend Authentication Controller
 */

export function initAuthModule({ onAuthSuccess, onLogout }) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const loginPane = document.getElementById('login-pane');
  const registerPane = document.getElementById('register-pane');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const demoLoginBtn = document.getElementById('btn-demo-login');
  const switchToLoginBtn = document.getElementById('btn-switch-to-login');
  const authAlert = document.getElementById('auth-alert');

  function showAuthAlert(type, message) {
    if (!authAlert) return;
    authAlert.className = `alert alert-${type}`;
    authAlert.textContent = message;
    authAlert.classList.remove('hidden');
  }

  function clearAuthAlert() {
    if (!authAlert) return;
    authAlert.classList.add('hidden');
    authAlert.textContent = '';
  }

  function switchTab(mode) {
    clearAuthAlert();
    if (mode === 'login') {
      tabLogin?.classList.add('active');
      tabLogin?.setAttribute('aria-selected', 'true');
      tabRegister?.classList.remove('active');
      tabRegister?.setAttribute('aria-selected', 'false');
      loginPane?.classList.remove('hidden');
      registerPane?.classList.add('hidden');
      document.getElementById('login-username')?.focus();
    } else {
      tabRegister?.classList.add('active');
      tabRegister?.setAttribute('aria-selected', 'true');
      tabLogin?.classList.remove('active');
      tabLogin?.setAttribute('aria-selected', 'false');
      registerPane?.classList.remove('hidden');
      loginPane?.classList.add('hidden');
      document.getElementById('reg-fullname')?.focus();
    }
  }

  async function handleLogin(username, password) {
    clearAuthAlert();
    const btn = document.getElementById('btn-login');
    if (btn) btn.disabled = true;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        onAuthSuccess(data.user);
      } else {
        showAuthAlert('danger', data.message || 'Invalid username or password.');
      }
    } catch (err) {
      showAuthAlert('danger', 'Server connection error. Please check backend status.');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  async function handleRegistration(formData) {
    clearAuthAlert();
    const btn = document.getElementById('btn-register');
    if (btn) btn.disabled = true;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        onAuthSuccess(data.user);
      } else {
        showAuthAlert('danger', data.message || 'Registration failed.');
      }
    } catch (err) {
      showAuthAlert('danger', 'Registration error. Server unreachable.');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  tabLogin?.addEventListener('click', () => switchTab('login'));
  tabRegister?.addEventListener('click', () => switchTab('register'));
  switchToLoginBtn?.addEventListener('click', () => switchTab('login'));

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('login-username')?.value.trim();
    const p = document.getElementById('login-password')?.value;
    if (!u || !p) {
      showAuthAlert('danger', 'Please enter username and password.');
      return;
    }
    handleLogin(u, p);
  });

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('reg-fullname')?.value.trim();
    const username = document.getElementById('reg-username')?.value.trim();
    const password = document.getElementById('reg-password')?.value;
    const age = document.getElementById('reg-age')?.value;
    const gender = document.getElementById('reg-gender')?.value;

    if (!fullName || !username || !password) {
      showAuthAlert('danger', 'Full Name, Username and Password are required.');
      return;
    }
    handleRegistration({ fullName, username, password, age, gender });
  });

  demoLoginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    handleLogin('patient', 'CareBridge123');
  });

  // Clear errors on input
  ['login-username', 'login-password', 'reg-fullname', 'reg-username', 'reg-password'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', clearAuthAlert);
  });
}
