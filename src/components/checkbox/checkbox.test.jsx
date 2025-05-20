import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('Checkbox component', () => {
  const mockOnClick = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnKeyUp = jest.fn();
  const label = 'Test Task';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the label', () => {
    render(
      <Checkbox
        onClick={mockOnClick}
        checked={false}
        onDelete={mockOnDelete}
        label={label}
        onKeyUp={mockOnKeyUp}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('calls onClick when checkbox is clicked', () => {
    render(
      <Checkbox
        onClick={mockOnClick}
        checked={false}
        onDelete={mockOnDelete}
        label={label}
        onKeyUp={mockOnKeyUp}
      />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyUp when key is released on checkbox', () => {
    render(
      <Checkbox
        onClick={mockOnClick}
        checked={false}
        onDelete={mockOnDelete}
        label={label}
        onKeyUp={mockOnKeyUp}
      />
    );
    fireEvent.keyUp(screen.getByRole('checkbox'), { key: 'Enter', code: 'Enter', keyCode: 13 });
    expect(mockOnKeyUp).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <Checkbox
        onClick={mockOnClick}
        checked={false}
        onDelete={mockOnDelete}
        label={label}
        onKeyUp={mockOnKeyUp}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /delete task/i }));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('shows checked class when checked is true', () => {
    render(
      <Checkbox
        onClick={mockOnClick}
        checked={true}
        onDelete={mockOnDelete}
        label={label}
        onKeyUp={mockOnKeyUp}
      />
    );
    expect(screen.getByText(label)).toHaveClass('checkbox-checked');
  });
});

