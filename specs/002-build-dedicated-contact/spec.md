# Feature Specification: Dedicated Contact Page & Sanity CMS Scaffold

**Feature Branch**: `002-build-dedicated-contact`  
**Created**: 2025-10-31  
**Status**: Draft  
**Input**: "Build a dedicated contact page that uses Netlify Forms for email delivery instead of jumping to the footer. The new page needs a Netlify-enabled form (name, email, message fields, optional phone field), serverless spam protection, accessible success and error feedback, and fallbacks for users with reduced motion or no JavaScript. Update the global navigation and any footer links so Contact routes to this page, and preserve existing skip links and focus states. Document how to configure Netlify notifications so messages reach my inbox." "In the same feature, scaffold a future-proof blog powered by Sanity.io as a headless CMS: outline required datasets and schemas for blog posts, add configuration placeholders (env vars, JS client shim) in the repo, and add a blog landing page that can render Sanity content when credentials are present while showing an empty state otherwise."

## User Scenarios & Testing *(mandatory)*

Prioritize user stories that deliver independent slices of the cosmic terminal experience. Each story must be demoable on its own and reference the constitution.

### User Story 1 - Send a Contact Transmission (Priority: P1)

A visitor taps “contact” in the navigation from any page, lands on a dedicated contact console, and submits the Netlify-backed form with keyboard or touch. The page respects the terminal theme, exposes inline instructions, and honours reduced-motion preferences.

**Why this priority**: Direct contact is the primary conversion path; giving it a first-class page upholds the “terminal-first” aesthetic and accessibility principles in the constitution.

**Independent Test**: In desktop (≥1280px) and mobile (360px) viewports, tab from skip link to the Contact nav item, activate it, complete required fields, submit, and observe the `aria-live` inline success banner with `prefers-reduced-motion` both enabled and disabled.

**Acceptance Scenarios**:

1. **Given** the contact page is loaded, **When** the visitor provides valid name, email, and message and activates Submit, **Then** the request posts to Netlify Forms (hidden `form-name` present, 200 response) and an inline `aria-live` success panel appears without layout shift or redirect.
2. **Given** the form is partially completed, **When** a required field is empty or invalid, **Then** inline error copy and focus indicators announce the issue while preserving the terminal styling.

---

### User Story 2 - Verify Email Delivery Settings (Priority: P1)

The maintainer reviews the repository docs, enables Netlify email notifications, and tests spam protection without code changes. The experience remains accessible and resilient when JavaScript is disabled.

**Why this priority**: Ensures the feature actually delivers email value and documents operational steps, aligning with the “accessible, resilient defaults” principle.

**Independent Test**: With JavaScript disabled, submit the form to trigger the Netlify default thank-you fallback. Then re-enable JavaScript and confirm the honeypot blocks a bot-submission attempt.

**Acceptance Scenarios**:

1. **Given** the README instructions, **When** Netlify notifications are configured, **Then** new submissions trigger an email to the owner and appear in Netlify’s form dashboard.
2. **Given** the honeypot field, **When** an automated script populates it, **Then** the submission is rejected and the page shows an accessible error explaining the likely spam detection.

---

### User Story 3 - Explore Sanity-Powered Blog Entries (Priority: P2)

A visitor opens the new Blog page. If Sanity credentials exist, the page fetches published posts and renders them in the retro console motif; otherwise, it displays an informative empty state with a prompt to check back soon.

**Why this priority**: Establishing a CMS integration now unblocks future content updates while keeping the static site lean, aligning with scalability principles.

**Independent Test**: Populate environment variables with sample Sanity credentials (matching the PDF reference workflow), reload the blog page to verify published posts render in reverse chronological order, then remove credentials and confirm the empty state remains accessible.

**Acceptance Scenarios**:

1. **Given** valid Sanity configuration values, **When** the blog page initializes, **Then** it fetches published posts via the Sanity Content Lake CDN and displays title, published date, and excerpt for each entry.
2. **Given** missing or invalid credentials, **When** the page attempts to fetch posts, **Then** it surfaces an aria-live warning and keeps the layout stable with placeholder copy.

### Edge Cases

