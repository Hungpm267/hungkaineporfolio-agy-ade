/**
 * ═══════════════════════════════════════════════════════════════
 *  PUBLIC PORTFOLIO — js/public.js
 *  Vietnamese/English bilingual, dark/light theme, dynamic render
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────
   GLOBAL STATE
───────────────────────────────────────────── */
window.currentLang = 'vi';
let testimonialTimers = {};

/* ─────────────────────────────────────────────
   ENTRY POINT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  if (typeof DB !== 'undefined' && DB.init) {
    await DB.init();
  }
  initTheme();
  initLang();
  applySettings();
  renderSections();
  initHeroCanvas(document.getElementById('global-canvas'));
  initNavbar();
  initScrollAnimations();
  initScrollTop();
  initBlogModal();
});

/* ══════════════════════════════════════════════
   THEME SYSTEM
══════════════════════════════════════════════ */
function initTheme() {
  const theme = (typeof DB !== 'undefined' && DB.getTheme) ? DB.getTheme() : 'dark';
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('btn-theme');
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  if (typeof DB !== 'undefined' && DB.setTheme) DB.setTheme(next);
  setTheme(next);
}

document.getElementById('btn-theme')?.addEventListener('click', toggleTheme);

/* ══════════════════════════════════════════════
   LANGUAGE SYSTEM
══════════════════════════════════════════════ */
function initLang() {
  window.currentLang = (typeof DB !== 'undefined' && DB.getLang) ? DB.getLang() : 'vi';
  updateLangButton();
}

function updateLangButton() {
  const btn = document.getElementById('btn-lang');
  if (btn) btn.textContent = window.currentLang === 'vi' ? 'VI' : 'EN';
}

function toggleLang() {
  window.currentLang = window.currentLang === 'vi' ? 'en' : 'vi';
  if (typeof DB !== 'undefined' && DB.setLang) DB.setLang(window.currentLang);
  updateLangButton();
  renderSections();
}

document.getElementById('btn-lang')?.addEventListener('click', toggleLang);

/**
 * Translation helper: returns the string in the current language.
 * obj can be { vi: '...', en: '...' } or a plain string.
 */
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[window.currentLang] || obj.vi || obj.en || '';
}

/* ══════════════════════════════════════════════
   SETTINGS APPLICATION
══════════════════════════════════════════════ */
function applySettings() {
  if (typeof DB === 'undefined' || !DB.getSettings) return;
  const s = DB.getSettings();
  if (!s) return;

  if (s.title) document.title = t(s.title);

  if (s.metaDesc) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = t(s.metaDesc);
  }

  if (s.favicon) {
    let favicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    if (favicons.length > 0) {
      favicons.forEach(el => {
        el.href = s.favicon;
      });
    } else {
      let link = document.createElement('link');
      link.rel = 'icon';
      link.href = s.favicon;
      document.head.appendChild(link);
    }
  }

  if (s.accentColor) {
    document.documentElement.style.setProperty('--accent', s.accentColor);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(s.accentColor));
  }

  const logo = document.getElementById('nav-logo');
  if (logo && s.navLogo) logo.textContent = t(s.navLogo);

  if (s.emailjsPublicKey && typeof emailjs !== 'undefined') {
    try { emailjs.init(s.emailjsPublicKey); } catch (e) { /* silently fail */ }
  }
}

/* ══════════════════════════════════════════════
   SECTION RENDERING — MAIN ROUTER
══════════════════════════════════════════════ */
function renderSections() {
  const root = document.getElementById('portfolio-root');
  if (!root) return;

  root.innerHTML = '';

  Object.values(testimonialTimers).forEach(clearInterval);
  testimonialTimers = {};

  let sections = [];
  if (typeof DB !== 'undefined' && DB.getSections) {
    sections = DB.getSections();
  } else {
    sections = defaultSections();
  }

  const visible = sections
    .filter(s => s.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  visible.forEach(section => {
    let el;
    switch (section.type) {
      case 'profile':      el = renderProfile(section);      break;
      case 'skills':       el = renderSkills(section);       break;
      case 'experience':   el = renderExperience(section);   break;
      case 'education':    el = renderEducation(section);    break;
      case 'projects':     el = renderProjects(section);     break;
      case 'blog':         el = renderBlog(section);         break;
      case 'testimonials': el = renderTestimonials(section); break;
      case 'contact':      el = renderContact(section);      break;
      default:             el = null;
    }
    if (el) root.appendChild(el);
  });

  buildNavLinks(visible);

  setTimeout(() => {
    initScrollAnimations();
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) el.classList.add('visible');
    });
  }, 50);
}

/* ─────────────────────────────────────────────
   BUILD NAV LINKS
───────────────────────────────────────────── */
function buildNavLinks(sections) {
  const desktopNav = document.getElementById('nav-links');
  const mobileNav  = document.getElementById('mobile-nav-links');
  if (!desktopNav) return;

  const makeLinks = () => sections.map(s => {
    const label = t(s.navLabel || s.title || s.type);
    const id = sectionId(s);
    const a = document.createElement('a');
    a.href = '#' + id;
    a.className = 'navbar__nav-link';
    a.dataset.section = id;
    a.textContent = label;
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      closeMobileNav();
    });
    return a;
  });

  desktopNav.innerHTML = '';
  mobileNav && (mobileNav.innerHTML = '');
  makeLinks().forEach(a => {
    desktopNav.appendChild(a.cloneNode(true));
    if (mobileNav) mobileNav.appendChild(a);
  });

  // Re-attach click handlers on cloned desktop links
  desktopNav.querySelectorAll('.navbar__nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.section);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      closeMobileNav();
    });
  });
}

function sectionId(section) {
  return section.id || section.type;
}

