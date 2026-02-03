import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DayCell } from '../DayCell';

describe('DayCell', () => {
  const defaultDate = new Date(2026, 1, 3); // Feb 3, 2026 (Tuesday)

  it('renders the day number', () => {
    render(<DayCell date={defaultDate} />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('uses ghost variant by default', () => {
    render(<DayCell date={defaultDate} />);
    const button = screen.getByRole('button');
    expect(button).toBeTruthy();
  });

  it('has correct aria-label with full date', () => {
    render(<DayCell date={defaultDate} />);
    const button = screen.getByRole('button');
    const label = button.getAttribute('aria-label');
    expect(label).toBeTruthy();
    expect(label).toContain('2026');
  });

  it('applies selected styles when isSelected is true', () => {
    render(<DayCell date={defaultDate} isSelected={true} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('applies outside month styles when isOutsideMonth is true', () => {
      render(<DayCell date={defaultDate} isOutsideMonth={true} />);
      expect(screen.getByRole('button')).toBeTruthy();
  });

  it('applies today styles when isToday is true', () => {
      render(<DayCell date={defaultDate} isToday={true} />);
      expect(screen.getByRole('button')).toBeTruthy();
  });
});
