# Migration Plan: cracks-website to Next.js/pnpm

## Overview
Migrate cracks-website from React/Vite to Next.js 16+ with pnpm, matching the structure and styling of cracks-hospitality.

## Key Decisions
- **Project Setup**: Move existing files to `cracks-website/old/` folder first, then init Next.js. Delete `old/` only after new site is working.
- **Frasers Project**: External link only (no internal case study page)
- **Case Studies**: Keep BIM Company page (embedded), remove Shangri-La entirely

## Key Requirements
- **Tech Stack**: Next.js 16, pnpm, TypeScript, Tailwind CSS v4
- **Styling**: Use same `globals.css` from cracks-hospitality (Cream primary, Orange secondary)
- **i18n**: next-intl with en/es locales
- **Backend**: Preserve existing API endpoints (`https://api.cracks-app.com/public/contact`)
- **Logos**: Switch to Studio logos (light/dark variants)

---

## Section-by-Section Migration

### 1. HERO SECTION
**Component**: `npx shadcn@latest add https://21st.dev/r/uniquesonu/text-parallax-content-scroll`
- Use existing hero image: `home-photo.jpg`
- Title: "CRACKS HOSPITALITY STUDIO"
- Subtitle: "BUILDING HOSPITALITY ICONS, ONE RESTAURANT AT A TIME"
- CTAs: "Book a First Call" (Calendly), "Get a Tailored Quote" (scroll to Fees)

### 2. OUR METHOD SECTION
**Component**: Copy `DifferenceSection.tsx` from cracks-hospitality
- Use BentoGrid with 4 cards (2x2 grid)
- Content: Guest-Centric, Authentic, Operationally Built-In, Global Perspective
- Images: Same 4 images from cracks-hospitality DifferenceSection

### 3. FRAMEWORK SECTION
**Component**: `npx shadcn@latest add https://21st.dev/r/meschacirung/features-4`
- Display 3 phases: Smart Start, Revenue Activation, Sustained Profitability
- Adapt to 3-column grid with icons

### 4. SERVICES SECTION (3 Steps)
**Component**: `npx shadcn@latest add https://21st.dev/r/aceternity/glare-card`
- 3 GlareCards for phases (01, 02, 03)
- Each card: number, title, description with hover glare effect

### 5. SCOPE OF SERVICES
**Component**: `npx shadcn@latest add https://21st.dev/r/aceternity/feature-section-with-hover-effects`
- 4 service categories: Concept Development, Management, Partner Services, Additional
- Interactive hover effects with descriptions

### 6. PROJECTS SECTION
**Component**: `npx shadcn@latest add https://21st.dev/r/minhxthanh/interactive-selector`
- 2 projects: CENTO Bangkok, Frasers Suites One Bangkok
- Interactive carousel with full-screen images
- Click to external URLs:
  - CENTO → https://centobangkok.com/
  - Frasers → https://www.frasershospitality.com/en/thailand/bangkok/fraser-suites-bangkok/

### 7. FEES SECTION
**Component**: `npx shadcn@latest add https://21st.dev/r/minhxthanh/interactive-selector` (for accordion)
- Accordion-style display for 3 packages: BLUEPRINT, FRAMEWORK, LAUNCH
- Preserve pricing calculator logic (useFeesCalculator)
- Keep quote request functionality with API integration

### 8. TEAM SECTION
**Component**: Copy `team.tsx` from cracks-hospitality/components/ui/
- Display Manuel Palacio & Nacho López
- Same card layout with photos, bios, LinkedIn links

### 9. CONTACT SECTION
- Redesign with new globals.css styling
- Preserve API integration (`/public/contact` with source: 'studio')
- Country code selector, validation, rate limiting
- Contact info cards (location, phone, email, hours)

---

## File Structure

```
cracks-website/
├── old/                           # Backup of React/Vite files
├── app/
│   ├── layout.tsx                 # Root layout (fonts, theme)
│   ├── globals.css                # Copy from cracks-hospitality
│   ├── [locale]/
│   │   ├── layout.tsx             # i18n layout
│   │   ├── page.tsx               # Landing page
│   │   ├── bim/page.tsx           # BIM Company case study (embedded)
│   │   └── legal/
│   │       ├── privacy/page.tsx
│   │       └── app-privacy/page.tsx
│   └── robots.ts
├── components/
│   ├── landing/
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx        # text-parallax-content-scroll
│   │   ├── MethodSection.tsx      # BentoGrid (from DifferenceSection)
│   │   ├── FrameworkSection.tsx   # features-4
│   │   ├── ServicesSection.tsx    # glare-card
│   │   ├── ScopeSection.tsx       # feature-section-with-hover-effects
│   │   ├── ProjectsSection.tsx    # interactive-selector
│   │   ├── FeesSection.tsx        # interactive-selector accordion
│   │   ├── TeamSection.tsx        # team.tsx component
│   │   ├── ContactSection.tsx     # Redesigned form
│   │   └── Footer.tsx
│   ├── ui/                        # shadcn/ui components
│   │   ├── bento-grid.tsx
│   │   ├── glare-card.tsx
│   │   ├── text-parallax-content-scroll.tsx
│   │   ├── interactive-selector.tsx
│   │   ├── feature-section-hover.tsx
│   │   ├── team.tsx
│   │   └── ... (other shadcn components)
│   └── shared/
│       ├── ThemeToggle.tsx
│       └── CookieConsent.tsx
├── lib/
│   ├── utils.ts
│   ├── seo.ts
│   └── api.ts                     # Preserved API service
├── hooks/
│   ├── useFormValidation.ts
│   ├── useFeesCalculator.ts
│   └── useRateLimit.ts
├── config/
│   └── constants.ts               # Site config, packages, currencies
├── i18n/
│   ├── config.ts
│   ├── routing.ts
│   ├── navigation.ts
│   └── request.ts
├── messages/
│   ├── en.json
│   └── es.json
├── package.json
├── next.config.ts
├── tsconfig.json
├── components.json
├── tailwind.config.ts
└── middleware.ts
```

