---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/brief-mfe-calendario.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
workflowType: 'architecture'
project_name: 'Siesa-Agents'
user_name: 'SiesaTeam'
date: '2026-02-02'
workflowMode: strict
lastStep: 8
status: complete
completedAt: '2026-02-02'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The project is a **Standalone Calendar Microfrontend (MFE)** designed to be consumed by other applications in the Siesa-Agents ecosystem.
- **Core Functionality**: Display current month grid, navigate between months, and select a single date.
- **Integration**: Must export a remote module via **Module Federation** (`./Widget`) and communicate via standard DOM events (`calendar:date-selected`).
- **Input/Output**: Receives no complex props initially; emits ISO 8601 date strings.
- **Development**: Supports standalone mode on port 3001 for isolated development.

**Non-Functional Requirements:**
- **Performance**: Strict budget of **< 50KB** bundle size and **< 50ms** render time.
- **Accessibility**: **WCAG 2.1 AA** mandatory, with full keyboard navigation (arrows) and screen reader support.
- **Isolation**: CSS must be scoped to avoid bleeding into/from host apps (using `siesa-ui-kit` with shadow DOM or specific prefixing/scoping strategies).
- **Consistency**: Must match `siesa-ui-kit` visual guidelines exactly.

**Scale & Complexity:**
- **Primary Domain**: Frontend / Shared Utility MFE.
- **Complexity Level**: Low. (Single autonomous widget, no backend dependencies, client-side state).
- **Estimated Architectural Components**: 5-7 (Main Widget Container, Grid Component, Header/Nav Component, Date Logic Hook, Event Dispatcher).

### Technical Constraints & Dependencies

- **Module Federation**: Must be built as a Federated Remote (not Single-SPA application, as it is a shared widget).
- **Shared Dependencies**: Must reuse `react`, `react-dom`, and `siesa-ui-kit` from host to minimize bundle size.
- **React 18+**: Required for `react-dom/client`.
- **Siesa UI Kit**: Mandatory dependency for styling and theming.

### Cross-Cutting Concerns Identified

- **Theming**: The widget must seamlessly adapt to the host's light/dark mode using CSS variables.
- **Event Bus**: Establishing a reliable contract for `calendar:date-selected` that works across framework boundaries.
- **Accessibility (a11y)**: Ensuring the complex grid navigation is navigable via keyboard and understandable by screen readers.
- **Versioning**: As a shared remote, changes must be backward compatible or versioned carefully.

## Starter Template Evaluation

### Primary Technology Domain

Frontend Microfrontend (Shared Widget) using Module Federation.

### Selected Starter: Vite React TypeScript (Standard)

**Rationale for Selection:**
Strictly following company standards (`technology-stack.md` and `vite-config-standard.md`) which mandate Vite 7+ with React and TypeScript. This project is a shared widget, so it requires the Module Federation configuration.

**Initialization Command:**

