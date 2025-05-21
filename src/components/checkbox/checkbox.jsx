import * as React from 'react';
import './checkbox.scss';

export const Checkbox = ({
  onClick, checked, onDelete, label, onKeyUp, onEdit, onLabelClick,
}) => {
  const [checkboxId] = React.useState(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(label);
  const inputRef = React.useRef(null);

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(label);
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="checkbox">
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onClick}
        onKeyUp={onKeyUp}
        aria-label={`Mark task "${label}" as ${checked ? 'incomplete' : 'complete'}`}
      />
      <div className="checkbox-label-wrapper">
        {isEditing ? (
          <>
            <input
              type="text"
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleEditSubmit();
                }
              }}
              className="edit-input"
            />
            <div className="checkbox-save">
              <button type="button" onClick={handleEditSubmit}>Save</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <span
            className={`checkbox-content ${checked ? 'checkbox-checked' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              console.log('Label clicked!');
              if (onLabelClick) {
                onLabelClick();
              }
              }}
            onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && onLabelClick) {
                    e.preventDefault();
                    onLabelClick();
                  }
                }}
            style={{ cursor: 'pointer' }}
          >
            {label}
          </span>

        )}
      </div>
      {!isEditing && (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="checkbox-edit"
            onClick={() => {
              setIsEditing(true);
              setEditText(label);
            }}
            aria-label="Edit task"
          >
            Edit
          </button>
          <button
            type="button"
            className="checkbox-details"
            onClick={onLabelClick}
            aria-label="View task details"
          >
            Details
          </button>
          <button
            type="button"
            className="checkbox-delete"
            onClick={onDelete}
            aria-label="Delete task"
          >
            x
          </button>

        </div>
      )}
    </div>
  );
};