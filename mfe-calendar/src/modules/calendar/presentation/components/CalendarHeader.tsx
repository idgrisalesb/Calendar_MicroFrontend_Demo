import React from 'react';
import { Button } from 'siesa-ui-kit';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth
}) => {
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric'
  }).format(currentMonth);

  const displayDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-lg font-semibold capitalize">
        {displayDate}
      </h2>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onPrevMonth}
          aria-label="Mes anterior"
          className="h-8 w-8 p-0" // Simulating size="icon" if not supported, valid tailwind.
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={onNextMonth}
          aria-label="Mes siguiente"
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
