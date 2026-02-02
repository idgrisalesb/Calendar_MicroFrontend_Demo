# Story 1.2: Business Logic Implementation (useCalendar Hook)

**Status:** ready-for-dev
**Epic:** 1 - Implementación del Widget de Calendario Microfrontend

## User Story

**As a** Developer,
**I want** to encapsulate the date validation, grid generation, and navigation logic in a custom hook,
**So that** the UI layer remains purely presentational and logic can be tested in isolation.

## Acceptance Criteria

- **Given** The `useCalendar` hook
- **When** I call it with a specific date (e.g., Feb 2026)
- **Then** It should return an array of days representing the 7x6 grid
- **And** It should correctly identify "padding days" from the previous and next months
- **And** It should correctly handle Leap Years (e.g., Feb 29, 2024)
- **And** It should provide functions to jump to `nextMonth` and `prevMonth`

## Technical Implementation Guide

### Architecture Patterns
- **Clean Architecture:** Place the hook in `src/modules/calendar/application/useCalendar.ts`.
- **Domain Types:** Define `CalendarDay`, `CalendarState` in `src/modules/calendar/domain/types.ts`.
- **Pure Logic:** Ensure the hook returns *data* (arrays of objects), not UI components.

### Tech Stack & Libraries
- **Language:** TypeScript
- **Framework:** React 18+ (Hooks)
- **Date Logic:** Native `Date` object and `Intl` API (No heavy external libraries).
- **Testing:** `vitest` for unit testing.

### UI Implementation Requirements
*N/A - This story focuses on Business Logic / Hooks.*

### Testing Requirements
- **Unit Tests:** Create `src/modules/calendar/application/__tests__/useCalendar.test.ts`.
- **Cases:**
  - Test month transition (Jan 31 -> Next -> Feb).
  - Test leap year calculation (Feb 2024 vs Feb 2025).
  - Test grid size (always 42 cells / 6 rows).
  - Test padding days (previous month days at start, next month days at end).

### File Structure Requirements
```
src/
  modules/
    calendar/
      domain/
        types.ts          # Define CalendarDay interface
        constants.ts      # WEEKDAYS constant
      application/
        useCalendar.ts    # The Hook
        __tests__/
          useCalendar.test.ts
```

## Contextual Intelligence

### Latest Tech Info
- **Date Logic:** Native `Date` object is sufficient.
  - *Tip:* `new Date(year, month + 1, 0).getDate()` gives the last day of the month.
  - *Tip:* `new Date(year, month, 1).getDay()` gives the weekday index of the 1st.
- **Performance:** Memoize the grid calculation using `useMemo` so it doesn't recalculate on unrelated renders.

### Previous Story Context
- **1-1 Project Skeleton:** The project structure should already exist. Ensure you are working within the `mfe-calendar` directory.

### Git Context
- Use the `mfe-calendar` subdirectory.
- Follow commit message convention: `feat(calendar): implement useCalendar hook logic`.
