import React from 'react';
import Audio from '../components/Audio/Audio';
import AudioList from '../components/Audio/AudioList';
import AudioSelector from '../components/Audio/AudioSelector';

const Home = () => {
  return (
    <div>
      <h1 style={{ color: 'white' }}>Game Soundboard</h1>
      <AudioList />
    </div>
  );
};

export default Home;
