import React, { createContext, useEffect } from 'react';
import { getDevices, selectMic } from '../../util/util';
import AudioPlayer from './Audio';

const mainAudio = new AudioPlayer();
const selfAudio = new AudioPlayer();
const micAudio = new AudioPlayer();

const play = (src: string | MediaStream) => {
  mainAudio.play(src);
  selfAudio.play(src);
};

const stop = () => {
  mainAudio.stop();
  selfAudio.stop();
};

const changeMic = (deviceId: string) => {
  selectMic(deviceId)?.then((res) => micAudio.play(res));
};

export const AudioManagerContext = createContext({
  play,
  stop,
  changeMic,
});

const AudioManager = ({ children }: JSX.ElementChildrenAttribute) => {
  useEffect(() => {
    getDevices()
      .then((res) => {
        const virtualOutput = res.outputDevices.find((el) =>
          el.label.includes('CABLE')
        );
        console.log(virtualOutput);
        if (!virtualOutput) alert('Descarga virtual cable ktmr');

        if (virtualOutput) {
          mainAudio.changeAudioDevice(virtualOutput.deviceId);
          micAudio.changeAudioDevice(virtualOutput.deviceId);
        } else {
          throw new Error('No se encontro el VIRTUAL CABLE');
        }

        return null;
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AudioManagerContext.Provider
      value={{
        play,
        stop,
        changeMic,
      }}
    >
      {children}
    </AudioManagerContext.Provider>
  );
};

export default AudioManager;
