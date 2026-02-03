import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalendar } from '../useCalendar';

describe('useCalendar Hook', () => {
  it('should return initial state with correct month', () => {
    const initialDate = new Date(2026, 1, 1); // Feb 2026
    const { result } = renderHook(() => useCalendar({ initialDate }));

    expect(result.current.currentMonth.getFullYear()).toBe(2026);
    expect(result.current.currentMonth.getMonth()).toBe(1);
  });

  it('should generate 42 days for the grid', () => {
    const initialDate = new Date(2026, 1, 1);
    const { result } = renderHook(() => useCalendar({ initialDate }));

    expect(result.current.days.length).toBe(42);
  });

  it('should identify padding days correctly', () => {
    // Feb 2026 starts on Sunday (index 0).
    // Wait, let's verify. 2026-02-01.
    // DOM uses 0=Sun.
    // If it starts on Sunday, the first day of grid is that Sunday (Feb 1).
    // So days[0] should be Feb 1 and isCurrentMonth = true.

    // Let's use a month that starts on say Wednesday.
    // March 2026? Feb 2026 ends on 28th (Sat). March 1 is Sun.
    // April 2026 starts Wed.
    const aprilDate = new Date(2026, 3, 1); // April 2026
    const { result } = renderHook(() => useCalendar({ initialDate: aprilDate }));

    // April 1 2026 is Wednesday.
    // So Sun, Mon, Tue are padding (prev month).
    expect(result.current.days[0].isCurrentMonth).toBe(false); // Sunday (Mar 29)
    expect(result.current.days[3].date.getDate()).toBe(1); // Wednesday (Apr 1)
    expect(result.current.days[3].isCurrentMonth).toBe(true);
  });

  it('should handle leap years (Feb 2024)', () => {
    const leapDate = new Date(2024, 1, 1); // Feb 2024
    const { result } = renderHook(() => useCalendar({ initialDate: leapDate }));

    // Should have 29 days in current month
    const currentDays = result.current.days.filter(d => d.isCurrentMonth);
    expect(currentDays.length).toBe(29);
  });

  it('should navigate to next month', () => {
    const initialDate = new Date(2026, 1, 1); // Feb
    const { result } = renderHook(() => useCalendar({ initialDate }));

    act(() => {
      result.current.nextMonth();
    });

    expect(result.current.currentMonth.getMonth()).toBe(2); // March
  });

  it('should navigate to prev month', () => {
    const initialDate = new Date(2026, 1, 1); // Feb
    const { result } = renderHook(() => useCalendar({ initialDate }));

    act(() => {
      result.current.prevMonth();
    });

    expect(result.current.currentMonth.getMonth()).toBe(0); // Jan
  });

  it('should select a date correctly', () => {
    const initialDate = new Date(2026, 1, 1);
    const { result } = renderHook(() => useCalendar({ initialDate }));

    // Default is null
    expect(result.current.selectedDate).toBeNull();

    const targetDate = new Date(2026, 1, 15);
    act(() => {
      result.current.setSelectedDate(targetDate);
    });

    expect(result.current.selectedDate).toEqual(targetDate);

    // Check grid updates
    const selectedDay = result.current.days.find(d => d.date.getDate() === 15 && d.isCurrentMonth);
    expect(selectedDay?.isSelected).toBe(true);
  });
});
