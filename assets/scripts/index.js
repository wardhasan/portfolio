document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('popup-close-btn');
  const overlay = document.getElementById('popup-overlay');

  const hasDismissed = localStorage.getItem('popupDismissed');

  if (!hasDismissed && overlay) {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
      localStorage.setItem('popupDismissed', 'true');
    });
  }
});