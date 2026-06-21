/**
 * ═══════════════════════════════════════════════════════════════
 *  BLOG DETAIL PAGE — js/blog-detail.js
 *  Standalone reading page for blog posts with TOC, related posts, etc.
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// Global state
window.currentLang = 'vi';

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof DB !== 'undefined' && DB.init) {
    await DB.init();
  }
  initTheme();
  initLang();
  applyAccentColor();
  initHeroCanvas(document.getElementById('global-canvas'));
  renderBlogDetail();
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
  updateStaticLabels();
}

function updateLangButton() {
  const btn = document.getElementById('btn-lang');
  if (btn) btn.textContent = window.currentLang === 'vi' ? 'VI' : 'EN';
}

function updateStaticLabels() {
  const backHomeLabel = document.getElementById('back-home-label');
  if (backHomeLabel) {
    backHomeLabel.textContent = window.currentLang === 'vi' ? 'Quay lại Portfolio' : 'Back to Portfolio';
  }
}

function toggleLang() {
  window.currentLang = window.currentLang === 'vi' ? 'en' : 'vi';
  if (typeof DB !== 'undefined' && DB.setLang) DB.setLang(window.currentLang);
  updateLangButton();
  updateStaticLabels();
  renderBlogDetail(); // Re-render post details in the target language
}

document.getElementById('btn-lang')?.addEventListener('click', toggleLang);

/* ══════════════════════════════════════════════
   ACCENT COLOR
══════════════════════════════════════════════ */
function applyAccentColor() {
  if (typeof DB === 'undefined' || !DB.getSettings) return;
  const s = DB.getSettings();
  if (s && s.accentColor) {
    document.documentElement.style.setProperty('--accent', s.accentColor);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(s.accentColor));
  }
}

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : '108, 99, 255';
}

/* ══════════════════════════════════════════════
   HELPERS & UTILITIES
══════════════════════════════════════════════ */
function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[window.currentLang] || obj.vi || obj.en || '';
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function truncate(str, len) {
  if (!str) return '';
  if (str.length <= len) return str;
  return str.slice(0, len).trim() + '...';
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

function estimateReadingTime(content) {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const speed = 200; // Average reading speed: 200 WPM
  const minutes = Math.max(1, Math.ceil(wordCount / speed));
  return window.currentLang === 'vi' ? `${minutes} phút đọc` : `${minutes} min read`;
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
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
    if (!allowedTags.test(node.tagName)) {
      node.replaceWith(...node.childNodes);
    } else {
      // Clean attributes
      const attrs = Array.from(node.attributes);
      attrs.forEach(attr => {
        if (attr.name !== 'href' && attr.name !== 'src' && attr.name !== 'alt' && attr.name !== 'class' && attr.name !== 'id') {
          node.removeAttribute(attr.name);
        }
      });
    }
    if (node.tagName === 'A') { node.setAttribute('rel', 'noopener noreferrer'); node.setAttribute('target', '_blank'); }
  });
  return div.innerHTML;
}

function getRelatedPosts(currentPost, allPosts) {
  if (!allPosts || allPosts.length <= 1) return [];
  const currentTags = (currentPost.tags || []).map(t => t.trim().toLowerCase());
  
  const matches = allPosts
    .filter(p => p.id !== currentPost.id)
    .map(p => {
      const pTags = (p.tags || []).map(t => t.trim().toLowerCase());
      const intersection = pTags.filter(t => currentTags.includes(t)).length;
      return { post: p, score: intersection };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.publishedDate || b.post.date) - new Date(a.post.publishedDate || a.post.date));
  
  if (matches.length > 0) {
    return matches.slice(0, 3).map(item => item.post);
  } else {
    return allPosts
      .filter(p => p.id !== currentPost.id)
      .sort((a, b) => new Date(b.publishedDate || b.date) - new Date(a.publishedDate || a.date))
      .slice(0, 3);
  }
}

