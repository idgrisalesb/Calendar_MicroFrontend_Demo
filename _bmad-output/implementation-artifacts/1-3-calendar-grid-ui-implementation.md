# Story 1.3: Calendar Grid UI Implementation

**Status:** done
**Epic:** 1 - Implementación del Widget de Calendario Microfrontend

## User Story

**As a** End User (HR Manager),
**I want** to view a clear, standard monthly calendar grid and navigate between months,
**So that** I can easily locate and select the correct date for my task.

## Acceptance Criteria

### Visual & Interactive
- **Given** the Calendar Widget is open
- **When** I view the grid
- **Then** I should see a 7x6 matrix of days (42 cells)
- **And** The days of the current month should be clearly visible (Foreground Color)
- **And** The days of previous/next months should be visually "muted" (Opacity/Gray)
- **And** "Today" should be distinct (e.g., Bold or Accent Background)

- **Given** a date is selected
- **When** I view that date
- **Then** it must have a Primary Background color (Selected State)

- **Given** the navigation header
- **When** I click "Next" (Chevron Right)
- **Then** the grid should update to the next month immediately
- **And** I click "Previous" (Chevron Left)
- **Then** the grid should update to the previous month immediately

### Accessibility (Compliance)
- **Given** I am using a Keyboard
- **When** I press Arrow Keys (Up/Down/Left/Right)
- **Then** focus should move logically through the grid
- **And** pressing Enter/Space should select the focused date

## Tasks

- [x] **Infrastructure Setup**
    - [x] Verify `siesa-ui-kit` installation and Tailwind configuration.
    - [x] Create directory structure `src/modules/calendar/presentation/components`.

- [x] **Component Implementation: Atoms**
    - [x] Implement `DayCell.tsx`:
        - [x] Use `Button` (ghost).
        - [x] Handle props: `date`, `isSelected`, `isToday`, `isOutsideMonth`.
        - [x] Add `aria-label`.

- [x] **Component Implementation: Molecules**
    - [x] Implement `CalendarHeader.tsx`:
        - [x] Display formatted month/year.
        - [x] Add "Prev" and "Next" buttons with Icons.
        - [x] Wire up `onPrevMonth` and `onNextMonth` callbacks.

- [x] **Component Implementation: Organisms**
    - [x] Implement `CalendarGrid.tsx`:
        - [x] Consume `useCalendar` hook.
        - [x] Render 7-column header (Mo, Tu, We...).
        - [x] Render 6-row grid of `DayCell`s.
        - [x] Implement keyboard navigation logic (Grid focus management).

- [x] **Testing**
    - [x] Create `CalendarGrid.test.tsx`.
    - [x] Test rendering of 42 cells.
    - [x] Test accurate class application for states (selected, etc.).
    - [x] Test navigation callbacks.

## Technical Implementation Guide

### Architecture Patterns
- **Pattern:** Clean Architecture (Presentation Layer)
- **Location:** `src/modules/calendar/presentation/components/`
- **Logic:** Consume `useCalendar` hook (created in Story 1.2) for grid data.

### 🎨 UI Implementation Requirements (MANDATORY)
- **Library**: `siesa-ui-kit` (Radix UI + Shadcn wrapper)
- **Install**: `npm install siesa-ui-kit` (Ensure dependency is present)
- **Usage**: You MUST use `siesa-ui-kit` components for all UI elements.
    - `Button` (variant="ghost") for Day Cells.
    - `Button` (variant="outline" or "ghost") + Icons for Navigation.
    - `cn` utility for class merging.
- **Constraint**: Do not create custom button components; compose existing atoms.

### File Structure Requirements
```
src/
  modules/
    calendar/
      presentation/
        components/
          CalendarGrid.tsx      # Renders the 7x6 grid
          CalendarHeader.tsx    # Renders Month Title + Nav Buttons
          DayCell.tsx           # Individual button component
        __tests__/
          CalendarGrid.test.tsx
```

### Testing Requirements
- **Unit Tests:**
  - Verify grid renders correct number of cells (42).
  - Verify clicking a date calls `onSelect` handler.
  - Verify navigation buttons call `onNextMonth` / `onPrevMonth`.
  - **A11y Test:** Verify arrow key navigation moves focus.

## Contextual Intelligence

### Previous Story (1.2) Learnings
- Logic is already available in `useCalendar`. Do not re-implement date math.
- Types `CalendarDay` are defined in `domain/types.ts`.

### Latest Tech Info & Research
- **Shadow DOM Warning:** If this MFE runs in Shadow DOM, ensure `siesa-ui-kit` Popovers (if used later) have the correct container context. For this story (Grid), standard Flow layout is fine.
- **Accessibility:** Use `role="grid"` for the container and `role="gridcell"` for days if not using standard `<button>` semantics. Since we are using `<Button>`, ensure `aria-label` reads the full date (e.g., "Tuesday, February 3, 2026").

## File List

- mfe-calendar/src/modules/calendar/presentation/components/DayCell.tsx
- mfe-calendar/src/modules/calendar/presentation/components/__tests__/DayCell.test.tsx
- mfe-calendar/src/modules/calendar/presentation/components/CalendarHeader.tsx
- mfe-calendar/src/modules/calendar/presentation/components/__tests__/CalendarHeader.test.tsx

## Dev Agent Record

- Implemented DayCell component using siesa-ui-kit Button (ghost).
- Added unit tests for DayCell.
- Implemented CalendarHeader component using siesa-ui-kit Button and lucide-react Icons.
- Added unit tests for CalendarHeader.
- mfe-calendar/src/modules/calendar/presentation/components/CalendarGrid.tsx
- mfe-calendar/src/modules/calendar/presentation/components/__tests__/CalendarGrid.test.tsx

## Dev Agent Record (Continued)

- Implemented CalendarGrid component integrating useCalendar hook, CalendarHeader, and DayCell grid.
- Implemented keyboard navigation for grid accessibility.
- Added comprehensive tests for CalendarGrid including accessibility checks.
- Refactored DayCell to use `cn` utility for class merging (Compliance Fix).
- Optimized DayCell performance by moving Intl formatter outside render loop.
- Updated CalendarGrid to use dynamic localized weekdays.
- Improved Accessibility by adding role="gridcell" to DayCell components.
