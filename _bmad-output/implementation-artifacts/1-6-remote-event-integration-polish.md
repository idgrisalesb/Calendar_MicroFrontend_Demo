# Story 1.6: Remote Event Integration Polish

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer and Integrator,
I want to finalize the remote event integration and Module Federation exposure of the Calendar Widget,
so that the widget can be successfully consumed by host applications and communicate date selections reliably.

## Acceptance Criteria

1. **Event Dispatch**: The widget MUST dispatch a custom DOM event named `calendar:date-selected` when a valid date is clicked.
2. **Event Payload**: The event `detail` MUST contain the selected date string in ISO 8601 format (`YYYY-MM-DD`).
3. **Event Propagation**: The event MUST bubble up (`bubbles: true`) to allow capture at the window or container level.
4. **Module Federation Exposure**: The `vite.config.ts` MUST correctly expose the `./Widget` entry point mapping to `src/presentation/Widget.tsx` (or equivalent).
5. **Dependencies**: Shared dependencies (`react`, `react-dom`, `siesa-ui-kit`) MUST be configured correctly in the federation plugin (e.g., as singletons).
6. **Standalone Integrity**: The existing standalone development mode (port 3001) MUST continue to function correctly.
7. **Code Polish**: Ensure no debug logs or temporary code remain.

## Tasks / Subtasks

- [ ] Implement `calendar:date-selected` event dispatching logic
  - [ ] Update `useCalendar` hook or event handler in `CalendarGrid`
  - [ ] Ensure ISO 8601 formatting
- [ ] Verify and update `vite.config.ts` for Module Federation
  - [ ] Check `exposes` configuration
  - [ ] Check `shared` configuration (react, react-dom, siesa-ui-kit)
- [ ] Verify Standalone Mode
  - [ ] Test on port 3001
- [ ] Polish Code
  - [ ] Remove debug logs
  - [ ] Clean up unused imports

## Dev Notes

### Relevant Architecture Patterns and Constraints

- **Module Federation**: Core delivery mechanism.
- **Event-Driven Communication**: Loose coupling via Custom Events.
- **Clean Architecture**: Ensure logic remains in `application/` and UI in `presentation/`.

### 🎨 UI Implementation Requirements (MANDATORY)

- **Library**: `siesa-ui-kit`
- **Install**: `npm install siesa-ui-kit` (Ensure dependency is present/shared)
- **Usage**: You MUST use `siesa-ui-kit` components for any polished UI elements.
- **Constraint**: Do not create custom components if a Kit equivalent exists.

### Technical Implementation Details

**Event Dispatching Example:**
```typescript
const handleDateClick = (date: Date) => {
  // Update internal state
  setSelectedDate(date);

  // Dispatch external event
  const isoDate = formatISO(date, { representation: 'date' }); // or manual YYYY-MM-DD
  const event = new CustomEvent('calendar:date-selected', {
    detail: { date: isoDate },
    bubbles: true,
    composed: true
  });
  window.dispatchEvent(event);
};
```

**Module Federation Config Check:**
Ensure `vite.config.ts` has:
```typescript
federation({
  name: 'mfeCalendar',
  filename: 'remoteEntry.js',
  exposes: {
    './Widget': './src/modules/calendar/presentation/Widget.tsx',
  },
  shared: ['react', 'react-dom', 'siesa-ui-kit'],
})
```

### Context and Research

- **Git History Context**: Recent work involves Stories 1.1, 1.2, 1.3. Integrating specifically on top of the UI implementation.
- **Latest Research**:
    - **Custom Events**: Ensure TypeScript compatibility (extend `Window` interface if needed).
    - **Vite Federation**: Pay attention to "singleton" loading for React.

### Testing Standards Summary

- **Strategy**: Unit/Integration using React Testing Library.
- **Test Case**: Render `Widget`, click a date, assert that the mock event listener on `window` was called with the correct payload.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming): Ensure `src/modules/calendar/presentation/Widget.tsx` is the point of entry.

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet

### Debug Log References

### Completion Notes List

### File List
