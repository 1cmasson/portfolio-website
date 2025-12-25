---
title: Plotting the Markdown Orbit
date: 2025-03-08
tags:
  - markdown
  - accessibility
  - tooling
summary: How we swapped Sanity for local Markdown while keeping the cosmic terminal vibe intact.
---

# Why Markdown, Why Now?

Switching to repository-first Markdown keeps the whole site portable. Contributors can open a pull request, preview locally, and launch without waiting on external dashboards.

## Guardrails We Needed

1. **Sanitization** — The parser strips unexpected HTML while preserving safe emphasis and code blocks.
2. **No-JS fallback** — Each article ships with a pre-rendered `<template>` so readers without scripts still get the full story.
3. **Clipboard harmony** — We confirmed clipboard helpers ignore Markdown rendering to avoid odd focus jumps.

```bash
# Render a local markdown file for preflight QA
node scripts/content/markdown.js content/blog/2025-03-08-markdown-orbit.md
```

### Final Transmission

Markdown keeps our constellation simple. Pair it with Playwright keyboard flows and the terminal aesthetic stays razor sharp.
