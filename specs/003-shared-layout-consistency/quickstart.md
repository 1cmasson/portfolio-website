# Quickstart & QA Notes — Unified Navigation & Link Configuration

## Configuration
- Update `config/links.json` with canonical `github`, `linkedin`, and `email`. Run `python3 scripts/tools/apply_partials.py` to propagate changes into all HTML pages.
- Email should be stored without the `mailto:` scheme (`carlos@space.dev`); the script injects `mailto:` where required and updates query strings.

## Manual QA Checklist
- Keyboard traversal: skip link → header nav → main → footer across `index.html`, `about.html`, `projects.html`, `blog.html`, `contact.html`.
- Reduced-motion: trigger `window.NYAN_SPACE.setMotionPreference('reduced')`; confirm no new animations in header/footer.
- Responsive: Compare header/footer at 320px & 1280px widths; ensure nav wraps gracefully without losing items.
- About page containment: Validate `max-w-6xl mx-auto` for primary narrative blocks with consistent padding.

## Verification Log
- 2025-11-05 — Playwright sweep confirms unified header with `aria-current` on active link across all pages; footer matches index console-block styling verbatim.
- 2025-11-05 — About page constrained to `max-w-6xl mx-auto`; verified readable line lengths at 1440px and 360px plus reduced-motion toggle.
- 2025-11-05 — `apply_partials.py` regenerates pages from partials + `config/links.json`; updating config alone refreshes email/GitHub/LinkedIn references site-wide.
