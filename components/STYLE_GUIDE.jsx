# Pacific Engineering & Construction Inc. - UI/UX Style Guide

**Version:** 1.0  
**Last Updated:** December 29, 2024  
**Purpose:** Core design principles and component usage for all Pacific Engineering digital properties

---

## Brand Overview

### Mission
To deliver innovative, compliant, and reliable civil engineering, construction, and stormwater management solutions, fostering long-term partnerships through technical excellence and client-centric service.

### Core Values
- Technical Excellence
- Integrity  
- Client-Centricity
- Innovation
- Safety
- Community

### Brand Personality
Professional • Trustworthy • Innovative • Approachable • Dependable • Expert

### Tone of Voice
Informative • Confident • Helpful • Clear • Authoritative • Solution-Oriented

---

## Typography

### Heading Styles

**H1 - Page Titles**
```css
text-5xl md:text-6xl font-bold tracking-tight
```
Colors: `text-white` or `text-slate-900`

**H2 - Major Sections**
```css
text-4xl md:text-5xl font-bold tracking-tight
```

**H3 - Sub-Sections**
```css
text-3xl md:text-4xl font-bold tracking-tight
```

**H4 - Component Headers**
```css
text-xl font-bold uppercase tracking-wide
```

### Body Text

**Large:** `text-xl text-slate-600 leading-relaxed font-light`  
**Medium:** `text-lg text-slate-700 leading-relaxed font-light`  
**Small:** `text-sm text-slate-600 leading-relaxed`

---

## Color Palette

### Primary Colors
- **Blue 600** `#2563EB` - Primary brand color
- **Cyan 600** `#0891B2` - Secondary accent
- **Teal 600** `#0D9488` - Tertiary accent

### Gradients
```css
/* Primary CTA */
bg-gradient-to-r from-blue-600 to-cyan-600

/* Icon Backgrounds */
bg-gradient-to-br from-blue-400 to-blue-700
bg-gradient-to-br from-cyan-300 to-cyan-600
bg-gradient-to-br from-teal-300 to-teal-600
```

### Neutral Greys (Slate)
- **900** `#0F172A` - Dark backgrounds
- **600** `#475569` - Body text
- **200** `#E2E8F0` - Borders
- **50** `#F8FAFC` - Page backgrounds

---

## Spacing Standards

**Section Padding:** `py-20`, `py-24`, `py-32`  
**Container:** `max-w-7xl mx-auto px-6`  
**Component Gaps:** `gap-4`, `gap-6`, `gap-8`

---

## Component Patterns

### Buttons
**Primary CTA:**
```css
bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700
px-10 py-7 text-lg font-bold tracking-tight rounded-md
shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95
transition-all duration-300
```

### Cards
**Standard:**
```css
border border-slate-200 shadow-lg rounded-md bg-white
p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
```

### Form Elements
**Height:** `h-12`  
**Border:** `border-slate-300`  
**Focus:** `focus:border-blue-500 focus:ring-blue-500`  
**Labels:** `text-slate-700 font-bold uppercase text-xs tracking-wider`

---

## Responsive Design

**Breakpoints:** `sm:640px` `md:768px` `lg:1024px` `xl:1280px`

**Mobile-First Approach:** Design for mobile, enhance for larger screens

---

## Node.js Migration Notes

All API calls use `apiClient` abstraction (`components/utils/apiClient.js`). When migrating to Node.js, only update the implementation within `apiClient.js`. Frontend components remain unchanged.

---

See `components/ui/COMPONENT_GUIDE.md` for detailed component usage examples.