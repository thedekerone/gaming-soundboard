import React, { useState, useEffect } from 'react';
import { Button, Input } from '@material-ui/core';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import useStyles from './audioStyles';

// import styles from './audioStyles.tsx';

type AudioProps = {
  options: {
    title: string;
    url: string;
    playing: boolean;
    id: number;
  };
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  current: number;
  active: boolean;

  toggle: (url: string, id: number, force: boolean) => void;
  isPlaying: boolean;
};

function AudioComponent({
  options,
  toggle,
  current,
  isPlaying,
  active,
  setCurrent,
}: AudioProps) {
  const classes = useStyles();
  const { title, url, playing, id } = options;
  // const [playing, setPLaying] = useState(false);

  const handleClick = () => {
    console.log(playing);
    toggle(url, id, false);
    setCurrent(options.id);
    // setPLaying(!playing);
  };

  return (
    <div className={classes.flexContainer}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ width: '100%' }}
        className={classes.button}
        startIcon={
          active ? <PauseCircleFilledIcon /> : <PlayCircleFilledWhiteIcon />
        }
      >
        {title}
      </Button>
      <Input type="text" />
    </div>
  );
}

export default AudioComponent;
