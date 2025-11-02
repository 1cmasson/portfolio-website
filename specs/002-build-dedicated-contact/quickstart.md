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

## Sanity Setup Snapshot
- Copy `.env.example` to `.env` and populate the Sanity keys.
- Reference “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf” for dataset + GROQ structure; implementation lands in Phase 3 tasks (`scripts/cms/sanity-client.js`).
- Update the meta tags in `blog.html` (or inject `window.__SANITY_CONFIG__`) with your project ID, dataset, and API version. Optional tokens should remain private.
- After deploying, load `blog.html` with valid credentials: posts render as `console-block` cards, and the empty state hides. Remove credentials to confirm the empty state reappears without console errors.
- 2025-11-02 — Accessibility sweep (keyboard navigation, reduced-motion) not executed from CLI; schedule manual run post-deployment and update this log with results.
