# Nyan Cat Space — Cosmic Terminal Portfolio

A playful, terminal-inspired personal site that celebrates space vibes, accessibility, and the legendary Nyan Cat. Built as a static experience using HTML, Tailwind CSS (via CDN), and a sprinkling of vanilla JavaScript for starfields and animations.

## Features
- Animated starfield background with reduced-motion support.
- Home hero with Star Wars crawl, Nyan Cat fly-by, and motion toggle.
- Terminal-styled About page featuring ASCII art, timeline, and skills.
- Projects page with glassy planet cards and hover/focus effects.
- Dedicated contact console powered by Netlify Forms with inline success feedback.
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

## Netlify Form Delivery
- Deploy the site to Netlify and visit **Site settings → Forms** to confirm the `contact` form is detected.
- Enable email notifications (Forms → `contact` → Notifications → *Add notification*) and point it to your inbox.
- Spam protection relies on the built-in honeypot field; keep the hidden `bot-field` input untouched.
- Test delivery with the dashboard’s “Submit test entry” button or via cURL:
  ```bash
  curl -X POST https://<your-site>.netlify.app/ \
    --data-urlencode "form-name=contact" \
    --data-urlencode "name=QA Tester" \
    --data-urlencode "email=qa@example.com" \
    --data-urlencode "message=Verifying Netlify delivery from README"
  ```
- Without JavaScript, Netlify shows its default thank-you page; with JavaScript, the inline success banner confirms receipt without a redirect.

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