/* ══════════════════════════════════════════════
   PROFILE / HERO SECTION
══════════════════════════════════════════════ */
function renderProfile(section) {
  const d = section.data || {};
  const name   = t(d.name) || 'Your Name';
  const title  = t(d.title) || 'Software Developer';
  const bio    = t(d.bio) || '';
  const avatar = d.avatar || '';
  const socials = d.socialLinks || d.socials || [];
  const cta1Label = window.currentLang === 'vi' ? 'Xem Dự Án' : 'View Projects';
  const cta2Label = window.currentLang === 'vi' ? 'Liên Hệ' : 'Contact Me';

  const titlesArr = Array.isArray(d.titles) ? d.titles.map(tt => t(tt)) : [title];

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section hero';

  const socialsHtml = socials.map(soc =>
    `<a href="${escapeHtml(soc.url || '#')}" target="_blank" rel="noopener noreferrer"
        class="social-link" title="${escapeHtml(t(soc.label) || soc.platform || '')}">
      ${platformIcon(soc.platform || soc.url || '')}
    </a>`).join('');

  el.innerHTML = `
    <div class="hero__grid-bg"></div>
    <div class="container hero__content">
      <div class="hero__badge">
        <div class="hero__badge-dot"></div>
        <span>${window.currentLang === 'vi' ? 'Sẵn sàng làm việc' : 'Available for work'}</span>
      </div>
      <p class="hero__greeting" id="hero-greeting"></p>
      <h1 class="hero__name"><span class="hero__name-text">${escapeHtml(name)}</span></h1>
      <p class="hero__title">
        <span class="typed-text" id="typed-text"></span>
        <span class="cursor">|</span>
      </p>
      ${bio ? `<p class="hero__bio">${escapeHtml(bio)}</p>` : ''}
      <div class="hero__actions">
        <a href="#projects" class="btn btn-primary" id="cta-projects">${escapeHtml(cta1Label)}</a>
        <a href="#contact" class="btn btn-outline" id="cta-contact">${escapeHtml(cta2Label)}</a>
      </div>
      <div class="hero__social">
        ${socialsHtml}
      </div>
    </div>
    ${avatar ? `<div class="hero__avatar"><img src="${escapeHtml(avatar)}" alt="${escapeHtml(name)}" class="hero__avatar-img" /></div>` : ''}`;

  // CTA scroll
  el.querySelector('#cta-projects')?.addEventListener('click', e => { e.preventDefault(); smoothScrollTo('projects'); });
  el.querySelector('#cta-contact')?.addEventListener('click',  e => { e.preventDefault(); smoothScrollTo('contact'); });

  requestAnimationFrame(() => {
    initGreeting(el.querySelector('#hero-greeting'));
    initTypedText(el.querySelector('#typed-text'), titlesArr);
  });

  return el;
}

/* ─ Hero: particle canvas ─ */
function initHeroCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, particles = [], raf;

  function resize() {
    const newW = canvas.offsetWidth || window.innerWidth;
    const newH = canvas.offsetHeight || window.innerHeight;
    const sizeChanged = (newW !== W || newH !== H);
    
    W = canvas.width  = newW;
    H = canvas.height = newH;
    
    if (sizeChanged && particles.length > 0) {
      particles.forEach(p => {
        p.x = Math.random() * newW;
        p.y = Math.random() * newH;
      });
    }
  }

  function makeParticle() {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6c63ff';
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 1, // Kích thước hạt lớn hơn (1px - 3px)
      dx: (Math.random() - 0.5) * 0.6, dy: (Math.random() - 0.5) * 0.6, // Tốc độ di chuyển tăng nhẹ
      alpha: Math.random() * 0.6 + 0.2, // Độ mờ rõ hơn (0.2 - 0.8)
      color,
    };
  }

  function init() { resize(); particles = Array.from({ length: 130 }, makeParticle); } // Tăng số lượng hạt lên 130 để bao phủ toàn trang

  function draw() {
    // Tự động kiểm tra và điều chỉnh độ phân giải canvas theo kích thước hiển thị thực tế
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
      resize();
    }

    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    const maxDist = 130; // Khoảng cách kết nối xa hơn
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.save(); ctx.globalAlpha = (1 - dist / maxDist) * 0.25; // Đường kết nối sáng rõ hơn
          ctx.strokeStyle = particles[i].color; ctx.lineWidth = 0.6; // Nét vẽ dày hơn một chút
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); ctx.restore();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  init(); draw();
  const resizeObs = () => resize();
  window.addEventListener('resize', resizeObs, { passive: true });
  // Clean up when element is removed
  new MutationObserver(() => {
    if (!document.contains(canvas)) { cancelAnimationFrame(raf); window.removeEventListener('resize', resizeObs); }
  }).observe(document.body, { childList: true, subtree: true });
}

/* ─ Hero: animated greeting ─ */
function initGreeting(el) {
  if (!el) return;
  const greetings = {
    vi: ['Xin chào! 👋', 'Chào mừng 🎉', 'Hân hạnh gặp bạn ✨'],
    en: ['Hello! 👋', 'Welcome 🎉', 'Nice to meet you ✨'],
  };
  const list = greetings[window.currentLang] || greetings.en;
  let i = 0;
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  const show = () => {
    el.style.opacity = '0'; el.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      el.textContent = list[i % list.length];
      el.style.opacity = '1'; el.style.transform = 'translateY(0)'; i++;
    }, 300);
  };
  show();
  setInterval(show, 3500);
}

