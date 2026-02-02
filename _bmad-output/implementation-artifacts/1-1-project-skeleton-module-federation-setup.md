# Story 1.1: Project Skeleton & Module Federation Setup

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer,
I want to initialize the project with Vite, Siesa UI Kit, and Module Federation configuration,
So that I have a foundation that can be consumed as a remote by other applications.

## Acceptance Criteria

1. **Given** A fresh development environment
2. **When** I run the initialization scripts and start numbers
3. **Then** The application should run in standalone mode on port 3001
4. **And** The build command should generate a `remoteEntry.js` file in the dist folder
5. **And** The Module Federation config should expose `./Widget` mapping to `src/presentation/Widget.tsx`
6. **And** Tailwind configurations should include `siesa-ui-kit` content paths

## Technical Implementation Guide

### Architecture Patterns
*   **Pattern**: Clean Architecture (Light) - see `_bmad-output/planning-artifacts/architecture.md`.
*   **Microfrontend**: Module Federation Remote using `@module-federation/vite`.
*   **Structure**: Feature-based (`src/modules/calendar`).

### Tech Stack & Libraries
*   **Vite**: v7.x (Latest recommended)
*   **React**: v19.x (Latest recommended)
*   **TypeScript**: 5+
*   **TailwindCSS**: v4.0
*   **Module Federation**: `@module-federation/vite`

### 🎨 UI Implementation Requirements (MANDATORY)
- **Library**: `siesa-ui-kit`
- **Install**: `npm install siesa-ui-kit` (Ensure dependency is present)
- **Usage**: You MUST use `siesa-ui-kit` components for all UI elements.
- **Constraint**: Do not create custom components if a Kit equivalent exists.

### Testing Requirements
- **Vitest**: Native Vite integration.
- **React Testing Library**: For component testing.

### File Structure
Follow the structure defined in `architecture.md`:
```
src/
  modules/
    calendar/
      presentation/
        Widget.tsx        # Main Exported Component
```

## Contextual Intelligence

### Git History Context
New project initialization. No previous history to consider.

### Latest Web Research
- Ensure compatibility between Vite 7 and Module Federation plugin.
- Verify Tailwind 4 configuration (no PostCSS usually needed).

## Tasks / Subtasks

- [x] Initialize Project (AC: 1, 3)
  - [x] Use `npm create vite@latest mfe-calendar -- --template react-ts`
  - [x] Install dependencies: `react`, `react-dom`, `@module-federation/vite`, `siesa-ui-kit`, `tailwindcss`, `vitest`
- [x] Configure Vite & Module Federation (AC: 4, 5)
  - [x] Configure `vite.config.ts` with federation plugin
  - [x] Set port 3001
  - [x] Expose `./Widget`
- [x] Configure Tailwind & UI Kit (AC: 6)
  - [x] Setup `tailwind.config.ts` (or v4 CSS import)
  - [x] Include siesa-ui-kit content paths
- [x] Create Entry Component
  - [x] Create `src/modules/calendar/presentation/Widget.tsx`
- [x] Verify Build
  - [x] Run build and check for `remoteEntry.js`

## Dev Notes

- Avoid over-engineering the initial setup. Stick to the generated template structure but adopt the folder structure from Architecture.
- Ensure `modules/calendar` structure is created.

### References
- [Architecture Document](_bmad-output/planning-artifacts/architecture.md)
- [PRD](_bmad-output/planning-artifacts/prd.md)

## Dev Agent Record

### Agent Model Used
Claude Code

### Debug Log References
- Fixed Peer Dependency conflict between Vite 7 and Module Federation by pinning Vite to 7.1.7.
- Re-initialized project structure as it was empty/corrupt.
- Disabled Federation plugin during test mode to resolve usage issues with Vitest.
- Fixed App.tsx to render Widget in standalone mode.
- Added siesa-ui-kit source to index.css for Tailwind config.
- Moved development dependencies to devDependencies in package.json.
- Cleaned up git trash files.

### Completion Notes List
- Validated build generates `remoteEntry.js`.
- Implemented `Widget.tsx` using `siesa-ui-kit` Button.
- Added component tests checking rendering.
- Configured Tailwind 4 via CSS import.

### File List
- mfe-calendar/package.json
- mfe-calendar/vite.config.ts
- mfe-calendar/src/modules/calendar/presentation/Widget.tsx
- mfe-calendar/src/modules/calendar/presentation/__tests__/Widget.test.tsx
- mfe-calendar/src/main.tsx
- mfe-calendar/src/index.css
- mfe-calendar/src/App.tsx
- mfe-calendar/index.html
- mfe-calendar/.gitignore
