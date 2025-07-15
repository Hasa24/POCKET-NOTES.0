import React from 'react';

const welcomescreen = () => {
  return (
    <div className="welcomescreen">
      <div className="welcomecontent">
        <img src="bgimage.png" alt="Welcome Illustration" className="welcome-image" />
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online.</p>
        <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
        <div className="encrypted">
          <img src="lock.png" alt="Lock" />
          <span>end-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default welcomescreen;
