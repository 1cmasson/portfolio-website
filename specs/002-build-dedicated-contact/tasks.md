# Tasks: Email-First Contact Console & Sanity CMS Scaffold

**Input**: `/specs/002-build-dedicated-contact/plan.md`, `/specs/002-build-dedicated-contact/spec.md`  
**Prerequisites**: plan.md (required), spec.md (required), “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf” reference

**Tests**: Manual QA (keyboard navigation, screen reader spot check, reduced-motion), mailto CTA launch, clipboard fallback (JS on/off), Sanity published-post fetch verification.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Safe to run in parallel when touching distinct files.  
- **[Story]**: Maps to user stories (US1, US2, US3).  
- Every description includes explicit file paths or documentation targets.

---

## Phase 0: Foundations (must complete before user stories)

- [ ] T200 Audit and remove legacy Netlify form references from `README.md`, `contact.html`, `styles/tailwind.css`, `scripts/main.js`, ensuring navigation/skip-links remain intact.  
- [ ] T201 Confirm `contact.html` scaffold keeps header/footer parity with other pages and restore baseline console copy before CTA implementation.  
- [ ] T202 Verify Sanity env placeholders in `.env.example` and CMS helper scaffolding remain accurate after contact refactor.  

---

## Phase 1: User Story 1 – Launch a Contact Transmission (Priority: P1)

**Goal**: Deliver an email-first contact console with a prominent `mailto:` CTA that respects accessibility and reduced-motion preferences.

- [ ] T210 [US1] Replace the Netlify form in `contact.html` with hero copy, visible email address, primary mailto CTA, and descriptive instructions.  
- [ ] T211 [US1] Style CTA, address pill, and supporting console copy in `styles/tailwind.css`, ensuring focus outlines and hover states remain within constitution palettes.  
- [ ] T212 [US1] Implement JavaScript enhancement in `scripts/main.js` to handle mailto focus management and prefilled subject/body text without breaking when scripts are disabled.  
- [ ] T213 [US1] Verify skip link target, keyboard flow, and reduced-motion behaviour on `contact.html`; document observations in `specs/002-build-dedicated-contact/quickstart.md`.  

---

## Phase 2: User Story 2 – Share Contact Details Without a Form (Priority: P1)

**Goal**: Provide clipboard assistance and alternate channel guidance so visitors can reach out even without a default mail client.

- [ ] T220 [US2] Add copy-to-clipboard support in `scripts/main.js` with `aria-live` messaging and progressive enhancement fallbacks for unsupported browsers.  
- [ ] T221 [P] [US2] Surface copy status + helpful messaging in `contact.html` and companion styles (`styles/tailwind.css`) without introducing motion that violates reduced-motion preferences.  
- [ ] T222 [US2] Update README and quickstart docs (`README.md`, `specs/002-build-dedicated-contact/quickstart.md`) with the new email workflow, clipboard fallback notes, and manual copy instructions for no-JS scenarios.  

---

## Phase 3: User Story 3 – Explore Sanity-Powered Blog Entries (Priority: P2)

**Goal**: Render published Sanity posts on `blog.html` when credentials exist, otherwise show an empty state.

- [ ] T230 [US3] Implement Sanity dataset schemas outline and GROQ query summary in `/specs/002-build-dedicated-contact/research.md`, referencing the provided PDF.  
- [ ] T231 [US3] Complete `scripts/cms/sanity-client.js` to fetch published posts via Content Lake CDN, normalize data, and gate drafts.  
- [ ] T232 [P] [US3] Build blog landing markup in `blog.html` (hero, post list, empty state) matching terminal aesthetics.  
- [ ] T233 [US3] Add rendering logic (inline `<script type="module">`) to consume `fetchSanityPosts()` and populate DOM with accessible cards.  
- [ ] T234 [US3] Update `styles/tailwind.css` with blog-specific utilities (post card layout, empty-state styling) while respecting reduced motion and focus outlines.  

---

## Phase 4: Polish & QA

- [ ] T240 Run full-site keyboard + reduced-motion QA across `index.html`, `about.html`, `projects.html`, `contact.html`, and `blog.html`; log outcomes in `quickstart.md`.  
- [ ] T241 Execute Lighthouse (mobile) on contact and blog pages; confirm performance ≥ 90 and document results in `quickstart.md`.  
- [ ] T242 Capture screenshots/GIFs of new pages for future documentation and store under `assets/images/`.  

---

## Dependencies & Parallelism

- Phase 0 tasks remove legacy Netlify assumptions and ensure scaffolds stay aligned with the constitution.  
- Phase 1 focuses on the mailto CTA experience; complete before clipboard enhancements so base markup is stable.  
- Phase 2 builds on Phase 1 and leans on progressive enhancement; tasks marked `[P]` can run concurrently once CTA markup is in place.  
- Phase 3 (blog) remains independent but depends on the shared styles staying consistent.  
- Phase 4 QA waits until all user stories are implemented.  