```bash
# Initialize standard Vite React TS project
npm create vite@latest mfe-calendar -- --template react-ts
cd mfe-calendar

# Install Mandatory Dependencies (Company Standard)
npm install
npm install siesa-ui-kit @tanstack/react-router zustand @tanstack/react-query class-variance-authority clsx tailwind-merge lucide-react

# Install Module Federation Plugin (Required for shared widget)
npm install @module-federation/vite --save-dev

# Install Testing Tools
npm install vitest @testing-library/react @testing-library/dom jsdom --save-dev
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- **TypeScript 5+** (Strict Mode)
- **React 18+** (Required for Siesa UI Kit compatibility)

**Styling Solution:**
- **TailwindCSS v4** (Company Standard)
- **Siesa UI Kit** (Mandatory Design System)
- **Shadcn/UI** and **Radix UI** primitives available via Siesa UI Kit

**Build Tooling:**
- **Vite 7+**: Optimized for fast HMR and Module Federation support.
- **Module Federation**: Configured as a Remote to expose `./Widget`.

**Testing Framework:**
- **Vitest**: Native Vite integration for unit tests.
- **React Testing Library**: For component interaction testing.

**Code Organization:**
- Feature-based structure following Clean Architecture as defined in `frontend-standards.md`.

**Development Experience:**
- Standalone development mode on port 3001.
- Hot Module Replacement (HMR).

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Microfrontend Strategy**: **Module Federation** (Strictly required for this shared widget).
- **State Management**: **React Internal State (`useState`)** for UI logic (Month navigation), **Custom Events** for external communication. No heavyweight global store needed for MVP.
- **Date Library**: **Native `Date` object** (per PRD) to keep bundle size minimal (<50KB). `Intl.DateTimeFormat` for localization.

**Important Decisions (Shape Architecture):**
- **Styling Engine**: **TailwindCSS v4** via `siesa-ui-kit` variables. No component-level CSS files.
- **Component Composition**: Atomic design using `siesa-ui-kit` primitives (`Button`, `IconButton`) composed into `CalendarGrid`.

**Deferred Decisions (Post-MVP):**
- **Internationalization (i18n)**: Hardcoded to `es-ES` for MVP (Month names), extensible via `Intl` later.
- **Complex Validation**: Blackout dates logic deferred to Phase 2.

### Data Architecture

- **Database**: None (Client-side widget).
- **Data Model**: Internal ephemeral state:
  ```typescript
  interface CalendarState {
    currentDate: Date;      // The reference date for the grid
    selectedDate?: Date;    // The user's selection
  }
  ```
- **Persistence**: None. State resets on unmount/remount (unless props provide initial value).

### Authentication & Security

- **Authentication**: Inherited/Managed by Host Application. Widget is purely presentational.
- **Security**:
  - **Input Sanitization**: None needed (no inputs, only clicks).
  - **Isolation**: CSS Scoping via naming conventions or Shadow DOM (if critical, but standard implies CSS isolation via build tool).

### API & Communication Patterns

- **External Communication**: **Event-Driven Architecture**.
  - **Output**: Dispatch `calendar:date-selected` (CustomEvent) on window/container.
  - **Input**: Props for `initialDate` (optional).
- **Internal Communication**: Props drilling or Composition.

### Frontend Architecture

- **Pattern**: **Clean Architecture (Light)** suited for a single module.
  - `presentation/`: Components (`Widget`, `CalendarGrid`, `Header`).
  - `application/`: Logic hooks (`useCalendar`).
  - `domain/`: Types and Date helpers.
- **Routing**: None (Single view widget).
- **Bundle Strategy**: Single `remoteEntry.js` exposing `Widget`. Shared chunks for React/Siesa-UI-Kit.

### Infrastructure & Deployment

- **Hosting**: Static file hosting (CDN) for `remoteEntry.js` and assets.
- **CI/CD**: Standard pipeline to build and publish artifacts to registry/CDN.
- **Versioning**: Semantic Versioning (SemVer) critical for Module Federation consumers.

### Decision Impact Analysis

**Implementation Sequence:**
1.  **Scaffold**: Initialize Vite + Module Federation + Tailwind.
2.  **Domain**: Implement `useCalendar` hook (Date math).
3.  **UI**: Build `CalendarGrid` using `siesa-ui-kit`.
4.  **Integration**: Configure `remoteEntry` exposure.
5.  **Events**: Wire up `onClick` to `CustomEvent` dispatch.

**Cross-Component Dependencies:**
- The `Widget` depends on `siesa-ui-kit` availability in the Host environment (Shared Dependency).

## Implementation Patterns & Consistency Rules

### Strictly Applied Company Patterns

**Code Organization:**
- **Feature-Based Structure**: `src/modules/[feature]/presentation|application|domain` (Clean Architecture).
- **File Naming**: `kebab-case` for files/folders (`calendar-grid.tsx`).
- **Component Naming**: `PascalCase` (`CalendarGrid`).
- **Shared Utilities**: `src/shared/lib`, `src/shared/components`.

**Technology Standards:**
- **Styling**: Tailwind CSS classes (`className="p-4"`) + `cn()` utility for merging.
- **Testing**: `describe`, `it`, `expect` (Vitest).

### Widget-Specific Patterns

#### Naming Patterns

- **Events**: `calendar:[action]` (e.g., `calendar:date-selected`, `calendar:month-changed`).
- **Exports**: `Widget` (Main entry component), `remoteEntry.js` (Federation entry).

#### Structure Patterns

**Federated Module Structure:**
```
src/
  modules/
    calendar/
      domain/
        types.ts          # CalendarLogic, DateRange
        constants.ts      # WEEKDAYS, MONTHS
      application/
        useCalendar.ts    # Hook for grid generation & navigation
      presentation/
        Widget.tsx        # Main container (federated export)
        components/
          CalendarGrid.tsx
          CalendarHeader.tsx
          DayCell.tsx
