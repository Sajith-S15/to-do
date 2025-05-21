import * as React from 'react';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodosContext } from './todo-context';
import { TodoFilters } from './components/todo-filters/todo-filters';
import { TaskDetails } from './components/task-details/task-details';
import './index.scss';

export const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const ITEMS_PER_PAGE = 5;
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.label.toLowerCase()
    .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all'
    || (filter === 'completed' && todo.checked)
    || (filter === 'incomplete' && !todo.checked);

    return matchesSearch && matchesFilter;
  });
  React.useEffect(() => {
  setPage(1);
}, [searchTerm, filter]);
  const paginatedTodos = filteredTodos.slice(
  (page - 1) * ITEMS_PER_PAGE,
  page * ITEMS_PER_PAGE,
);
const [detailsTask, setDetailsTask] = React.useState(null);
const openDetails = (task) => {
  console.log('Opening details for:', task);
  setDetailsTask(task);
};

const closeDetails = () => setDetailsTask(null);
// Inside App component (add this before `return`)
const handleEditFromDetails = (updatedLabel) => {
  if (detailsTask && updatedLabel.trim()) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === detailsTask.id
          ? { ...todo, label: updatedLabel.trim() } : todo
      )));
    closeDetails();
  }
};

  return (
    <div className="root" role="main">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />
        <TodoForm />
        <TodoResults />
        <TodoList
          todos={paginatedTodos}
          totalTodos={filteredTodos.length}
          page={page}
          setPage={setPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onSelectTask={openDetails}
        />
        {detailsTask && (
        <TaskDetails
          task={detailsTask}
          onClose={closeDetails}
          onEdit={() => {
          const newLabel = prompt('Edit Task Label:', detailsTask.label);
          if (newLabel !== null) {
          handleEditFromDetails(newLabel);
      }
    }}
        />
)}
      </TodosContext.Provider>
    </div>
    );
};