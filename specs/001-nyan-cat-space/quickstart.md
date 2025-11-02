# Quickstart: Nyan Cat Space Site

## Prerequisites
- Modern browser (Chrome, Firefox, Safari, Edge).
- Optional: `npx serve` or any static file server for local preview.

## Run Locally
1. From repository root, start a static server:
   ```bash
   npx serve .
   ```
   or open `index.html` directly in the browser (animations still work).
2. Visit `http://localhost:3000` (default for `serve`) and test across desktop + mobile breakpoints.

## Manual QA Checklist
- **Keyboard Navigation**: Tab through hero, skip link, about/projects links, planet cards.
- **Reduced Motion**: Enable OS-level reduced motion; verify starfield pauses and animations soften.
- **Contrast**: Use browser dev tools to confirm text contrast ≥ 4.5:1.
- **Responsive Layout**: Resize to 320px, 768px, 1024px, 1440px; sections stay readable and aligned.
- **Performance**: Run Lighthouse mobile audit; expect ≥ 90 across categories.

### QA Log
- *2025-10-31*: Verified skip link and keyboard traversal using Playwright (Tab focus moves to skip link, nav, and buttons). Confirmed animation toggle sets `data-motion="reduced"` and halts starfield/crawl movement. Spot-checked About and Projects pages for semantic structure via Playwright snapshots; headings and landmark roles present.
- *2025-10-31*: Ran `npx lighthouse@12.1.0 http://127.0.0.1:4173/index.html --preset=perf --emulated-form-factor=mobile`. Initial score = 78 (FCP 3.9 s, LCP 3.9 s, TBT 40 ms, CLS 0). After replacing Tailwind CDN runtime with locally generated CSS, reran audit and achieved score = 100 (FCP 1.5 s, LCP 1.5 s, TBT 0 ms, CLS 0).

## Content Updates
- Edit copy directly in `index.html`, `about.html`, and `projects.html`.
- For new project planets, duplicate the `<article>` template and adjust emoji/title/description.
- Keep assets lightweight: compress images/GIFs below 200 KB and place under `assets/`.
- If you introduce new Tailwind utility classes, rebuild the bundle:
  ```bash
  npx tailwindcss@3.4.14 -i styles/tailwind-input.css -o styles/tailwind-base.css --minify --content index.html about.html projects.html
  ```

## Accessibility Notes
- Provide descriptive `aria-label` for animated characters (Nyan Cat) and planet cards.
- Ensure focus outlines remain visible when overriding Tailwind defaults.
- Update `scripts/main.js` if adding new animations so reduced-motion logic stays centralized.
