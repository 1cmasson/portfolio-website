# Research Log — Unified Navigation & Link Configuration

## Baseline Audit (2025-11-05)

- **Headers**:
  - `index.html`: Skip link + full nav list present.
  - `projects.html`, `blog.html`: Nav list missing `home` active state? verify.
  - `about.html`, `contact.html`: Some nav items removed after hydration; need shared markup.
- **Footers**:
  - `index.html`: Rich console-block footer with contact blurb and nav.
  - Other pages: Simplified or missing sections; inconsistent spacing.
- **About Layout**: Uses full-width container; lacks `max-w-6xl mx-auto`.

## Findings (2025-11-05)

- Established `partials/header.html` & `partials/footer.html` as single sources of truth, consumed by `scripts/tools/apply_partials.py`.
- Script also syncs `config/links.json` values into contact/about sections using `data-config-*` markers.
- Added `max-w-6xl mx-auto` wrapper to `about.html` to align with other page layouts.

## Open Questions

- Will shared partials be maintained manually (copy-paste) or via lightweight include script? Current approach favors manual includes to stay static.
- Confirm link config ingestion path: static include via HTML templating vs `scripts/main.js` hydration.

## Next Steps

1. Define config format (`config/links.json`) and consumption approach. ✅  
2. Plan copy/paste workflow for partial updates until automation introduced. → Replaced with script-driven injection (`apply_partials.py`).  
3. Document QA steps for keyboard traversal & reduced-motion verification post-refactor. ✅ Logged in quickstart.
