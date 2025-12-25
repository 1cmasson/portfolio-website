# Nyan Cat Space — Cosmic Terminal Portfolio

A playful, terminal-inspired personal site that celebrates space vibes, accessibility, and the legendary Nyan Cat. Built as a static experience using HTML, Tailwind CSS (via CDN), and a sprinkling of vanilla JavaScript for starfields and animations.

## Features
- Animated starfield background with reduced-motion support.
- Home hero with Star Wars crawl, Nyan Cat fly-by, and motion toggle.
- Terminal-styled About page featuring ASCII art, timeline, and skills.
- Projects page with glassy planet cards and hover/focus effects.
- Dedicated contact console with mailto CTA, clipboard helper, and reduced-motion friendly styling.
- Blog index and detail pages render local Markdown with runtime parsing + no-JS fallbacks.
- Fully semantic, keyboard-navigable layout with skip links and ARIA labels.

## Local Preview
Open `index.html` directly in a browser or serve the folder:

```bash
npx serve .
```

Check the manual QA checklist in `specs/001-nyan-cat-space/quickstart.md` for accessibility and performance verification steps.

## Content Workflow
- Project spotlights live under `content/projects/slug.md` with YAML frontmatter (title, summary, tech, launch date) followed by Markdown body copy.
- Blog posts live under `content/blog/yyyy-mm-dd-slug.md` with frontmatter (title, date, tags, summary) and Markdown body.
- Update `content/blog/manifest.json` whenever you add or remove a post. Each entry maps a slug to its Markdown source plus fallback template IDs used by the index/detail pages.
- A lightweight parser under `scripts/content/markdown.js` converts Markdown to sanitized HTML at runtime. `projects.html`, `blog.html`, and `blog/post.html` all ship inline `<template>` fallbacks so readers without JavaScript still see rendered content.
- Reuse `.console-block` styling for article containers and extend `styles/tailwind.css` with `.markdown-article` utilities to format headings, lists, inline emphasis, and code blocks.

## Contact CTA Workflow
- The primary button on `contact.html` opens a `mailto:` draft prefilled with the owner’s email, subject, and greeting. Update the address and copy in the markup to match your inbox.
- A secondary “Copy email” helper uses the Clipboard API; browsers without permission show a manual copy hint instead. Keep the plain-text address visible for no-JS visitors.
- Optional additional channels (e.g., Mastodon, LinkedIn) can be added as focusable links in the console block; maintain contrast and skip-link behaviour when doing so.

## Styling Workflow
- Utility classes come from a precompiled Tailwind bundle (`styles/tailwind-base.css`) generated with the CLI.
- When you add or change utility classes, rebuild the bundle:
  ```bash
  npx tailwindcss@3.4.14 -i styles/tailwind-input.css -o styles/tailwind-base.css --minify --content index.html about.html projects.html
  ```
- Custom glow/terminal theming lives in `styles/tailwind.css`.

## Spec Kit Workflow
- Constitution: `.specify/memory/constitution.md`
- Active feature spec & plan: `specs/002-build-dedicated-contact/`
- Legacy launch spec: `specs/001-nyan-cat-space/`
- Tasks board: `specs/002-build-dedicated-contact/tasks.md`

Use `/speckit.*` commands inside Codex CLI to evolve the project while honoring the constitution.
