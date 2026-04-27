function handleWaitlist(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '✓ Seat reserved · We will be in touch';
  btn.disabled = true;
  btn.style.opacity = '0.7';
}
