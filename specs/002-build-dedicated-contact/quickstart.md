# Quickstart & QA Notes — Dedicated Contact Page & Sanity CMS Scaffold

## Contact Console QA Checklist
- Load `contact.html`; use the skip link to confirm focus jumps to the main landmark and nav retains keyboard visibility.
- Tab through the form fields — each label remains visible, focus outlines glow neon, and optional phone field is announced as optional.
- Submit with required fields empty: inline error copy appears beneath each input, `aria-invalid="true"` is set, and the error banner uses `role="alert"` for screen readers.
- Submit with valid data (e.g., `name=Test User`, `email=test@example.com`, `message=Hello`): the fetch fallback returns a success banner while Netlify records the submission. With JavaScript disabled, the form posts to Netlify’s default thank-you page.
- Toggle `prefers-reduced-motion` (system preference) and ensure the success banner appears without slide animation; the starfield and other motion respect the existing guardrails.

## Netlify Email Notifications
- After deploying, enable email notifications under Netlify → Forms → `contact`. Add an *Email notification* with the destination inbox.
- Use the Netlify dashboard “Submit test entry” or run:
  ```bash
  curl -X POST https://<your-site>.netlify.app/ \
    --data-urlencode "form-name=contact" \
    --data-urlencode "name=QA Tester" \
    --data-urlencode "email=qa@example.com" \
    --data-urlencode "message=Verifying Netlify delivery"
  ```
- Verify submissions appear in the Forms panel and trigger notification emails.

### Verification Log
- 2025-11-02 — Deployment confirmed live on Netlify. Email notification toggle still needs manual confirmation; curl smoke test not run in this CLI environment.
- 2025-11-02 — No honeypot spam attempts logged yet. Plan to retest after enabling notifications and capture Netlify dashboard evidence.

## Sanity Setup Snapshot
- Copy `.env.example` to `.env` and populate the Sanity keys.
- Reference “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf” for dataset + GROQ structure; implementation lands in Phase 3 tasks (`scripts/cms/sanity-client.js`).
- Update the meta tags in `blog.html` (or inject `window.__SANITY_CONFIG__`) with your project ID, dataset, and API version. Optional tokens should remain private.
- After deploying, load `blog.html` with valid credentials: posts render as `console-block` cards, and the empty state hides. Remove credentials to confirm the empty state reappears without console errors.
- 2025-11-02 — Accessibility sweep (keyboard navigation, reduced-motion) not executed from CLI; schedule manual run post-deployment and update this log with results.
