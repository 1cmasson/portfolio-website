# Quickstart & QA Notes — Dedicated Contact Page & Sanity CMS Scaffold

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

## Markdown Content Engine Notes
- Store project articles under `content/projects/slug.md` and blog posts under `content/blog/yyyy-mm-dd-slug.md`. Each file begins with YAML frontmatter (title, summary/date/tags) followed by Markdown body content.
- Parsing approach TBD: lightweight runtime parser (`scripts/content/markdown.js`) must support headings (`#`, `##`), paragraphs, lists, inline/ block code, links, and blockquotes. Output should be sanitized before insertion.
- JavaScript-disabled fallback: pre-render HTML (e.g., commit `content/projects/slug.html`) or bake `<template>` elements into the index pages that mirror Markdown output. Document the chosen approach here once defined.
- Styling: reuse `.console-block` container for articles, add `.markdown-article` utility with spacing for headings, lists, and code blocks in `styles/tailwind.css`.

### Verification Log
- 2025-11-02 — Markdown directories not yet created. Define frontmatter schema and choose parser before implementing runtime loader.
- 2025-11-02 — Decide on sanitation strategy (custom whitelist vs. DOMPurify-lite) prior to shipping article rendering.

## Outstanding QA
- 2025-11-02 — Accessibility sweep (keyboard navigation, reduced-motion) not executed from CLI; schedule manual run post-deployment and update this log with results.
