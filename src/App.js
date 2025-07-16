import React, { useState } from 'react';
import Sidebar from './sidebar';
import WelcomeScreen from './welcomescreen';
import NotesPanel from './notespanel';
import Modal from './modal';


const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addGroup = (name, color) => {
    const initials = name.split(' ').map(word => word[0].toUpperCase()).join('');
    setGroups([...groups, { name, color, initials, messages: [] }]);
    setIsModalOpen(false);
  };

  const addMessage = (text) => {
    const newGroups = [...groups];
    const timestamp = new Date().toLocaleString();
    newGroups[selectedGroupIndex].messages.push({ text, timestamp });
    setGroups(newGroups);
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
        <NotesPanel group={groups[selectedGroupIndex]} onSendMessage={addMessage} />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onCreate={addGroup} />
      )}
    </div>
  );
};

export default App;
