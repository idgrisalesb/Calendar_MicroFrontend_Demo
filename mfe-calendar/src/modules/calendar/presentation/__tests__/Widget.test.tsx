import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Widget } from '../Widget';

describe('Calendar Widget', () => {
  it('renders the widget title', () => {
    render(<Widget />);
    expect(screen.getByText('Calendar Widget')).toBeDefined();
  });

  it('renders the open button', () => {
    render(<Widget />);
    expect(screen.getByRole('button', { name: /open calendar/i })).toBeDefined();
  });
});
