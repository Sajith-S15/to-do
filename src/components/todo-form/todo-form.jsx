import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    if (!task.trim()) {
      return;
    }
  // creating a new task below
    const newTask = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 0,
      label: task.trim(),
      checked: false,
    };
    setTodos([...todos, newTask]);

    setTask('');
};

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
