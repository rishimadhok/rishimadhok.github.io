/* Rishi Madhok - personal site interactions */
(function () {
  'use strict';

  /* Sticky header state */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileNav.inert = !open; /* keep collapsed links out of the tab order */
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.inert = true;
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
  /* JS-driven reveal is wired up, so cancel the no-JS failsafe set in <head>. */
  if (window.__revealFailsafe) { window.clearTimeout(window.__revealFailsafe); }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Click-to-email: address is assembled at runtime so it never appears
     in the page source for scrapers to harvest. */
  var EMAIL_TOKEN = 'cmlzaGlAdGVycmFieXRlLmFp';
  function emailAddress() {
    try { return window.atob(EMAIL_TOKEN); } catch (e) { return ''; }
  }
  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.addEventListener('click', function () {
      var addr = emailAddress();
      /* validate it is a clean single address before building the mailto,
         so no header/query injection is possible if the token ever changes */
      if (addr && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr)) {
        window.location.href = 'mailto:' + addr;
      }
    });
  });
})();
