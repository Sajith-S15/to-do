import * as React from 'react';
import './todo-filters.scss';

export const TodoFilters = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
}) => (
  <div className="todo-filters">
    <input
      type="text"
      className="todo-filters-search"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <div className="todo-filters-buttons">
      <button
        type="button"
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        type="button"
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        type="button"
        className={filter === 'incomplete' ? 'active' : ''}
        onClick={() => setFilter('incomplete')}
      >
        Incomplete
      </button>
    </div>
  </div>
);