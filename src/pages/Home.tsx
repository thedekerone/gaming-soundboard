import React, { useContext } from 'react';
import { AudioManagerContext } from '../Audio/components/AudioManager';
import Main from '../Audio/Views/Main';

const Home = () => {
  const manager = useContext(AudioManagerContext);
  console.log(manager);
  return (
    <div>
      <h1 style={{ color: 'white' }}>Game Soundboard</h1>
      <Main />
    </div>
  );
};

export default Home;
