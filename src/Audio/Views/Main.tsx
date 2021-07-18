import React, { useEffect, createContext } from 'react';
import AudioPlayer from '../components/Audio';

const mainAudio = new AudioPlayer();
const selfAudio = new AudioPlayer();

const AudioManager = createContext({
  mainAudio,
  selfAudio,
});
