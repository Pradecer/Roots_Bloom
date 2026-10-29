---
version: 1.0.0
name: Roots_Bloom-Artisan-Design-Architecture
description: The complete design system and architectural specification for Roots_Bloom. Built upon the principles of Impeccable, Hallmark (Garden & Bloom themes), and Awesome-Design-MD. Replaces generic AI SaaS templates with a warm oat paper ground, deep forest green ink, warm terracotta accents, Roman serif display typography, and tactile hairline borders.
---

# Roots_Bloom Design Architecture (DESIGN.md)

## 1. Design Philosophy
- **Artisan Materiality:** The interface is built on warm oat paper (`#FAF7F2`), deep botanical forest green ink (`#162B20`), and terracotta burnt clay (`#C85A32`).
- **No AI Slop Tells:**
  - ❌ No generic cold grey (#F8F9FA) backgrounds.
  - ❌ No single font (Inter) for everything.
  - ❌ No cards nested inside cards with muddy drop-shadows.
  - ❌ No generic centered eyebrows with round icon tiles.
  - ❌ No blue-to-purple SaaS gradient blobs.
  - ✅ Dignified display serif headlines with sentence case.
  - ✅ Fine 1px organic hairline borders (`#E0E7DC`).
  - ✅ High-contrast tabular lining numerals for Indian rupee pricing (`₹1,499`).
  - ✅ Tactile, responsive microinteractions with silent confirmations.

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
  --color-success: #2B6E3F;
  --color-success-bg: #EDF7F0;
  --color-star: #D97706;               /* Warm amber review star */

  /* Geometry & Radius */
  --radius-sm: 4px;                    /* Architectural cards & buttons */
  --radius-md: 6px;                    /* Structural containers */
  --radius-pill: 999px;                /* Filter chips & badges */

  /* Shadows — Minimalist hairlines with soft contact shadow */
  --shadow-card: 0 1px 3px rgba(22, 43, 32, 0.04), 0 0 0 1px var(--color-rule);
  --shadow-card-hover: 0 4px 12px rgba(22, 43, 32, 0.08), 0 0 0 1px var(--color-rule-strong);
  --shadow-dropdown: 0 8px 24px -4px rgba(22, 43, 32, 0.12), 0 0 0 1px var(--color-rule);
}
```

## 3. Typography Architecture

- **Display & Section Titles:** `"Vollkorn", "Playfair Display", Georgia, serif`
  - Roman, sentence case, weights: 500, 600, 700.
  - Emotional, warm, evokes traditional botanical botanical journals and artisan studios.
- **Body & Controls:** `"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold).
  - Clean, open apertures, razor-sharp on mobile and desktop.
- **Hindi Typography:** `"Noto Sans Devanagari", "Plus Jakarta Sans", sans-serif`
  - Natural glyph height matching English counterparts.
- **Pricing & Numerals:**
  - `font-feature-settings: "tnum" 1, "cv01" 1;` for aligned tabular currency values.

## 4. Component Patterns

### A. Top Announcement & Navigation
- Top Bar: Deep moss green (`--color-brand-forest`) grounding the top edge with warm gold/white micro-copy.
- Main Nav: Warm oat paper background with fine hairline border (`--color-rule`), clean search bar with crisp search icon and rounded pill chips.
- Desktop Category Strip: Clean typographic links with subtle terracotta bottom indicator on active state.

### B. Hero Banner (Atmospheric Garden Stage)
- Split grid: Editorial headline + emotional subtitle on botanical canvas + studio 4K photography.
- High-contrast terracotta Action button with smooth arrow transition.

### C. Emotional Shelves (Bento Macrostructures)
- Distinct thematic shelves grouping products by emotional relevance.
- Crisp card containers with 1px hairline rules and organic hover lifts (`translateY(-2px)`).

### D. Product Cards
- Aspect Ratio: 1:1 square photo container with subtle cream underlay.
- Floating micro-wishlist button in top-right.
- Handcrafted Badge in terracotta or moss tint.
- Headline in display serif; pricing clearly showing offer price, base price, and discount percentage.
- Quick Add and One-Tap Buy buttons with clear visual hierarchy (Secondary button for Add to Cart, Primary Terracotta for Buy Now).

### E. Product Detail Page (PDP)
- Split studio view: Left gallery with photo angle switcher; right column with pricing, pincode check, story quote, specs table, botanical care guide, and customer unboxing reviews.
