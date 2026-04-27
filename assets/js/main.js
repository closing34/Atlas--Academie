/* ============================================
   ATLAS ACADÉMIE — JAVASCRIPT PRINCIPAL
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------
  // NAVBAR : scroll effect + active link
  // ----------------------------------------
  const navbar = document.querySelector('.navbar');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Active link
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ----------------------------------------
  // HAMBURGER MENU MOBILE
  // ----------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fermer si clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Fermer si clic en dehors
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ----------------------------------------
  // SCROLL ANIMATIONS (IntersectionObserver)
  // ----------------------------------------
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ----------------------------------------
  // FAQ ACCORDÉON
  // ----------------------------------------
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Fermer tous les autres
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  // ----------------------------------------
  // ÉTOILES HÉRO ANIMÉES
  // ----------------------------------------
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 2.5 + 1;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${2 + Math.random() * 3}s;
      `;
      heroBg.appendChild(star);
    }
  }

  // ----------------------------------------
  // COMPTEUR ANIMÉ (stats)
  // ----------------------------------------
  const animateCounter = (el, target, suffix = '') => {
    let count = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + increment, target);
      el.textContent = count.toLocaleString('fr-FR') + suffix;
      if (count >= target) clearInterval(timer);
    }, 25);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.dataset.count;
        const suffix = el.dataset.suffix || '';
        if (raw) animateCounter(el, parseInt(raw), suffix);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-count]').forEach(el => statsObserver.observe(el));

  // ----------------------------------------
  // SMOOTH SCROLL pour ancres internes
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ----------------------------------------
  // FORMULAIRE OPT-IN — Feedback visuel
  // ----------------------------------------
  const optinForms = document.querySelectorAll('.optin-form');
  optinForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Guide envoyé ! Vérifie ta boîte mail';
      btn.style.background = '#2ecc71';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  });

  // ----------------------------------------
  // BARRE PROMO — fermeture
  // ----------------------------------------
  const promoClose = document.querySelector('.promo-close');
  const promoBar = document.querySelector('.promo-bar');
  if (promoClose && promoBar) {
    promoClose.addEventListener('click', () => {
      promoBar.style.display = 'none';
      document.body.classList.remove('has-promo-bar');
    });
  }

  // ----------------------------------------
  // PULSATION BOUTON HERO
  // ----------------------------------------
  setTimeout(() => {
    document.querySelectorAll('.btn-hero-main').forEach(btn => {
      btn.classList.add('pulse');
    });
  }, 2000);

  // ----------------------------------------
  // MISE EN SURBRILLANCE DU MENU COURANT
  // ----------------------------------------
  const page = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.href.includes(page) && page !== '/') {
      link.classList.add('active');
    }
  });

});
