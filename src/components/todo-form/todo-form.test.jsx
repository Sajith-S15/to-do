import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from './todo-form';
import { TodosContext } from '../../todo-context';

describe('TodoForm component', () => {
  const mockSetTodos = jest.fn();

  const renderForm = (todos = []) => {
    render(
      <TodosContext.Provider value={{ todos, setTodos: mockSetTodos }}>
        <TodoForm />
      </TodosContext.Provider>
    );
  };

  beforeEach(() => {
    mockSetTodos.mockClear();
  });

  it('renders input and button', () => {
    renderForm();
    expect(screen.getByPlaceholderText(/enter new task/i)).toBeInTheDocument();
    expect(screen.getByText(/add task/i)).toBeInTheDocument();
  });

  it('does not add a task if input is empty', () => {
    renderForm();
    fireEvent.click(screen.getByText(/add task/i));
    expect(mockSetTodos).not.toHaveBeenCalled();
  });

  it('adds a task when input is valid and button is clicked', () => {
    renderForm([]);

    const input = screen.getByPlaceholderText(/enter new task/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText(/add task/i));

    expect(mockSetTodos).toHaveBeenCalledWith([
      expect.objectContaining({
        label: 'New Task',
        checked: false,
      }),
    ]);
  });

  it('adds a task when Enter key is pressed', () => {
    renderForm([]);

    const input = screen.getByPlaceholderText(/enter new task/i);
    fireEvent.change(input, { target: { value: 'Enter Task' } });
    fireEvent.keyUp(input, { key: 'Enter', keyCode: 13 });

    expect(mockSetTodos).toHaveBeenCalledWith([
      expect.objectContaining({
        label: 'Enter Task',
        checked: false,
      }),
    ]);
  });
});
