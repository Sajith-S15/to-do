import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = ({
  todos, totalTodos, page, setPage,
  itemsPerPage,
 }) => {
  const { setTodos } = React.useContext(TodosContext);

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const toggleCheck = (id) => {
  setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id
        ? { ...todo, checked: !todo.checked }
        : todo)));
};
const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length > 0 ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re up for a challenge!</div>
      )}
      {totalTodos > itemsPerPage && (
      <div className="pagination">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="page-info">
          Page
          {' '}
          {page}
          {' '}
          of
          {' '}
          {Math.ceil(totalTodos / itemsPerPage)}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(p + 1,
            Math.ceil(totalTodos / itemsPerPage)))}
          disabled={page === Math.ceil(totalTodos / itemsPerPage)}
        >
          Next
        </button>
      </div>
    )}
    </div>
  );
};