# KLIQ - Protein Energy Drink Website

Next.js 15 marketing website for KLIQ Protein Energy Drink.

## Tech Stack

- **Framework**: Next.js 15 (React 19, TypeScript)
- **Styling**: Tailwind CSS 3 with custom theme
- **3D**: Three.js + React Three Fiber (interactive can model)
- **Animations**: GSAP + Lenis (smooth scroll)
- **UI**: Radix UI component library

## Brand Guidelines

### Brand Colors

| Color         | Hex       | Usage                              |
| ------------- | --------- | ---------------------------------- |
| **Vermilion** | `#EB290D` | Primary brand color, CTAs, accents |
| **Black**     | `#000000` | Backgrounds, text, logo            |
| **Asphalt**   | `#1D1D1D` | Dark backgrounds, cards            |
| **Asphalt Gray** | `#2E2E2E` | Secondary dark surfaces         |
| **Champagne** | `#FFF0CB` | Light accent, highlights           |

### Flavor Accent Colors

| Flavor           | Color     |
| ---------------- | --------- |
| Mixed Berry      | Purple    |
| Cola             | Red       |
| Memo Nade        | Green     |
| Mango Pineapple  | Yellow    |
| Lemonade         | Lime      |

### Typography

- **Logo Font**: Urban Shadow (used on packaging/logo assets only)
- **Display Font**: Anton (headings on web)
- **Body Font**: Inter (body text on web)
- **Packaging Body**: Bricolage Grotesque, Cuprum

### Logo Files

Located in `public/Website Logos/`:
- `black.png` - Black logo (for light backgrounds)
- `BLACK(1).png` - Black logo variant
- `white(1).png` - White logo (for dark backgrounds)
- `WHITE.png` - White logo variant
- `red black.png` - Red + black combo logo
- `red(1).png` - Red logo variant
- `RED.png` - Red logo

### Product Information

**KLIQ is a Protein Energy Drink**, not a traditional energy drink.

Key facts:
- **20g Protein** per 355ml can
- **0 Sugar**
- **0 Carbs**
- **0 Fats**
- **No Added Caffeine**
- Serving size: 355ml

### Brand Voice & Messaging

- **Tagline**: "Fuel Your Edge"
- **Brand Intent**: "Energy without noise. Protein without compromise."
- **Positioning**: "Not just energy. Not just protein. A performance lifestyle beverage."
- **Design Philosophy**: "Sharp. Minimal. Recognisable." / "Clean over loud. System over chaos. Function over hype."

### Flavors (5 variants)

1. **Mixed Berry** - Purple/blue can with sunburst pattern
2. **Cola** - Red/silver can with sunburst pattern
3. **Memo Nade** - Green can with sunburst pattern
4. **Mango Pineapple** - Yellow can with sunburst pattern
5. **Lemonade** - Lime green can with sunburst pattern

### Design System Notes

- All cans feature the signature **sunburst/ray pattern**
- Logo is displayed in **Urban Shadow** font, always bold and condensed
- **20g** protein badge is a prominent black circle on every can
- "PROTEIN Energy Drink" text block appears on every can
- Flavor name runs along the bottom of each can

### Tailwind Color Classes

```
// Brand colors
kliq-vermilion       (#EB290D)
kliq-vermilion-deep  (#C92009)
kliq-vermilion-light (#FF4D33)
kliq-black           (#000000)
kliq-asphalt         (#1D1D1D)
kliq-asphalt-gray    (#2E2E2E)
kliq-champagne       (#FFF0CB)

// Flavor accents
flavor-berry         (#6B5CA5)
flavor-cola          (#C62828)
flavor-lemonade      (#7CB342)
flavor-mango         (#F9A825)
flavor-pink          (#E91E90)
```

## Project Structure

```
app/                  Next.js app directory (layout.tsx, page.tsx)
src/
  sections/           Page sections (Hero, Nav, Products, etc.)
  components/         Shared components (PersistentCan, SmoothScroll, ui/)
  hooks/              Custom hooks
  lib/                Utilities
  index.css           Global styles + CSS variables
  App.css             Custom animations + effects
public/
  Website Logos/      Logo variants (PNG)
  *.glb               3D can models
  *.png               Product can images
  final packaging.pdf Brand guidelines PDF (27 pages)
```

## Getting Started

```bash
npm install
npm run dev
```

## Reference

Full brand guidelines available in `public/final packaging.pdf` (Creative Strategy, Branding & Packaging System by Sakred Creative Haus).
