# Tasks: Nyan Cat Space Site

**Input**: `/specs/001-nyan-cat-space/plan.md`, `/specs/001-nyan-cat-space/spec.md`  
**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: Manual QA (keyboard navigation, reduced motion, responsive checks, Lighthouse).

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Safe to run in parallel when touching distinct files.  
- **[Story]**: Maps to user stories (US1, US2, US3).  
- Every description includes explicit file paths.

---

## Phase 0: Foundations (Must finish before user stories)

- [ ] T000 Create asset directories `assets/images/`, `assets/nyan/`, `assets/ascii/` with README placeholders documenting source/licensing.  
- [ ] T001 Audit `styles/tailwind.css` and add base variables for color palette, font stack, focus outlines.  
- [ ] T002 Scaffold reduced-motion utility helper and starfield init guard in `scripts/main.js`.  
- [ ] T003 Add global skip link, `<main>` landmark, and base nav structure in `index.html`.

---

## Phase 1: User Story 1 – Launch the Cosmic Terminal (Priority: P1)

**Goal**: Deliver home hero, starfield, intro crawl, and navigation that embody the retro terminal vibe.  
**Independent Test**: Load `index.html`, tab through hero and nav, toggle reduced motion, verify animations adapt.

### Implementation

- [ ] T010 [US1] Build hero console markup (command prompt, CTA buttons, crawl container) in `index.html`.  
- [ ] T011 [P] [US1] Expand Tailwind utilities for hero typography, neon glow, crawl animation keyframes in `styles/tailwind.css`.  
- [ ] T012 [US1] Implement starfield canvas rendering with resize + reduced-motion bail-out in `scripts/main.js`.  
- [ ] T013 [US1] Script Nyan Cat fly-by timing and hover pause behavior in `scripts/main.js`.  
- [ ] T014 [P] [US1] Wire Star Wars crawl activation + pause control logic in `scripts/main.js`.  
- [ ] T015 [US1] Verify focus outlines and skip link behavior in `index.html` (adjust markup as needed).

---

## Phase 2: User Story 2 – Read the Captain’s Log (Priority: P2)

**Goal**: Present About page with terminal-styled copy, ASCII art, and accessible structure.  
**Independent Test**: Navigate to `about.html`, ensure headings logical, ASCII art labelled, content responsive.

- [ ] T020 [US2] Author about timeline, skills, and persona copy using semantic sections in `about.html`.  
- [ ] T021 [P] [US2] Add Tailwind utilities for terminal log formatting, timeline layout, and responsive typography in `styles/tailwind.css`.  
- [ ] T022 [US2] Embed ASCII art asset references and provide descriptive `aria-label` attributes in `about.html`.  
- [ ] T023 [US2] Ensure focusable elements (links, buttons) gain neon outline via Tailwind utilities in `styles/tailwind.css`.  
- [ ] T024 [US2] Run keyboard traversal + screen reader spot check; document findings in `/specs/001-nyan-cat-space/quickstart.md`.

---

## Phase 3: User Story 3 – Explore Galactic Projects (Priority: P3)

**Goal**: Display interactive planet cards with hover/focus affordances and mock project data.  
**Independent Test**: Open `projects.html` on mobile + desktop, tab through cards, confirm readability and motion toggles.

- [ ] T030 [US3] Build planet card grid markup with emoji, title, description, and optional links in `projects.html`.  
- [ ] T031 [P] [US3] Define glassmorphism styles, hover/focus effects, and scroll-snap layout in `styles/tailwind.css`.  
- [ ] T032 [US3] Hook scroll-triggered parallax helpers (planet drift) gated by reduced-motion in `scripts/main.js`.  
- [ ] T033 [US3] Populate mock project content and ensure aria-label descriptions for each card in `projects.html`.

---

## Phase 4: Polish & QA

- [ ] T040 Run cross-browser manual QA (Chrome, Firefox, Safari) focusing on keyboard navigation and contrast; log outcomes in `/specs/001-nyan-cat-space/quickstart.md`.  
- [ ] T041 Optimize assets (compress GIFs/PNGs) and verify per-page weight ≤ 600 KB. Document results in `assets/README.md`.  
- [ ] T042 Capture final screenshots/GIFs for potential README inclusion and store under `assets/images/`.  
- [ ] T043 Execute Lighthouse mobile audit and record score summary in `/specs/001-nyan-cat-space/quickstart.md`.

---

## Dependencies & Parallelism

- Phase 0 tasks block all user stories.  
- Phase 1 (US1) must complete before About or Projects work begins to guarantee shared navigation and scripts exist.  
- Phase 2 and Phase 3 can proceed in parallel once Phase 1 is done; tasks marked `[P]` may be executed concurrently when touching distinct files.  
- Polish & QA runs after targeted user stories are complete.
