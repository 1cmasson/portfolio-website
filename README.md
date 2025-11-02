# Nyan Cat Space — Cosmic Terminal Portfolio

A playful, terminal-inspired personal site that celebrates space vibes, accessibility, and the legendary Nyan Cat. Built as a static experience using HTML, Tailwind CSS (via CDN), and a sprinkling of vanilla JavaScript for starfields and animations.

## Features
- Animated starfield background with reduced-motion support.
- Home hero with Star Wars crawl, Nyan Cat fly-by, and motion toggle.
- Terminal-styled About page featuring ASCII art, timeline, and skills.
- Projects page with glassy planet cards and hover/focus effects.
- Dedicated contact console with mailto CTA, clipboard helper, and reduced-motion friendly styling.
- Blog landing pad ready to render Sanity-published posts (empty state for now).
- Fully semantic, keyboard-navigable layout with skip links and ARIA labels.

## Local Preview
Open `index.html` directly in a browser or serve the folder:

```bash
npx serve .
```

Check the manual QA checklist in `specs/001-nyan-cat-space/quickstart.md` for accessibility and performance verification steps.

## Environment Variables
Sanity-powered blog content expects a local `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Populate the following keys (drawn from the “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site” reference):

- `SANITY_PROJECT_ID` — Sanity project identifier.
- `SANITY_DATASET` — dataset that stores published posts (defaults to `production`).
- `SANITY_API_VERSION` — API date version for Content Lake queries (ISO date string).
- `SANITY_READ_TOKEN` — optional token if the dataset is private; leave blank for public datasets.

Credentials remain local; the static site reads them at runtime via the upcoming Sanity helper.

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
