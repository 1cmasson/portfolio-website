<!--
Sync Impact Report
Version change: 0.0.0 → 1.0.0
Modified principles: n/a (initial publication)
Added sections: Core Principles; Cosmic Experience Guardrails; Delivery Workflow & Compliance
Removed sections: none
Templates requiring updates:
 - ✅ .specify/templates/plan-template.md
 - ✅ .specify/templates/spec-template.md
 - ✅ .specify/templates/tasks-template.md
Follow-up TODOs: none
-->

# Nyan Cat Space Constitution

## Core Principles

### I. Terminal Fidelity
All experiences MUST read as a retro terminal drifting through space: pure black backgrounds, neon terminal palette dominated by cosmic greens, and monospace typography end to end. Layouts rely on CSS utility classes (Tailwind) to express grid or flex structure while preserving left-aligned content blocks and readable line lengths.

### II. Cosmic Performance & Simplicity
Ship pages as static HTML with Tailwind CSS and minimal vanilla JavaScript. Performance budgets cap any single animation asset at 200KB, favor CSS keyframes over JS, and block the introduction of build tools or third-party frameworks. Every feature must degrade gracefully when animations are disabled or JS fails.

### III. Universal Accessibility
Meet or exceed WCAG 2.1 AA: provide descriptive alt text, semantic landmarks, skip links, keyboard focus outlines, and ARIA labels for non-text UI. Ensure all interactive states remain legible against the dark palette and the experience remains navigable with reduced motion enabled.

### IV. Playful Animation Discipline
Animations must feel joyful yet unobtrusive: rely on CSS keyframes, throttle to 60fps or less, and respect `prefers-reduced-motion` by offering static fallbacks. Looped sequences (e.g., Nyan Cat fly-by, starfield) must avoid blocking input or obscuring content and terminate or pause when they would hinder reading.

### V. Narrative & Content Clarity
Every section carries a clear story beat: introduce the cosmic persona, professional history, and experiments without fluff. Copy stays concise, approachable, and aligned with the hacker-in-space voice. Navigation must make discovery of About and Projects obvious on both mobile and desktop.

## Cosmic Experience Guardrails

- Technology stack is limited to static HTML, Tailwind CSS, and lightweight vanilla JavaScript housed in `scripts/main.js`.
- Visuals anchor in a dark starfield with occasional cosmic accents (moons, planets, ASCII art) rendered via CSS or inline SVG with accessible descriptions.
- Maintain responsive layouts that scale from small screens upward, preserving readability, touch targets, and scroll-snap behaviors for each major section.

## Delivery Workflow & Compliance

- All work begins with `/speckit.specify` and `/speckit.plan` to capture intent, audience journeys, and implementation details before coding.
- `/speckit.tasks` outputs must map directly to user stories and cite the exact HTML, CSS, or JS files they touch; tasks remain independently demoable.
- Reviews verify that principles are satisfied: terminal aesthetic, accessibility requirements, performance budgets, and animation constraints.
- Before closing a task, developers run manual accessibility sweeps (keyboard-only, contrast spot checks, reduced-motion) and document results in task notes.

## Governance

This constitution governs every change to Nyan Cat Space. Amendments require agreement between product owner and implementer, validation against accessibility and performance targets, and an updated spec-kit run (plan → tasks) reflecting the new direction. Record each amendment in git history alongside the updated version string. Compliance reviews happen at the end of every feature cycle; non-compliance halts deployment until resolved.

**Version**: 1.0.0 | **Ratified**: 2025-10-31 | **Last Amended**: 2025-10-31
