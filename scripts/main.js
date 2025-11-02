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

/**
 * Progressive enhancement for the Netlify-powered contact form.
 */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return () => {};

  const successBanner = form.querySelector('[data-form-success]');
  const errorBanner = form.querySelector('[data-form-error]');
  const errorText = form.querySelector('[data-form-error-text]');
  const submitButton = form.querySelector('[data-submit-button]');
  const controllableFields = Array.from(form.querySelectorAll('input[name], textarea[name]')).filter(
    (field) => field.name && field.name !== 'bot-field' && field.type !== 'hidden',
  );

  const toggleBanner = (banner, isVisible) => {
    if (!banner) return;
    if (isVisible) {
      banner.dataset.hidden = 'false';
      banner.style.display = 'flex';
      banner.setAttribute('tabindex', '-1');
      banner.focus({ preventScroll: state.reducedMotion });
      window.requestAnimationFrame(() => {
        banner.removeAttribute('tabindex');
      });
    } else {
      banner.dataset.hidden = 'true';
      banner.style.display = 'none';
      banner.removeAttribute('tabindex');
    }
  };

  const setFieldError = (field, message) => {
    if (!field || !field.id) return;
    const errorNode = form.querySelector(`#${field.id}-error`);
    if (!errorNode) return;

    if (message) {
      errorNode.textContent = message;
      errorNode.hidden = false;
      field.setAttribute('aria-invalid', 'true');
    } else {
      errorNode.textContent = '';
      errorNode.hidden = true;
      field.removeAttribute('aria-invalid');
    }
  };

  const validateFields = () => {
    let valid = true;
    controllableFields.forEach((field) => {
      const value = (field.value || '').trim();
      let message = '';

      if (value !== field.value) {
        field.value = value;
      }

      if (field.name === 'name') {
        if (!value) message = 'Please share your name.';
      } else if (field.name === 'email') {
        if (!value) {
          message = 'Email is required so Carlos can reply.';
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
          message = 'Enter a valid email address.';
        }
      } else if (field.name === 'message') {
        if (!value) message = 'Let us know how we can collaborate or connect.';
      } else if (field.name === 'phone' && value) {
        if (!/^[+()\-\s0-9]{7,}$/.test(value)) {
          message = 'Phone numbers may include digits, spaces, plus sign, and parentheses.';
        }
      }

      setFieldError(field, message);
      if (message) valid = false;
    });
    return valid;
  };

  const setBusyState = (isBusy) => {
    if (isBusy) {
      form.setAttribute('aria-busy', 'true');
    } else {
      form.removeAttribute('aria-busy');
    }
    if (submitButton) submitButton.disabled = isBusy;
  };

  const handleSuccess = () => {
    toggleBanner(errorBanner, false);
    toggleBanner(successBanner, true);
    form.reset();
    controllableFields.forEach((field) => setFieldError(field, ''));
  };

  const handleError = (message) => {
    if (errorText && message) {
      errorText.textContent = message;
    }
    toggleBanner(successBanner, false);
    toggleBanner(errorBanner, true);
  };

  const onInput = (event) => {
    const target = event.target;
    if (!controllableFields.includes(target)) return;
    setFieldError(target, '');
    toggleBanner(errorBanner, false);
    toggleBanner(successBanner, false);
  };

  controllableFields.forEach((field) => field.addEventListener('input', onInput));

  const onReset = () => {
    window.requestAnimationFrame(() => {
      controllableFields.forEach((field) => setFieldError(field, ''));
      toggleBanner(errorBanner, false);
      toggleBanner(successBanner, false);
    });
  };

  form.addEventListener('reset', onReset);

  const onSubmit = async (event) => {
    event.preventDefault();
    toggleBanner(successBanner, false);
    toggleBanner(errorBanner, false);

    if (!validateFields()) {
      handleError('Please fix the highlighted fields before resubmitting.');
      return;
    }

    try {
      setBusyState(true);
      const formData = new FormData(form);
      const encoded = new URLSearchParams(formData).toString();
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      });

      if (response.ok) {
        handleSuccess();
      } else {
        throw new Error(`Netlify responded with ${response.status}`);
      }
    } catch (error) {
      console.error('Contact form submission failed', error);
      handleError('The transmission could not be delivered. Try again in a moment or email carlos@space.dev.');
    } finally {
      setBusyState(false);
    }
  };

  form.addEventListener('submit', onSubmit);

  return () => {
    form.removeEventListener('submit', onSubmit);
    form.removeEventListener('reset', onReset);
    controllableFields.forEach((field) => field.removeEventListener('input', onInput));
  };
}

document.addEventListener('DOMContentLoaded', () => {
  state.reducedMotion = resolveMotionPreference();
  document.documentElement.dataset.motion = state.reducedMotion ? 'reduced' : 'animated';
  syncMotionToggles();

  let cleanupStarfield = initStarfield();
  const cleanupNyan = initNyanCat();
  const cleanupCrawl = initCrawl();
  const cleanupContact = initContactForm();
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
  });
});

// Expose helper in case future pages need to read state.
window.NYAN_SPACE = {
  getMotionPreference: () => (state.reducedMotion ? 'reduced' : 'animated'),
  setMotionPreference,
};
