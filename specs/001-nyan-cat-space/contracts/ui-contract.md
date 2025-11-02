# UI Contract: Cosmic Planet Cards

- **Component**: `.planet-card`
- **Location**: `projects.html`

## Structure
```html
<article class="planet-card" aria-label="Project: [Title]">
  <header>
    <span class="planet-emoji" aria-hidden="true">🪐</span>
    <h3>[Title]</h3>
  </header>
  <p>[Description]</p>
  <a href="[Link]" class="planet-link" aria-label="Open [Title] project" target="_blank" rel="noopener">View mission log</a>
</article>
```

## Styling Requirements
- Glassy surface using `backdrop-filter` with 0.8 opacity fallback for browsers without support.
- Border color uses neon green `#7CFC00` at 60% opacity.
- Hover/focus state increases scale to 1.03, adds glow shadow, and ensures focus outline is visible (`outline-offset: 4px`).

## Animation Contract
- Idle shimmer uses CSS keyframes (`planet-orbit`) with 12s duration, easing `ease-in-out`, triggered only when `prefers-reduced-motion` is `no-preference`.
- On reduced motion, shimmer is disabled and replaced with subtle color shift (transition 400ms).

## Accessibility Requirements
- `aria-label` describes project name; if link omitted, ensure paragraph describes call to action.
- Focus order follows DOM order; no custom tabindex.
- Emoji must be `aria-hidden="true"` with descriptive text in `aria-label`.
