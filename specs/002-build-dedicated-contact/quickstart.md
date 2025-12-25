# Quickstart & QA Notes — Dedicated Contact Page & Markdown Content Engine

## Contact Console QA Checklist
- Load `contact.html`; use the skip link to confirm focus jumps to the main landmark and nav retains keyboard visibility.
- Confirm the primary CTA is a `mailto:` link: activate it with keyboard and mouse to verify an email draft opens with prefilled subject/body hints (behaviour varies by browser/client).
- With JavaScript enabled, activate the “Copy email” helper; ensure the address hits the clipboard and the inline status message announces success via `aria-live`.
- Disable JavaScript (or block clipboard permission) and verify the email address remains selectable as plain text with visible focus outlines.
- Toggle `prefers-reduced-motion` and ensure the CTA retains accessible focus styling without introducing new animations.

## Contact Console Notes
- Default CTA email: `carlos@space.dev` (update to the owner’s preferred inbox). Subject template: `Greetings from Nyan Cat Space`. Body template: friendly greeting + prompt to share project context.
- Copy helper leverages the Clipboard API; browsers that deny permission fall back to manual copy instructions rendered inline.
- Optional social links can live inside the console block as secondary actions (keep them keyboard-focusable, minimal motion).

### Verification Log
- 2025-11-02 — Deployment confirmed live. Mailto CTA launches default client on macOS Safari/Chrome; clipboard helper requires manual retest post-deployment (not runnable via CLI).
- 2025-11-02 — No additional channels configured yet; consider adding social handles before public launch.
- 2025-11-03 — Playwright smoke pass: verified skip link focus order, project spotlight render, sanitized Markdown escaping, blog index date formatting (UTC), and reduced-motion toggle.

## Markdown Content Engine Notes
- Store project articles under `content/projects/slug.md` and blog posts under `content/blog/yyyy-mm-dd-slug.md`. Each file begins with YAML frontmatter (title, summary/date/tags) followed by Markdown body content.
- Parsing approach: a custom, zero-dependency helper (`scripts/content/markdown.js`) under 5 KB now handles headings, lists, inline emphasis/code, fenced blocks, and links. It escapes HTML before injecting content.
- Manifest workflow: update `content/blog/manifest.json` whenever you add a Markdown post. Each record maps a slug to the Markdown source plus fallback template IDs.
- JavaScript-disabled fallback: `projects.html` and `blog/*.html` ship pre-rendered `<template>` blocks that mirror parsed output. With JS disabled, visitors still see the fallback article/index.
- When QAing content updates, confirm skip links and focus states still read correctly once markup hydrates.
- Styling: reuse `.console-block` container for articles, add `.markdown-article` utility with spacing for headings, lists, inline emphasis, and code blocks in `styles/tailwind.css`.
- Reduced-motion handling: toggling `window.NYAN_SPACE.setMotionPreference('reduced')` clears the starfield canvas and pauses Nyan Cat fly-bys; reset with `'animated'` after verification.

#### Manifest Refresh Procedure
1. Add the Markdown file under `content/blog/` and append the slug entry to `content/blog/manifest.json` (include fallback template IDs for no-JS coverage).
2. Run `python3 -m http.server 4173 --bind 127.0.0.1` from the repo root (requires sandbox approval) and load `http://127.0.0.1:4173/blog.html`.
3. Perform a hard refresh (`Shift+Cmd+R` / cache-busting query param) to force the manifest fetch past HTTP caching; a soft reload can reuse the previous manifest payload.
4. Verify the blog index count updates, the new card appears with formatted date/title, and create matching `<template>` fallbacks in `blog.html` and `blog/post.html`.

### Verification Log
- 2025-11-03 — Custom parser integrated; spotlight + blog now hydrate Markdown at runtime with pre-rendered fallbacks.
- 2025-11-03 — `.markdown-article` styling landed (headings, lists, inline/code). Need to QA reduced-motion states on new sections.
- 2025-11-03 — Playwright checks confirm manifest-driven blog index + article templates hydrate from Markdown with script sanitization; no-JS template fallback still pending manual check.
- 2025-11-05 — No-JS pass: disabled `scripts/main.js` and confirmed `projects.html` spotlight article plus `blog.html` index render from inline fallback content (skip link + nav focus intact).
- 2025-11-05 — Manifest refresh: temporary post appeared after hard reload; regular reload served cached manifest. Documented cache-bust workflow above.
- 2025-11-05 — Accessibility sweep: Playwright tab traversal hits skip link first, jumps into Markdown content, and returns focusable footer links; reduced-motion toggle sets `data-motion=\"reduced\"` and halts starfield redraw until reset.

## Outstanding QA
- 2025-11-05 — Consider automated parser tests (T243) or memoized Markdown caching once priorities allow.
