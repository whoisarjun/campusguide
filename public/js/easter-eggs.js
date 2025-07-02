document.querySelectorAll('.fadeout').forEach(el => {
  el.style.opacity = 1; // Ensure it starts at full opacity
  el.style.userSelect = 'none';
  el.style.webkitUserSelect = 'none';
  el.style.msUserSelect = 'none';
  el.addEventListener('click', () => {
    let currentOpacity = parseFloat(getComputedStyle(el).opacity);
    if (!isNaN(currentOpacity)) {
      el.style.opacity = Math.max(0, currentOpacity - 0.05);
    }
  });
});
