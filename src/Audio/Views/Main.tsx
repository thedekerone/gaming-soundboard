import { Button, Select } from '@material-ui/core';
import { MenuItem } from 'electron';
import React, { useContext, useEffect, useState } from 'react';
import { getDevices } from '../../util/util';
import { AudioManagerContext } from '../components/AudioManager';
import { SoundProviderContext } from '../components/SoundProvider';

const Main = () => {
  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const sounds = useContext(SoundProviderContext);
  const { play, changeMic } = useContext(AudioManagerContext);
  const { loading, error, data } = sounds;

  const handleMicChange = (event: any) => {
    changeMic(event.target.value);
  };

  useEffect(() => {
    getDevices()
      .then((res) => {
        setInputDevices(res.inputDevices);
        changeMic(res.inputDevices[0].deviceId);
        return null;
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div>Loading pipipip</div>;
  if (error) return <div>Error pipipip</div>;

  return (
    <div>
      {data.map((sound) => (
        <div
          key={sound.id}
          style={{ padding: '.4rem', display: 'inline-block' }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => play(sound.url)}
          >
            {sound.title}
          </Button>
        </div>
      ))}
      <br />
      <select onChange={handleMicChange} name="output" id="output">
        {inputDevices.map((el) => (
          <option key={el.deviceId} value={el.deviceId}>
            {el.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Main;