/* ══════════════════════════════════════════════
   BACKGROUND ANIMATION (CANVAS PARTICLE)
══════════════════════════════════════════════ */
function initHeroCanvas(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, particles = [], raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
    if (particles.length > 0) {
      particles.forEach(p => {
        p.x = Math.random() * W;
        p.y = Math.random() * H;
      });
    }
  }

  function makeParticle() {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6c63ff';
    return {
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.6, dy: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.5 + 0.1,
      color,
    };
  }

  function init() { resize(); particles = Array.from({ length: 80 }, makeParticle); }

  function draw() {
    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) resize();
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.save(); ctx.globalAlpha = (1 - dist / maxDist) * 0.15;
          ctx.strokeStyle = particles[i].color; ctx.lineWidth = 0.5;
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
}

/* ══════════════════════════════════════════════
   BLOG DETAIL RENDERER
══════════════════════════════════════════════ */
function renderBlogDetail() {
  const container = document.getElementById('blog-content-area');
  if (!container) return;

  // 1. Get post ID from URL search query
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    container.innerHTML = `<div class="empty-state"><p>${window.currentLang === 'vi' ? 'Không tìm thấy ID bài viết.' : 'Post ID not specified.'}</p></div>`;
    setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    return;
  }

  // 2. Fetch blog section from DB
  let sections = [];
  if (typeof DB !== 'undefined' && DB.getSections) {
    sections = DB.getSections();
  } else {
    container.innerHTML = `<div class="empty-state"><p>Database is loading or unavailable...</p></div>`;
    return;
  }

  const blogSec = sections.find(s => s.type === 'blog');
  if (!blogSec) {
    container.innerHTML = `<div class="empty-state"><p>Blog section not found.</p></div>`;
    return;
  }

  const posts = blogSec.data.posts || blogSec.data.items || [];
  const post = posts.find(p => p.id === postId);

  if (!post) {
    container.innerHTML = `<div class="empty-state"><p>${window.currentLang === 'vi' ? 'Bài viết không tồn tại.' : 'Article not found.'}</p></div>`;
    setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    return;
  }

  // 3. Render Post Data
  const title = t(post.title) || '';
  document.title = title + " | Pham Manh Hung Portfolio";

  const dateStr = formatDate(post.publishedDate || post.date, window.currentLang);
  let content = t(post.content) || t(post.excerpt) || '';
  if (typeof marked !== 'undefined') {
    content = marked.parse(content);
  }
  const readTime = estimateReadingTime(content);

  // Generate Table of Contents (TOC)
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const headings = tempDiv.querySelectorAll('h2, h3');
  let tocHtml = '';
  
  if (headings.length > 0) {
    tocHtml = `<div class="blog-toc-container">
      <h4 class="blog-toc-title">${window.currentLang === 'vi' ? 'Mục lục' : 'Table of Contents'}</h4>
      <ul class="blog-toc-list">`;
    headings.forEach((heading, index) => {
      const text = heading.textContent.trim();
      const id = 'blog-header-' + index;
      tocHtml += `<li class="blog-toc-item toc-${heading.tagName.toLowerCase()}"><a href="#${id}" class="blog-toc-link" data-target="${id}">${escapeHtml(text)}</a></li>`;
    });
    tocHtml += `</ul></div>`;
  }

  // Update headings in the content with their IDs
  const doc = new DOMParser().parseFromString(content, 'text/html');
  const docHeadings = doc.querySelectorAll('h2, h3');
  docHeadings.forEach((h, index) => {
    h.setAttribute('id', 'blog-header-' + index);
  });
  const updatedContent = doc.body.innerHTML;

  // Calculate related posts
  const relatedPosts = getRelatedPosts(post, posts);
  let relatedHtml = '';
  if (relatedPosts.length > 0) {
    relatedHtml = `
      <div class="blog-related-section">
        <h3 class="blog-related-title">${window.currentLang === 'vi' ? 'Bài viết liên quan' : 'Related Posts'}</h3>
        <div class="blog-related-grid">
    `;
    relatedPosts.forEach(rp => {
      const rpTitle = t(rp.title) || '';
      const rpDate = formatDate(rp.publishedDate || rp.date, window.currentLang);
      let rpExcerptText = t(rp.excerpt) || '';
      if (!rpExcerptText) {
        const rpContent = t(rp.content) || '';
        const htmlContent = (typeof marked !== 'undefined') ? marked.parse(rpContent) : rpContent;
        rpExcerptText = stripHtml(htmlContent);
      }
      const rpExcerpt = truncate(rpExcerptText, 85);
      const rpImage = rp.cover 
        ? `<div class="related-card-img"><img src="${escapeHtml(rp.cover)}" alt="${escapeHtml(rpTitle)}" /></div>`
        : `<div class="related-card-img placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>`;
      
      relatedHtml += `
        <div class="blog-related-card" data-id="${rp.id}">
          ${rpImage}
          <div class="related-card-body">
            <time class="related-card-date">${escapeHtml(rpDate)}</time>
            <h4 class="related-card-title">${escapeHtml(rpTitle)}</h4>
            <p class="related-card-excerpt">${escapeHtml(rpExcerpt)}</p>
          </div>
        </div>
      `;
    });
    relatedHtml += `</div></div>`;
  }

  // Share link
  const shareUrl = window.location.href;
  const iconsFacebook = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  const iconsLinkedin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
  const shareHtml = `
    <div class="blog-share-bar">
      <span class="share-label">${window.currentLang === 'vi' ? 'Chia sẻ:' : 'Share:'}</span>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn fb" title="Share on Facebook">
        ${iconsFacebook}
      </a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" target="_blank" rel="noopener noreferrer" class="share-btn li" title="Share on LinkedIn">
        ${iconsLinkedin}
      </a>
      <button class="share-btn copy" id="blog-copy-link-btn" title="Copy Link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </button>
      <span class="copy-success-toast" id="copy-success-toast">${window.currentLang === 'vi' ? 'Đã sao chép!' : 'Copied!'}</span>
    </div>
  `;

  // Render detail view layout
  container.innerHTML = `
    <div class="blog-detail-layout">
      <!-- Main Content -->
      <article class="blog-modal-main">
        ${post.cover ? `<div class="blog-modal-cover-wrap"><img src="${escapeHtml(post.cover)}" alt="${escapeHtml(title)}" class="blog-modal-cover" /></div>` : ''}
        <div class="blog-modal-meta">
          <time class="blog-date" datetime="${escapeHtml(post.publishedDate || post.date || '')}">${escapeHtml(dateStr)}</time>
          <span class="blog-meta-dot">•</span>
          <span class="blog-read-time">${readTime}</span>
        </div>
        <h1 class="blog-modal-title">${escapeHtml(title)}</h1>
        
        <div class="blog-modal-content-body">${sanitizeHtml(updatedContent)}</div>
        
        ${shareHtml}
        
        ${relatedHtml}
      </article>

      <!-- Sidebar -->
      <aside class="blog-modal-sidebar">
        ${tocHtml}
      </aside>
    </div>
  `;

  // 4. Bind event listeners
  const progressBar = document.getElementById('blog-progress-bar');
  const copyBtn = document.getElementById('blog-copy-link-btn');
  const copyToast = document.getElementById('copy-success-toast');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => copyToast.classList.remove('show'), 2000);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // Handle related post clicks
  container.querySelectorAll('.blog-related-card').forEach(card => {
    card.addEventListener('click', () => {
      const rpId = card.dataset.id;
      const isFileProtocol = window.location.protocol === 'file:';
      const hasHtmlExtension = window.location.pathname.endsWith('.html');
      const targetPage = (isFileProtocol || hasHtmlExtension) ? 'blog.html' : 'blog';
      window.location.href = `${targetPage}?id=${rpId}`;
    });
  });

  // Handle TOC smooth scroll and click
  container.querySelectorAll('.blog-toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const targetElement = container.querySelector('#' + targetId);
      if (targetElement) {
        // Offset for sticky header
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Reading progress and TOC tracking
  const scrollHandler = () => {
    // Progress calculation
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }

    // TOC highlight tracking
    const contentHeadings = container.querySelectorAll('.blog-modal-content-body h2, .blog-modal-content-body h3');
    let activeId = '';
    
    for (let h of contentHeadings) {
      const rect = h.getBoundingClientRect();
      if (rect.top < 150) {
        activeId = h.getAttribute('id');
      } else {
        break;
      }
    }

    container.querySelectorAll('.blog-toc-link').forEach(link => {
      if (link.dataset.target === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  setTimeout(scrollHandler, 100);
}
