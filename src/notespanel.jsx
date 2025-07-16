import React, { useState } from 'react';

const NotesPanel = ({ group, onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <div className="avatar" style={{ backgroundColor: group.color }}>
          {group.initials}
        </div>
        <h2>{group.name}</h2>
      </div>
      <div className="notes-body">
        {group.messages.map((msg, i) => (
          <div key={i} className="note">
            <p>{msg.text}</p>
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="notes-input">
        <input
          type="text"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSend} disabled={!text.trim()}>&rarr;</button>
      </div>
    </div>
  );
};

export default NotesPanel;