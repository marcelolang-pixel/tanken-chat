const API_BASE = 'https://api.tanken.chat';

document.getElementById('feedbackForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const result = document.getElementById('result');
  result.innerHTML = '';

  const payload = {
    mobile_number: document.getElementById('mobile_number').value.trim(),
    rating: Number(document.getElementById('rating').value),
    comment: document.getElementById('comment').value.trim(),
    allow_publish: document.getElementById('allow_publish').checked,
  };

  try {
    const response = await fetch(`${API_BASE}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'Feedback failed');
    }
    result.innerHTML = `<div class="message ok">Thank you. Your feedback has been sent.</div>`;
    document.getElementById('feedbackForm').reset();
  } catch (error) {
    result.innerHTML = `<div class="message error">${error.message}</div>`;
  }
});
