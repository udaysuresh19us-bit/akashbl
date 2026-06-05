/* =============================================
   MAIN GLOBAL JS — NAVBAR, THEME, LOADER, SCROLL
   ============================================= */
(function() {
  'use strict';

  /* ---- LOADING SCREEN ---- */
  window.addEventListener('load', function() {
    setTimeout(function() {
      var loader = document.getElementById('loading-screen');
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(function() { loader.remove(); }, 700);
      }
    }, 1600);
  });

  /* ---- THEME TOGGLE ---- */
  var themeBtn = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');
  var saved = localStorage.getItem('theme') || 'dark';

  function applyTheme(t) {
    if (t === 'light') {
      document.body.classList.add('light-mode');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
      document.body.classList.remove('light-mode');
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
  }
  applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  /* ---- NAVBAR SCROLL ---- */
  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
    // Scroll-to-top visibility
    var stt = document.getElementById('scroll-top');
    if (stt) {
      if (window.scrollY > 300) stt.classList.add('visible');
      else stt.classList.remove('visible');
    }
  }, { passive: true });

  /* ---- SCROLL TO TOP ---- */
  var stt = document.getElementById('scroll-top');
  if (stt) {
    stt.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- HAMBURGER MOBILE MENU ---- */
  var ham = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
      var spans = ham.querySelectorAll('span');
      ham.classList.toggle('active');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { mobileNav.classList.remove('open'); });
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- AOS (ANIMATE ON SCROLL) ---- */
  function initAOS() {
    var elements = document.querySelectorAll('[data-aos]');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
          setTimeout(function() {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  }
  document.addEventListener('DOMContentLoaded', initAOS);

})();
