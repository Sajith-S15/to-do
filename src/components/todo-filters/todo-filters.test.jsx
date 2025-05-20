import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoFilters } from './todo-filters';

describe('TodoFilters component', () => {
  const mockSetSearchTerm = jest.fn();
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
    mockSetFilter.mockClear();
  });

  it('renders search input and filter buttons', () => {
    render(
      <TodoFilters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        filter="all"
        setFilter={mockSetFilter}
      />
    );

    expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/incomplete/i)).toBeInTheDocument();
  });

  it('updates search term when typing', () => {
    render(
      <TodoFilters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        filter="all"
        setFilter={mockSetFilter}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/search tasks/i), {
      target: { value: 'meeting' },
    });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('meeting');
  });

  it('calls setFilter when a filter button is clicked', () => {
    render(
      <TodoFilters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        filter="all"
        setFilter={mockSetFilter}
      />
    );

    fireEvent.click(screen.getByText(/completed/i));
    expect(mockSetFilter).toHaveBeenCalledWith('completed');

    fireEvent.click(screen.getByText(/incomplete/i));
    expect(mockSetFilter).toHaveBeenCalledWith('incomplete');
  });
});
