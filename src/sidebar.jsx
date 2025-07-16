import './App.css';

const Sidebar = ({ groups, onSelectGroup, onOpenModal, selectedIndex }) => {
  return (
    <div className="sidebar">
      <h2>Pocket Notes</h2>
      <div className="group-list">
        {groups.map((group, index) => (
          <div
            key={index}
            className={`group-item ${selectedIndex === index ? 'active' : ''}`}
            onClick={() => onSelectGroup(index)}
          >
            <div className="avatar" style={{ backgroundColor: group.color }}>
              {group.initials}
            </div>
            <span>{group.name}</span>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={onOpenModal}>+</button>
    </div>
  );
};

export default Sidebar;