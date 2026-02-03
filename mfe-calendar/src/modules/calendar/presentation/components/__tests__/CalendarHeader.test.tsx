import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarHeader } from '../CalendarHeader';
import React from 'react';

describe('CalendarHeader', () => {
  const defaultDate = new Date(2026, 1, 1); // February 2026
  const onPrev = vi.fn();
  const onNext = vi.fn();

  it('displays formatted month and year', () => {
    render(
      <CalendarHeader
        currentMonth={defaultDate}
        onPrevMonth={onPrev}
        onNextMonth={onNext}
      />
    );
    // Spanish format: "febrero 2026" or "Febrero 2026"
    // Intl output is usually lowercase in Spanish unless styled.
    // We check case-insensitive or expect a specific format logic.
    // Let's check strict presence.
    // "February" in Spanish is "febrero".
    // Intl "es-ES" format is often "febrero de 2026"
    expect(screen.getByText(/febrero de 2026/i)).toBeTruthy();
  });

  it('renders navigation buttons', () => {
    render(
      <CalendarHeader
        currentMonth={defaultDate}
        onPrevMonth={onPrev}
        onNextMonth={onNext}
      />
    );
    // Should have 2 buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('calls onPrevMonth when previous button clicked', () => {
    render(
      <CalendarHeader
        currentMonth={defaultDate}
        onPrevMonth={onPrev}
        onNextMonth={onNext}
      />
    );
    // Assuming buttons are distinguishable by icon or aria-label.
    // Best practice: add aria-label to buttons.
    // We will assume "Anterior" and "Siguiente" or similar aria-labels.
    // Let's try to get by aria-label "Previous Month" / "Next Month" (or Spanish).
    // Start with getting all buttons and clicking first/second if we verify order.
    // Or assume specific aria-label.
    // Let's use getByLabelText if possible, or getAllByRole.

    // We'll enforce aria-labels in implementation. "Mes anterior", "Mes siguiente".
    const prevBtn = screen.getByLabelText(/anterior/i);
    fireEvent.click(prevBtn);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNextMonth when next button clicked', () => {
    render(
      <CalendarHeader
        currentMonth={defaultDate}
        onPrevMonth={onPrev}
        onNextMonth={onNext}
      />
    );
    const nextBtn = screen.getByLabelText(/siguiente/i);
    fireEvent.click(nextBtn);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
