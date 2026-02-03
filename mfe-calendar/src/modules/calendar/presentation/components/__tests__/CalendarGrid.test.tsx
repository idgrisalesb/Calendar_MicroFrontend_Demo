import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarGrid } from '../CalendarGrid';
import * as useCalendarHook from '../../../application/useCalendar';

// Mock the hook
vi.mock('../../../application/useCalendar');

describe('CalendarGrid', () => {
    // Feb 1 2026 is Sunday.
    const mockDate = new Date(2026, 1, 1);

    // Create 42 dummy days
    const mockDays = Array(42).fill(null).map((_, i) => ({
        date: new Date(2026, 1, i + 1),
        isCurrentMonth: true,
        isToday: false,
        isSelected: false
    }));

    const mockUseCalendar = {
        currentMonth: mockDate,
        days: mockDays,
        nextMonth: vi.fn(),
        prevMonth: vi.fn(),
        selectedDate: null,
        setSelectedDate: vi.fn()
    };

    beforeEach(() => {
        vi.spyOn(useCalendarHook, 'useCalendar').mockReturnValue(mockUseCalendar);
    });

    it('renders the CalendarHeader with current month', () => {
        render(<CalendarGrid />);
        expect(screen.getByText(/febrero de 2026/i)).toBeTruthy();
    });

    it('renders weekday headers', () => {
        render(<CalendarGrid />);
        // Spanish short days: Lun, Mar, Mié, Jue, Vie, Sáb, Dom
        // Or Mo, Tu ... depends on locale. user story said (Mo, Tu, We) as example.
        // Application context is Spanish.
        // Expect "Lun" or "Do" or "Domingo".
        // Usually short: "Do", "Lu", "Ma"... or "Dom", "Lun".
        // Siesa UI Kit might force something, but we implement the header loop.
        // We'll use Intl to generate them or hardcode Spanish.
        // Let's expect "Lun" or similar.
        expect(screen.getByText(/Lun/i)).toBeTruthy();
    });

    it('renders 42 day cells', () => {
        render(<CalendarGrid />);
        // Navigation buttons are 'button'
        const navButtons = screen.getAllByRole('button');
        expect(navButtons.length).toBe(2);

        // Day cells are 'gridcell' due to accessibility improvement
        const cells = screen.getAllByRole('gridcell');
        expect(cells.length).toBe(42);
    });

    it('handles keyboard navigation (arrow keys)', () => {
        render(<CalendarGrid />);
        // Find a day button. "1" appears multiple times (Feb 1, Mar 1)
        // ensure we get the button, not the span
        const dayOnes = screen.getAllByText('1');
        // The first one is likely the text inside the button. get closest button.
        const firstDay = dayOnes[0].closest('button');
        expect(firstDay).toBeTruthy();

        if (!firstDay) return;

        firstDay.focus();
        expect(document.activeElement).toBe(firstDay);

        // Press Right Arrow -> Should focus '2'
        fireEvent.keyDown(firstDay, { key: 'ArrowRight' });

        const dayTwos = screen.getAllByText('2');
        const secondDay = dayTwos[0].closest('button');
        expect(document.activeElement).toBe(secondDay);
    });

    it('calls onPrevMonth when previous button is clicked', () => {
        render(<CalendarGrid />);
        const prevBtn = screen.getByLabelText(/mes anterior/i);
        fireEvent.click(prevBtn);
        expect(mockUseCalendar.prevMonth).toHaveBeenCalled();
    });

    it('calls onNextMonth when next button is clicked', () => {
        render(<CalendarGrid />);
        const nextBtn = screen.getByLabelText(/mes siguiente/i);
        fireEvent.click(nextBtn);
        expect(mockUseCalendar.nextMonth).toHaveBeenCalled();
    });

    it('calls setSelectedDate and dispatches event when a date is clicked', () => {
        const onDateSelectedMock = vi.fn();
        const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

        render(<CalendarGrid onDateSelected={onDateSelectedMock} />);

        // Click on Feb 5
        const day5 = screen.getAllByText('5')[0].closest('button');
        expect(day5).toBeTruthy();

        fireEvent.click(day5!);

        // 1. Should update internal hook state
        // The mock hook ignores setSelectedDate implementation, but we can check if it was called?
        // Wait, mockUseCalendar.setSelectedDate is a spy.
        // We need to ensure CalendarGrid calls it.
        const expectedDate = mockDays[4].date; // index 4 is Feb 5 (if starting from Feb 1)
        // Wait, mockDays logic:
        // i=0 -> Feb 1. i=4 -> Feb 5.

        expect(mockUseCalendar.setSelectedDate).toHaveBeenCalledWith(expectedDate);

        // 2. Should call prop
        expect(onDateSelectedMock).toHaveBeenCalledWith(expectedDate);

        // 3. Should dispatch CustomEvent
        expect(dispatchSpy).toHaveBeenCalled();
        const event = dispatchSpy.mock.calls.find(call => call[0].type === 'calendar:date-selected');
        expect(event).toBeTruthy();
        expect((event![0] as CustomEvent).detail).toEqual({ date: expectedDate });
    });

    it('has correct accessibility attributes', () => {
        render(<CalendarGrid />);
        // Grid role
        expect(screen.getByRole('region').getAttribute('aria-label')).toBe('Calendario');
        expect(screen.getAllByRole('grid')).toHaveLength(1);

        // Cells
        const cells = screen.getAllByRole('gridcell');
        expect(cells[0].getAttribute('aria-label')).toBeTruthy(); // Should have label
     });
});
