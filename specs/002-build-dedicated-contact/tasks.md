# Tasks: Dedicated Contact Page & Sanity CMS Scaffold

**Input**: `/specs/002-build-dedicated-contact/plan.md`, `/specs/002-build-dedicated-contact/spec.md`  
**Prerequisites**: plan.md (required), spec.md (required), “Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf” reference

**Tests**: Manual QA (keyboard navigation, screen reader spot check, reduced-motion), Netlify form submission test, Sanity published-post fetch verification.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Safe to run in parallel when touching distinct files.  
- **[Story]**: Maps to user stories (US1, US2, US3).  
- Every description includes explicit file paths or documentation targets.

---

## Phase 0: Foundations (must complete before user stories)

- [ ] T200 Align global navigation/footer to new routes in `index.html`, `about.html`, `projects.html`, ensuring skip-link target still points to `#main-content`.  
- [ ] T201 Create `contact.html` and `blog.html` scaffolds with base layout matching existing terminal aesthetic (header, skip link, main landmark).  
- [ ] T202 Add Sanity environment placeholders to `.env.example` (or create one) and document variable purpose in `README.md`.  
- [ ] T203 Create `scripts/cms/sanity-client.js` stub reading env vars and exporting placeholder `fetchSanityPosts()` to unblock later tasks.

---

## Phase 1: User Story 1 – Send a Contact Transmission (Priority: P1)

**Goal**: Deliver dedicated Netlify-enabled contact form with inline success/error feedback and resilient fallbacks.  
**Independent Test**: From desktop and mobile breakpoints, navigate via keyboard to `contact.html`, submit valid/invalid entries, and observe inline `aria-live` responses with `prefers-reduced-motion` toggled.

- [ ] T210 [US1] Implement contact hero copy, form fields (name, email, message, optional phone), honeypot, and Netlify attributes inside `contact.html`.  
- [ ] T211 [P] [US1] Style form using Tailwind utilities in `styles/tailwind.css`, including inline success/error banner variants that honour reduced-motion.  
- [ ] T212 [US1] Add lightweight JS enhancement in `scripts/main.js` (or dedicated module) to intercept submission, show inline success, and gracefully fall back when JS disabled.  
- [ ] T213 [US1] Verify accessibility: ensure labels/aria connections, tab order, focus outlines, and update `/specs/002-build-dedicated-contact/quickstart.md` with QA notes.

---

## Phase 2: User Story 2 – Verify Email Delivery Settings (Priority: P1)

**Goal**: Document Netlify notification workflow and confirm spam protection.  
**Independent Test**: Trigger a real or test submission via Netlify dashboard or curl, confirm notification receipt, and simulate spam via honeypot.

- [ ] T220 [US2] Extend `README.md` with Netlify form setup instructions (notifications, spam filtering, testing commands) referencing the PDF guidance.  
- [ ] T221 [US2] Add fallback thank-you copy for non-JS submissions in `contact.html` and confirm Netlify default response path.  
- [ ] T222 [US2] Document spam test procedure and results in `/specs/002-build-dedicated-contact/research.md` or quickstart file.

---

## Phase 3: User Story 3 – Explore Sanity-Powered Blog Entries (Priority: P2)

**Goal**: Render published Sanity posts on `blog.html` when credentials exist, otherwise show an empty state.  
**Independent Test**: Load `blog.html` with sample published entries (using real credentials or mocked fetch) and without credentials to confirm empty state messaging.

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

- Phase 0 tasks unblock navigation consistency and file scaffolds; complete before touching user stories.  
- Phase 1 (US1) and Phase 2 (US2) are both priority; US2 depends on the form being functional, so finish T210–T213 before T220–T222.  
- Phase 3 (US3) can begin once scaffolds exist (Phase 0) but requires Sanity client (T231) before DOM rendering (T233). Tasks marked `[P]` may run in parallel when modifying distinct files.  
- Phase 4 QA waits until all user stories are implemented.