/* ─ Hero: typewriter effect ─ */
function initTypedText(el, texts) {
  if (!el || !texts || !texts.length) return;
  let tIdx = 0, cIdx = 0, deleting = false;
  function tick() {
    const text = texts[tIdx % texts.length];
    el.textContent = deleting ? text.slice(0, --cIdx) : text.slice(0, ++cIdx);
    if (!deleting && cIdx >= text.length) { deleting = true; setTimeout(tick, 1800); return; }
    if (deleting && cIdx === 0) { deleting = false; tIdx++; }
    setTimeout(tick, deleting ? 50 : 80);
  }
  tick();
}

window.smoothScrollTo = function(id) {
  const el = document.getElementById(id);
  if (el) { const top = el.getBoundingClientRect().top + window.pageYOffset - 72; window.scrollTo({ top, behavior: 'smooth' }); }
};

/* ══════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════ */
function renderSkills(section) {
  const d = section.data || {};
  const title  = t(d.title || section.title) || (window.currentLang === 'vi' ? 'Kỹ Năng' : 'Skills');
  const groups = d.groups || d.skills || [];

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section skills-section';

  const groupsContainer = document.createElement('div');
  groupsContainer.className = 'skills-groups';

  groups.forEach((g, i) => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'skill-group reveal';

    const groupTitle = document.createElement('h3');
    groupTitle.className = 'skill-group__title';
    groupTitle.textContent = t(g.name) || '';
    groupDiv.appendChild(groupTitle);

    const grid = document.createElement('div');
    grid.className = 'skills-grid';

    (g.skills || g.items || []).forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-item reveal';
      const skillName = t(skill.name) || '';
      
      let iconHtml = '';
      if (skill.icon) {
        iconHtml = `<img src="${escapeHtml(skill.icon)}" alt="${escapeHtml(skillName)}" class="skill-custom-icon skill-icon-img" style="width: 32px; height: 32px; object-fit: contain;" />`;
      } else {
        iconHtml = getSkillIconHtml(skillName);
      }
      
      item.innerHTML = `
        <div class="skill-item__icon">${iconHtml}</div>
        <span class="skill-item__name">${escapeHtml(skillName)}</span>`;
      grid.appendChild(item);
    });

    groupDiv.appendChild(grid);
    groupsContainer.appendChild(groupDiv);
  });

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <div class="section-line"></div>
      </div>
    </div>`;

  const container = el.querySelector('.container');
  container.appendChild(groupsContainer);

  return el;
}

/* ══════════════════════════════════════════════
   EXPERIENCE SECTION
══════════════════════════════════════════════ */
function renderExperience(section) {
  const d = section.data || {};
  const title = t(d.title || section.title) || (window.currentLang === 'vi' ? 'Kinh Nghiệm' : 'Experience');
  const items = d.items || d.experiences || [];

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section experience-section';

  const timeline = document.createElement('div');
  timeline.className = 'timeline container-sm';

  if (!items.length) {
    timeline.innerHTML = emptyState(window.currentLang === 'vi' ? 'Chưa có kinh nghiệm nào.' : 'No experience yet.');
  } else {
    items.forEach((item) => {
      const logoHtml = item.logo
        ? `<img src="${escapeHtml(item.logo)}" alt="${escapeHtml(t(item.company) || '')}" class="timeline-item__logo" loading="lazy" />`
        : `<div class="timeline-item__logo timeline-logo-placeholder" style="display:flex;align-items:center;justify-content:center;font-weight:bold;color:var(--accent-light);">${(t(item.company) || '?').charAt(0).toUpperCase()}</div>`;

      const itemEl = document.createElement('div');
      itemEl.className = `timeline-item reveal-left ${item.current ? 'current' : ''}`;
      itemEl.innerHTML = `
        <div class="timeline-item__date">${escapeHtml(formatDateRange(item.startDate, item.endDate, window.currentLang))}</div>
        <div class="timeline-item__header">
          ${logoHtml}
          <div class="timeline-item__org">${escapeHtml(t(item.company) || '')}</div>
        </div>
        <div class="timeline-item__role">${escapeHtml(t(item.role) || '')}</div>
        ${item.description ? `<div class="timeline-item__desc">${sanitizeHtml(t(item.description))}</div>` : ''}`;
      timeline.appendChild(itemEl);
    });
  }

  el.innerHTML = `<div class="container"><div class="section-header reveal"><h2 class="section-title">${escapeHtml(title)}</h2><div class="section-line"></div></div></div>`;
  el.querySelector('.container').appendChild(timeline);
  return el;
}

/* ══════════════════════════════════════════════
   EDUCATION SECTION
══════════════════════════════════════════════ */
function renderEducation(section) {
  const d = section.data || {};
  const title = t(d.title || section.title) || (window.currentLang === 'vi' ? 'Học Vấn' : 'Education');
  const items = d.items || d.education || [];

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section education-section';

  const timeline = document.createElement('div');
  timeline.className = 'timeline container-sm';

  if (!items.length) {
    timeline.innerHTML = emptyState(window.currentLang === 'vi' ? 'Chưa có thông tin học vấn.' : 'No education info yet.');
  } else {
    items.forEach((item) => {
      const logoHtml = item.logo
        ? `<img src="${escapeHtml(item.logo)}" alt="${escapeHtml(t(item.school) || '')}" class="timeline-item__logo" loading="lazy" />`
        : `<div class="timeline-item__logo timeline-logo-placeholder" style="display:flex;align-items:center;justify-content:center;font-weight:bold;color:var(--accent-light);">${(t(item.school) || '?').charAt(0).toUpperCase()}</div>`;

      const itemEl = document.createElement('div');
      itemEl.className = `timeline-item reveal-left`;
      itemEl.innerHTML = `
        <div class="timeline-item__date">${escapeHtml(formatDateRange(item.startDate, item.endDate, window.currentLang))}</div>
        <div class="timeline-item__header">
          ${logoHtml}
          <div class="timeline-item__org">${escapeHtml(t(item.school) || '')}</div>
        </div>
        <div class="timeline-item__role">${escapeHtml(t(item.degree || item.major) || '')}</div>
        ${item.description ? `<div class="timeline-item__desc">${sanitizeHtml(t(item.description))}</div>` : ''}`;
      timeline.appendChild(itemEl);
    });
  }

  el.innerHTML = `<div class="container"><div class="section-header reveal"><h2 class="section-title">${escapeHtml(title)}</h2><div class="section-line"></div></div></div>`;
  el.querySelector('.container').appendChild(timeline);
  return el;
}

/* ══════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════ */
function renderProjects(section) {
  const d = section.data || {};
  const title   = t(d.title || section.title) || (window.currentLang === 'vi' ? 'Dự Án' : 'Projects');
  const items   = d.items || d.projects || [];
  const allLabel  = window.currentLang === 'vi' ? 'Tất Cả' : 'All';
  const demoLabel = window.currentLang === 'vi' ? 'Demo' : 'Demo';
  const repoLabel = 'Source';

  const allTags = ['all', ...new Set(items.flatMap(p => p.tags || []))];

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section projects-section';

  const filtersDiv = document.createElement('div');
  filtersDiv.className = 'project-filters';
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (tag === 'all' ? ' active' : '');
    btn.dataset.filter = tag;
    btn.textContent = tag === 'all' ? allLabel : tag;
    filtersDiv.appendChild(btn);
  });

  const grid = document.createElement('div');
  grid.className = 'projects-grid container';

  if (!items.length) {
    grid.innerHTML = emptyState(window.currentLang === 'vi' ? 'Chưa có dự án nào.' : 'No projects yet.');
  } else {
    items.forEach(project => {
      const tags = project.tags || [];
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      if (project.featured) card.classList.add('featured');
      card.dataset.tags = tags.join(',');

      const imageHtml = project.image
        ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(t(project.name) || '')}" class="project-card__image" loading="lazy" />`
        : `<div class="project-card__image project-img-placeholder" style="display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);color:var(--text-muted);aspect-ratio:16/9;">${icons.imageIcon}</div>`;

      const tagsHtml = tags.map(tag => `<span class="tag tag-sm">${escapeHtml(tag)}</span>`).join('');
      const descText = stripHtml(t(project.description) || '');
      const desc = truncate(descText, 120);

      card.innerHTML = `
        ${project.featured ? `<div class="project-card__featured-badge"><span>★</span><span>${window.currentLang === 'vi' ? 'Nổi bật' : 'Featured'}</span></div>` : ''}
        ${imageHtml}
        <div class="project-card__overlay"></div>
        <div class="project-card__body">
          <div class="project-card__tags">${tagsHtml}</div>
          <h3 class="project-card__name">${escapeHtml(t(project.name) || '')}</h3>
          <p class="project-card__desc">${escapeHtml(desc)}</p>
          <div class="project-card__links">
            ${project.demoUrl ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">${demoLabel}</a>` : ''}
            ${project.repoUrl ? `<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">${repoLabel}</a>` : ''}
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  // Filter logic
  filtersDiv.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersDiv.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('.project-card').forEach(card => {
        const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
        const show = filter === 'all' || tags.includes(filter);
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          card.style.opacity = '1'; card.style.transform = ''; card.style.display = '';
        } else {
          card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  el.innerHTML = `<div class="container"><div class="section-header reveal"><h2 class="section-title">${escapeHtml(title)}</h2><div class="section-line"></div></div></div>`;
  const container = el.querySelector('.container');
  container.appendChild(filtersDiv);
  container.appendChild(grid);
  return el;
}

/* ══════════════════════════════════════════════
   BLOG SECTION
══════════════════════════════════════════════ */
function renderBlog(section) {
  const d = section.data || {};
  const title = t(d.title || section.title) || 'Blog';
  const posts = d.posts || d.items || [];
  const readMoreLabel = window.currentLang === 'vi' ? 'Đọc thêm' : 'Read more';

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section blog-section';

  const grid = document.createElement('div');
  grid.className = 'blog-grid container';

  if (!posts.length) {
    grid.innerHTML = emptyState(window.currentLang === 'vi' ? 'Chưa có bài viết nào.' : 'No blog posts yet.');
  } else {
    posts.forEach((post, idx) => {
      const card = document.createElement('article');
      card.className = 'blog-card reveal';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.dataset.postIdx = idx;

      const imageHtml = post.cover
        ? `<img src="${escapeHtml(post.cover)}" alt="${escapeHtml(t(post.title) || '')}" class="blog-card__cover" loading="lazy" />`
        : `<div class="blog-card__cover blog-cover-placeholder" style="display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);color:var(--text-muted);aspect-ratio:16/9;">${icons.fileIcon}</div>`;

      const excerpt = truncate(t(post.excerpt || post.content) || '', 150);
      const dateStr = formatDate(post.date, window.currentLang);
      const tagsHtml = (post.tags || []).map(tag => `<span class="tag tag-sm">${escapeHtml(tag)}</span>`).join('');

      card.innerHTML = `
        ${imageHtml}
        <div class="blog-card__body">
          <div class="blog-card__meta">
            <time datetime="${escapeHtml(post.date || '')}">${escapeHtml(dateStr)}</time>
          </div>
          <h3 class="blog-card__title">${escapeHtml(t(post.title) || '')}</h3>
          <p class="blog-card__excerpt">${escapeHtml(excerpt)}</p>
          <div class="blog-card__tags">${tagsHtml}</div>
        </div>`;

      const openModal = () => openBlogModal(post);
      card.addEventListener('click', openModal);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); } });

      grid.appendChild(card);
    });
  }

  el.innerHTML = `<div class="container"><div class="section-header reveal"><h2 class="section-title">${escapeHtml(title)}</h2><div class="section-line"></div></div></div>`;
  el.querySelector('.container').appendChild(grid);
  return el;
}