- Contact form submission with JavaScript disabled still reaches Netlify and shows a usable confirmation.  
- `prefers-reduced-motion` avoids animated success states or scroll effects on the contact page.  
- Sanity fetch errors (network offline, 401) are caught and reported without breaking keyboard navigation.  
- Very small viewports (<360px) display the contact intro copy and form fields without horizontal scroll.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Add `contact.html` with the terminal theme, persistent skip link target, and focus states consistent with existing pages; update global navigation and footer anchors to point to the new page.  
- **FR-002**: Implement a Netlify-enabled form (`method="POST"`, `data-netlify="true"`, hidden `input name="form-name"` value `contact`, `netlify-honeypot` field) collecting name, email, message, and optional phone number.  
- **FR-003**: Provide client-side validation for required fields with accessible error messaging (`aria-live`, `aria-describedby`), while ensuring HTML5 validation still fires when JavaScript is absent.  
- **FR-004**: Surface success and failure states inline within the contact page using progressive enhancement: JavaScript enhances the submission with fetch + JSON fallback, while the native post gracefully redirects when JS is disabled.  
- **FR-005**: Document Netlify configuration in `README.md` covering how to enable email notifications, spam filtering, and form submission testing (including curl example).  
- **FR-006**: Store form-specific CSS within Tailwind utilities or scoped classes so payload stays within the <10 KB JS budget and respects `prefers-reduced-motion`.  
- **FR-007**: Introduce `.env.example` (or update existing) with `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, and `SANITY_READ_TOKEN` placeholders plus comments explaining each.  
- **FR-008**: Create a lightweight Sanity client helper (`scripts/cms/sanity-client.js` or similar) that reads the environment variables, builds the CDN query URL restricted to published documents, and exposes `fetchSanityPosts()` returning normalized post data.  
- **FR-009**: Add `blog.html` that imports the helper via `<script type="module">`, renders fetched posts in descending `publishedAt` order, and falls back to an accessible empty-state message when no posts are available.  
- **FR-010**: Update build tooling (if any) or documentation to ensure Sanity credentials are never committed (reference `.gitignore` coverage) and add instructions for local preview using a sample dataset or mocked response.

### Content Modules

- **Contact Hero Console**: Intro copy describing how to reach Carlos, including reassurance about response time and privacy.  
- **Contact Form Grid**: Form fields arranged in a responsive two-column grid on desktop and single column on mobile, with status banner region.  
- **Spam Shield Note**: Small-print terminal output explaining the honeypot field and privacy expectations, visible but unobtrusive.  
- **Blog Landing Header**: Terminal prompt announcing the blog feed with link to RSS (placeholder) and meta info pulled from Sanity.  
- **Blog Post List**: Vertical stack of post cards showing title, published date, tags (if present), and action link to full post (external or future internal route); only published posts appear.
- **Blog Empty State**: Console-styled message encouraging visitors to check back, optionally showing steps for subscribing once posts exist.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Contact form submission produces a successful entry visible in Netlify’s dashboard and triggers an email notification to the configured address within 5 minutes while displaying the inline success banner.  
- **SC-002**: Form remains usable and visually consistent across 320px–1440px widths with no horizontal scrolling and all labels maintaining ≥4.5:1 contrast.  
- **SC-003**: With JavaScript disabled, the form still submits and the user receives a Netlify thank-you confirmation; with JavaScript enabled, the inline success banner is announced via `aria-live="polite"`.  
- **SC-004**: Automated or manual spam attempts filling the honeypot field fail silently (no Netlify submission recorded) while presenting an accessible warning to real users.  
- **SC-005**: Blog page renders at least one sample post (when credentials present) in ≤1.5 seconds on a simulated fast-3G connection; without credentials it shows the empty state without console errors.

## Assumptions & Open Questions

- Reference implementation guidance comes from `Using Sanity.io with Vanilla JavaScript for a Static Portfolio Site.pdf`; the Sanity helper will mirror the recommended fetch pattern and GROQ query structure.  
- Netlify project already exists for this repository, and the owner can enable form notifications and spam protection in the dashboard.  
- A Sanity project (e.g., dataset `production`) will be provisioned externally; credentials are supplied via environment variables at build/runtime.  
- Blog post detail pages are out of scope for this feature; links may route to Sanity studio, an external URL, or remain placeholders until future work.  
- Blog feed surfaces only documents with `published == true` (no draft previews) and uses the inline success banner for form confirmation as the final behavior (clarifications resolved).
