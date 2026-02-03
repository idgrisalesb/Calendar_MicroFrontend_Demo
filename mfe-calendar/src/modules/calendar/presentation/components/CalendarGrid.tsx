import React, { useRef, useEffect } from 'react';
import { useCalendar } from '../../application/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  initialDate?: Date;
  onDateSelected?: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ initialDate, onDateSelected }) => {
  const {
    currentMonth,
    days,
    nextMonth,
    prevMonth,
    setSelectedDate,
    focusedDate,
    moveFocus
  } = useCalendar({ initialDate });

  const daysRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Focus synchronizer: When focusedDate changes, focus the corresponding cell
  useEffect(() => {
    if (!focusedDate) return;
    const focusedIndex = days.findIndex(d => d.date.toDateString() === focusedDate.toDateString());
    if (focusedIndex >= 0 && daysRef.current[focusedIndex]) {
      daysRef.current[focusedIndex]?.focus();
    }
  }, [focusedDate, days]);

  const handleDaySelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelected?.(date);

    // Format to YYYY-MM-DD (ISO 8601)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const isoDate = `${year}-${month}-${day}`;

    window.dispatchEvent(new CustomEvent('calendar:date-selected', {
      detail: { date: isoDate },
      bubbles: true,
      composed: true
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(7);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(-7);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDaySelect(focusedDate);
        break;
      default: return;
    }
  };

  // Dynamic weekdays generation for localization consistency
  const weekDays = React.useMemo(() => {
    const baseDate = new Date(2026, 1, 2); // Feb 2 2026 is Monday
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      const dayName = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(date);
      return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    });
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-sm border p-2" role="region" aria-label="Calendario">
      <CalendarHeader
         currentMonth={currentMonth}
         onPrevMonth={prevMonth}
         onNextMonth={nextMonth}
      />

      <div className="p-2">
        {/* Weekday Header */}
        <div className="grid grid-cols-7 mb-2 text-center">
          {weekDays.map(day => (
            <span key={day} className="text-sm font-medium text-gray-500 py-1" aria-hidden="true">
              {day}
            </span>
          ))}
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-7 gap-1" role="grid">
          {days.map((day, index) => {
            const isFocused = focusedDate && day.date.toDateString() === focusedDate.toDateString();
            return (
              <DayCell
                key={index}
                ref={(el) => { daysRef.current[index] = el; }}
                date={day.date}
                isSelected={day.isSelected}
                isToday={day.isToday}
                isOutsideMonth={!day.isCurrentMonth}
                onClick={() => handleDaySelect(day.date)}
                onKeyDown={handleKeyDown}
                tabIndex={isFocused ? 0 : -1}
                role="gridcell"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
