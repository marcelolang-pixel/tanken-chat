const API_BASE = 'https://api.tanken.chat';

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const result = document.getElementById('result');
  result.innerHTML = '';

  const payload = {
    mobile_number: document.getElementById('mobile_number').value.trim(),
    user_name: document.getElementById('user_name').value.trim(),
    preferred_fuel: document.getElementById('preferred_fuel').value,
    max_radius_km: Number(document.getElementById('max_radius_km').value),
    language: document.getElementById('language').value,
    privacy_accepted: document.getElementById('privacy_accepted').checked,
    terms_accepted: document.getElementById('terms_accepted').checked,
    whatsapp_accepted: document.getElementById('whatsapp_accepted').checked,
    welcome_optin_accepted: document.getElementById('welcome_optin_accepted').checked,
  };

  try {
    const response = await fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    result.innerHTML = `<div class="message ok">${data.message}<br><br>Next step:<br>1. Open WhatsApp.<br>2. Find the welcome message from tanken.chat.<br>3. Reply <span class="code">START</span>.<br><br>Business number: +49 89 2154 8989</div>`;
    document.getElementById('registerForm').reset();
  } catch (error) {
    result.innerHTML = `<div class="message error">${error.message}</div>`;
  }
});
