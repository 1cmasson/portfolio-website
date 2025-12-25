# Research Log — Dedicated Contact Page & Markdown Content Engine

## References
- MDN: [`mailto` URL scheme](https://developer.mozilla.org/docs/Web/HTML/Element/a#attr-href) — documents supported parameters and encoding tips for email links.
- MDN: [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API) — covers browser support, permission requirements, and fallbacks for copy helpers.
- MDN: [Frontmatter metadata](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types#textmarkdown) — guidance on storing metadata with Markdown using YAML frontmatter.
- GitHub Docs: [Creating Markdown content](https://docs.github.com/content) — conventions for headings, code blocks, and tables that we should support in parsing.
- UnifiedJS `micromark` documentation — reference for building a lightweight Markdown parser if we adopt the library (<5 KB when stripped) or mimic its tokenization.

## Contact CTA Notes
- `mailto:` links support `subject` and `body` query parameters; keep templates short to avoid encoding issues. Example: `mailto:carlos@space.dev?subject=Greetings%20from%20Nyan%20Cat%20Space`.
- Clipboard API requires a secure context (https). Fallback should expose the email as selectable text and describe manual copy instructions.
- Provide `aria-live="polite"` messaging for copy confirmation and ensure focus remains on the triggering button to respect keyboard flow.

## Markdown Content Notes
- **Directory structure**: `content/projects/<slug>.md` and `content/blog/<yyyy-mm-dd>-<slug>.md` keep URLs semantic. Each Markdown file will have a matching pre-rendered HTML fallback stored in-page via `<template>` (see implementation notes) so no external build step is required.
- **Frontmatter schema (projects)** — required keys: `title`, `summary`, `tech` (array of strings), `launchDate` (ISO date), `links.repo`, `links.demo`; optional keys: `role`, `status`, additional links. Example used in `content/projects/starlit-console.md`:
  ```yaml
  ---
  title: Starlit Console Uplink
  summary: Pair-programming command center that syncs commits with cosmic telemetry.
  tech:
    - Vanilla JS
    - Tailwind CSS
    - Web Components
  launchDate: 2025-07-16
  role: lead developer
  links:
    repo: https://github.com/cosmos-lab/starlit-console
    demo: https://cosmos-lab.dev/starlit-console
  ---
  ```
  Body content follows standard Markdown headings, lists, and code blocks.
- **Frontmatter schema (blog)** — required keys: `title`, `date` (ISO date), `tags` (array), `summary`; optional keys: `heroImage`, `canonical`, `readingTime`. Example used in `content/blog/2025-03-08-markdown-orbit.md`:
  ```yaml
  ---
  title: Plotting the Markdown Orbit
  date: 2025-03-08
  tags:
    - markdown
    - accessibility
    - tooling
  summary: How we swapped Sanity for local Markdown while keeping the cosmic terminal vibe intact.
  ---
  ```
- **Manifest file**: `content/blog/manifest.json` lists available posts. Each entry includes the Markdown source plus fallback template IDs for index and article rendering. Update this manifest whenever a new blog file is added.
- **Parsing strategy**: ship a custom zero-dependency helper (`scripts/content/markdown.js`) under 5 KB that covers headings, lists, inline emphasis/code, fenced code blocks, and links. Pre-rendered `<template>` blocks supply no-JS fallbacks for spotlight + blog.
- **Security**: sanitize HTML output to prevent script injection. Allow limited inline code and links; strip raw HTML tags unless they are whitelisted (`<strong>`, `<em>`, `<code>`, `<pre>`). Consider using DOMPurify in a reduced build or a handcrafted sanitizer tuned to Markdown subset.
- **Performance**: Fetch Markdown on demand and reuse pre-rendered HTML in `<template>` elements when JavaScript is unavailable. Future enhancement: memoize parsed results in `sessionStorage` if repeat fetches become a bottleneck.