---

## Pre-copied Components (in components-to-copy/)

All necessary components from cracks-hospitality have been pre-copied to `components-to-copy/` folder:

```
components-to-copy/
├── globals.css              # Full CSS with theme variables
├── utils.ts                 # cn() utility function
├── bento-grid.tsx           # BentoGrid component for Method section
├── team.tsx                 # Team component
├── DifferenceSection.tsx    # Reference for Method section
├── ThemeToggle.tsx          # Theme toggle component
├── Navigation.tsx           # Navbar (alternate version)
├── NavigationWrapper.tsx    # Navbar with hero/scroll variants
├── middleware.ts            # i18n middleware
├── i18n/
│   ├── config.ts            # Locale configuration
│   ├── routing.ts           # Routing setup
│   ├── navigation.ts        # Navigation helpers
│   └── request.ts           # Server request handler
└── ui/
    ├── button.tsx           # Button with pill variants
    └── dropdown-menu.tsx    # Dropdown menu component
```

**During implementation:**
1. Copy files from `components-to-copy/` to their proper locations
2. Install shadcn components from 21st.dev
3. Delete `components-to-copy/` folder when done

---

## Critical Files to Preserve/Migrate

### API & Backend Integration
- `old/src/services/api.ts` → `lib/api.ts` - Keep `submitContactForm`, `submitQuotationRequest`
- `old/src/config/constants.ts` → `config/constants.ts` - Keep PACKAGES, CURRENCIES, TRAVEL_SUPPLEMENTS

### Hooks
- `useFormValidation.ts` - Form validation logic
- `useFeesCalculator.ts` - Pricing calculator logic
- `useRateLimit.ts` - Rate limiting for forms

### Content Data
- Method cards content from MethodSection.tsx
- Services content from ServicesSection.tsx
- Team member bios from TeamSection.tsx
- Package features from FeesSection.tsx
- Project data (CENTO + Frasers)

---

## Logo Configuration

```typescript
// Light theme
logo: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_black.png'
logoSvg: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/svg/studio_black.svg'

// Dark theme
logoDark: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/png/studio_white.png'
logoDarkSvg: 'https://moyusgyrteirxbivehyz.supabase.co/storage/v1/object/public/Logos/svg/studio_white.svg'
```

---

## Implementation Steps

### Phase 1: Project Setup
1. Move all existing files to `cracks-website/old/` folder (safe backup)
2. Initialize Next.js project with pnpm in cracks-website folder
3. Configure TypeScript, Tailwind CSS v4
4. Copy globals.css from cracks-hospitality
5. Setup shadcn/ui with "new-york" style
6. Configure next-intl for i18n (en/es)

### Phase 2: Install UI Components
1. `npx shadcn@latest add https://21st.dev/r/uniquesonu/text-parallax-content-scroll`
2. `npx shadcn@latest add https://21st.dev/r/meschacirung/features-4`
3. `npx shadcn@latest add https://21st.dev/r/aceternity/glare-card`
4. `npx shadcn@latest add https://21st.dev/r/aceternity/feature-section-with-hover-effects`
5. `npx shadcn@latest add https://21st.dev/r/minhxthanh/interactive-selector`
6. Copy bento-grid.tsx and team.tsx from cracks-hospitality

### Phase 3: Migrate Core Logic
1. Port API service (api.ts)
2. Port hooks (useFormValidation, useFeesCalculator, useRateLimit)
3. Port constants.ts with site config
4. Setup SEO configuration

### Phase 4: Build Landing Sections
1. Navigation with logo switching
2. Hero with text-parallax-content-scroll
3. Method with BentoGrid
4. Framework with features-4
5. Services with glare-cards
6. Scope with feature-section-hover
7. Projects with interactive-selector
8. Fees with accordion + calculator
9. Team section
10. Contact form
11. Footer

### Phase 5: Case Study & Legal Pages
1. Migrate BIM Company case study page (keep existing embedded component)
2. Migrate privacy policy page
3. Migrate app privacy policy page
4. Remove Shangri-La case study (not needed)

### Phase 6: Polish & Deploy
1. Add SEO metadata
2. Test contact form submission
3. Test quote request submission
4. Verify responsive design
5. Test dark/light theme switching
6. Once everything works, delete `old/` folder

---

## Verification

1. **Visual Check**: Compare all sections against current cracks-website
2. **API Test**: Submit contact form, verify email received
3. **Quote Test**: Submit quote request for each package
4. **Theme Test**: Toggle dark/light mode, verify logo switching
5. **Mobile Test**: Check responsive layout on mobile devices
6. **i18n Test**: Switch between English and Spanish
7. **Build Test**: `pnpm build` passes without errors
