---
project_name: 'Siesa-Agents'
user_name: 'SiesaTeam'
date: '2026-02-02'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - quality_rules
  - workflow_rules
  - anti_patterns
status: 'complete'
rule_count: 25
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Runtime**: React 18+ (Singleton via Module Federation)
- **Language**: TypeScript 5+ (Strict Mode, NO `any`)
- **Bundler**: Vite 7+ (Optimized for Module Federation)
- **Styling**: TailwindCSS v4 + `siesa-ui-kit` variables
- **MFE Strategy**: Module Federation (Latest) - Expose `./Widget`
- **Testing**: Vitest (Latest) + React Testing Library
- **State**: React `useState` (Local only) + Custom Events
- **Dates**: Native `Date` object (Use `Intl` for formatting)

## Critical Implementation Rules

### Language-Specific Rules

- **Strict TypeScript**: No `any`, `unknown` only when necessary.
- **Imports**: Use aliases (`@/modules`, `@/shared`) instead of relative paths `../../`.
- **Comments**: Write all code comments/docs in **English**.
- **User Text**: Write all user-facing text strings in **Spanish**.

### Framework-Specific Rules (React MFE)

- **Entry Point**: `src/modules/calendar/presentation/Widget.tsx` is the Federation entry.
- **UI Components**: **MUST** use `siesa-ui-kit` primitives (`Button`, `Text`). Do not build from scratch.
- **Styling**: Use `className` with Tailwind utility classes. Use `cn()` for conditional merging.
- **Communication (Output)**: Dispatch `CustomEvent('calendar:date-selected', { detail: { date } })` on `window`.
- **Communication (Input)**: Receive data via standard React Props (`initialDate`, `onDateSelected`).

### Testing Rules

- **Unit Tests**: `src/**/__tests__/*.test.ts` using Vitest.
- **Component Tests**: `src/**/__tests__/*.test.tsx` using React Testing Library.
- **Coverage**: Focus on business logic (`useCalendar.ts`) and interaction flows.

### Code Quality & Style Rules

- **Naming Components**: `PascalCase` (e.g., `CalendarGrid.tsx`).
- **Naming Files**: `kebab-case` (e.g., `calendar-grid.tsx`).
- **Structure**: Clean Architecture (`domain` -> `application` -> `presentation`).
- **No Global Store**: Do not introduce Redux/Context for this isolated widget.

### Development Workflow Rules

- **Dev Mode**: Run `npm run dev` (Port 3001).
- **Build**: `npm run build` must generate `remoteEntry.js`.
- **Deployment**: Static file hosting (CDN) for federation.

### Critical Don't-Miss Rules

- **🔴 MFE Isolation**: This is a SHARED WIDGET. Do not assume it runs as the root app.
- **🔴 Bundle Size**: Strictly < 50KB. Do not import heavy libraries like `moment`, `lodash`.
- **🔴 Date Handling**: User native `Date` object. Formatting via `Intl.DateTimeFormat`.
- **🔴 Prefixing**: Prefix local storage keys with `mfe-calendar:` to avoid collisions.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-02-02
