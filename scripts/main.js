/**
 * Nyan Cat Space main script
 *
 * Handles starfield rendering, animation preferences, Nyan Cat fly-bys,
 * and Star Wars–style intro crawl controls. All animations honor the
 * prefers-reduced-motion media query plus a manual override stored locally.
 */

const state = {
  reducedMotion: false,
  stars: [],
  starConfig: {
    count: 150,
    speed: 0.05,
  },
};
const motionSubscribers = new Set();

/**
 * Determine motion preference via media query + local storage override.
 */
function resolveMotionPreference() {
  const stored = window.localStorage.getItem('nyan-motion');
  if (stored === 'reduced') return true;
  if (stored === 'animated') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Persist manual motion selection and update state.
 */
function setMotionPreference(mode) {
  if (mode === 'auto') {
    window.localStorage.removeItem('nyan-motion');
    state.reducedMotion = resolveMotionPreference();
  } else {
    window.localStorage.setItem('nyan-motion', mode);
    state.reducedMotion = mode === 'reduced';
  }
  document.documentElement.dataset.motion = state.reducedMotion ? 'reduced' : 'animated';
  syncMotionToggles(mode === 'auto' ? (state.reducedMotion ? 'reduced' : 'animated') : mode);
  notifyMotionSubscribers();
}

/**
 * Initialize starfield canvas. Returns cleanup function.
 */
function initStarfield() {
  const canvas = document.querySelector('[data-starfield]');
  if (!canvas || canvas.getContext === undefined) return () => {};

  const ctx = canvas.getContext('2d', { alpha: true });

  const resize = () => {
    const { innerWidth, innerHeight } = window;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };

  const generateStars = () => {
    const area = window.innerWidth * window.innerHeight;
    const density = Math.min(220, Math.max(90, Math.round(area / 8000)));
    state.starConfig.count = density;
    state.stars = Array.from({ length: state.starConfig.count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 0.7 + 0.3,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (state.reducedMotion) return;

    ctx.fillStyle = 'rgba(124, 252, 0, 0.9)';
    state.stars.forEach((star) => {
      const size = star.z * 1.2;
      ctx.beginPath();
      ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
      ctx.fill();

      star.y += star.z * state.starConfig.speed * 50;
      if (star.y > window.innerHeight) {
        star.y = 0;
        star.x = Math.random() * window.innerWidth;
      }
    });
  };

  let rafId;
  const loop = () => {
    if (!state.reducedMotion) {
      draw();
      rafId = window.requestAnimationFrame(loop);
    }
  };

  const start = () => {
    cancelAnimationFrame(rafId);
    if (!state.reducedMotion) {
      rafId = window.requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleResize = () => {
    resize();
    generateStars();
    start();
  };

  resize();
  generateStars();
  start();

  window.addEventListener('resize', handleResize);
  const unregister = registerMotionSubscriber(start);
  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', handleResize);
    unregister();
  };
}

/**
 * Animate Nyan Cat across the viewport on interval.
 */
function initNyanCat() {
  const container = document.querySelector('[data-nyan]');
  if (!container) return () => {};

  let timerId;

  const animate = () => {
    if (state.reducedMotion) {
      container.style.transform = 'translateX(-200px)';
      return;
    }

    container.animate(
      [
        { transform: 'translate3d(-200px, 0, 0)', opacity: 0 },
        { transform: 'translate3d(20vw, -20px, 0)', opacity: 1 },
        { transform: 'translate3d(110vw, 20px, 0)', opacity: 0 },
      ],
      {
        duration: 12000,
        easing: 'ease-in-out',
        iterations: 1,
      },
    );
  };

  const schedule = () => {
    clearInterval(timerId);
    animate();
    timerId = window.setInterval(animate, 20000);
  };

  container.addEventListener('mouseenter', () => {
    clearInterval(timerId);
  });
  container.addEventListener('mouseleave', () => schedule());
  container.addEventListener('focusin', () => clearInterval(timerId));
  container.addEventListener('focusout', () => schedule());

  schedule();
  return () => {
    clearInterval(timerId);
  };
}

/**
 * Configure Star Wars crawl to support pause/resume and reduced motion.
 */
function initCrawl() {
  const wrapper = document.querySelector('[data-crawl]');
  if (!wrapper) return () => {};

  const inner = wrapper.querySelector('[data-crawl-inner]');
  const toggle = wrapper.querySelector('[data-crawl-toggle]');

  const updateForMotion = () => {
    if (!inner) return;
    const pausedByUser = toggle && toggle.getAttribute('aria-pressed') === 'false';

    if (state.reducedMotion) {
      inner.style.animation = 'none';
      inner.style.animationPlayState = 'paused';
    } else {
      inner.style.animation = '';
      inner.style.animationPlayState = pausedByUser ? 'paused' : 'running';
    }
  };

  if (toggle && inner) {
    toggle.addEventListener('click', () => {
      const paused = inner.style.animationPlayState === 'paused';
      inner.style.animationPlayState = paused ? 'running' : 'paused';
      toggle.setAttribute('aria-pressed', String(!paused));
    });
  }

  updateForMotion();
  const unregister = registerMotionSubscriber(updateForMotion);

  return () => {
    unregister();
  };
}

function syncMotionToggles(activeMode) {
  const currentMode = activeMode || (state.reducedMotion ? 'reduced' : 'animated');
  document.querySelectorAll('[data-motion-toggle]').forEach((btn) => {
    const mode = btn.dataset.motionToggle;
    const isActive = mode === currentMode;
    btn.classList.toggle('opacity-40', !isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

/**
 * Initialize manual motion toggle buttons if present.
 */
function initMotionControls() {
  document.querySelectorAll('[data-motion-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.motionToggle;
      setMotionPreference(mode);
    });
  });
  syncMotionToggles();
}

function registerMotionSubscriber(callback) {
  if (typeof callback !== 'function') {
    return () => {};
  }
  motionSubscribers.add(callback);
  return () => {
    motionSubscribers.delete(callback);
  };
}

function notifyMotionSubscribers() {
  motionSubscribers.forEach((subscriber) => {
    try {
      subscriber(state.reducedMotion);
    } catch (error) {
      console.error('Motion subscriber error', error);
    }
  });
}

function formatIsoDate(value, locale = 'en-US') {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function renderBadges(target, items) {
  if (!target) return;
  target.innerHTML = '';
  const hasItems = Array.isArray(items) && items.length > 0;
  target.hidden = !hasItems;
  if (!hasItems) return;
  items.forEach((item) => {
    const badge = document.createElement('span');
    badge.className = 'border border-neon/30 px-2 py-1 rounded';
    badge.textContent = item;
    target.appendChild(badge);
  });
}

function cloneTemplateContent(id) {
  const template = document.getElementById(id);
  if (!template) return null;
  return template.content.cloneNode(true);
}

/**
 * Load and render Markdown-powered project spotlight.
 */
function initProjectSpotlight() {
  const target = document.querySelector('[data-markdown-target="project"]');
  if (!target || !window.MarkdownContent) return () => {};

  const titleNode = document.querySelector('[data-project-title]');
  const summaryNode = document.querySelector('[data-project-summary]');
  const launchNode = document.querySelector('[data-project-launch]');
  const techNode = document.querySelector('[data-project-tech]');

  window.MarkdownContent.renderMarkdownInto({
    source: 'content/projects/starlit-console.md',
    target,
    fallbackId: 'project-spotlight-fallback',
    onMeta: (meta) => {
      if (meta.title && titleNode) {
        titleNode.textContent = meta.title;
      }
      if (meta.summary && summaryNode) {
        summaryNode.textContent = meta.summary;
      }
      if (launchNode) {
        const formatted = formatIsoDate(meta.launchDate);
        launchNode.textContent = formatted ? `Launched ${formatted}` : 'Launch date TBA';
      }
      renderBadges(techNode, meta.tech);
    },
  });

  return () => {};
}

async function loadBlogManifest() {
  try {
    const manifestUrl = new URL('../content/blog/manifest.json', window.location.href);
    const response = await fetch(manifestUrl.toString(), { cache: 'no-store' });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Failed to load blog manifest', error);
    return [];
  }
}

function resolveContentUrl(path) {
  try {
    return new URL(path, window.location.href).toString();
  } catch (error) {
    console.error('Unable to resolve content URL', error);
    return path;
  }
}

function initBlogIndex() {
  const container = document.querySelector('[data-blog-index]');
  if (!container || !window.MarkdownContent) return () => {};

  const list = container.querySelector('[data-blog-list]');
  const countNode = container.querySelector('[data-blog-count]');
  const emptyNode = container.querySelector('[data-blog-empty]');

  if (!list) return () => {};

  (async () => {
    const manifest = await loadBlogManifest();
    if (!manifest.length) {
      if (emptyNode) emptyNode.hidden = false;
      return;
    }

    try {
      const posts = [];
      for (const entry of manifest) {
        const sourceUrl = resolveContentUrl(entry.source || '');
        const response = await fetch(sourceUrl);
        if (!response.ok) {
          throw new Error(`Failed to load ${sourceUrl}`);
        }
        const text = await response.text();
        const { data, body } = window.MarkdownContent.parseFrontmatter(text);
        const html = window.MarkdownContent.renderMarkdownBody(body);
        const probe = document.createElement('div');
        probe.innerHTML = html;
        const firstParagraph = probe.querySelector('p');
        posts.push({
          slug: entry.slug,
          title: data?.title || entry.slug,
          date: data?.date || '',
          summary: data?.summary || (firstParagraph ? firstParagraph.textContent.trim() : ''),
          tags: Array.isArray(data?.tags) ? data.tags : [],
        });
      }

      posts.sort((a, b) => {
        const aTime = Date.parse(a.date || '') || 0;
        const bTime = Date.parse(b.date || '') || 0;
        return bTime - aTime;
      });

      if (!posts.length) {
        if (emptyNode) emptyNode.hidden = false;
        return;
      }

      list.innerHTML = '';
      posts.forEach((post) => {
        const item = document.createElement('li');
        item.className = 'console-block bg-black/50 border border-neon/20 p-4 md:p-6 rounded-lg';

        const article = document.createElement('article');
        const headingId = `blog-index-${post.slug}`;
        article.setAttribute('aria-labelledby', headingId);

        const header = document.createElement('header');
        header.className = 'space-y-2';

        const dateLabel = document.createElement('p');
        dateLabel.className = 'text-xs uppercase tracking-[0.25em] text-neon-amber';
        dateLabel.textContent = formatIsoDate(post.date) || 'Date TBA';

        const title = document.createElement('h2');
        title.id = headingId;
        title.className = 'text-2xl font-semibold text-neon-green';
        title.textContent = post.title;

        header.appendChild(dateLabel);
        header.appendChild(title);

        const summary = document.createElement('p');
        summary.className = 'text-sm text-slate-200/80 mt-4';
        summary.textContent = post.summary || 'Mission summary coming soon.';

        const tags = document.createElement('div');
        tags.className = 'flex flex-wrap gap-2 mt-4 text-xs uppercase tracking-[0.25em] text-slate-200/70';
        renderBadges(tags, post.tags);

        const link = document.createElement('a');
        link.className = 'inline-flex items-center gap-2 text-sm text-amber hover:text-neon-green transition mt-6 focus-visible';
        link.href = `blog/post.html?slug=${encodeURIComponent(post.slug)}`;
        link.innerHTML = 'Read full article <span aria-hidden="true">→</span>';

        article.appendChild(header);
        article.appendChild(summary);
        article.appendChild(tags);
        article.appendChild(link);
        item.appendChild(article);
        list.appendChild(item);
      });

      if (countNode) {
        countNode.textContent = posts.length === 1 ? '1 post logged' : `${posts.length} posts logged`;
      }
      if (emptyNode) emptyNode.hidden = true;
    } catch (error) {
      console.error('Failed to render blog index', error);
      if (emptyNode) emptyNode.hidden = false;
      const fallbackId = manifest[0]?.indexTemplate;
      if (fallbackId) {
        const fragment = cloneTemplateContent(fallbackId);
        if (fragment) {
          list.innerHTML = '';
          list.appendChild(fragment);
        }
      }
    }
  })();

  return () => {};
}

function initBlogArticle() {
  const article = document.querySelector('[data-blog-article]');
  if (!article || !window.MarkdownContent) return () => {};

  const titleNode = document.querySelector('[data-article-title]');
  const summaryNode = document.querySelector('[data-article-summary]');
  const dateNode = document.querySelector('[data-article-date]');
  const tagsNode = document.querySelector('[data-article-tags]');
  const missingNode = document.querySelector('[data-blog-missing]');
  const defaultFallbackId = article.dataset.articleFallback;
  let activeFallbackId = defaultFallbackId;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  const showMissing = () => {
    if (missingNode) missingNode.hidden = false;
  };

  const applyFallback = () => {
    if (!activeFallbackId) return;
    const fragment = cloneTemplateContent(activeFallbackId);
    if (fragment) {
      article.innerHTML = '';
      article.appendChild(fragment);
    }
  };

  if (!slug) {
    showMissing();
    return () => {};
  }

  (async () => {
    const manifest = await loadBlogManifest();
    const entry = manifest.find((item) => item.slug === slug);
    if (!entry) {
      showMissing();
      applyFallback();
      return;
    }

    activeFallbackId = entry.articleTemplate || defaultFallbackId;

    try {
      const sourceUrl = resolveContentUrl(entry.source || '');
      const response = await fetch(sourceUrl);
      if (!response.ok) {
        throw new Error(`Failed to load ${sourceUrl}`);
      }
      const text = await response.text();
      const { data, body } = window.MarkdownContent.parseFrontmatter(text);
      const html = window.MarkdownContent.renderMarkdownBody(body);
      article.innerHTML = html;

      if (titleNode) titleNode.textContent = data?.title || slug;
      if (summaryNode) {
        summaryNode.textContent = data?.summary || summaryNode.textContent;
      }
      if (dateNode) {
        const formatted = formatIsoDate(data?.date);
        dateNode.textContent = formatted || data?.date || 'Launch date TBA';
      }
      renderBadges(tagsNode, Array.isArray(data?.tags) ? data.tags : []);
      if (missingNode) missingNode.hidden = true;
    } catch (error) {
      console.error('Failed to render blog article', error);
      showMissing();
      applyFallback();
    }
  })();

  return () => {};
}

/**
 * Progressive enhancement for the email-first contact console.
 */
function initContactConsole() {
  const consoleBlock = document.querySelector('[data-contact-console]');
  if (!consoleBlock) return () => {};

  const copyButton = consoleBlock.querySelector('[data-copy-email]');
  const status = consoleBlock.querySelector('[data-copy-status]');
  const addressNode = consoleBlock.querySelector('[data-contact-address]');
  const mailtoButton = consoleBlock.querySelector('[data-mailto-button]');
  const email = addressNode ? addressNode.textContent.trim() : '';
  const hasClipboard = Boolean(navigator.clipboard && typeof navigator.clipboard.writeText === 'function');

  const setStatus = (message, tone = 'info') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  };

  if (status) {
    status.textContent = 'Transmission status will appear here after copying the address.';
    status.dataset.tone = 'info';
  }

  const focusAddress = () => {
    if (!addressNode) return;
    if (typeof addressNode.focus === 'function') {
      addressNode.focus({ preventScroll: state.reducedMotion });
    }
  };

  const handleCopy = async (event) => {
    event.preventDefault();
    if (!email) {
      setStatus('No email available to copy.', 'error');
      return;
    }

    if (!hasClipboard) {
      setStatus('Clipboard unsupported. Highlight the address and copy manually.', 'info');
      focusAddress();
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setStatus('Email copied. Paste it into your mission console.', 'success');
    } catch (error) {
      console.error('Contact email copy failed', error);
      setStatus('Copy failed. Highlight and copy manually instead.', 'error');
      focusAddress();
    }
  };

  const handleMailtoFocus = () => {
    setStatus('Opening your mail client in a new window or tab.', 'info');
  };

  if (copyButton) {
    copyButton.addEventListener('click', handleCopy);
    if (!hasClipboard) {
      copyButton.setAttribute('aria-describedby', 'contact-address-label');
    }
  }

  if (mailtoButton) {
    mailtoButton.addEventListener('click', handleMailtoFocus);
  }

  return () => {
    if (copyButton) {
      copyButton.removeEventListener('click', handleCopy);
    }
    if (mailtoButton) {
      mailtoButton.removeEventListener('click', handleMailtoFocus);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  state.reducedMotion = resolveMotionPreference();
  document.documentElement.dataset.motion = state.reducedMotion ? 'reduced' : 'animated';
  syncMotionToggles();

  let cleanupStarfield = initStarfield();
  const cleanupNyan = initNyanCat();
  const cleanupCrawl = initCrawl();
  const cleanupContact = initContactConsole();
  const cleanupProject = initProjectSpotlight();
  const cleanupBlogIndex = initBlogIndex();
  const cleanupBlogArticle = initBlogArticle();
  initMotionControls();

  window.addEventListener('storage', (event) => {
    if (event.key === 'nyan-motion') {
      state.reducedMotion = resolveMotionPreference();
      document.documentElement.dataset.motion = state.reducedMotion ? 'reduced' : 'animated';
      cleanupStarfield();
      cleanupStarfield = initStarfield();
      notifyMotionSubscribers();
    }
  });

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
    if (!window.localStorage.getItem('nyan-motion')) {
      state.reducedMotion = resolveMotionPreference();
      document.documentElement.dataset.motion = state.reducedMotion ? 'reduced' : 'animated';
      cleanupStarfield();
      cleanupStarfield = initStarfield();
      notifyMotionSubscribers();
    }
  });

  window.addEventListener('beforeunload', () => {
    cleanupStarfield();
    cleanupNyan();
    cleanupCrawl();
    if (typeof cleanupContact === 'function') cleanupContact();
    if (typeof cleanupProject === 'function') cleanupProject();
    if (typeof cleanupBlogIndex === 'function') cleanupBlogIndex();
    if (typeof cleanupBlogArticle === 'function') cleanupBlogArticle();
  });
});

// Expose helper in case future pages need to read state.
window.NYAN_SPACE = {
  getMotionPreference: () => (state.reducedMotion ? 'reduced' : 'animated'),
  setMotionPreference,
};
