---
name: Institutional Core Compliance
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#45474c'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#1e1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#35260c'
  on-tertiary-container: '#a38c6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#fadfb8'
  tertiary-fixed-dim: '#ddc39d'
  on-tertiary-fixed: '#271902'
  on-tertiary-fixed-variant: '#564427'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
  success: '#059669'
  warning: '#D97706'
  danger: '#DC2626'
  border-default: '#E2E8F0'
  surface-header: '#FFFFFF'
  status-offline: '#64748B'
typography:
  display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-table:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 260px
  header-height: 56px
  gutter: 16px
  cell-padding-v: 8px
  cell-padding-h: 12px
  container-gap: 24px
---

## Brand & Style

The design system is engineered for the high-stakes environment of microfinance compliance within the Beninese financial ecosystem. The brand personality is **Institutional, Reliable, and Precise**. It moves away from modern "fluff" in favor of a **Corporate Modern** aesthetic that prioritizes data density, information hierarchy, and operational efficiency.

The UI should evoke a sense of "unshakeable authority." Every pixel is dedicated to clarity, ensuring that compliance officers at "Caisses" and "CLCAM" can manage thousands of records without visual fatigue. The style is characterized by a structured layout, subtle borders, and a rigorous adherence to a functional grid. It emphasizes a professional workspace where the software serves as a silent, guiding partner in regulatory adherence.

## Colors

The color strategy is sober and utilitarian, utilizing a deep Slate Blue (Primary) to anchor the interface and establish a professional tone. The background uses a very light gray to reduce glare during long working hours.

- **Primary (#1E293B):** Used for the side navigation, primary actions, and structural headers.
- **Surface (#F8FAFC):** The canvas for all administrative views.
- **Functional Accents:** Colors are strictly reserved for semantic meaning. Success (Green) indicates "RAS" (Rien à Signaler), Warning (Amber) indicates "À Vérifier," and Danger (Red) indicates "Bloqué" or critical compliance failures.
- **Offline Status:** A persistent status indicator "Mode hors-ligne actif" should use a neutral Slate gray to denote a non-error but significant operational state.

## Typography

This design system utilizes **Inter** for its exceptional legibility at small sizes and its neutral, systematic character. The typography is optimized for "high-density" views.

- **Data Density:** Use the `data-table` (13px) level for all record listings (Members, Transactions).
- **Labels:** Form labels should be prominent and clear. Use `label-caps` for section headers within forms to differentiate between "Membre" details and "Guichet" metadata.
- **Hierarchy:** Maintain a strict vertical rhythm. Headlines are kept compact to ensure more content is visible above the fold.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid** model typical of core banking systems. 

1.  **Side Navigation:** A fixed 260px sidebar on the left contains the primary application modules (Tableau de bord, Membres, Rapports, Paramètres).
2.  **Top Header:** A 56px utility bar for user profile, search, and the persistent "Mode hors-ligne actif" indicator.
3.  **Content Area:** Uses a 12-column grid. Most data entry forms should occupy 6-8 columns, while data tables span the full 12 columns.
4.  **Density:** Spacing is tight (8px/12px increments) to minimize scrolling. Tables should use a condensed row height (36px to 40px) to maximize the number of visible rows per screen.

## Elevation & Depth

This design system avoids heavy shadows and complex layering. Depth is communicated through **Tonal Separation** and **Low-Contrast Outlines**.

- **Level 0 (Background):** #F8FAFC.
- **Level 1 (Cards/White Containers):** #FFFFFF with a 1px border of #E2E8F0. No shadow is used for standard data cards to maintain a clean, flat aesthetic.
- **Level 2 (Modals/Dropdowns):** Use a very tight, subtle ambient shadow (4px blur, 10% opacity) to separate temporary UI from the data grid.
- **Side Nav:** Set to the Primary color (#1E293B) to create a clear "Control Zone" distinct from the "Work Zone."

## Shapes

The shape language is **Soft (0.25rem)**. In a high-density, professional environment, large radii or pill shapes waste space and feel too "consumer-grade." 

- **Elements:** Buttons, input fields, and cards use a consistent 4px (0.25rem) corner radius.
- **Tables:** Table containers should have slightly rounded top corners but remain sharp on internal cell dividers to maintain the look of a continuous ledger.
- **Badges:** Use a slight rounding for status badges (Success/Warning/Danger) to distinguish them from clickable buttons.

## Components

### Data Tables
Tables are the core of this design system. 
- **Headers:** Light gray background (#F1F5F9), uppercase labels, sorted icons always visible.
- **Rows:** Zebra striping or subtle hover states to track information across wide screens.
- **Actions:** Use small icon-buttons (pencil, eye) to save space.

### Forms (Institutional Style)
- **Labels:** Position labels to the left of the input field for desktop views to maintain a columnar structure, or top-aligned for narrow fields.
- **Inputs:** White background, 1px border (#E2E8F0). Focus state uses a 1px solid Primary color.

### Status Badges
- **Format:** Small, high-contrast badges for "RAS," "À Vérifier," and "Bloqué."
- **Persistence:** The "Mode hors-ligne actif" indicator stays pinned to the right side of the Top Header, styled as a subtle outlined badge to avoid distracting from active work.

### Buttons
- **Primary:** Solid #1E293B with white text.
- **Secondary:** Outlined buttons for "Annuler" or "Retour."
- **Density:** Use "Small" button variations (32px height) within tables and "Medium" (40px) for form submissions.

### Functional Cards
Cards are used to group related information (e.g., "Détails du Membre" or "Informations Caisse"). They must have a clear header with a 1px bottom border and a white background.