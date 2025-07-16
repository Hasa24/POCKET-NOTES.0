import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [groups, setGroups] = useState(() => JSON.parse(localStorage.getItem("groups")) || []);
  const [activeGroup, setActiveGroup] = useState(null);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || {});
  const [newNote, setNewNote] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("#3662E3");

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [groups, notes]);

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    const newGroup = {
      name: groupName.trim(),
      color: groupColor,
      initials: groupName.trim().split(' ').map(w => w[0].toUpperCase()).join(''),
      messages: []
    };
    setGroups([...groups, newGroup]);
    setGroupName("");
    setGroupColor("#3662E3");
  };

  const handleSendNote = () => {
    if (!newNote.trim()) return;
    const groupNotes = notes[activeGroup.name] || [];
    const updatedNotes = {
      ...notes,
      [activeGroup.name]: [
        ...groupNotes,
        {
          text: newNote.trim(),
          timestamp: new Date().toLocaleString(),
        },
      ],
    };
    setNotes(updatedNotes);
    setNewNote("");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="sidebar-title">Pocket Notes</h2>
        <div className="group-list">
          {groups.map((group, index) => (
            <div
              key={index}
              className={`group-item ${activeGroup?.name === group.name ? "active" : ""}`}
              onClick={() => setActiveGroup(group)}
            >
              <div
                className="group-avatar"
                style={{ backgroundColor: group.color }}
              >
                {group.initials || group.name.charAt(0).toUpperCase()}
              </div>
              <span className="group-name">{group.name}</span>
            </div>
          ))}
        </div>
        <div className="create-group">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="group-input"
          />
          <input
            type="color"
            value={groupColor}
            onChange={(e) => setGroupColor(e.target.value)}
            className="color-picker"
          />
          <button className="create-btn" onClick={handleCreateGroup}>
            +
          </button>
        </div>
      </aside>

      <main className="note-area">
        {activeGroup ? (
          <div className="note-panel">
            <header className="note-header">
              <div
                className="group-avatar"
                style={{ backgroundColor: activeGroup.color }}
              >
                {activeGroup.initials || activeGroup.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="note-title">{activeGroup.name}</h3>
            </header>

            <div className="note-list">
              {(notes[activeGroup.name] || []).map((note, index) => (
                <div key={index} className="note-card">
                  <p className="note-text">{note.text}</p>
                  <span className="note-timestamp">{note.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="note-input">
              <textarea
                className="note-textarea"
                placeholder="Enter your text here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></textarea>
              <button className="send-btn" onClick={handleSendNote}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="welcome-screen">
            <div className="welcome-content">
              <img src="/welcome.png" alt="Welcome" className="welcome-image" />
              <h1>Pocket Notes</h1>
              <p>Send and receive messages without keeping your phone online.</p>
              <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
              <div className="encrypted">
                <img src="/lock.png" alt="Lock" />
                <span>end-to-end encrypted</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