```

#### Communication Patterns

**Output Events (DOM CustomEvent):**
```typescript
const event = new CustomEvent('calendar:date-selected', {
  detail: { date: '2026-02-02' }, // ISO string YYYY-MM-DD
  bubbles: true,
  composed: true
});
window.dispatchEvent(event);
```

**Input Props (Widget Interface):**
```typescript
interface CalendarWidgetProps {
  initialDate?: string; // ISO string
  onDateSelected?: (date: string) => void; // Optional direct callback support
  className?: string; // Allow host overriding container styles
}
```

#### Process Patterns

- **Error Handling**: Use `ErrorBoundary` inside `Widget` to preventing crashing the Host app.
- **Isolation**: Prefix all local storage keys (if used) with `mfe-calendar:`.
- **Loading State**: Render a Skeleton (via `siesa-ui-kit`) matching dimensions `w-full h-[300px]` while Module Federation is loading or internal logic is initializing.

### Enforcement Guidelines

**All AI Agents MUST:**
- Use `date-fns` or native `Date` (per strict complexity decision), NOT `moment.js` or `dayjs` unless approved.
- Use `siesa-ui-kit` components for all UI elements (`Button`, `IconButton`, `Text`).
- Follow the `calendar:` event namespace strictly to ensure Host integration.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
mfe-calendar/
├── package.json
├── vite.config.ts               # Module Federation Configuration
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── .gitignore
├── README.md
├── index.html                   # HTML entry for standalone dev
├── public/
│   └── favicon.ico
└── src/
    ├── main.tsx                 # React Root for standalone dev
    ├── App.tsx                  # Dev wrapper layout
    ├── index.css                # Tailwind imports
    ├── vite-env.d.ts
    ├── remoteEntry.ts           # Optional: Explicit entry type
    │
    ├── modules/                 # Business Logic Modules
    │   └── calendar/
    │       ├── domain/          # Types & Constants
    │       │   ├── types.ts     # Date types, Event interfaces
    │       │   └── constants.ts # Weekday names, config
    │       ├── application/     # Logic Hooks & Use Cases
    │       │   ├── useCalendar.ts
    │       │   └── __tests__/
    │       │       └── useCalendar.test.ts
    │       └── presentation/    # UI Components
    │           ├── Widget.tsx   # Main Exported Component
    │           ├── components/
    │           │   ├── CalendarGrid.tsx
    │           │   ├── CalendarHeader.tsx
    │           │   └── DayCell.tsx
    │           └── __tests__/
    │               ├── CalendarGrid.test.tsx
    │               └── Widget.test.tsx
    │
    └── shared/                  # Utilities shared internally
        ├── lib/
        │   └── utils.ts         # cn() helper
        └── components/          # Local generic components (if not in UI Kit)
```

### Architectural Boundaries

**API Boundaries:**
- **Input**: `Widget` Props (`initialDate`, `onDateSelected`).
- **Output**: Custom Events (`calendar:date-selected`) dispatch on `window`.
- **No Backend**: This widget is strictly client-side.

**Component Boundaries:**
- **Widget**: The boundary of the Microfrontend. Outside is Host, Inside is MFE.
- **Internal**: `CalendarGrid` manages the view state, `CalendarHeader` manages navigation.

**Data Boundaries:**
- State is ephemeral and local.
- No access to Host Application store (Redux/Context) except via passed Props.

### Requirements to Structure Mapping

**Feature: Calendar Widget**
- **Logic**: `src/modules/calendar/application/useCalendar.ts` (Date math, navigation).
- **UI**: `src/modules/calendar/presentation/components/` (Grid, Cells).
- **Public API**: `src/modules/calendar/presentation/Widget.tsx` (Event dispatching).

