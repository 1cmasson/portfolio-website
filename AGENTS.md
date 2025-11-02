# portfolio-website Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-31

## Active Technologies

- HTML5, Tailwind CSS utilities, vanilla JavaScript (ES2020) — Feature: 001-nyan-cat-space

## Project Structure

```text
.
├── index.html
├── about.html
├── projects.html
├── styles/
│   └── tailwind.css
├── scripts/
│   └── main.js
└── assets/
    ├── images/
    ├── nyan/
    └── ascii/
```

## Commands

- `/speckit.constitution` — Review governing principles before planning major changes.
- `/speckit.specify "..."` — Generate/update feature spec from plain language request.
- `/speckit.plan` — Populate plan template and refresh agent context.
- `/speckit.tasks` — Produce actionable task list tied to user stories.
- `/speckit.implement` — Execute tasks in order, respecting constitution gates.

## Code Style

- Terminal-first aesthetic: black background, neon green/yellow, monospace fonts.
- Animations must check `prefers-reduced-motion` and expose accessible fallbacks.
- Keep JS lightweight (<10 KB) and encapsulate animation helpers in `scripts/main.js`.
- Ensure ARIA roles, skip links, and focus outlines remain intact after changes.

## Recent Changes

- 001-nyan-cat-space: Added Spec Kit scaffolding and constitution-driven plan.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
