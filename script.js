const animateChart = () => {
  const el = document.getElementById('accuracyChart');
  if (!el) return;
  const valueEl = el.querySelector('.chart-value');
  const target = 92;
  let current = 0;
  const duration = 1200;
  const fps = 60;
  const steps = Math.round((duration / 1000) * fps);
  const increment = target / steps;

  const id = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(id);
    }
    const rounded = Math.round(current);
    valueEl.textContent = `${rounded}%`;
    el.style.background = `conic-gradient(var(--accent) ${rounded}%, rgba(255,255,255,0.06) ${rounded}% 100%)`;
  }, duration / steps);
};

const initReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach((el) => observer.observe(el));
};

const initMenu = () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!menuToggle || !navMenu) return;

  const setMenuState = (isOpen) => {
    navMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(!navMenu.classList.contains('active'));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        setMenuState(false);
      }
    });
  });
};

const initForm = () => {
  const form = document.getElementById('connectForm');
  const feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const mobile = formData.get('mobile')?.toString().trim();

    if (!name || !email || !mobile) {
      feedback.textContent = 'Please complete all required fields.';
      return;
    }

    feedback.textContent = `Thanks ${name}! I will contact you soon on ${email}.`;
    form.reset();
  });
};

window.addEventListener('DOMContentLoaded', () => {
  initReveal();
  animateChart();
  initMenu();
  initForm();
});
