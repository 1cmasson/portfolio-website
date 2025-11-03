# Tasks: Email-First Contact Console & Markdown Content Engine

**Input**: `/specs/002-build-dedicated-contact/plan.md`, `/specs/002-build-dedicated-contact/spec.md`  
**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: Manual QA (keyboard navigation, screen reader spot check, reduced-motion), mailto CTA launch, clipboard fallback (JS on/off), Markdown article rendering (with and without JS).

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Safe to run in parallel when touching distinct files.  
- **[Story]**: Maps to user stories (US1, US2, US3, US4).  
- Every description includes explicit file paths or documentation targets.

---

## Phase 0: Foundations (must complete before user stories)

- [ ] T200 Update repository documentation (`README.md`, `specs/002-build-dedicated-contact/research.md`) to remove Sanity references and outline the new Markdown content workflow.  
- [ ] T201 Ensure `contact.html` retains header/footer parity with other pages after the Netlify removal and capture baseline copy in `specs/002-build-dedicated-contact/quickstart.md`.  
- [ ] T202 Scaffold content directories (`content/projects/`, `content/blog/`) with placeholder Markdown files and decide on frontmatter schema documented in `research.md`.  

---

## Phase 1: User Story 1 – Launch a Contact Transmission (Priority: P1)

- [ ] T210 [US1] Finalize the `mailto:` CTA and copy helper in `contact.html`, ensuring skip link, focus order, and hero copy align with the constitution.  
- [ ] T211 [US1] Refine CTA styling in `styles/tailwind.css` (focus states, responsive layout) and document motion considerations.  
- [ ] T212 [US1] Harden the clipboard/`mailto` enhancement in `scripts/main.js` with accessible status messaging and JS fallback checks.  
- [ ] T213 [US1] Log keyboard and reduced-motion QA findings in `specs/002-build-dedicated-contact/quickstart.md`.  

---

## Phase 2: User Story 2 – Share Contact Details Without a Form (Priority: P1)

- [ ] T220 [US2] Extend `contact.html` with manual-copy instructions for no-JS visitors and secondary channels (optional social links).  
- [ ] T221 [US2] Verify clipboard permission failure paths and document them in `quickstart.md` and `README.md`.  
- [ ] T222 [US2] Add aria-live tone styling (success/info/error) in `styles/tailwind.css` and confirm screen reader announcements.  

---

## Phase 3: User Story 3 – Read Markdown-Powered Project Spotlights (Priority: P2)

- [ ] T230 [US3] Define Markdown frontmatter schema for projects in `specs/002-build-dedicated-contact/research.md` (fields: title, summary, tech, launchDate, links).  
- [ ] T231 [US3] Implement a Markdown loading/parsing helper (`scripts/content/markdown.js`) that converts project Markdown to sanitized HTML without external dependencies.  
- [ ] T232 [P] [US3] Create a project article template (`projects/project.html` or dynamic section within `projects.html`) that renders parsed Markdown inside an `<article>` with terminal styling.  
- [ ] T233 [US3] Ensure JavaScript-disabled fallback by bundling pre-rendered HTML (e.g., inline `<template>` with preprocessed Markdown) and document the approach in `quickstart.md`.  

---

## Phase 4: User Story 4 – Explore Markdown Blog Entries (Priority: P2)

- [ ] T240 [US4] Mirror the frontmatter schema for blog posts and capture author/date/tag guidance in `research.md`.  
- [ ] T241 [US4] Build blog index rendering in `blog.html` that lists Markdown posts in reverse chronological order with excerpts generated from content.  
- [ ] T242 [US4] Create blog detail templates (e.g., `blog/post.html`) that render Markdown HTML with semantic headings, code block styling, and accessible navigation back to the index.  
- [ ] T243 [US4] Add unit or smoke tests (if feasible) to validate Markdown parsing output and guard against script injection.  

---

## Phase 5: Polish & QA

- [ ] T250 Run full-site keyboard + reduced-motion QA across `index.html`, `about.html`, `projects.html`, `contact.html`, `blog.html`, and new article pages; log outcomes in `quickstart.md`.  
- [ ] T251 Execute Lighthouse (mobile) on contact, project article, and blog pages; confirm performance ≥ 90 and document results.  
- [ ] T252 Capture screenshots/GIFs of the new Markdown article layouts and store under `assets/images/`.  
