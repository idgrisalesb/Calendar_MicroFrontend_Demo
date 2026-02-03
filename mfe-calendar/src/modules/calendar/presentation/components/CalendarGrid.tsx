import React, { useRef } from 'react';
import { useCalendar } from '../../application/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { DayCell } from './DayCell';

interface CalendarGridProps {
  initialDate?: Date;
  onDateSelected?: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ initialDate, onDateSelected }) => {
  const { currentMonth, days, nextMonth, prevMonth, selectedDate, setSelectedDate } = useCalendar({ initialDate });

  const daysRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleDaySelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelected?.(date);
    window.dispatchEvent(new CustomEvent('calendar:date-selected', { detail: { date } }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    switch (e.key) {
      case 'ArrowRight': newIndex = index + 1; break;
      case 'ArrowLeft': newIndex = index - 1; break;
      case 'ArrowDown': newIndex = index + 7; break;
      case 'ArrowUp': newIndex = index - 7; break;
      default: return;
    }

    if (newIndex >= 0 && newIndex < days.length) {
      e.preventDefault();
      daysRef.current[newIndex]?.focus();
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
          {days.map((day, index) => (
            <DayCell
              key={index}
              ref={(el) => { daysRef.current[index] = el; }}
              date={day.date}
              isSelected={day.isSelected}
              isToday={day.isToday}
              isOutsideMonth={!day.isCurrentMonth}
              onClick={() => handleDaySelect(day.date)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={day.isSelected || (!selectedDate && index === 0) ? 0 : -1}
              role="gridcell"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
