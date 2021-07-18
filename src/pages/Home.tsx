import React, { useContext } from 'react';
import { AudioManagerContext } from '../Audio/components/AudioManager';

const Home = () => {
  const manager = useContext(AudioManagerContext);
  console.log(manager);
  return (
    <div>
      <h1 style={{ color: 'white' }}>Game Soundboard</h1>
    </div>
  );
};

export default Home;