/* ─ Blog modal ─ */
function initBlogModal() {
  const modal   = document.getElementById('blog-modal');
  const closeBtn = document.getElementById('blog-modal-close');
  closeBtn?.addEventListener('click', closeBlogModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeBlogModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBlogModal(); });
}

function openBlogModal(post) {
  const modal = document.getElementById('blog-modal');
  const body  = document.getElementById('blog-modal-body');
  if (!modal || !body) return;
  const title   = t(post.title) || '';
  const dateStr = formatDate(post.date, window.currentLang);
  const content = t(post.content) || t(post.excerpt) || '';
  body.innerHTML = `
    ${post.cover ? `<img src="${escapeHtml(post.cover)}" alt="${escapeHtml(title)}" class="blog-modal-cover" />` : ''}
    <h2 id="blog-modal-title" class="blog-modal-title">${escapeHtml(title)}</h2>
    <time class="blog-date">${escapeHtml(dateStr)}</time>
    <div class="blog-modal-content-body">${sanitizeHtml(content)}</div>`;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
  const modal = document.getElementById('blog-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════
   TESTIMONIALS SECTION
══════════════════════════════════════════════ */
function renderTestimonials(section) {
  const d = section.data || {};
  const title = t(d.title || section.title) || (window.currentLang === 'vi' ? 'Nhận Xét' : 'Testimonials');
  const items = d.items || d.testimonials || [];

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section testimonials-section';

  const grid = document.createElement('div');
  grid.className = 'testimonials-grid container';

  if (!items.length) {
    grid.innerHTML = emptyState(window.currentLang === 'vi' ? 'Chưa có nhận xét nào.' : 'No testimonials yet.');
  } else {
    items.forEach((item) => {
      const authorName = t(item.name || item.authorName) || '';
      const authorAvatar = item.avatar || item.authorAvatar || '';
      const avatarHtml = authorAvatar
        ? `<img src="${escapeHtml(authorAvatar)}" alt="${escapeHtml(authorName)}" class="testimonial-card__avatar" loading="lazy" />`
        : `<div class="testimonial-card__avatar testimonial-avatar-placeholder" style="display:flex;align-items:center;justify-content:center;font-weight:bold;color:var(--accent-light);border:2px solid var(--accent-glow);border-radius:50%;width:48px;height:48px;">${authorName.charAt(0).toUpperCase() || '?'}</div>`;

      const card = document.createElement('div');
      card.className = 'testimonial-card reveal';
      card.innerHTML = `
        <div class="testimonial-card__quote">“</div>
        <div class="testimonial-card__content">${sanitizeHtml(t(item.content) || '')}</div>
        <div class="testimonial-card__author">
          ${avatarHtml}
          <div>
            <div class="testimonial-card__name">${escapeHtml(authorName)}</div>
            <div class="testimonial-card__role">${escapeHtml(t(item.role) || '')}${item.company ? ' · ' + escapeHtml(t(item.company)) : ''}</div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  el.innerHTML = `<div class="container"><div class="section-header reveal"><h2 class="section-title">${escapeHtml(title)}</h2><div class="section-line"></div></div></div>`;
  el.querySelector('.container').appendChild(grid);
  return el;
}

/* ══════════════════════════════════════════════
   CONTACT SECTION
══════════════════════════════════════════════ */
function renderContact(section) {
  const d = section.data || {};
  const title    = t(d.title || section.title)    || (window.currentLang === 'vi' ? 'Liên Hệ' : 'Contact');
  const subtitle = t(d.subtitle) || (window.currentLang === 'vi' ? 'Hãy cùng hợp tác!' : "Let's work together!");
  const email   = d.email   || '';
  const phone   = d.phone   || '';
  const address = t(d.address) || '';
  const socials = d.socialLinks || d.socials || [];

  const isVi = window.currentLang === 'vi';
  const labels = {
    info:    isVi ? 'Thông tin liên hệ' : 'Contact Information',
    name:    isVi ? 'Họ và tên' : 'Full Name',
    email:   'Email',
    subject: isVi ? 'Tiêu đề' : 'Subject',
    message: isVi ? 'Nội dung' : 'Message',
    send:    isVi ? 'Gửi tin nhắn' : 'Send Message',
    sending: isVi ? 'Đang gửi...' : 'Sending...',
    success: isVi ? '✅ Gửi thành công! Tôi sẽ phản hồi sớm.' : '✅ Sent! I will reply soon.',
    error:   isVi ? '❌ Gửi thất bại. Vui lòng thử lại.' : '❌ Failed to send. Please try again.',
  };

  const settings = (typeof DB !== 'undefined' && DB.getSettings) ? DB.getSettings() : {};
  const ejsServiceId  = settings.emailjsServiceId  || '';
  const ejsTemplateId = settings.emailjsTemplateId || '';

  const el = document.createElement('section');
  el.id = sectionId(section);
  el.className = 'section contact-section';

  const socialsHtml = socials.map(soc =>
    `<a href="${escapeHtml(soc.url || '#')}" target="_blank" rel="noopener noreferrer"
        class="social-link" title="${escapeHtml(t(soc.label) || soc.platform || '')}">
      ${platformIcon(soc.platform || soc.url || '')}
    </a>`).join('');

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <p class="section-subtitle">${escapeHtml(subtitle)}</p>
        <div class="section-line"></div>
      </div>
      <div class="contact-grid">
        <div class="contact-info reveal-left">
          <h3 style="margin-bottom:var(--space-lg);">${escapeHtml(labels.info)}</h3>
          ${email ? `
            <div class="contact-info__item">
              <span class="contact-info__icon">${icons.email}</span>
              <div>
                <div class="contact-info__label">Email</div>
                <div class="contact-info__value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
              </div>
            </div>` : ''}
          ${phone ? `
            <div class="contact-info__item">
              <span class="contact-info__icon">${icons.phone}</span>
              <div>
                <div class="contact-info__label">${isVi ? 'Điện thoại' : 'Phone'}</div>
                <div class="contact-info__value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
              </div>
            </div>` : ''}
          ${address ? `
            <div class="contact-info__item">
              <span class="contact-info__icon">${icons.location}</span>
              <div>
                <div class="contact-info__label">${isVi ? 'Địa chỉ' : 'Address'}</div>
                <div class="contact-info__value">${escapeHtml(address)}</div>
              </div>
            </div>` : ''}
          ${socials.length ? `
            <div class="social-links" style="margin-top:var(--space-xl);">
              ${socialsHtml}
            </div>` : ''}
        </div>
        <div class="contact-form-wrap reveal-right">
          <form class="contact-form" id="contact-form-el"
                data-service="${escapeHtml(ejsServiceId)}"
                data-template="${escapeHtml(ejsTemplateId)}"
                novalidate>
            <div class="form-row">
              <div class="form-group">
                <input type="text" id="cf-name" name="from_name" autocomplete="name" placeholder=" " required />
                <label class="form-label" for="cf-name">${escapeHtml(labels.name)}</label>
              </div>
              <div class="form-group">
                <input type="email" id="cf-email" name="reply_to" autocomplete="email" placeholder=" " required />
                <label class="form-label" for="cf-email">${escapeHtml(labels.email)}</label>
              </div>
            </div>
            <div class="form-group">
              <input type="text" id="cf-subject" name="subject" placeholder=" " required />
              <label class="form-label" for="cf-subject">${escapeHtml(labels.subject)}</label>
            </div>
            <div class="form-group">
              <textarea id="cf-message" name="message" rows="5" placeholder=" " required></textarea>
              <label class="form-label" for="cf-message">${escapeHtml(labels.message)}</label>
            </div>
            <button type="submit" class="btn btn-primary" id="contact-submit-btn" style="width:100%;">
              ${escapeHtml(labels.send)}
            </button>
            <div class="form-status" id="form-status-msg" role="alert" aria-live="polite" style="margin-top:var(--space-md);"></div>
          </form>
        </div>
      </div>
    </div>`;

  const form = el.querySelector('#contact-form-el');
  const submitBtn = el.querySelector('#contact-submit-btn');
  const statusEl  = el.querySelector('#form-status-msg');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.querySelectorAll('input, textarea').forEach(f => {
        if (!f.validity.valid) f.classList.add('invalid');
      });
      return;
    }
    form.querySelectorAll('.invalid').forEach(f => f.classList.remove('invalid'));

    submitBtn.disabled = true;
    submitBtn.textContent = labels.sending;
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    const serviceId  = form.dataset.service;
    const templateId = form.dataset.template;

    if (!serviceId || !templateId || typeof emailjs === 'undefined') {
      const nameVal    = form.querySelector('[name="from_name"]')?.value || '';
      const emailVal   = form.querySelector('[name="reply_to"]')?.value || '';
      const subjectVal = form.querySelector('[name="subject"]')?.value || '';
      const msgVal     = form.querySelector('[name="message"]')?.value || '';
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent('From: ' + nameVal + ' <' + emailVal + '>\n\n' + msgVal)}`;
      submitBtn.disabled = false;
      submitBtn.textContent = labels.send;
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form);
      statusEl.textContent = labels.success;
      statusEl.className = 'form-status success';
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      statusEl.textContent = labels.error;
      statusEl.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = labels.send;
    }
  });

  form?.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur',  () => { if (!field.checkValidity()) field.classList.add('invalid'); else field.classList.remove('invalid'); });
    field.addEventListener('input', () => { if (field.validity.valid) field.classList.remove('invalid'); });
  });

  return el;
}

/* ══════════════════════════════════════════════
   NAVBAR BEHAVIOR
══════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', current > 20);
      if (current > lastScrollY && current > 100) navbar.classList.add('hidden');
      else navbar.classList.remove('hidden');
    }
    document.getElementById('scroll-top')?.classList.toggle('visible', current > 300);
    lastScrollY = current;
    scrollSpy();
  }, { passive: true });

  scrollSpy();
}

function openMobileNav() {
  document.getElementById('mobile-nav')?.classList.add('open');
  document.getElementById('hamburger')?.classList.add('open');
  document.getElementById('hamburger')?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobile-nav')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');
  document.getElementById('hamburger')?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function scrollSpy() {
  const sections = document.querySelectorAll('#portfolio-root > section[id]');
  const navLinks = document.querySelectorAll('.navbar__nav-link');
  const offset = 120;
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - offset) current = sec.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === current));
}

/* ══════════════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar__fill').forEach(bar => { bar.classList.add('animated'); });
      if (entry.target.classList.contains('skill-item')) {
        const bar = entry.target.querySelector('.skill-bar__fill');
        if (bar) bar.style.width = bar.dataset.level + '%';
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-stagger:not(.visible)').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════════════ */
function initScrollTop() {
  document.getElementById('scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════
   PLATFORM ICON HELPER
══════════════════════════════════════════════ */
function platformIcon(platformOrUrl) {
  const s = (platformOrUrl || '').toLowerCase();
  if (s.includes('github'))    return icons.github;
  if (s.includes('linkedin'))  return icons.linkedin;
  if (s.includes('twitter') || s.includes('x.com')) return icons.twitter;
  if (s.includes('facebook'))  return icons.facebook;
  if (s.includes('instagram')) return icons.instagram;
  if (s.includes('youtube'))   return icons.youtube;
  if (s.includes('tiktok'))    return icons.tiktok;
  if (s.includes('dribbble'))  return icons.dribbble;
  if (s.includes('behance'))   return icons.behance;
  if (s.includes('medium'))    return icons.medium;
  if (s.includes('dev.to'))    return icons.devto;
  return icons.website;
}

/* ─ SVG Icon library ─ */
const icons = {
  github:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  linkedin:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  twitter:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  facebook:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  youtube:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  tiktok:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>`,
  dribbble:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.838zm-2.42-8.955c.46.008 4.843.05 9.167-1.235A68.19 68.19 0 0 0 8.25 5.55c-2.497 1.174-4.33 3.355-4.784 5.945zM9.6 3.51c.19.315 1.87 3.083 3.47 6.27 3.511-1.316 4.996-3.314 5.17-3.57C16.46 4.42 14.38 3.27 12 3.27c-.83 0-1.63.086-2.4.24zm10.37 3.19c-.2.276-1.84 2.42-5.49 3.89.23.47.453.946.653 1.424.08.19.158.38.233.572 3.41-.428 6.8.26 7.14.33-.02-2.29-.87-4.383-2.534-6.216z"/></svg>`,
  behance:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.7zm-7.249-4h4.556c-.075-1.023-.55-2.04-2.215-2.04-1.56 0-2.183.975-2.34 2.04zM8.11 3C11.148 3 13 4.408 13 7.228c0 1.895-1.136 3.089-2.578 3.386v.045C11.939 10.936 14 11.97 14 14.73 14 17.782 11.733 19 8.604 19H3V3h5.11zm-1.055 5.967h1.5c1.172 0 2.044-.694 2.044-1.753C10.6 6.25 9.87 5.5 8.47 5.5H7.055v3.467zm0 5.567h1.652c1.503 0 2.478-.613 2.478-2.046 0-1.376-.96-1.951-2.527-1.951H7.055v3.997z"/></svg>`,
  medium:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
  devto:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/></svg>`,
  website:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  email:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  phone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>`,
  location:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  imageIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  fileIcon:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
};

/* ══════════════════════════════════════════════
   HELPER UTILITIES
══════════════════════════════════════════════ */
function generateId() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function formatDate(dateStr, lang) {
  if (!dateStr) return '';
  try {
    const locale = lang === 'vi' ? 'vi-VN' : 'en-US';
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return dateStr; }
}

function formatDateRange(start, end, lang) {
  const locale  = lang === 'vi' ? 'vi-VN' : 'en-US';
  const present = lang === 'vi' ? 'Hiện tại' : 'Present';
  const fmt = str => {
    if (!str) return '';
    try { const d = new Date(str); return isNaN(d) ? str : d.toLocaleDateString(locale, { year: 'numeric', month: 'short' }); }
    catch { return str; }
  };
  const s = fmt(start), e = end ? fmt(end) : present;
  return s && e ? `${s} – ${e}` : s || e;
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len).trimEnd() + '…' : str;
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function sanitizeHtml(html) {
  if (!html) return '';
  if (!/<[a-z][\s\S]*>/i.test(html)) {
    return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  }
  const allowedTags = /^(p|br|b|strong|i|em|u|h[1-6]|ul|ol|li|blockquote|a|img|pre|code|hr|span|div)$/i;
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('*').forEach(node => {
    if (!allowedTags.test(node.tagName)) { node.replaceWith(document.createTextNode(node.textContent)); return; }
    [...node.attributes].forEach(attr => {
      if (attr.name.startsWith('on') || attr.name === 'style' || attr.name === 'class' || attr.name === 'id') {
        node.removeAttribute(attr.name);
      }
    });
    if (node.tagName === 'A') { node.setAttribute('rel', 'noopener noreferrer'); node.setAttribute('target', '_blank'); }
  });
  return div.innerHTML;
}

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : '108, 99, 255';
}

function emptyState(message) {
  return `<div class="empty-state"><p>${escapeHtml(message)}</p></div>`;
}

/* ══════════════════════════════════════════════
   DEFAULT / DEMO SECTIONS (used when DB unavailable)
══════════════════════════════════════════════ */
function defaultSections() {
  return [
    {
      id: 'profile', type: 'profile', visible: true, order: 0,
      navLabel: { vi: 'Trang chủ', en: 'Home' },
      data: {
        name: 'Hung M.',
        titles: [
          { vi: 'Lập trình viên Web', en: 'Web Developer' },
          { vi: 'Nhà thiết kế UI/UX', en: 'UI/UX Designer' },
          { vi: 'Người đam mê công nghệ', en: 'Tech Enthusiast' },
        ],
        bio: {
          vi: 'Xây dựng những sản phẩm kỹ thuật số đẹp và hiệu quả là niềm đam mê của tôi. Luôn học hỏi và khám phá những công nghệ mới nhất.',
          en: 'Building beautiful and efficient digital products is my passion. Always learning and exploring the latest technologies.',
        },
        socials: [
          { platform: 'github',   url: 'https://github.com/' },
          { platform: 'linkedin', url: 'https://linkedin.com/' },
          { platform: 'twitter',  url: 'https://twitter.com/' },
        ],
      },
    },
    {
      id: 'skills', type: 'skills', visible: true, order: 1,
      navLabel: { vi: 'Kỹ Năng', en: 'Skills' },
      data: {
        title: { vi: 'Kỹ Năng', en: 'Skills' },
        groups: [
          { name: { vi: 'Frontend', en: 'Frontend' }, skills: [{ name: 'HTML / CSS', level: 95 }, { name: 'JavaScript', level: 90 }, { name: 'React', level: 80 }] },
          { name: { vi: 'Backend', en: 'Backend' },   skills: [{ name: 'Node.js', level: 80 }, { name: 'Python', level: 75 }, { name: 'SQL', level: 70 }] },
          { name: { vi: 'Công cụ', en: 'Tools' },     skills: [{ name: 'Git', level: 90 }, { name: 'Docker', level: 65 }, { name: 'Figma', level: 75 }] },
        ],
      },
    },
    {
      id: 'projects', type: 'projects', visible: true, order: 2,
      navLabel: { vi: 'Dự Án', en: 'Projects' },
      data: {
        title: { vi: 'Dự Án', en: 'Projects' },
        items: [
          { name: { vi: 'Portfolio Cá Nhân', en: 'Personal Portfolio' }, description: { vi: 'Website portfolio với dark mode và đa ngôn ngữ.', en: 'Portfolio website with dark mode and multilingual support.' }, tags: ['HTML', 'CSS', 'JavaScript'], demoUrl: '#', repoUrl: '#' },
          { name: { vi: 'Ứng Dụng Quản Lý', en: 'Management App' },      description: { vi: 'Ứng dụng web quản lý công việc với kéo thả.', en: 'Task management web app with drag and drop.' }, tags: ['React', 'Node.js', 'MongoDB'], demoUrl: '#', repoUrl: '#' },
          { name: { vi: 'API Backend', en: 'Backend API' },               description: { vi: 'RESTful API với xác thực JWT và phân quyền.', en: 'RESTful API with JWT authentication and authorization.' }, tags: ['Node.js', 'SQL'], demoUrl: null, repoUrl: '#' },
        ],
      },
    },
    {
      id: 'contact', type: 'contact', visible: true, order: 3,
      navLabel: { vi: 'Liên Hệ', en: 'Contact' },
      data: {
        title:    { vi: 'Liên Hệ', en: 'Contact' },
        subtitle: { vi: 'Hãy cùng hợp tác!', en: "Let's work together!" },
        email: 'hello@example.com',
        socials: [
          { platform: 'github',   url: 'https://github.com/' },
          { platform: 'linkedin', url: 'https://linkedin.com/' },
        ],
      },
    },
  ];
}

/* ══════════════════════════════════════════════
   SAFETY RE-ATTACH for controls rendered before DOMContentLoaded
   (static HTML elements are always present, but just in case)
══════════════════════════════════════════════ */
(function reAttach() {
  const themeBtn = document.getElementById('btn-theme');
  const langBtn  = document.getElementById('btn-lang');
  if (themeBtn && !themeBtn._pb) { themeBtn.addEventListener('click', toggleTheme); themeBtn._pb = true; }
  if (langBtn  && !langBtn._pb)  { langBtn.addEventListener('click',  toggleLang);  langBtn._pb  = true; }
})();

function getSkillIconHtml(skillName) {
  const name = skillName.toLowerCase().trim();
  
  const deviconMap = {
    'python': 'devicon-python-plain colored',
    'pyspark': 'devicon-apachespark-original colored',
    'apache spark': 'devicon-apachespark-original colored',
    'spark': 'devicon-apachespark-original colored',
    'sql': 'devicon-azuresqldatabase-plain colored',
    'postgresql': 'devicon-postgresql-plain colored',
    'postgres': 'devicon-postgresql-plain colored',
    'mysql': 'devicon-mysql-plain colored',
    'sqlite': 'devicon-sqlite-plain colored',
    'oracle': 'devicon-oracle-original colored',
    'git': 'devicon-git-plain colored',
    'github': 'devicon-github-original',
    'gitlab': 'devicon-gitlab-plain colored',
    'dbt': 'devicon-dbt-plain colored',
    'google cloud': 'devicon-googlecloud-plain colored',
    'gcp': 'devicon-googlecloud-plain colored',
    'azure': 'devicon-azure-plain colored',
    'databricks': 'devicon-databricks-plain colored',
    'snowflake': 'devicon-snowflake-plain colored',
    'power bi': 'devicon-powerbi-plain colored',
    'powerbi': 'devicon-powerbi-plain colored',
    'react': 'devicon-react-original colored',
    'typescript': 'devicon-typescript-plain colored',
    'javascript': 'devicon-javascript-plain colored',
    'node': 'devicon-nodejs-plain colored',
    'nodejs': 'devicon-nodejs-plain colored',
    'docker': 'devicon-docker-plain colored',
    'kubernetes': 'devicon-kubernetes-plain colored',
    'aws': 'devicon-amazonwebservices-plain-wordmark colored',
    'fabric': 'devicon-microsoft-plain colored',
    'microsoft fabric': 'devicon-microsoft-plain colored',
    'java': 'devicon-java-plain colored',
    'scala': 'devicon-scala-plain colored',
    'pandas': 'devicon-pandas-plain colored',
    'numpy': 'devicon-numpy-plain colored',
    'linux': 'devicon-linux-plain colored',
    'bash': 'devicon-bash-plain colored',
    'yaml': 'devicon-yaml-plain colored',
    'html': 'devicon-html5-plain colored',
    'css': 'devicon-css3-plain colored'
  };

  for (const key in deviconMap) {
    if (name.includes(key)) {
      return `<i class="${deviconMap[key]} skill-icon-img"></i>`;
    }
  }

  // Fallback database icon SVG
  return `
    <div class="skill-fallback-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22c5.523 0 10-2.239 10-5V7c0-2.761-4.477-5-10-5S2 4.239 2 7v10c0 2.761 4.477 5 10 5z"></path>
        <path d="M2 12c0 2.76 4.477 5 10 5s10-2.24 10-5"></path>
        <path d="M2 7c0 2.76 4.477 5 10 5s10-2.24 10-5"></path>
      </svg>
    </div>
  `;
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}
