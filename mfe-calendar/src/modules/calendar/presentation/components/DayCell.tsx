import React, { forwardRef } from 'react';
import { Button } from 'siesa-ui-kit';
import { cn } from '../../../../lib/utils';

interface DayCellProps extends React.ComponentProps<typeof Button> {
  date: Date;
  isSelected?: boolean;
  isToday?: boolean;
  isOutsideMonth?: boolean;
}

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export const DayCell = forwardRef<HTMLButtonElement, DayCellProps>(({
  date,
  isSelected,
  isToday,
  isOutsideMonth,
  className,
  ...props
}, ref) => {
  const dayNumber = date.getDate();

  const label = dateFormatter.format(date);

  return (
    <Button
      ref={ref}
      variant="ghost"
      aria-label={label}
      className={cn(
        isSelected && "!bg-primary !text-primary-foreground hover:!bg-primary/90",
        isOutsideMonth && "opacity-50",
        isToday && "font-bold",
        className
      )}
      {...props}
    >
      {dayNumber}
    </Button>
  );
});

DayCell.displayName = 'DayCell';
