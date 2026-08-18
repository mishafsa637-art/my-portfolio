/* ======================================================
   FUTURISTIC PORTFOLIO — JAVASCRIPT (ENHANCED)
   ====================================================== */
document.addEventListener('DOMContentLoaded', () => {
  preloader();
  neuralCanvas();
  cursorGlow();
  cursorDot();
  navbar();
  mobileNav();
  scrollReveal();
  scrollProgressBar();
  skillBars();
  countUp();
  typingRole();
  smoothScroll();
  backToTop();
  contactForm();
  holoCardTilt();
  glassCardTilt();
  parallaxDepth();
  assignDirs();
});

/* ---- preloader ---- */
function preloader() {
  const el = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => el.classList.add('done'), 1200));
  setTimeout(() => el.classList.add('done'), 3000);
}

/* ---- assign reveal directions ---- */
function assignDirs() {
  const map = {
    '.hero-badge': 'up', '.hero-greeting': 'up', '.hero-name': 'up',
    '.hero-role': 'up', '.hero-desc': 'up', '.hero-tags': 'up',
    '.hero-actions': 'up', '.hero-socials': 'up', '.hero-visual': 'scale',
    '.scroll-cue': 'up'
  };
  document.querySelectorAll('.anim-item').forEach(el => {
    for (const [sel, dir] of Object.entries(map)) {
      if (el.matches(sel)) { el.dataset.dir = dir; return; }
    }
    if (!el.dataset.dir) el.dataset.dir = '';
  });
}

/* ======================================================
   SCROLL PROGRESS BAR
   ====================================================== */
function scrollProgressBar() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ======================================================
   CUSTOM CURSOR DOT
   ====================================================== */
function cursorDot() {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;
  if (!window.matchMedia('(hover:hover)').matches) { dot.style.display = 'none'; return; }

  let mx = 0, my = 0;
  let cx = 0, cy = 0;
  const ease = 0.18;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.classList.add('active');
  });

  const hoverSelectors = 'a, button, .social-orb, .btn-glow, .btn-ghost, .ntag, .flip-inner';
  document.querySelectorAll(hoverSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hover'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
  });

  (function animLoop() {
    cx += (mx - cx) * ease;
    cy += (my - cy) * ease;
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    requestAnimationFrame(animLoop);
  })();
}

/* ======================================================
   NEURAL-NETWORK CANVAS (ENHANCED)
   ====================================================== */
