// ===================================================
//  MEHRIN AHMED CHOWDHURY — Portfolio JS
// ===================================================

/* ── Custom Cursor ── */
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top  = e.clientY + 'px';
    }, 60);
  });

  document.querySelectorAll('a, button, .project-card, .skill-group').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor--hover');
      cursorRing.classList.add('cursor-ring--hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--hover');
      cursorRing.classList.remove('cursor-ring--hover');
    });
  });
}

/* ── Navbar: scroll + active section ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled state
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}, { passive: true });

/* ── Hamburger Menu ── */
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
  document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
});

navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Typing Effect ── */
const typingEl = document.getElementById('typing-text');
const phrases = [
  'CS & Engineering Student',
  'ML Researcher',
  'Full-Stack Developer',
  'Problem Solver',
  'Data Enthusiast'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typeTimeout;

function type() {
  const phrase = phrases[phraseIdx];
  if (isDeleting) {
    typingEl.textContent = phrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingEl.textContent = phrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 55 : 90;
  if (!isDeleting && charIdx === phrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 300;
  }
  typeTimeout = setTimeout(type, delay);
}
type();

/* ── Smooth scroll for nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Skill tag stagger animation ── */
const skillGroups = document.querySelectorAll('.skill-group');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        setTimeout(() => {
          tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0)';
        }, i * 60);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillGroups.forEach(g => skillObserver.observe(g));

/* ── Animated stat counters ── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1400;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const isFloat = target % 1 !== 0;
    const val = isFloat ? (eased * target).toFixed(2) : Math.round(eased * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ── Copy email ── */
const emailLink = document.getElementById('copy-email');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('mehrinahm.075@gmail.com').then(() => {
      const original = emailLink.innerHTML;
      emailLink.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      emailLink.style.borderColor = 'rgba(6,182,212,0.4)';
      emailLink.style.color = '#06b6d4';
      setTimeout(() => { emailLink.innerHTML = original; emailLink.style.borderColor = ''; emailLink.style.color = ''; }, 2000);
    });
  });
}

/* ── Formspree Contact Form ── */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const submitBtn   = document.getElementById('form-submit-btn');
  const submitLabel = document.getElementById('submit-label');
  const requiredFields = contactForm.querySelectorAll('[required]');

  function setLoading(on) {
    submitBtn.disabled = on;
    const iconEl = document.getElementById('submit-icon');
    if (on) {
      iconEl.outerHTML = '<span class="spinner" id="submit-icon"></span>';
      submitLabel.textContent = 'Sending…';
    } else {
      document.getElementById('submit-icon').outerHTML =
        '<svg id="submit-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
      submitLabel.textContent = 'Say Hello';
    }
  }

  function validateForm() {
    let valid = true;
    requiredFields.forEach(field => {
      field.classList.remove('input-error');
      if (!field.value.trim()) { field.classList.add('input-error'); valid = false; }
      if (field.type === 'email' && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('input-error'); valid = false;
      }
    });
    return valid;
  }

  requiredFields.forEach(f => f.addEventListener('input', () => f.classList.remove('input-error')));

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        // Show success in button briefly
        document.getElementById('submit-icon').outerHTML =
          '<svg id="submit-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
        submitLabel.textContent = 'Sent! \u2713';
        submitBtn.style.background = 'linear-gradient(135deg, #059669, #34d399)';
        setTimeout(() => {
          submitBtn.style.background = '';
          setLoading(false);
        }, 3000);
      } else {
        submitLabel.textContent = 'Failed — try again';
        submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #f87171)';
        setTimeout(() => { submitBtn.style.background = ''; setLoading(false); }, 3000);
      }
    } catch (_) {
      submitLabel.textContent = 'Network error';
      submitBtn.style.background = 'linear-gradient(135deg, #dc2626, #f87171)';
      setTimeout(() => { submitBtn.style.background = ''; setLoading(false); }, 3000);
    }
  });
}
