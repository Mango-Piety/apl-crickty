---
name: IPL Broadcaster Design System
colors:
  surface: '#0c141f'
  surface-dim: '#0c141f'
  surface-bright: '#323946'
  surface-container-lowest: '#070e19'
  surface-container-low: '#151c27'
  surface-container: '#19202b'
  surface-container-high: '#232a36'
  surface-container-highest: '#2e3541'
  on-surface: '#dce2f3'
  on-surface-variant: '#d0c6ab'
  inverse-surface: '#dce2f3'
  inverse-on-surface: '#2a313d'
  outline: '#999077'
  outline-variant: '#4d4732'
  surface-tint: '#e9c400'
  primary: '#fff6df'
  on-primary: '#3a3000'
  primary-container: '#ffd700'
  on-primary-container: '#705e00'
  inverse-primary: '#705d00'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#d8ffe7'
  on-tertiary: '#003824'
  tertiary-container: '#65f2b5'
  on-tertiary-container: '#006d4a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0c141f'
  on-background: '#dce2f3'
  surface-variant: '#2e3541'
typography:
  display-bold:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin: 32px
---

## Brand & Style

The design system is built to mirror the high-octane, prestigious atmosphere of Indian Premier League (IPL) night matches. It targets professional broadcasters and analysts who require split-second data interpretation without sacrificing visual impact. 

The visual style is a hybrid of **Glassmorphism** and **High-Contrast Bold**. It utilizes deep layers of transparency to maintain a sense of depth during dense data streams, while "Electric Gold" accents provide a premium, championship-tier aesthetic. The interface should feel like a mission-control center: technical, authoritative, and energetic.

## Colors

The foundation of the design system is **Midnight Blue (#0B1120)**, used for all base surfaces to minimize eye strain during long broadcast sessions. **Electric Gold (#FFD700)** is the primary action and highlight color, reserved for critical data points, active states, and branding elements.

Semantic colors are mapped to emotional states common in sports analytics:
- **Euphoria (Green):** Positive momentum, successful reviews, or target achievement.
- **Excitement (Blue):** High-intensity play, active powerplays, or trending metrics.
- **Frustration (Orange):** Dropping run rates, warnings, or caution areas.
- **Disbelief (Red):** Wickets, failed reviews, or critical errors.

## Typography

The design system utilizes **Lexend** for its primary typography to leverage its athletic, highly readable character. It provides the necessary "boldness" required for sports broadcasting while maintaining clarity in dense data tables.

**Space Grotesk** is used as a secondary font for technical labels and monospaced data points. This adds a futuristic, geometric edge to the broadcast metrics, ensuring that numbers (overs, run rates, speeds) stand out from descriptive text. Headlines should use tight letter-spacing to feel impactful and modern.

## Layout & Spacing

The design system employs a **12-column fluid grid** designed for 16:9 aspect ratio monitors typical in broadcast booths. A 4px base unit ensures a tight, mathematical rhythm. 

Given the dashboard's data-heavy nature, margins are generous (32px) to prevent the UI from feeling claustrophobic, while internal component spacing (gutters) remains tight (16px) to maximize the amount of information visible at a single glance. Containers should prioritize vertical stacking to emulate real-time "news feed" or "ticker" layouts.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and selective illumination rather than traditional shadows. 

- **Level 1 (Base):** Midnight Blue background.
- **Level 2 (Cards):** Semi-transparent surfaces (Background Blur: 12px, Opacity: 40%) with a 1px border at 10% white opacity.
- **Level 3 (Pop-overs/Modals):** Higher opacity (80%) with an outer glow using the primary Electric Gold color at low opacity (15%) to simulate an emissive broadcast screen.

Use "Inner Glows" on active components to make them appear as if they are backlit, mimicking stadium LED displays.

## Shapes

The design system uses a **Rounded (Level 2)** shape language. The 0.5rem (8px) base radius provides a modern, sleek feel that balances the "aggressive" bold typography. 

- **Standard Buttons & Inputs:** 0.5rem (8px)
- **Data Cards:** 1rem (16px)
- **Large Container Sections:** 1.5rem (24px)

This progressive rounding ensures that larger structural elements feel contained and sophisticated, while smaller interactive elements remain crisp and professional.

## Components

### Buttons & Inputs
Buttons feature a high-contrast Electric Gold fill for primary actions, with black text for maximum legibility. Secondary buttons use the "Glass" style with a gold border. Input fields are dark with bottom-only borders that "glow" gold when focused.

### Glass Data Cards
The core of the dashboard. These containers use a backdrop-filter blur and a subtle gradient stroke. Header areas of cards should be separated by a thin, 10% white line.

### Sentiment Chips
Small, pill-shaped indicators using the Euphoria, Excitement, Frustration, and Disbelief colors. These should have a subtle outer glow of the same color to indicate "live" shifting metrics.

### Live Tickers
A specialized component for scores and player stats. Use Space Grotesk for the numbers to ensure they remain legible even when the dashboard is scaled down.

### Gauges & Visualizations
Charts should avoid solid fills. Use gradients that transition from the semantic color (e.g., Euphoria Green) to transparent. Data lines should be thick (3px+) with a soft glow effect to emulate "Neon" paths on the Midnight Blue background.