import * as React from 'react';
import './task-details.scss';

export const TaskDetails = ({ task, onClose, onEdit }) => {
  if (!task) {
    return null;
  }
    return (
      <div className="task-details-overlay" role="dialog" aria-modal="true" aria-labelledby="task-details-heading">
        <div className="task-details">
          <h2 id="task-details-heading">Task Details</h2>
          <p>
            <strong>Label:</strong>
            {task.label}
          </p>
          <p>
            <strong>Status:</strong>
            {task.checked ? 'Completed' : 'Incomplete'}
          </p>
          <div style={{ marginTop: '1rem' }}>
            <button type="button" onClick={onEdit}>Edit Task</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '0.5rem' }}>Close</button>
          </div>
        </div>
      </div>
  );
};