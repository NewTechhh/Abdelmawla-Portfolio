(() => {
  document.documentElement.classList.add('js');
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-navigation');

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navigation?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!header?.contains(event.target)) closeMenu();
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
