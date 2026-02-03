import { useState, useMemo } from 'react';
import { CalendarDay } from '../domain/types';
import { TOTAL_GRID_DAYS } from '../domain/constants';

interface UseCalendarProps {
  initialDate?: Date;
}

export const useCalendar = ({ initialDate = new Date() }: UseCalendarProps = {}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Start at the 1st of the month to avoid edge cases initially
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Day of week (0 = Sunday)
    const startDayOfWeek = firstDay.getDay();

    // Calculate start date (padding from prev month)
    const startDate = new Date(firstDay);
    startDate.setDate(1 - startDayOfWeek);

    const gridDays: CalendarDay[] = [];
    const todayStr = new Date().toDateString();

    for (let i = 0; i < TOTAL_GRID_DAYS; i++) {
        // Create new date object for each day to avoid reference issues
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const isCurrentMonth = date.getMonth() === month;
        const isToday = todayStr === date.toDateString();

        gridDays.push({
            date,
            isCurrentMonth,
            isToday,
            isSelected: selectedDate ? date.toDateString() === selectedDate.toDateString() : false
        });
    }
    return gridDays;
  }, [currentMonth, selectedDate]);

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  return {
    currentMonth,
    days,
    selectedDate,
    nextMonth,
    prevMonth,
    setSelectedDate
  };
};
