import React, { forwardRef } from 'react';
import { Button } from 'siesa-ui-kit';
import { cn } from '../../../../lib/utils';

interface DayCellProps extends Omit<React.ComponentProps<typeof Button>, 'ref'> {
  date: Date;
  isSelected?: boolean;
  isToday?: boolean;
  isOutsideMonth?: boolean;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export const DayCell = forwardRef<HTMLButtonElement, DayCellProps>((props, ref) => {
  const {
    date,
    isSelected,
    isToday,
    isOutsideMonth,
    className,
    ...otherProps
  } = props as DayCellProps;
  const dayNumber = date.getDate();

  const label = dateFormatter.format(date);

  return (
    <Button
      ref={ref}
      variant="ghost"
      aria-label={label}
      className={cn(
        "h-9 w-9 p-0 font-normal",
        isSelected && "!bg-primary !text-primary-foreground hover:!bg-primary/90",
        isOutsideMonth && "opacity-50",
        isToday && "font-bold",
        className
      )}
      {...otherProps}
    >
      {dayNumber}
    </Button>
  );
});

DayCell.displayName = 'DayCell';
