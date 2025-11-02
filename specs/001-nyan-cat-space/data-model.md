# Information Architecture: Nyan Cat Space Site

## Page Modules

### Home (`index.html`)
- **Hero Console**
  - `heading`: string (max 60 chars)
  - `subheading`: string (max 120 chars)
  - `ctaLinks`: array of { `label`, `href`, `ariaLabel` }
- **Intro Crawl**
  - `title`: string
  - `body`: multi-line string
  - `disclaimer`: optional string for pause instructions
- **Nyan Cat Animation**
  - `spritePath`: asset reference
  - `altText`: string describing animation

### About (`about.html`)
- **Profile Log**
  - `summary`: paragraph string
  - `timeline`: ordered list of { `year`, `highlight` }
  - `skills`: array of { `category`, `items[]` }
- **ASCII Visuals**
  - `art`: preformatted text block
  - `ariaLabel`: string

### Projects (`projects.html`)
- **Planet Cards**
  - `emoji`: string (single Unicode emoji or ASCII)
  - `title`: string
  - `description`: string (≤ 140 chars)
  - `link`: optional { `href`, `label` }
  - `accessibilityNote`: optional string for screen readers

## Global Elements

- **Navigation**
  - `logoText`: string (e.g., `nyan@space:~$`)
  - `links`: array of { `label`, `href`, `ariaLabel` }
- **Footer**
  - `credits`: string with HTML-safe emphasis
  - `socialLinks`: optional array of { `platform`, `href`, `ariaLabel` }
- **Motion Preferences**
  - `prefersReducedMotion`: boolean (from media query)
  - `manualOverride`: enum (`auto`, `reduced`, `animated`)

## Accessibility Contracts

- Every animated element MUST expose `aria-label` or `aria-describedby` explaining its behavior.
- Focus order follows visual order using natural DOM flow; avoid tabindex > 0.
- Planet cards use `<article>` with nested `<h3>` for screen reader navigation.
