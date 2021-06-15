import React, { useState, useEffect, Dispatch } from 'react';
import { gql, useQuery } from '@apollo/client';

type UseAudioProps = (
  url: string
) => [
  boolean,
  number,
  (srcUrl: string, id: number, force: boolean) => void,
  Dispatch<React.SetStateAction<number>>,
  any
];

export const useAudio: UseAudioProps = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [secAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [playing2, setPlaying2] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [vol, setVol] = useState(1);

  const toggle: (srcUrl: string, id: number, force: boolean) => void = (
    srcUrl,
    id,
    force = false
  ) => {
    audio.src = srcUrl;
    secAudio.src = srcUrl;

    // Force is used to handle shortcuts

    if (!force) {
      if (id === current || current === -1) {
        setPlaying(!playing);
        setPlaying2(!playing);
      } else {
        audio.pause();
        audio.play();

        setPlaying(true);
        setPlaying2(true);

        secAudio.pause();
        secAudio.play();
      }
    } else {
      audio.currentTime = 0;
      audio.play();

      secAudio.currentTime = 0;
      secAudio.play();

      setCurrent(id);
      setPlaying(true);
      setPlaying2(true);
    }
  };

  useEffect(() => {
    if (playing) {
      audio.play();
      secAudio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      secAudio.pause();
      secAudio.currentTime = 0;
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
      secAudio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    secAudio.volume = vol;
  }, [vol]);

  return [playing, current, toggle, setCurrent, audio];
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

export const useGetAudioList = () => {
  const response = useQuery(EXCHANGE_RATES);
  const { loading, error } = response;
  let { data } = response;
  if (loading || error) return { loading, error, data };

  data = data.allSounds.map((el: any) => ({
    title: el.title,
    url: el.file.publicUrl,
    id: el.id,
    playing: false,
  }));

  return { loading, error, data };
};
