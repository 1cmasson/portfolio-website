# Feature Specification: Dedicated Contact Page (Email CTA) & Markdown Content Engine

**Feature Branch**: `002-build-dedicated-contact`  
**Created**: 2025-10-31  
**Status**: Draft (Revised 2025-11-02)  
**Input**: "Redesign the dedicated contact page so it no longer uses Netlify Forms. Instead, provide a first-class email call-to-action that launches the visitor's mail client (mailto) and a secondary way to copy the address if they prefer webmail. Keep the cosmic terminal aesthetic, preserve accessibility affordances (skip link, focus states), and make sure reduced-motion users are not forced into animations. Update navigation/footer links if needed." "Replace the Sanity CMS plan with a lightweight markdown content engine. Store project spotlights and blog posts as Markdown files inside the repository, render them into HTML at runtime (or during build-free load) with accessible article templates, and eliminate all third-party dependencies so the site remains a clean static experience."

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

### User Story 3 - Read Markdown-Powered Project Spotlights (Priority: P2)

A visitor navigates to the Projects page and opens a project detail card. The site loads the associated Markdown file from the local repository, renders it inside an article layout, and preserves the cosmic terminal styling without relying on external services.

**Why this priority**: Markdown keeps the site owner in full control, avoids vendor lock-in, and aligns with the static, terminal-first constitution while enabling richer long-form write-ups.

**Independent Test**: Add two sample Markdown files under `content/projects/`. From desktop (≥1280px) and mobile (360px), open each project article, confirm headings, metadata, and body copy render with accessible semantics, and verify keyboard navigation stays intact.

**Acceptance Scenarios**:

1. **Given** a Markdown file stored under `content/projects/`, **When** the visitor opens its permalink, **Then** the page renders the title, summary, metadata (e.g., tech stack, launch date), and body content in a styled `<article>` without layout shift.
2. **Given** the visitor disables JavaScript, **When** the project page loads, **Then** the Markdown is still transformed into HTML via a no-build fallback (pre-rendered or serverless-free technique such as embedding a `<template>` with preprocessed HTML) so the content remains readable.

---

### User Story 4 - Explore Markdown Blog Entries (Priority: P2)

A visitor lands on the Blog page. The page lists locally stored Markdown posts in reverse chronological order. Selecting a post loads the HTML-rendered article with proper headings, code blocks, and navigation back to the index.

**Why this priority**: Migrating to Markdown eliminates third-party costs and keeps the blog portable while aligning with the constitution’s simplicity and accessibility gates.

**Independent Test**: Create at least two Markdown posts under `content/blog/`. Load `blog.html` to confirm the index lists each post with title, publish date, and a short excerpt. Open a post detail page to ensure headings, paragraphs, links, and code blocks render as expected.

**Acceptance Scenarios**:

1. **Given** Markdown files with frontmatter metadata (title, date, tags), **When** the blog index loads, **Then** it lists posts sorted by date with accessible links to each article and no console errors.
2. **Given** a blog Markdown file containing headings, inline code, and links, **When** the detail page renders, **Then** the semantic structure maps correctly to HTML elements (`<h1>`, `<h2>`, `<p>`, `<code>`, `<a>`) while maintaining the terminal aesthetic and reduced-motion respect.

### Edge Cases

- Visitors without a default mail client must still be able to copy the address and read instructions without scripts.  
- Markdown parsing must handle unknown elements gracefully; unsupported syntax should degrade to plain text without breaking layout.  
- Cached Markdown should refresh when files change (e.g., cache-busting query params or file hashes) to avoid stale content.
