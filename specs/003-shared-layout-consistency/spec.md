# Feature Specification: Unified Navigation & Link Configuration

**Feature Branch**: `003-shared-layout-consistency`  
**Created**: 2025-11-05  
**Status**: Draft  
**Input**: "Ensure the header and footer are standardized across every page so no navigation items disappear. Mirror the footer styling from `index.html` everywhere. Contain the About page within the same max-width layout as other pages. Provide a centralized place to configure GitHub, LinkedIn, and email links."

## User Scenarios & Testing *(mandatory)*

Prioritize user stories that deliver independent slices of the cosmic terminal experience. Each story must be demoable on its own and reference the constitution.

### User Story 1 - Stay Oriented Across the Cosmos (Priority: P1)

A visitor clicks between Home, Projects, About, Blog, and Contact. Each page renders an identical terminal-styled header with full navigation items, focus outlines, and skip link. The header is sourced from a shared partial to prevent drift.

**Why this priority**: Missing navigation breaks Principle V (Narrative & Content Clarity) and Principle III (Universal Accessibility). A shared component keeps the experience consistent and keyboard friendly.

**Independent Test**: Load every HTML page (Home, About, Projects, Blog, Contact) at 1280px and 360px widths. Tab through skip link → nav menu → main content to confirm focus order, and verify all five menu items appear with `aria-current` on the active page.

**Acceptance Scenarios**:

1. **Given** any portfolio page is loaded, **When** the visitor inspects the header, **Then** the skip link and the full nav list (Home, About, Projects, Blog, Contact) appear with consistent styling and keyboard focus states.
2. **Given** the maintainer updates navigation copy or URLs in the shared partial, **When** any page is reloaded, **Then** the header reflects the change without having to edit per-page markup.

---

### User Story 2 - Harmonized Cosmic Footer (Priority: P1)

A visitor scrolls to the footer on any page and encounters the same console-block footer as `index.html`, including contact blurb, social links, and secondary navigation, all managed from a shared partial.

**Why this priority**: Consistency reinforces Principle I (Terminal Fidelity) and Principle V by keeping context cues identical. Centralizing markup honors Principle II by reducing maintenance overhead.

**Independent Test**: Compare the footer on each page at 1280px and 360px widths; they should match the index footer visually and semantically (landmarks, links, focus order).

**Acceptance Scenarios**:

1. **Given** any page footer renders, **When** keyboard focus reaches the footer links, **Then** they mirror the `index.html` styling, order, and accessible labels.
2. **Given** the maintainer tweaks footer copy in the shared partial, **When** all pages reload, **Then** the change propagates without manual duplication.

---

### User Story 3 - Centralize Contact Handles (Priority: P1)

The maintainer edits a single configuration file to update GitHub, LinkedIn, and email addresses. Header and footer links automatically consume this data, preventing mismatches.

**Why this priority**: Central configuration aligns with Principle II (Cosmic Performance & Simplicity) by eliminating divergent hardcoded URLs and supports Principle V by keeping contact info accurate.

**Independent Test**: Update the config file with placeholder URLs/email, reload pages, and confirm header/footer links reflect the new values without altering HTML files.

**Acceptance Scenarios**:

1. **Given** the config file defines `github`, `linkedin`, and `email`, **When** the site loads, **Then** header/footer links use those values and surface ARIA labels as before.
2. **Given** the config changes, **When** the build runs or pages reload, **Then** the updated links appear everywhere with no stale references.

---

### User Story 4 - Contain the About Log (Priority: P2)

Visitors viewing `about.html` see the main content constrained to the same max-width container used elsewhere, preserving readability on large displays while keeping responsive behavior intact.

**Why this priority**: Principle I and III demand readable line lengths and consistent layout. A contained About page prevents overwhelming text spans on desktop.

**Independent Test**: Resize the About page between 320px and 1440px. Confirm the main narrative sits within the shared container, aligns with other pages, and retains the terminal aesthetic.

**Acceptance Scenarios**:

1. **Given** the About page loads on a wide viewport, **When** the visitor reads the main content, **Then** line lengths match the site’s standard max width and do not exceed 75 characters per line.
2. **Given** reduced-motion is enabled, **When** the About page renders, **Then** the contained layout continues to display without triggering new animations.

### Edge Cases

- Shared partials must fall back gracefully if JavaScript fails (static HTML output remains valid).  
- Config file changes should not require bundlers; use JSON or JS consumed directly by existing scripts.  
- Ensure skip links, `aria-current`, and footer link focus outlines persist across reduced-motion and no-JS scenarios.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-301**: Introduce shared header and footer partials (or includes) that render identically across all static pages.  
- **FR-302**: Maintain terminal-themed styling (dark background, neon text, monospace) for the shared components with consistent focus states.  
- **FR-303**: Provide a central configuration file (JSON or JS module) exposing `github`, `linkedin`, and `email` references, consumed by header/footer markup.  
- **FR-304**: Update `about.html` layout to reuse the standard max-width container class stack (`max-w-6xl mx-auto px-6` + responsive paddings).  
- **FR-305**: Preserve accessibility affordances (skip link, ARIA labels, `aria-current`) before and after refactor.

### Content Modules

- **Global Header**: Skip link, nav list with cosmic hover transitions, `nyan@space:~$` brand link.  
- **Global Footer**: Contact blurb, social links driven by config, secondary nav list, cosmic border treatment.  
- **Link Config**: Lightweight JSON/JS object storing canonical URLs and email.  
- **About Container**: Terminal log content wrapped in shared container classes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-301**: Header/nav structure is identical (validated via HTML diff) across all top-level pages.  
- **SC-302**: Footer markup matches `index.html` across pages with zero accessibility regressions (axe/keyboard sweep).  
- **SC-303**: Updating the config file alone is sufficient to change GitHub/LinkedIn/email in both header and footer.  
- **SC-304**: About page content respects max-width container with line length ≤ ~75 characters at ≥1280px viewport.  
- **SC-305**: Manual reduced-motion check confirms no new animations introduced during refactor.
