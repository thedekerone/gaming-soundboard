import React, { useContext, useEffect } from 'react';
import { AudioManagerContext } from '../Audio/components/AudioManager';
import Main from '../Audio/Views/Main';

const Home = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Main />
    </div>
  );
};

export default Home;
