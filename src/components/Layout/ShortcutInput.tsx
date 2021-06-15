import React, { useState } from 'react';
import useStyles from './styles';

const ShortcutInput = () => {
  const [keys, setKeys] = useState('');
  const classes = useStyles();
  const handleKeyDown = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);
    let newHotkeys = '';

    if (event.ctrlKey && event.key !== 'Control')
      newHotkeys = `Ctrl + ${newHotkeys}`;
    if (event.altKey && event.key !== 'Alt') newHotkeys = `Alt + ${newHotkeys}`;
    newHotkeys += event.key;
    setKeys(newHotkeys);
    if (event.key === 'Escape') {
      setKeys('');
    }
  };

  return (
    <input
      value={keys}
      className={classes.input}
      onKeyDown={handleKeyDown}
      type="text"
    />
  );
};
export default ShortcutInput;
