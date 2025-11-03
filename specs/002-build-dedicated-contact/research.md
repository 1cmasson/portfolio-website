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
- **Directory structure**: `content/projects/<slug>.md` and `content/blog/<yyyy-mm-dd>-<slug>.md` keep URLs semantic. Pair each with optional pre-rendered HTML in `public/projects/` if we choose static fallbacks.
- **Frontmatter schema (projects)**:
  ```yaml
  ---
  title: Terminal Nebula Collaboration
  summary: Multiplayer coding playground mission log.
  tech: [AstroNav, Tailwind, Node.js]
  launchDate: 2024-06-18
  role: lead developer
  links:
    repo: https://github.com/example/project
    demo: https://example.com
  ---
  ```
  Body content follows standard Markdown headings, lists, and code blocks.
- **Frontmatter schema (blog)**:
  ```yaml
  ---
  title: Mapping the Cosmic Terminal Aesthetic
  date: 2025-02-14
  tags: [design systems, accessibility]
  summary: Lessons from building retro-future interfaces.
  ---
  ```
- **Parsing strategy**: prefer a zero-dependency parser (e.g., `marked` stripped-down or a custom subset) capped at 5 KB minified. Alternatively, pre-render Markdown to HTML manually and store alongside `.md` to avoid runtime parsing when JS is disabled.
- **Security**: sanitize HTML output to prevent script injection. Allow limited inline code and links; strip raw HTML tags unless they are whitelisted (`<strong>`, `<em>`, `<code>`, `<pre>`). Consider using DOMPurify in a reduced build or a handcrafted sanitizer tuned to Markdown subset.
- **Performance**: cache fetched Markdown in `sessionStorage` to avoid repeated network hits; bust cache when `Last-Modified` timestamp changes. For no-JS fallback, embed pre-rendered HTML inside `<template>` tags and display them when scripts are disabled.
