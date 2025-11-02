# Research: Nyan Cat Space Site

## Terminal Aesthetic Stack
- **Decision**: Use Tailwind utility classes with custom CSS variables for neon palette and monospace stack (`'Fira Code', 'Courier New', monospace`).
- **Rationale**: Tailwind keeps styling declarative and consistent with constitution, while CSS variables let us tweak glow effects globally.
- **Alternatives Considered**:
  - Inline styles → rejected to preserve maintainability and accessibility.
  - External Google Fonts → rejected to avoid extra network calls and ensure offline availability.

## Animated Starfield Implementation
- **Decision**: Implement starfield via lightweight `<canvas>` routine inside `scripts/main.js`, drawing 150 particles with requestAnimationFrame and adaptive density by viewport size.
- **Rationale**: Canvas offers smooth performance and straightforward reduced-motion handling by early exit.
- **Alternatives Considered**:
  - Pure CSS background animation → limited depth effect and harder to adjust velocities.
  - Three.js or other libraries → overkill for simple particles and violates simplicity principle.

## Nyan Cat & Planet Animations
- **Decision**: Animate Nyan Cat using CSS keyframes applied to a sprite sheet GIF, triggered on an interval with ability to pause on hover/focus; planets use CSS transform transitions triggered by scroll-snap sections.
- **Rationale**: CSS keyframes respect reduced-motion and avoid extra JS; scroll-snap keeps transitions predictable.
- **Alternatives Considered**:
  - JavaScript-driven animation loops → additional CPU overhead.
  - Lottie or video assets → heavier downloads and less customizable.

## Accessibility Safeguards
- **Decision**: Provide skip link, semantic `<main>`, `<nav>`, `<section>` landmarks, ARIA labels for animated elements, and maintain 4.5:1 contrast with neon palette. Reduced motion toggles rely on `prefers-reduced-motion` plus a manual toggle stored in `localStorage`.
- **Rationale**: Ensures compliance with constitution and WCAG AA while keeping configuration lightweight.
- **Alternatives Considered**:
  - Rely solely on CSS media query without manual toggle → less user control.
  - Screen-reader-only text for cat animation without ARIA description → insufficient context.

## Content Strategy
- **Decision**: Write copy in second person with playful cosmic tone, limit hero to ~120 words, provide 3 bullet highlights per page, and store mock project data in inline HTML lists.
- **Rationale**: Keeps narrative tight and ensures readability within terminal layout.
- **Alternatives Considered**:
  - JSON-driven content injection → unnecessary complexity for static site.
  - Long-form paragraphs → harder to scan in terminal format.
