import React, { useState, useEffect, Dispatch } from 'react';

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
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);

  const toggle: (srcUrl: string, id: number, force: boolean) => void = (
    srcUrl,
    id,
    force = false
  ) => {
    audio.src = srcUrl;
    if (!force) {
      if (id === current || current === -1) {
        setPlaying(!playing);
      } else {
        audio.pause();
        audio.play();
      }
    } else {
      audio.currentTime = 0;
      setCurrent(id);
      setPlaying(true);
      audio.play();
    }
  };

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, current, toggle, setCurrent, audio];
};

export const useGetAudioList = () => {};
