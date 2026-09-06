# Product Requirement Document & UI/UX Specification
## Roots_Bloom — Handcrafted Miniature Gardens & Emotional Theme Planters

| | |
|---|---|
| **Document type** | PRD + UI/UX Specification |
| **Product** | **Roots_Bloom** |
| **Platform** | Responsive Web (Mobile PWA-First + Desktop 1280px Container) + Android/iOS App, India Market |
| **Design reference** | Meesho (high-density conversion architecture), Blinkit (speed & urgency cues), Amazon India (trust signals, enterprise desktop grid & discovery) |
| **Version** | 1.1 (Enterprise Production-Grade & Anti-Cartoon Edition) |
| **Status** | Approved Specification |
| **Owner** | Product Management & UI/UX Engineering |

---

## 1. Executive Summary

**Roots_Bloom** is an e-commerce platform selling handcrafted, *live* miniature tray gardens, emotion-led theme planters (Maa-Beti, Dada-Dadi), novelty/hobby planters, devotional planters, patriotic desk décor, and curated garden accessories — a catalog that balances living botanical art, plant care, and emotional gifting. Every SKU represents a relationship, milestone, or cultural sentiment. The commerce experience communicates that emotional value within the first 3 seconds of a scroll with enterprise clarity and conversion-optimized density.

This document specifies the complete V1 product: information architecture, functional requirements per module, visual design system tokens, responsive layout specifications, data models, non-functional requirements for Indian markets (low bandwidth, COD-heavy, bilingual English/Hindi), analytics instrumentation, and a phased release plan.

### Strict Anti-Cartoon & Production-Grade Directive
- **Zero Vector/Clay Illustrations:** No 3D clay graphics, hand-drawn plant doodles, cartoon characters, or playful clipart anywhere (including empty states, hero sections, and category pills).
- **Studio Product Photography:** All products are presented in clean, crisp, square (1:1 aspect ratio) containers with neutral studio backdrops.
- **Enterprise UI Radii:** Strict border-radius limit of 6px to 8px (`rounded-md` / `rounded-lg`). No oversized pill-shaped or bubble-like cards.
- **Commercial Data Density:** Standard e-commerce pricing hierarchy: `₹1,499` (Bold Dark) + `₹1,999` (Strikethrough Muted Gray) + `25% OFF` (Crisp Emerald/Forest Green Tag).
- **Hard Trust Signals:** Solid dark-green rating chips (e.g., `4.3 ★ (210)`), verified buyer badges, live pincode delivery SLAs, and unboxing trust signals.

---

## 2. Problem Statement & Opportunity

