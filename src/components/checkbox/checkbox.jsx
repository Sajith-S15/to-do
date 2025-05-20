import * as React from 'react';
import './checkbox.scss';

export const Checkbox = ({
  onClick, checked, onDelete, label, onKeyUp,
}) => {
  const [checkboxId] = React.useState(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <div className="checkbox">
      <label className="checkbox-content" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={onClick}
          onKeyUp={onKeyUp}
        />
        <span className={checked ? 'checkbox-checked' : ''}>{label}</span>
      </label>
      <button
        type="button"
        className="checkbox-delete"
        onClick={onDelete}
        aria-label="Delete task"
      >
        x
      </button>
    </div>
  );
};