function neuralCanvas() {
  const c = document.getElementById('neuralCanvas');
  const ctx = c.getContext('2d');
  let W, H, nodes = [], mouse = { x: -9999, y: -9999 };

  function resize() {
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const CYAN    = [0, 212, 255];
  const PURPLE  = [168, 85, 247];
  const MAGENTA = [224, 64, 251];
  const COLORS  = [CYAN, PURPLE, MAGENTA];

  const isMobile = window.innerWidth < 768;

  class Node {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.8 + 0.4;
      this.colorIdx = Math.floor(Math.random() * 3);
      this.alpha = Math.random() * 0.3 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        this.x -= dx * 0.003;
        this.y -= dy * 0.003;
      }
    }
    draw() {
      const col = COLORS[this.colorIdx];
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${this.alpha})`;
      ctx.fill();
    }
  }

  const maxNodes = isMobile ? 40 : 90;
  const count = Math.min(maxNodes, Math.floor((W * H) / 14000));
  for (let i = 0; i < count; i++) nodes.push(new Node());

  function connect() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160) {
          const a = (1 - d / 160) * 0.18;
          const blend = nodes[i].colorIdx;
          const col = COLORS[blend];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      // mouse connections
      const dx = nodes[i].x - mouse.x;
      const dy = nodes[i].y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 200) {
        const a = (1 - d / 200) * 0.35;
        const col = COLORS[nodes[i].colorIdx];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  let raf;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => { n.update(); n.draw(); });
    connect();
    raf = requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener('visibilitychange', () => {
    document.hidden ? cancelAnimationFrame(raf) : loop();
  });
}

/* ---- cursor glow ---- */
function cursorGlow() {
  const el = document.getElementById('cursorGlow');
  if (!el) return;
  if (!window.matchMedia('(hover:hover)').matches) { el.style.display = 'none'; return; }
  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    el.classList.add('active');
  });
}

/* ---- navbar ---- */
function navbar() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) cur = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.dataset.section === cur);
    });
  });
}

/* ---- mobile nav ---- */
function mobileNav() {
  const btn = document.getElementById('navToggle');
  const overlay = document.getElementById('mobileOverlay');
  const links = overlay.querySelectorAll('.mobile-link');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });
  links.forEach(l => l.addEventListener('click', () => {
    btn.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

/* ---- scroll reveal ---- */
function scrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay;
        if (delay) {
          e.target.style.setProperty('--delay', delay);
          e.target.style.transitionDelay = delay;
        }
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.anim-item').forEach(el => obs.observe(el));
}

/* ---- skill bars ---- */
function skillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sk-fill').forEach(el => obs.observe(el));
}

/* ---- count up ---- */
function countUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.target;
        const dur = 2000;
        const step = target / (dur / 16);
        let cur = 0;
        const tick = () => {
          cur += step;
          if (cur < target) { el.textContent = Math.floor(cur); requestAnimationFrame(tick); }
          else { el.textContent = target; }
        };
        tick();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.holo-stat-num').forEach(el => obs.observe(el));
}

/* ---- typing role ---- */
function typingRole() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const words = ['Paid Media Specialist', 'AI Content Creator', 'SEO Strategist', 'Digital Marketer'];
  let wi = 0, ci = 0, del = false;
  function tick() {
    const w = words[wi];
    if (!del) {
      el.textContent = w.substring(0, ci + 1);
      ci++;
      if (ci === w.length) { setTimeout(() => { del = true; tick(); }, 1800); return; }
    } else {
      el.textContent = w.substring(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, del ? 55 : 100);
  }
  setTimeout(tick, 1500);
}

/* ---- smooth scroll ---- */
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
    });
  });
}

/* ---- back to top ---- */
function backToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
}

/* ---- contact form ---- */
function contactForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-glow');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 2000);
    }, 1400);
  });
}

/* ---- holo card tilt ---- */
function holoCardTilt() {
  const card = document.getElementById('holoCard');
  if (!card) return;
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const rx = (e.clientY - cy) / 22;
    const ry = (e.clientX - cx) / 22;
    card.style.animation = 'none';
    card.style.transform = `translateY(0) rotateX(${-rx}deg) rotateY(${ry}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    card.style.animation = '';
    card.style.transform = '';
  });
}

/* ======================================================
   3D GLASS CARD TILT
   ====================================================== */
function glassCardTilt() {
  if (!window.matchMedia('(hover:hover)').matches) return;
  const cards = document.querySelectorAll('section:not(.hero) .glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rx = (e.clientY - cy) / 35;
      const ry = (e.clientX - cx) / 35;
      card.style.transform = `perspective(600px) rotateX(${-rx}deg) rotateY(${ry}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}

/* ======================================================
   PARALLAX DEPTH ON SCROLL
   ====================================================== */
function parallaxDepth() {
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    document.querySelectorAll('.hero-orb').forEach((el, i) => {
      const speed = 0.03 + i * 0.015;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    document.querySelectorAll('.aurora').forEach((el, i) => {
      const speed = 0.01 + i * 0.008;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ---- magnetic buttons ---- */
document.querySelectorAll('.btn-glow,.btn-ghost,.social-orb').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.15}px,${y * 0.15}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

/* ---- console ---- */
console.log(
  '%c Hafsa Akter — Digital Marketing Expert ',
  'background:linear-gradient(135deg,#00d4ff,#a855f7);color:#030311;font-size:14px;font-weight:bold;padding:8px 16px;border-radius:4px;'
);