- **User Problem:** Shoppers seeking meaningful gifts for emotional milestones (Mother's Day, grandparent anniversaries, housewarmings, festivals) typically default to ephemeral cut flowers, sweets, or generic mass decor because a reliable destination for "emotionally resonant + living plants + accessible pricing + safe pan-India shipping" does not exist.
- **Market Gap:** Traditional nurseries (Ugaoo, Nurserylive) market botanical specimens rather than emotional narratives. Gifting platforms (IGP, FNP) market sentiment but lack living product longevity and authentic plant-care continuity. **Roots_Bloom** captures this nexus: living, sentiment-driven botanical gifts with long-term retention potential.
- **Business Opportunity:** Higher Average Order Value (AOV) via modular DIY kits and accessory cross-sells (₹349–₹449 add-ons against ₹699–₹1,999 hero planters) and recurring festive campaigns across India’s cultural calendar.

---

## 3. Goals & Success Metrics

### 3.1 Business Goals
1. Launch an enterprise-grade, high-density storefront converting cold social and search traffic in a single session.
2. Establish a scalable occasion/festive campaign engine mapped to Indian cultural calendar triggers.
3. Build a high-velocity referral and WhatsApp sharing engine tailored for pan-India reach (Tier 1, 2, and 3).

### 3.2 Product KPIs (V1 Targets)

| Metric | Target | Tactical Driver |
|---|---|---|
| Homepage → PDP Click-Through | ≥ 35% | High-density grid, studio imagery, clear discount math & badge visibility |
| PDP → Add-to-Cart | ≥ 18% | Emotional product storytelling, unboxing reviews, visible live-plant care promise |
| Cart → Order Completion | ≥ 55% | Pre-selected COD for relevant pincodes, frictionless single-page accordion checkout |
| Checkout Load Time (3G Network) | < 2.2s | Lightweight DOM, optimized WebP assets, no heavy cartoon libraries/bloat |
| 90-Day Repeat Purchase Rate | ≥ 12% | Lifecycle occasion triggers & plant-care check-in notifications |
| Referral Share Rate | ≥ 8% of orders | Two-sided WhatsApp share incentive |

---

## 4. Target Users & Personas

| Persona | Demographics & Context | Primary Need | Entry Point |
|---|---|---|---|
| **Gifting Priya** | 28–40, Tier 1/2 Urban | Thoughtful, aesthetic gift that looks premium upon unboxing and arrives on time | Social Ad / Search → PDP (*Maa-Beti Planter*) |
| **Plant-Parent Rohan** | 20–30, Tier 1 Hobbyist | Compact, low-maintenance, aesthetic desk décor & DIY modular accessories | Category Browse / PLP (*Novelty Planters*) |
| **Home-Maker Sunita** | 35–55, Tier 2/3 | Vastu-aligned devotional home décor, high trust, cash on delivery, Hindi copy | WhatsApp Shared Link → Home / Devotional PLP |
| **Social Sharer Anita** | 24–45, Tier 2/3 Micro-Sharer | Shares curated product catalog links with community and family groups | Referral Module / WhatsApp Catalog Share |

---

## 5. Competitive Benchmarking

| Pattern | Benchmark Source | Implementation in Roots_Bloom |
|---|---|---|
| High-Density Grid & Minimal Chrome | Meesho | 2-col mobile, 4–5 col desktop grid with compact padding |
| Universal Price Block Math | Meesho | `₹1,499` (Bold) + `₹1,999` (Strike) + `25% OFF` (Green chip) on every card |
| One-Tap "Buy Now" CTA | Meesho | Sticky PDP action that bypasses cart review directly to checkout |
| Live Order Tracker with Micro-States | Blinkit | Courier-style milestone timeline with "Being Handcrafted" status |
| Pincode Delivery SLA & COD Check | Blinkit | Real-time delivery date calculator on PDP before Add-to-Cart |
| Ratings, Verified Reviews & Trust Badges | Amazon India | Solid dark-green star chip, verified purchase pill, photo reviews |
| Desktop Filter Sidebar & Breadcrumbs | Amazon India | Sticky multi-facet sidebar on desktop view (>1024px) |
| WhatsApp Direct Catalog Sharing | Meesho | Structured link generation with thumbnail, price, and referral code |

---

## 6. Scope

### In Scope (V1)
- Guest & authenticated browsing with mobile OTP login (no mandatory email).
- Responsive Web: Mobile PWA layout + Desktop 1280px e-commerce grid.
- Core Pages: Home, Category/PLP, Search, PDP, Cart, Single-Page Accordion Checkout, Order Tracking, Wishlist, Verified Reviews (with photo upload), Account, Address Book, Referral Share Hub.
- Payment Methods: Cash on Delivery (COD), UPI (Intent + QR), Credit/Debit Cards, Net Banking, Wallets.
- Bilingual Support: English and Hindi toggle with persistent user preference.
- Notifications: WhatsApp & SMS transactional alerts for order milestones and care reminders.

### Out of Scope (V1 → Deferred to V2)
- Multi-vendor seller onboarding portal.
- AR 3D camera room placement.
- Automated recurring plant-subscription billing.
- Full reseller payout ledger (V1 provides share attribution and referral wallet credits).

---

## 7. Information Architecture & Sitemap

```
Roots_Bloom
├── Header / Nav
│   ├── Brand Logo (Roots_Bloom)
│   ├── Pincode Selector (e.g., 📍 110001)
│   ├── Search Bar (Bilingual / Transliteration support)
│   ├── Language Toggle (EN | हिंदी)
│   └── Actions: Wishlist | Cart | Orders | Account
├── Home
│   ├── Category Quick-Links Bar
│   ├── Hero Promotional Carousel (Festive & Occasion Campaigns)
│   ├── "Shop by Emotion / Occasion" Curated Shelves (Maa-Beti, Grandparents, Workspace, Festivals)
│   ├── High-Density Best-Sellers Grid
│   └── Trust Bar (Live Plant Guarantee, Safe Transit Packaging, 7-Day Replacement)
├── Category / Listing Page (PLP)
│   ├── Breadcrumb Navigation
│   ├── Desktop: Left Sticky Filter Sidebar | Mobile: Sticky Filter/Sort Bar
│   ├── Product Grid (Mobile: 2-Col | Tablet: 3-Col | Desktop: 4 to 5-Col)
│   └── Pagination / Infinite Scroll
├── Search Results Page
├── Product Detail Page (PDP)
│   ├── 1:1 Studio Photo Gallery (Thumbnails + Zoom)
│   ├── Title, Category Badge, Official Rating Chip, Social Share CTA
│   ├── Price Block (Offer Price, Strikethrough MRP, % Discount, Tax Note)
│   ├── Pincode Delivery Estimator & COD Check
│   ├── Emotional Story & Bilingual Headline Callout
│   ├── Key Specifications Table (Dynamic key-value rendering)
│   ├── Unhidden Botanical Care Guide (Sunlight, Watering, Maintenance)
│   ├── Verified Customer Photo Reviews & Rating Histogram
│   ├── Frequently Bought Together (DIY Kit & Accessories Cross-sell)
│   └── Sticky Bottom Bar (Mobile): Wishlist | Add to Cart | Buy Now
├── Cart
│   ├── Line Items (Qty Stepper, Remove, Live Subtotal)
│   ├── Coupon / Promo Code Accordion
│   ├── Add-On Cross-Sell Strip (DIY Kits ₹349, Mini Figurines)
│   └── Bill Summary & Sticky "Proceed to Checkout" CTA
├── Single-Page Checkout
│   ├── Step 1: Delivery Address (Saved Addresses + Inline New Form)
│   ├── Step 2: Payment Method (COD with handling note, UPI, Card, Net Banking)
│   └── Step 3: Order Review & Instant Confirmation
├── Order Tracking
│   ├── Live Status Progress Bar (Placed → Handcrafted → Shipped → Out for Delivery → Delivered)
│   └── Detailed Transit History & Plant Care Onboarding Link
├── Wishlist Page (with Price Drop Badges)
├── Account & Address Book
└── Referral & WhatsApp Share Hub
```

---

## 8. Functional Requirements by Module

### 8.1 Homepage
- **FR-1.1 Header Bar:** Sticky navigation with Roots_Bloom wordmark logo, pincode selector chip, responsive search input, language switch (EN/HI), and quick access to Wishlist, Cart, and Account.
- **FR-1.2 Category Navigation:** Clean icon-and-text horizontal rail (Mobile) and top mega-rail (Desktop) covering: *Tray Gardens, Theme Planters, Novelty Planters, Devotional, Souvenirs, Garden Accessories, DIY Kits*.
- **FR-1.3 Hero Carousel:** Auto-rotating, pause-on-hover studio banner carousel (max 5 slides) linking directly to seasonal campaigns (e.g., Mother's Day special, Ganesh Chaturthi devotional collection).
- **FR-1.4 "Shop by Feeling" Rails:** Curated shelves (*For Mom, For Grandparents, For the Home Office, Devotional & Vastu*) presented in high-density horizontal carousels with studio photography.
- **FR-1.5 Product Grid:** High-density 2-column (Mobile) and 4–5 column (Desktop) responsive grid displaying curated and best-selling planters.
- **FR-1.6 Product Card Specification:**
  - Square 1:1 crisp studio photo container with subtle border (`#E5E7EB`).
  - Badge chip on top-left (e.g., `BEST SELLER`, `FESTIVE SPECIAL`, `TOP GIFT`).
  - Optimistic wishlist heart toggle on top-right (filled red `#D64550` when active).
  - 2-line truncated title in Plus Jakarta Sans / Inter Semi-bold.
  - Solid dark-green rating chip (e.g., `4.6 ★ (210)`).
  - Standard pricing math: `₹1,499` (Bold #22281F) + `₹1,999` (Strikethrough #6B7266) + `25% OFF` (Green #3E8E52).
  - Free Delivery / COD Available indicator.
- **FR-1.7 Navigation Persistence:** Mobile bottom tab bar (Home, Categories, Wishlist, Orders, Account) fixed to viewport bottom; Desktop standard top header with search.

### 8.2 Category & Listing Page (PLP)
- **FR-2.1 Breadcrumb Trail:** `Home / Category / Subcategory` for SEO and navigation hierarchy.
- **FR-2.2 Filtering & Sorting:**
  - **Desktop:** Sticky left-hand filter panel with Price Range, Occasions, Plant Care Level, Materials, Ratings (4★ & above), and Availability.
  - **Mobile:** Sticky bottom-sheet filter & sort trigger bar (Sort by: Popularity, Price Low to High, Price High to Low, Rating, New Arrivals).
- **FR-2.3 Clean Empty State:** When filters produce zero items, render a clean Lucide/system icon (`FilterX`), clear explanatory text (*"No matching planters found for the selected filters"*), and a high-contrast `"Clear All Filters"` button. No cartoons or doodles.
- **FR-2.4 Cross-Sell Rail Injection:** Dynamically insert relevant accessory bundles (e.g., *Miniature DIY Accessories Kit*) after every 12 listings.

### 8.3 Search Experience
- **FR-3.1 Bilingual Search Query Parser:** Matches Latin and Devanagari input with transliteration support (e.g., searching "gudiya" surfaces figurine/theme planters).
- **FR-3.2 Instant Auto-Complete:** Shows recent search history, trending occasion tags, and direct SKU matches.
- **FR-3.3 Fallback Suggestions:** If a query produces zero direct hits, surfaces the top 3 closest category shelves rather than an empty drop-off.

### 8.4 Product Detail Page (PDP)
- **FR-4.1 Studio Photo Gallery:** 1:1 high-resolution gallery with thumbnail switcher on desktop and swipeable dot indicator on mobile. All images carry descriptive alt tags for SEO.
- **FR-4.2 Commercial Header:** Title, category badge, rating breakdown chip, and WhatsApp direct share CTA.
- **FR-4.3 Price & Tax Block:** Prominent offer price, struck-through MRP, percentage discount chip, and `"Inclusive of all taxes"` line.
- **FR-4.4 Pincode Delivery Calculator:** Interactive pincode box that validates delivery date estimation (e.g., `"Arrives by Thursday, 11 Sep"`) and displays COD availability.
- **FR-4.5 Emotional Narrative & Bilingual Quote:** 2–3 sentence product story followed by the bilingual headline highlighted in a neutral quotation callout.
- **FR-4.6 Key Specifications Table:** Clean tabular layout rendering dynamic attributes (Pot Material, Dimensions, Drainage Holes, Plant Species, Weight).
- **FR-4.7 Unhidden Plant Care Guide:** Permanent, visible section detailing sunlight requirements, watering schedule, and soil care.
- **FR-4.8 Verified Customer Reviews:** Overall rating score, 5-star to 1-star visual histogram, verified purchase tags, customer unboxing photo gallery, and review submission modal.
- **FR-4.9 Frequently Bought Together:** 1-click bundle selector pairing the main planter with DIY accessories or hanging decor.
- **FR-4.10 Sticky Bottom Actions (Mobile):** Wishlist button + `"Add to Cart"` (Secondary Forest Outline) + `"Buy Now"` (Primary Marigold Action).

### 8.5 Cart
- **FR-5.1 Line-Item Management:** Clear thumbnail, title, price, quantity selector (`- 1 +`), and item removal with instant recalculation.
- **FR-5.2 Promo & Coupon Code:** Collapsible accordion with one-tap application of available festive codes.
- **FR-5.3 Quick Add-On Carousel:** One-tap additions of ₹349 DIY accessory kits directly into cart.
- **FR-5.4 Bill Summary & Checkout Button:** Subtotal, Delivery Fee (Free over threshold), COD handling charges (if applicable), Total Amount, and persistent `"Proceed to Checkout"` CTA.

### 8.6 Single-Page Accordion Checkout
- **FR-6.1 Step 1 — Delivery Address:** Selection of saved addresses (tagged Home / Work) or inline entry form with pincode city/state auto-fill.
- **FR-6.2 Step 2 — Payment Method:** Clean selector for COD (with transparent fee display), UPI Intent/QR, Credit/Debit Cards, and Net Banking.
- **FR-6.3 Step 3 — Review & Place Order:** Final itemized breakdown and high-contrast `"Place Order"` action.
- **FR-6.4 Order Success View:** Order ID, estimated arrival window, live track button, and `"Share with Family on WhatsApp"` referral action.

### 8.7 Order Tracking & Status
- **FR-7.1 Live Progress Timeline:** 5 distinct milestone steps with timestamps: `Order Placed` → `Being Handcrafted for You` → `Packed & Dispatched` → `Out for Delivery` → `Delivered`.
- **FR-7.2 Transactional Alerts:** WhatsApp and SMS notifications dispatched on every state transition.
- **FR-7.3 Care Continuity Reminders:** Automated plant hydration and sunlight reminder notifications sent on Day 3 and Day 14 post-delivery.

### 8.8 Wishlist
- **FR-8.1 Optimistic Persistence:** Instant UI update on heart toggle, synced to local storage for guests and cloud profile for logged-in users.
- **FR-8.2 Price Drop Alert Tags:** Displays clean badge when a saved item’s price drops below the saved timestamp value.

### 8.9 Verified Reviews & Ratings
- **FR-9.1 Verified Buyer Gating:** Review submission is restricted to customers with confirmed delivery status.
- **FR-9.2 Real Unboxing Photos:** Multi-photo upload support to build genuine social proof for live plants.
- **FR-9.3 Official Brand Response:** Dedicated single-thread verified brand reply container for customer queries.

### 8.10 Localization & Language
- **FR-10.1 English & Hindi Parity:** Full interface string translation support (Navigation, buttons, statuses, care guides).
- **FR-10.2 Persistent Preference:** User language selection is preserved across sessions and synced to user profile.

### 8.11 Referral & WhatsApp Sharing
- **FR-11.1 Dynamic Share Card:** Generates a structured WhatsApp message with product name, price, offer, and referral link.
- **FR-11.2 Two-Sided Reward:** Referred friend receives first-order discount; referrer receives credit towards their next planter.

### 8.12 Account & Address Management
- **FR-12.1 Mobile OTP Authentication:** Clean 6-digit OTP verification; no mandatory password or email requirements.
- **FR-12.2 Multi-Address Book:** Add, edit, delete, and set default delivery addresses.
- **FR-12.3 WhatsApp Support Entry:** One-tap connection to official WhatsApp support channel.

---

## 9. UI/UX Specification

### 9.1 Design Tokens & Production-Grade Rules

#### Badlaav 1: Typography (Corporate, Crisp & Clean)
- **Primary Sans-Serif:** `"Plus Jakarta Sans"`, `"Inter"`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` (Clean, high-density, sharp modern commercial look).
- **Devanagari Fallback:** `"Noto Sans Devanagari"`, `sans-serif` (Crisp Hindi rendering without cartoonish rounded curves).
- **Font Weights:**
  - `400` (Regular) — Body copy, descriptions, specifications, meta text.
  - `500` (Medium) — Navigation links, category labels, form placeholders.
  - `600` (Semi-Bold) — Card titles, section subheadings, filter headers.
  - `700` (Bold) — Product pricing, major H1/H2 headlines, primary CTAs.
- **Type Scale:** 11px (Legal/micro), 12px (Badges/tags), 14px (Body/meta), 16px (Base/inputs), 18px (Card titles/subtitles), 22px (Section headers), 28px–32px (Hero banners).

#### Badlaav 2: Responsive Layout Breakpoints & Grid Architecture
- **Mobile (< 640px):**
  - High-density 2-column product grid (`gap: 8px to 10px`, `padding: 12px`).
  - Horizontal scrolling category and occasion rails (`gap: 8px`).
  - Sticky top search/pincode header + sticky bottom navigation bar.
- **Tablet (640px – 1024px):**
  - 3-column product grid (`gap: 12px`, `max-width: 100%`, `padding: 16px`).
  - Two-column PDP layout (Sticky gallery left, product info right).
- **Desktop (> 1024px):**
  - Full-width `max-w-7xl` (`1280px`) centered container.
  - Category / PLP: Fixed 260px left-hand sticky filter sidebar + 4 to 5-column product grid.
  - PDP: Two-column layout (550px sticky image gallery + detailed specifications column).
  - Checkout: 2-column layout (Left: Accordion address & payment, Right: Sticky order summary).

#### Badlaav 3: Neutral Surface & Commercial Color Palette

| Token Name | Value | Purpose / Usage |
|---|---|---|
| `color-surface` | `#FFFFFF` | Pure white base canvas (Crisp retail packaging look) |
| `color-surface-muted` | `#F8F9FA` | Light neutral gray for card wells, table stripes & alternating sections |
| `color-surface-subtle` | `#F1F3F5` | Neutral borders, tag wells, disabled controls |
| `color-brand-forest` | `#2F6B4F` | Primary brand green, active navigation states, primary buttons |
| `color-brand-dark` | `#1E4734` | Hover states for primary green actions, rating chip background |
| `color-accent-marigold` | `#E8703C` | "Buy Now" CTA, festive badges, limited edition tags |
| `color-accent-crimson` | `#D64550` | Wishlist heart, urgent stock notices, price drop chips |
| `color-text-primary` | `#1A201A` | High-contrast dark neutral text for headers and pricing |
| `color-text-secondary` | `#495057` | Descriptive text, feature labels, care instruction body |
| `color-text-muted` | `#6C757D` | Strikethrough MRP, timestamp meta, review counts |
| `color-success` | `#2E7D32` | Discount percentage tags (`25% OFF`), delivery confirmed states |
| `color-border` | `#E5E7EB` | Standard 1px crisp neutral borders (No heavy outlines) |
| `card-radius` | `6px to 8px` | Maximum 8px radius (`rounded-md` / `rounded-lg`). **Never use `rounded-2xl` or `rounded-3xl`.** |

---

### 9.2 Wireframe Architecture (Mobile & Desktop)

#### Mobile View (360px – 480px)
```
┌───────────────────────────────────────────┐
│ ☰  Roots_Bloom         📍 110001   🔍  EN │  (Sticky Header)
├───────────────────────────────────────────┤
│ [Tray Gardens] [Theme Planters] [Devotion]│  (Category Rail)
├───────────────────────────────────────────┤
│ ┌───────────────────────────────────────┐ │
│ │  HERO: Handcrafted Miniature Gardens  │ │  (1:1 / 16:9 Studio Banner)
│ │  Live Plants • Handcrafted Terracotta │ │
│ └───────────────────────────────────────┘ │
├───────────────────────────────────────────┤
│ Best Sellers in Living Planters           │
│ ┌───────────────────┐ ┌─────────────────┐ │
│ │[1:1 Studio Photo] │ │[1:1 Studio Photo]││
│ │BEST SELLER     [♡]│ │TOP GIFT      [♡]││
│ │Fairy Dream Tray   │ │Maa-Beti Planter ││
│ │4.6 ★ (210)        │ │4.8 ★ (145)      ││
│ │₹1,499 ₹1,999 25%off│ │₹899 ₹1,199 25%off││
│ └───────────────────┘ └─────────────────┘ │
├───────────────────────────────────────────┤
│ 🏠 Home   📂 Categories   ♡ Saved   📦 Orders │  (Fixed Bottom Nav)
└───────────────────────────────────────────┘
```

#### Desktop View (1280px Container - High-Density E-Commerce)
```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ Roots_Bloom   [ 🔍 Search handcrafted planters, bonsai, trays... ]  📍110001  EN  ♡  🛒(2) │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Tray Gardens | Emotional Theme | Devotional | Novelty | Accessories | DIY Kits  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumbs: Home / Theme Planters / Maa-Beti Living Planter                    │
│                                                                                  │
│ ┌───────────────────────────┐ ┌────────────────────────────────────────────────┐ │
│ │                           │ │ Maa-Beti Emotional Theme Handcrafted Planter   │ │
│ │                           │ │ 4.8 ★ (145 Reviews)  •  Verified Handcrafted   │ │
│ │                           │ │ ────────────────────────────────────────────── │ │
│ │   [1:1 High-Res Studio    │ │ ₹899  MRP ₹1,199  (25% OFF)                    │ │
│ │    Photography Gallery]   │ │ Inclusive of all taxes                         │ │
│ │                           │ │                                                │ │
│ │                           │ │ 📍 Check Delivery: [ 110001 ] [Check]          │ │
│ │                           │ │ ✓ Free Delivery by Thursday • COD Available    │ │
│ │  [thumb] [thumb] [thumb]  │ │                                                │ │
│ │                           │ │ [ 🛒 Add to Cart ]   [ ⚡ Buy Now (One-Tap) ]  │ │
│ └───────────────────────────┘ └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### 9.3 Core Component Specifications

| Component | Visual Rules & States | Data & Formatting Specification |
|---|---|---|
| **Product Card** | Strict 1:1 image box, 1px border `#E5E7EB`, 8px radius, subtle hover lift (no dramatic cartoon shadow) | Image + Badge (`#E8703C`) + Wishlist Heart + Title (2 lines) + Rating Chip (`#1E4734`) + Price Math + Delivery Note |
| **Price Component** | High-contrast enterprise formatting | `₹1,499` (Bold #1A201A, 16px) `₹1,999` (Line-through #6C757D, 13px) `25% OFF` (Bold #2E7D32, 12px) |
| **Rating Chip** | Solid dark green pill container (`#1E4734` background, white text) | `4.6 ★ (210)` — Compact, high trust |
| **Buttons** | Flat, crisp commercial buttons (44px min tap target) | Primary: `#2F6B4F` (Forest Green), Buy Now: `#E8703C` (Marigold Orange), Secondary: Outline 1px `#2F6B4F` |
| **Delivery Box** | 1px border neutral container with checkmark icon | Pincode input + Instant delivery SLA text (*"Delivery in 2-4 Days"*) |
| **Order Progress Bar**| Horizontal milestone track with clean numbered checkpoints | 5 states with timestamp and active green pulse dot |

---

## 10. Data Model & Schema

### 10.1 Product Schema
```json
{
  "id": "fairy-dream-miniature-tray-garden",
  "sku": "RB-TG-001",
  "brand": "Roots_Bloom",
  "name": "Fairy Dream Miniature Tray Garden",
  "category": "Tray Gardens",
  "subcategory": "Miniature Landscapes",
  "target_audience": "Gifting, Home Decor, Nature Lovers",
  "seo_headline": "Bring Home Magical Forest Vibes — Handcrafted Fairy Garden",
  "search_aliases": ["fairy garden", "miniature tray", "chhoti bageecha", "succulent dish garden"],
  "description": "A meticulously handcrafted miniature living garden set in a durable ceramic tray, featuring hardy live succulents, preserved reindeer moss, and hand-painted resin fairy figurines.",
  "key_features": {
    "pot_material": "Glazed High-Fired Ceramic",
    "plants_included": "Live Haworthia & Sedum Succulents",
    "dimensions": "10 inch Diameter x 4.5 inch Height",
    "drainage": "Dual Drainage Hole with Mesh Filter",
    "care_level": "Low (Water once every 10 days)"
  },
  "pricing": {
    "currency": "INR",
    "base_price": 1999,
    "offer_price": 1499,
    "discount_percent": 25
  },
  "visual_assets": {
    "badge": "Best Seller",
    "photo_angles": ["Front Angle Studio Shot", "Top Down Landscape View", "Figurine Detail Macro", "Packaging & Gift Box"],
    "media": [
      { "type": "image", "url": "/images/products/fairy-dream-1.webp", "alt": "Fairy Dream Miniature Tray Garden Front Studio View" },
      { "type": "image", "url": "/images/products/fairy-dream-2.webp", "alt": "Fairy Dream Top Angle Succulent Layout" }
    ]
  },
  "inventory": { "stock_qty": 45, "status": "in_stock" },
  "rating": { "average": 4.6, "count": 210 },
  "care_level": "easy",
  "is_live_plant": true,
  "cross_sell_ids": ["miniature-diy-accessories-kit", "whimsical-hanging-bird-decor"],
  "created_at": "2026-01-15T10:00:00Z",
  "updated_at": "2026-09-01T12:00:00Z"
}
```

### 10.2 Order Schema
```json
{
  "order_id": "RB-2026-89412",
  "user_id": "usr_992144",
  "brand": "Roots_Bloom",
  "items": [
    { "product_id": "fairy-dream-miniature-tray-garden", "qty": 1, "price": 1499 },
    { "product_id": "miniature-diy-accessories-kit", "qty": 1, "price": 349 }
  ],
  "address": {
    "label": "Home",
    "line1": "Flat 402, Green Meadows",
    "pincode": "110001",
    "city": "New Delhi",
    "state": "Delhi"
  },
  "payment": {
    "method": "COD",
    "status": "pending_delivery",
    "cod_fee": 0
  },
  "status": "being_handcrafted",
  "status_history": [
    { "status": "order_placed", "timestamp": "2026-09-06T10:15:00Z" },
    { "status": "being_handcrafted", "timestamp": "2026-09-06T11:30:00Z" }
  ],
  "totals": {
    "subtotal": 1848,
    "discount": 0,
    "delivery_fee": 0,
    "total": 1848
  },
  "referral_code_used": "PRIYA200"
}
```

---

## 11. Non-Functional Requirements

- **Performance & Load:** First Contentful Paint (FCP) < 1.6s on 3G network; sub-second page transitions; all product imagery delivered as modern WebP with explicit height/width attributes to eliminate layout shifts (CLS < 0.05).
- **Responsive Fluidity:** Flawless rendering from 360px mobile viewport up to 4K desktop screens with strict max container width of 1280px (`max-w-7xl`).
- **Offline Reliability:** Service worker caching of product catalogs and recent orders; displays clear offline notice with cached browsing when connection drops.
- **Security & Integrity:** Rate-limited OTP generation, secure HTTPS endpoints, PCI-DSS compliant payment gateway integration (Razorpay/Cashfree).

---

## 12. Launch Catalog (Seed SKUs for Roots_Bloom)

1. **Fairy Dream Miniature Tray Garden** (Tray Gardens — ₹1,499 / ₹1,999) `Best Seller`
2. **Maa-Beti Emotional Theme Planter** (Theme Planters — ₹899 / ₹1,199) `Top Gift Choice`
3. **Dada-Dadi Nostalgia Miniature Garden** (Theme Planters — ₹1,299 / ₹1,699) `Customer Favourite`
4. **Bappa Blessing Devotional Planter** (Devotional — ₹999 / ₹1,399) `Festive Special`
5. **Vintage Scooter Novelty Planter** (Novelty Planters — ₹799 / ₹1,099) `Trending`
6. **India Gate Patriot Desk Planter** (Souvenirs — ₹699 / ₹899) `Limited Edition`
7. **Whimsical Hanging Bird Décor** (Garden Accessories — ₹449 / ₹599) `Hot Add-on`
8. **Miniature DIY Accessories Kit** (DIY Kits — ₹349 / ₹499) `Cart Booster`
