---
version: 2.0.0
name: Roots_Bloom-Design-Architecture
description: The complete modern design system for Roots_Bloom. Warm botanical aesthetic with modern responsive cards, soft elegant shadows, dignified serif headlines, and vibrant e-commerce accents.
---

# Roots_Bloom Design Architecture (DESIGN.md)

## 1. Design Philosophy
- **Artisan Materiality:** Warm botanical aesthetic inspired by living greenery, terracotta earthenware, and clean modern card design.
- **Modern Legibility:** Clear typographic hierarchy using Roman display serif for emotional headlines and clean geometric sans (`Plus Jakarta Sans`) for seamless browsing and high conversion.
- **Conversion-Focused Interactions:** Frictionless 1-click cart, clean intuitive login flows, and transparent pricing.

## 2. Color System Tokens

```css
:root {
  /* Paper & Surfaces */
  --color-paper: #FAF7F2;              /* Warm oat background */
  --color-paper-warm: #F4EFE6;         /* Slightly deeper linen ground */
  --color-surface-card: #FFFFFF;       /* Crisp card stock */
  --color-surface-card-subtle: #F9F7F3;/* Secondary card surface */

  /* Ink & Typography */
  --color-ink: #162B20;                /* Deep botanical near-black ink */
  --color-ink-secondary: #35493C;      /* Earthy slate body text */
  --color-muted: #5E7264;              /* Soft moss muted text */
  --color-muted-light: #8A9D90;        /* Subtle labels */

  /* Brand Accents */
  --color-brand-forest: #22533C;       /* Primary botanical green */
  --color-brand-forest-hover: #1A402E; /* Deep forest hover */
  --color-brand-forest-subtle: #EBF2EC;/* Pale moss wash */
  --color-accent-clay: #C85A32;        /* Warm terracotta / burnt clay CTA */
  --color-accent-clay-hover: #B24D28;  /* Terracotta hover */
  --color-accent-clay-subtle: #FDF1EB; /* Warm clay tint */

  /* Hairlines & Borders */
  --color-rule: #E2E8DE;               /* 1px organic hairline */
  --color-rule-strong: #C9D4C3;        /* Active / focused hairline */

  /* Utility / Badges */
  --color-marigold: #D9822B;           /* Auspicious gold/amber badge */
  --color-success: #2E7D32;            /* Fresh green for guarantee & verified */
}
```
