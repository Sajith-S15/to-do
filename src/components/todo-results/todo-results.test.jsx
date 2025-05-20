import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoResults } from './todo-results';
import { TodosContext } from '../../todo-context';

describe('TodoResults component', () => {
  const renderWithContext = (todos) => {
    render(
      <TodosContext.Provider value={{ todos }}>
        <TodoResults />
      </TodosContext.Provider>
    );
  };

  it('shows the correct number of completed tasks', () => {
    const todos = [
      { id: 1, label: 'Task 1', checked: true },
      { id: 2, label: 'Task 2', checked: false },
      { id: 3, label: 'Task 3', checked: true },
    ];

    renderWithContext(todos);
    expect(screen.getByText(/done:/i)).toHaveTextContent('Done:2');
  });

  it('shows zero when no tasks are completed', () => {
    const todos = [
      { id: 1, label: 'Task 1', checked: false },
      { id: 2, label: 'Task 2', checked: false },
    ];

    renderWithContext(todos);
    expect(screen.getByText(/done:/i)).toHaveTextContent('Done:0');
  });

  it('shows zero when the todo list is empty', () => {
    renderWithContext([]);
    expect(screen.getByText(/done:/i)).toHaveTextContent('Done:0');
  });
});
