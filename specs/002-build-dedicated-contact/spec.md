# Feature Specification: Dedicated Contact Page (Email CTA) & Sanity CMS Scaffold

**Feature Branch**: `002-build-dedicated-contact`  
**Created**: 2025-10-31  
**Status**: Draft (Revised 2025-11-02)  
**Input**: "Redesign the dedicated contact page so it no longer uses Netlify Forms. Instead, provide a first-class email call-to-action that launches the visitor's mail client (mailto) and a secondary way to copy the address if they prefer webmail. Keep the cosmic terminal aesthetic, preserve accessibility affordances (skip link, focus states), and make sure reduced-motion users are not forced into animations. Update navigation/footer links if needed." "In the same feature, scaffold a future-proof blog powered by Sanity.io as a headless CMS: outline required datasets and schemas for blog posts, add configuration placeholders (env vars, JS client shim) in the repo, and add a blog landing page that can render Sanity content when credentials are present while showing an empty state otherwise."

## User Scenarios & Testing *(mandatory)*

Prioritize user stories that deliver independent slices of the cosmic terminal experience. Each story must be demoable on its own and reference the constitution.

### User Story 1 - Launch a Contact Transmission (Priority: P1)

A visitor taps “contact” in the navigation from any page, lands on the dedicated console, and immediately sees the owner’s email address with a clear call-to-action button that opens their default mail client (`mailto:`). The layout keeps the terminal styling, surfaces supporting copy, and honours reduced-motion preferences.

**Why this priority**: Direct contact remains the primary conversion path; offering a frictionless email launch respects the constitution’s accessibility and simplicity principles while removing the maintenance and cost overhead of hosted forms.

**Independent Test**: On desktop (≥1280px) and mobile (360px), use the skip link to reach primary content, tab to the “Send Email” CTA, activate it, and verify the browser attempts to open an email draft addressed to the owner with prefilled subject/body hints.

**Acceptance Scenarios**:

1. **Given** the contact page is loaded, **When** the visitor activates the primary CTA, **Then** a `mailto:carlos@…` link opens the default mail client (or prompts for a handler) with subject/body hints while the page retains focus outlines and does not shift layout.
2. **Given** the visitor browses with reduced motion enabled, **When** they interact with the CTA, **Then** there are no forced animations and the button retains high-contrast focus outlines consistent with the terminal theme.

---

### User Story 2 - Share Contact Details Without a Form (Priority: P1)

The maintainer provides alternative contact info (email, optional socials) and guidance on how to reach out, ensuring the CTA is accessible even for assistive technologies and visitors without mail clients.

**Why this priority**: Without a hosted form, documentation and inline instructions become the safety net for all users to reach out, supporting the constitution’s narrative clarity gate.

**Independent Test**: With JavaScript enabled and disabled, tab through the contact console, activate the “Copy address” helper, confirm the `aria-live` region announces success, and ensure the plain text address remains selectable when scripts are off.

**Acceptance Scenarios**:

1. **Given** the contact console instructions, **When** the visitor chooses “Copy email,” **Then** the address is copied to the clipboard (when supported) and an inline status message announces completion without disruptive animation.
2. **Given** JavaScript is disabled or the clipboard API is unavailable, **When** the visitor reads the contact console, **Then** the email address remains visible as selectable text with a keyboard-focusable element to support manual copy.

---

### User Story 3 - Explore Sanity-Powered Blog Entries (Priority: P2)

A visitor opens the new Blog page. If Sanity credentials exist, the page fetches published posts and renders them in the retro console motif; otherwise, it displays an informative empty state with a prompt to check back soon.

**Why this priority**: Establishing a CMS integration now unblocks future content updates while keeping the static site lean, aligning with scalability principles.

**Independent Test**: Populate environment variables with sample Sanity credentials (matching the PDF reference workflow), reload the blog page to verify published posts render in reverse chronological order, then remove credentials and confirm the empty state remains accessible.

**Acceptance Scenarios**:

1. **Given** valid Sanity configuration values, **When** the blog page initializes, **Then** it fetches published posts via the Sanity Content Lake CDN and displays title, published date, and excerpt for each entry.
2. **Given** missing or invalid credentials, **When** the page attempts to fetch posts, **Then** it surfaces an aria-live warning and keeps the layout stable with placeholder copy.

### Edge Cases

- Visitors without a default mail client must still be able to copy the address and read instructions without scripts.  
- `prefers-reduced-motion` avoids animated focus rings or status banners; any shimmer/pulse must be disabled when motion is reduced.  
- Sanity fetch errors (network offline, 401) are caught and reported without breaking the rest of the page.
