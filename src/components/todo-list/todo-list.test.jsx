import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './todo-list';

const mockTodos = [
  { id: 1, label: 'Task 1', checked: false },
  { id: 2, label: 'Task 2', checked: true },
];

describe('TodoList component', () => {
  it('renders the todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        totalTodos={mockTodos.length}
        page={1}
        setPage={() => {}}
        itemsPerPage={5}
      />
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('shows the correct title when there are todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        totalTodos={mockTodos.length}
        page={1}
        setPage={() => {}}
        itemsPerPage={5}
      />
    );

    expect(screen.getByText('Things to do:')).toBeInTheDocument();
  });

  it('shows empty message when no todos are available', () => {
    render(
      <TodoList
        todos={[]}
        totalTodos={0}
        page={1}
        setPage={() => {}}
        itemsPerPage={5}
      />
    );

    expect(
      screen.getByText("Looks like you're up for a challenge!")
    ).toBeInTheDocument();
  });
});
