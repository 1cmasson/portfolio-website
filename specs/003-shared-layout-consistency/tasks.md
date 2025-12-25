# Tasks: Unified Navigation & Link Configuration

**Input**: `/speckit.plan` + `/speckit.specify` artifacts under `specs/003-shared-layout-consistency/`  
**Prerequisites**: plan.md (required), spec.md (required)

**Testing**: Manual validation only — keyboard navigation, reduced-motion toggle, responsive sweep (320px & 1280px), and visual diff against `index.html` header/footer.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Task can run in parallel without file conflicts.  
- **[Story]**: Maps to user stories (e.g., US1, US2).  
- Include concrete file paths (`index.html`, `styles/tailwind.css`, `scripts/main.js`, etc.).

---

## Phase 0: Foundations

- [ ] T300 Inventory current header/footer markup across `index.html`, `projects.html`, `about.html`, `blog.html`, and `contact.html`; document differences in `specs/003-shared-layout-consistency/research.md`.
- [ ] T301 Extract current index footer styles/utilities from `styles/tailwind.css` to confirm reuse and note any deltas needed for consistency.

---

## Phase 1: User Story 1 – Stay Oriented Across the Cosmos (Priority: P1)

**Goal**: Deliver a shared header partial ensuring identical navigation and skip link across all pages.  
**Independent Test**: Load every page at 1280px and 360px, tab from skip link through nav to main content; confirm `aria-current` on active link.

- [ ] T310 [US1] Create `partials/header.html` with skip link, brand link, and full nav list mirroring `index.html`.  
- [ ] T311 [US1] Update each page (`index.html`, `projects.html`, `about.html`, `blog.html`, `contact.html`) to include the shared header markup (manual copy or include workflow).  
- [ ] T312 [US1] Ensure `styles/tailwind.css` contains shared header utility classes; add comments documenting reuse.  
- [ ] T313 [US1] Validate keyboard order and focus states post-refactor; log results in quickstart.

---

## Phase 2: User Story 2 – Harmonized Cosmic Footer (Priority: P1)

**Goal**: Reuse the `index.html` footer everywhere via shared partial and align styling.  
**Independent Test**: Scroll to footer on each page; confirm HTML structure matches `index.html` and links remain accessible.

- [ ] T320 [US2] Build `partials/footer.html` with console-block footer markup from `index.html`.  
- [ ] T321 [US2] Replace existing footers in all pages with the shared footer partial/content.  
- [ ] T322 [US2] Double-check focus outlines & contrast for footer links; adjust `styles/tailwind.css` if needed.  
- [ ] T323 [US2] Update `specs/003-shared-layout-consistency/quickstart.md` with QA notes on footer consistency.

---

## Phase 3: User Story 3 – Centralize Contact Handles (Priority: P1)

**Goal**: Create a config file powering GitHub, LinkedIn, and email links used by header/footer.  
**Independent Test**: Change config values and confirm links update across pages.

- [ ] T330 [US3] Author `config/links.json` (or `.js`) with canonical `github`, `linkedin`, `email`.  
- [ ] T331 [US3] Update header/footer markup to consume config values (via templating or injection script in `scripts/main.js`).  
- [ ] T332 [US3] Document update procedure in `specs/003-shared-layout-consistency/quickstart.md`.  
- [ ] T333 [US3] Smoke-test with alternate URLs to ensure propagation.

---

## Phase 4: User Story 4 – Contain the About Log (Priority: P2)

**Goal**: Align `about.html` with standard container widths.  
**Independent Test**: At 1440px width, confirm main content uses `max-w-6xl mx-auto px-6` (or equivalent) and text remains legible.

- [ ] T340 [US4] Wrap About content in shared container classes; adjust section spacing as needed.  
- [ ] T341 [US4] Verify responsiveness (320px & 1280px) and reduced-motion compliance; note findings in quickstart.

---

## Phase 5: Polish & QA

- [ ] T350 Run cross-page accessibility sweep (keyboard traversal, skip link, footer links) and reduced-motion toggle; record results.  
- [ ] T351 Update global documentation (`specs/003-shared-layout-consistency/quickstart.md` + top-level README if link config instructions needed).  
- [ ] T352 Ensure `config/links.json` excluded from versioned secrets (.env unaffected) and add any necessary comments for maintainers.
