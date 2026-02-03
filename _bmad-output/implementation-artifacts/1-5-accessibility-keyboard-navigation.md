# Story 1.5: Accessibility & Keyboard Navigation

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Keyboard User,
I want to navigate the date grid using arrow keys and select with Enter,
So that I can use the widget without a mouse.

## Acceptance Criteria

1. **Given** Focus is inside the Calendar grid, **When** I press the Right/Left Arrow key, **Then** Focus should move to the next/previous day.
2. **Given** Focus is inside the Calendar grid, **When** I press the Down/Up Arrow key, **Then** Focus should move to the same day in the next/previous week.
3. **When** I press Enter or Space on a focused date, **Then** That date should be selected.
4. **And** Screen readers must announce the full date label (e.g., "Lunes 2 de Febrero") when a date is focused (AC: 4).
5. **And** The widget must support tab navigation correctly (ROVING TABINDEX recommended: the grid has one tab stop, allowing arrow navigation inside).

## Tasks / Subtasks

- [ ] Implement Keyboard Navigation Logic (AC: 1, 2, 5)
  - [ ] Update `useCalendar` hook (or create specific hook) to handle date arithmetic for keyboard navigation (add/subtract days/weeks).
  - [ ] Implement Roving Tabindex strategy in `CalendarGrid`: only the focused (or selected) date should have `tabIndex={0}`, others `{-1}`.
  - [ ] Add `onKeyDown` handler to the Grid or Cells to intercept Arrow keys.
- [ ] Implement Keyboard Selection (AC: 3)
  - [ ] Handle `Enter` and `Space` keydown events to trigger `onDateSelected`.
- [ ] Accessibility Attributes & Roles (AC: 4)
  - [ ] Ensure Grid container has `role="grid"` (or `role="application"`/`dialog` depending on pattern, typically `grid` for calendar).
  - [ ] Ensure Day cells have `role="gridcell"` (containing a button/text).
  - [ ] Add `aria-label` to day cells with full verbose date (e.g., "Monday, February 2nd 2026").
  - [ ] Manage `aria-selected` state on cells.
- [ ] Verify Siesa UI Kit Compliance
  - [ ] Use `siesa-ui-kit` primitives for focus styles/rings where possible.
- [ ] Testing
  - [ ] Write Vitest unit tests for navigation logic.
  - [ ] Write RTL tests simulating `userEvent.keyboard` sequences.

## Dev Notes

### Architecture Patterns & Tech Stack
- **Library**: `siesa-ui-kit` (MANDATORY).
  - **Constraint**: Use Kit components. If wrapping for grid behavior, ensure accessibility props are passed through.
- **Pattern**: Event Driven. The keyboard interaction drives state changes (focus) and selection events.

### Project Structure Notes
- `src/modules/calendar/presentation/components/CalendarGrid.tsx`: Primary modification point.
- `src/modules/calendar/presentation/components/DayCell.tsx`: Needs to accept `tabIndex` and `onKeyDown`.
- `src/modules/calendar/application/useCalendar.ts`: May need extensions for keyboard-specific date math if not already present.

### References
- [WAI-ARIA Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- Architecture Document: `_bmad-output/planning-artifacts/architecture.md`

## Dev Agent Record

### Agent Model Used
Claude Code

### Debug Log References

### Completion Notes List

### File List
