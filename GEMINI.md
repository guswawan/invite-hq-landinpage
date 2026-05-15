# Project Instructions: Undangku Landing Page

This file provides architectural guidance and engineering standards for the Undangku landing page project.

## 🛠 Tech Stack & Patterns

- **Framework**: Astro 6 (SSG).
- **UI & Animations**: React 19 + Framer Motion.
- **Styling**: Tailwind CSS 4 with the `cn()` utility from `@/lib/utils`.
- **Interactivity**: 
  - Use **Event Delegation** on the `document` level for global UX patterns (e.g., custom cursor) to ensure compatibility with dynamically rendered React components.
  - Prefer **Semantic Buttons** (`<button type="button">`) for all non-link triggers to ensure accessibility and prevent unintended navigation.

## ⚡ Performance Mandates

- **Hydration**: Always optimize hydration. Avoid duplicate rendering of the same React component for different breakpoints. Use CSS Grid or specialized responsive components to manage layout shifts.
- **Images**: 
  - Use `loading="eager"` for Hero/LCP assets.
  - Use native `<img>` tags with `loading="lazy"` for collection items (prefer this over CSS `background-image` for better SEO and performance).
- **Animations**: Always use `will-change-transform` for complex animations to ensure GPU acceleration.

## 📁 Component Guidelines

- **Atomic Structure**: Keep components isolated and focused. 
- **Data-Driven**: Maintain static data (events, testimonials) in `src/data/` to keep page logic clean.
- **Client Directives**: Use `client:load` for critical interactive elements in the Hero section, and `client:visible` for elements further down the page to optimize initial load.

---
*Created during the Hero Section Refactor session, May 2026.*
