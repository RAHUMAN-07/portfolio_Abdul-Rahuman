document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('accuracyChart');
  if (!el) return;
  const valueEl = el.querySelector('.chart-value');
  const target = 92;
  let current = 0;
  const duration = 900; // ms
  const fps = 60;
  const steps = Math.round((duration / 1000) * fps);
  const increment = target / steps;

  // animate
  const id = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(id);
    }
    const rounded = Math.round(current);
    valueEl.textContent = rounded + '%';
    el.style.background = `conic-gradient(var(--accent) ${rounded}%, rgba(255,255,255,0.06) ${rounded}% 100%)`;
  }, duration / steps);

  // ensure final state
  setTimeout(() => {
    valueEl.textContent = target + '%';
    el.style.background = `conic-gradient(var(--accent) ${target}%, rgba(255,255,255,0.06) ${target}% 100%)`;
  }, duration + 30);
});
