import React, { useState, useEffect, Dispatch } from 'react';
import { gql, useQuery } from '@apollo/client';
import { gotDevices } from '../../util/inOutSelector';
import AudioComponent from './Audio';
import AudioSelector from './AudioSelector';
import { useAudio } from './audioHooks';

type AudioType = {
  title: string;
  url: string;
  id: number;
  playing: boolean;
};

const EXCHANGE_RATES = gql`
  query getSounds {
    allSounds {
      file {
        publicUrl
      }
      title
      id
    }
  }
`;

const electron = window.require('electron');
const { remote } = electron;
const { globalShortcut } = remote;

type UseAudioProps = (
  url: string
) => [
  boolean,
  number,
  (srcUrl: string, id: number, force: boolean) => void,
  Dispatch<React.SetStateAction<number>>,
  any
];

export default function AudioList() {
  const [isPlaying, current, toggle, setCurrent, audio] = useAudio(
    '../assets/audio/despierta.mp3'
  );
  // const secondaryAudio = audio.cloneNode();

  let list: Array<AudioType> = [];

  useEffect(() => {
    const ret = globalShortcut.register('5', () => {
      console.log('CommandOrControl+X is pressed');

      toggle(list[0].url, list[0].id, true);
    });

    if (!ret) {
      console.log('registration failed');
    }
  }, []);

  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const formatedData = data.allSounds.map((el: any) => ({
    title: el.title,
    url: el.file.publicUrl,
    id: el.id,
    playing: false,
  }));
  list = formatedData;
  return (
    <div>
      {list.map((el) => (
        <AudioComponent
          isPlaying={isPlaying}
          current={current}
          setCurrent={setCurrent}
          toggle={toggle}
          active={current === el.id && isPlaying}
          key={el.id}
          options={el}
        />
      ))}
      <AudioSelector effectAudio={audio} />
    </div>
  );
}
