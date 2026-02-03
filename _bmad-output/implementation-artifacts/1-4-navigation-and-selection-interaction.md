# Story 1.4: Navigation and Selection Interaction

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

**As a** End User,
**I want** to switch between months and click a date to select it,
**So that** I can choose a date in the future or past.

## Acceptance Criteria

### Interaction & Logic
- **Given** the Calendar Widget is open
- **When** I click the "Next Month" button
- **Then** The grid should instantly update to the next month (e.g., Feb -> Mar)
- **When** I click the "Previous Month" button
- **Then** The grid should instantly update to the previous month
- **When** I click a valid date cell
- **Then** The cell should enter a "Selected" visual state (Primary color)
- **And** The `calendar:date-selected` CustomEvent should be dispatched with the ISO date payload
- **And** The widget should prevent selection of disabled/invalid dates if defined

### Accessibility (Mandatory)
- **Given** I am navigating via keyboard
- **When** I press **ArrowRight** / **ArrowLeft**
- **Then** Focus should move to the next/previous day
- **When** I press **ArrowUp** / **ArrowDown**
- **Then** Focus should move to the same day in previous/next week
- **When** I press **Enter** or **Space** on a focused date
- **Then** That date should be selected
- **When** I navigate to a new month via keyboard (focusing last day + ArrowRight)
- **Then** The month should NOT automatically change (unless explicitly designed), usually focus stays clamped or wraps. *Clarification: Standard grid behavior is usually bounded, necessitating Tab to Nav buttons for month change, OR automatic month change on boundary cross. Use `useCalendar` logic capability.*

## Tasks / Subtasks

- [x] Logic Integration
    - [x] Connect `onNextMonth` and `onPrevMonth` from `useCalendar` to `CalendarHeader` buttons.
    - [x] Create `handleDateSelect` function in `CalendarGrid` that updates local state and calls `onDateSelected` prop/event.

- [x] Interaction Implementation
    - [x] Update `DayCell` to handle `onClick` event.
    - [x] Implement visual feedback for selection (ensure `isSelected` prop works).
    - [x] Implement `CustomEvent` dispatch logic in `Widget` or `CalendarGrid` when a date is selected.

- [x] Accessibility (Keyboard Nav)
    - [x] Implement `handleKeyDown` on the Grid container or Day cells.
    - [x] Manage focus state (using `useRef` array or `roving-tabindex` pattern).
    - [x] Ensure `aria-selected` is true for the selected date.

- [x] Testing
    - [x] Update `CalendarGrid.test.tsx` to simulate clicks and verify state changes.
    - [x] Test keyboard navigation (Arrow keys moving focus).
    - [x] Test Custom Event dispatching.

## Dev Notes

### Technical Implementation Guide

**Architecture Patterns**
- **Pattern:** Clean Architecture (Presentation Layer)
- **Location:** `src/modules/calendar/presentation/components/`
- **Logic:** Consume `useCalendar` hook (from Story 1.2).

**🎨 UI Implementation Requirements (MANDATORY)**
- **Library**: `siesa-ui-kit`
- **Install**: `npm install siesa-ui-kit` (Ensure dependency is present)
- **Usage**: You MUST use `siesa-ui-kit` components for all UI elements.
- **Constraint**: Do not create custom components if a Kit equivalent exists.

**Event Interface**
```typescript
const handleSelect = (date: Date) => {
  const isoDate = formatISO(date, { representation: 'date' });
  const event = new CustomEvent('calendar:date-selected', {
    detail: { date: isoDate },
    bubbles: true,
    composed: true
  });
  window.dispatchEvent(event);
  onDateSelected?.(isoDate);
};
```

**Accessibility Guidelines**
- The main grid container should have `role="grid"`.
- Recommendation: `<div role="grid"><div role="row"><div role="gridcell"><button ...>` pattern is most robust.
- Ensure `aria-label` on the current day says "Today, [Date]".

### Project Structure Notes
- Alignment with unified project structure (paths, modules, naming)
- Detected conflicts or variances (with rationale)

### Contextual Intelligence / References
- **Previous Story (1.3) Learnings**: The visual skeleton (Grid) is already built in Story 1.3. Your focus is INTERACTION. `useCalendar` has the date math. Trust it.
- **Git Context**: Check `src/modules/calendar/application/useCalendar.ts` to see exposed methods (`nextMonth`, `prevMonth`, `selectDate`).

## Dev Agent Record

### Agent Model Used

Google Gemini 3 Pro Preview

### Debug Log References

### Completion Notes List

- Verified interactions via new tests in CalendarGrid.test.tsx
- Verified accessibility attributes and keyboard navigation tests
- Confirmed siesa-ui-kit usage and style imports

### File List

- mfe-calendar/src/modules/calendar/presentation/components/CalendarGrid.tsx
- mfe-calendar/src/modules/calendar/presentation/components/CalendarHeader.tsx
- mfe-calendar/src/modules/calendar/presentation/components/DayCell.tsx
- mfe-calendar/src/modules/calendar/presentation/components/__tests__/CalendarGrid.test.tsx
