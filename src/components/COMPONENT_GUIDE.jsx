# Shadcn/ui Component Usage Guide

This directory contains UI components adapted from `shadcn/ui`. These components serve as the foundational building blocks for all Pacific Engineering applications.

---

## Core Principles

### 1. Reusability First
Always use existing UI components before creating new ones. If functionality differs significantly, extend rather than recreate.

### 2. Tailwind-Based Customization
All styling is done via Tailwind CSS classes using the `className` prop. Avoid inline styles.

### 3. Accessibility by Default
All components include proper ARIA attributes, keyboard navigation, and focus management. Maintain these when extending.

### 4. Node.js Compatible
These are pure React + Tailwind components with zero Base44 dependencies. They work seamlessly in any React environment.

### 5. Consistent Styling
Follow the established patterns from the main Style Guide (`STYLE_GUIDE.md`) for:
- Colors (blues, cyans, teals, slate greys)
- Spacing (h-12 for inputs, p-8 for cards)
- Shadows and borders
- Hover effects and transitions

---

## Component Patterns

### Buttons

#### Primary CTA (Gradient)
```jsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

<Button 
  size="lg" 
  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-7 text-lg font-bold tracking-tight rounded-md shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
>
  Click Me
  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
</Button>
```

#### Standard Button
```jsx
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Standard Action
</Button>
```

#### Outline Button
```jsx
<Button variant="outline" className="border-slate-300 hover:bg-slate-50">
  Secondary Action
</Button>
```

### Cards

#### Standard Card
```jsx
import { Card } from "@/components/ui/card";

<Card className="p-8 border border-slate-200 shadow-lg rounded-md bg-white">
  <h3 className="text-2xl font-bold text-slate-900 mb-4">Card Title</h3>
  <p className="text-slate-600">Card content...</p>
</Card>
```

#### Hover Card (Interactive)
```jsx
<Card className="p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-md bg-white cursor-pointer group">
  {/* Content with group-hover effects */}
</Card>
```

#### Card with Colored Accent
```jsx
<Card className="overflow-hidden border border-slate-200 shadow-lg rounded-md bg-white">
  <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
  <div className="p-8">
    {/* Content */}
  </div>
</Card>
```

### Form Elements

#### Complete Form Field
```jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div>
  <Label htmlFor="email" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
    Email Address *
  </Label>
  <Input
    id="email"
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="you@example.com"
    className="h-12 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
  />
</div>
```

#### Textarea Field
```jsx
import { Textarea } from "@/components/ui/textarea";

<div>
  <Label htmlFor="message" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
    Message *
  </Label>
  <Textarea
    id="message"
    required
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Tell us about your project..."
    className="min-h-[150px] rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500"
  />
</div>
```

#### Select Dropdown
```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<div>
  <Label className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
    Select Option
  </Label>
  <Select value={value} onValueChange={setValue}>
    <SelectTrigger className="h-12 bg-white rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500">
      <SelectValue placeholder="Choose an option..." />
    </SelectTrigger>
    <SelectContent className="rounded-md">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </Select>
</div>
```

---

## Validation States

### Error State
```jsx
<Input
  className={`h-12 rounded-md ${validationErrors.field ? 'border-red-500' : 'border-slate-300'}`}
/>
{validationErrors.field && (
  <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.field}</p>
)}
```

### Success State
```jsx
<div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
  <CheckCircle className="w-5 h-5 text-green-600" />
  <p className="text-green-700 text-sm font-medium">Success message</p>
</div>
```

### Loading State
```jsx
import { Loader2 } from "lucide-react";

<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</Button>
```

---

## Icon Usage Guidelines

### Standard Icons
```jsx
import { CheckCircle, ArrowRight, Mail } from "lucide-react";

// Small icon (inline with text)
<CheckCircle className="w-5 h-5 text-blue-600" />

// Medium icon (buttons, cards)
<Mail className="w-6 h-6 text-white" />

// Large icon (feature displays)
<ArrowRight className="w-8 h-8 text-blue-600" />
```

### Icon with Gradient Background (Feature Icons)
```jsx
<div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-md w-16 h-16 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
  <CheckCircle className="w-8 h-8 text-white" />
</div>
```

### Animated Icons (in Buttons)
```jsx
<Button className="group">
  Button Text
  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
</Button>
```

---

## Common Component Combinations

### Feature Card (Services, Benefits)
```jsx
<Card className="p-8 text-center border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-md bg-white group">
  <div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
    <Icon className="w-8 h-8 text-white" />
  </div>
  <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Feature Title</h3>
  <p className="text-slate-600 leading-relaxed">Feature description text...</p>
</Card>
```

### Information Card with Accent
```jsx
<Card className="overflow-hidden border border-slate-200 shadow-xl rounded-md bg-white">
  <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
  <div className="p-8">
    <h3 className="text-3xl font-bold text-slate-900 mb-4">Section Title</h3>
    <p className="text-slate-600 text-lg">Content...</p>
  </div>
</Card>
```

### Contact Information Card
```jsx
<Card className="p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-md group">
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div>
      <h3 className="font-bold text-slate-900 mb-1 uppercase tracking-wide">Label</h3>
      <p className="text-blue-600 hover:text-blue-800 text-lg font-bold">
        Contact Information
      </p>
    </div>
  </div>
</Card>
```

---

## Monorepo Extraction Strategy

When creating the shared UI package for your monorepo:

### 1. Export All Components
Create an `index.js` in `components/ui/`:
```javascript
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';
// ... export all components
```

### 2. Package.json for @pacific/ui
```json
{
  "name": "@pacific/ui",
  "version": "1.0.0",
  "main": "index.js",
  "peerDependencies": {
    "react": "^18.2.0",
    "lucide-react": "^0.475.0",
    "tailwindcss": "^3.0.0"
  }
}
```

### 3. Import in Other Apps
```javascript
// In marketing-site, internal-portal, client-portal
import { Button, Card, Input } from '@pacific/ui';
```

---

## Future Enhancements

### TypeScript Migration
Consider adding TypeScript definitions for type safety:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
```

### Theme Provider
For consistent theming across portals, consider wrapping in a theme provider:
```jsx
<ThemeProvider theme={pacificEngineeringTheme}>
  <App />
</ThemeProvider>
```

### Storybook Integration
Document components visually using Storybook for design system documentation.

---

**This guide should be referenced when:**
- Creating new UI components
- Styling existing components
- Ensuring cross-portal consistency
- Onboarding new developers
- Planning the monorepo extraction

All modifications should align with both this component guide and the main `STYLE_GUIDE.md`.