import React, { useState } from 'react';

const colors = ['#FF84B7', '#AB53F2', '#FFCB60', '#76D672', '#3662E3', '#43C6F1'];

const Modal = ({ onClose, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreate = () => {
    if (groupName.trim()) onCreate(groupName, selectedColor);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Group</h2>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="color-options">
          {colors.map(color => (
            <span
              key={color}
              className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></span>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreate} disabled={!groupName.trim()}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;