**Cross-Cutting Concerns:**
- **Styling**: `src/index.css` (Tailwind) + `siesa-ui-kit` (External Dependency).
- **Testing**: `src/**/__tests__` (Colocated with code).

### Integration Points

**Internal Communication:**
- `useCalendar` hook provides state to `CalendarGrid` and `CalendarHeader`.
- Props passed down from `Widget` to children.

**External Integrations:**
- **Host App**: Imports `./Widget` from `remoteEntry.js`.
- **Siesa UI Kit**: Imported as a shared dependency (singleton).

### File Organization Patterns

**Configuration Files:**
- Root level (`vite.config.ts`, `tailwind.config.ts`) for build settings.

**Source Organization:**
- Feature-based (`modules/calendar`) to allow future expansion (e.g., `modules/scheduler` could be added later).

**Asset Organization:**
- `public/` for static assets if needed (icons usually inlined or from UI Kit).

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices (Vite, React, TypeScript, Module Federation) are standard, compatible, and widely used in the ecosystem. Versions (Vite 7+, React 18+) are aligned.

**Pattern Consistency:**
Clean Architecture patterns (`domain/application/presentation`) are consistently applied to the single feature module. Naming conventions (`kebab-case` files, `PascalCase` components) are standard.

**Structure Alignment:**
The project structure explicitly separates business logic (`application/`) from UI (`presentation/`), enabling the "headless" implementation if needed later (e.g., swapping UI Kit).

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
- **Navigation/Grid**: Covered by `useCalendar` hook logic.
- **Selection**: Covered by `Widget` state and `CalendarGrid` interaction.
- **Integration**: Covered by `remoteEntry.js` exposure and Custom Events pattern.

**Non-Functional Requirements Coverage:**
- **Performance**: Minimal bundle size ensured by excluding shared deps (React, UI Kit) from build via Module Federation.
- **Accessibility**: Enforced via `siesa-ui-kit` primitives and explicit usage guidelines.
- **Isolation**: Covered by Module Federation isolation and scoped CSS (Tailwind).

### Implementation Readiness Validation ✅

**Decision Completeness:** All critical decisions (Stack, State, Pattern) are documented.
**Structure Completeness:** Directory tree is complete down to the file level.
**Pattern Completeness:** Naming and communication patterns are explicit.

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High
**Key Strengths:** Strict adherence to company standards ensures easy integration; lightweight architecture fits the "Widget" scope perfectly.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented.
- Use `npm create vite` with the specified template.
- Implement the `useCalendar` hook first (Domain logic) before the UI.

**First Implementation Priority:**
Initialize project with:
```bash
npm create vite@latest mfe-calendar -- --template react-ts
```

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-02-02
**Document Location:** _bmad-output/planning-artifacts/architecture.md

### Final Architecture Deliverables

**📋 Complete Architecture Document**
- Validated decisions for Module Federation, React, and TypeScript.
- Explicit patterns for Event-Driven Communication and Clean Architecture.
- Complete `mfe-calendar` directory structure.

**🏗️ Implementation Ready Foundation**
- **Starter:** Vite React TS + Module Federation.
- **Components:** Widget, CalendarGrid, CalendarHeader.
- **State:** Local `useState` + Custom Events.

**📚 AI Agent Implementation Guide**
- Follow `framework-standards.md` for coding style.
- Adhere to `siesa-ui-kit` usage.
- Respect the `calendar:` event namespace.

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing Siesa-Agents. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
Initialize project:
```bash
npm create vite@latest mfe-calendar -- --template react-ts
```

**Development Sequence:**
1.  Initialize project.
2.  Install dependencies (including `siesa-ui-kit` and `@module-federation/vite`).
3.  Implement `useCalendar` domain logic.
4.  Build UI components (`CalendarGrid`) with `siesa-ui-kit`.
5.  Configure Module Federation exposure.

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] Tech stack (Vite/React/TS) is standard and compatible.
- [x] Patterns (Clean Arch) fit the feature size.

**✅ Requirements Coverage**
- [x] Grid/Nav/Selection FRs covered.
- [x] Performance/Isolation NFRs covered.

**✅ Implementation Readiness**
- [x] Structure is fully defined.
- [x] Commands are explicit.

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.
