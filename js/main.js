/* Shared progressive enhancements. All page content and links work without JS. */
(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('primary-nav');
  const desktop = window.matchMedia('(min-width: 761px)');

  if (toggle && navigation) {
    const setMenu = (open, restoreFocus = false) => {
      const expanded = open && !desktop.matches;
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
      navigation.classList.toggle('is-open', expanded);
      navigation.inert = !desktop.matches && !expanded;

      if (restoreFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', event => {
      if (!navigation.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setMenu(false, true);
      }
    });

    desktop.addEventListener('change', () => setMenu(false));
    setMenu(false);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = [...document.querySelectorAll('.reveal')];
  let observer;

  const show = element => {
    element.classList.add('is-visible');
  };

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

    for (const element of reveals) {
      element.classList.add('reveal-ready');
      observer.observe(element);
    }
  }

  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer?.disconnect();
    reveals.forEach(show);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.load-reveal').forEach(element => {
      element.classList.add('is-loaded');
    });
  });
})();
