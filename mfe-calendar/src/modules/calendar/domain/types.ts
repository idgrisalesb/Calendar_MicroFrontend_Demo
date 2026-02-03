export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
}

export interface CalendarState {
  currentMonth: Date;
  days: CalendarDay[];
  selectedDate: Date | null;
}
