import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import NotesPanel from './components/NotesPanel';
import Modal from './components/Modal';

const App = () => {
  const [groups, setGroups] = useState([
    { name: 'My Notes', color: '#3662E3', initials: 'MN', messages: [] },
    { name: 'My personal grp', color: '#AB53F2', initials: 'MP', messages: [] },
    { name: 'Javascript grp', color: '#FF84B7', initials: 'JG', messages: [] },
  ]);

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addGroup = (name, color) => {
    const initials = name.split(' ').map(w => w[0].toUpperCase()).join('');
    setGroups([...groups, { name, color, initials, messages: [] }]);
    setIsModalOpen(false);
  };

  const addMessage = (text) => {
    const updatedGroups = [...groups];
    const timestamp = new Date().toLocaleString();
    updatedGroups[selectedGroupIndex].messages.push({ text, timestamp });
    setGroups(updatedGroups);
  };

  return (
    <div className="app">
      <Sidebar
        groups={groups}
        onSelectGroup={setSelectedGroupIndex}
        onOpenModal={() => setIsModalOpen(true)}
        selectedIndex={selectedGroupIndex}
      />
      {selectedGroupIndex === null ? (
        <WelcomeScreen />
      ) : (
        <NotesPanel
          group={groups[selectedGroupIndex]}
          onSendMessage={addMessage}
        />
      )}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onCreate={addGroup} />}
    </div>
  );
};

export default App;