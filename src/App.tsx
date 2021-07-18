import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import AudioManager from './Audio/components/AudioManager';
import SoundProvider from './Audio/components/SoundProvider';
import Home from './pages/Home';

export default function App() {
  return (
    <AudioManager>
      <SoundProvider>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </SoundProvider>
    </AudioManager>
  );
}
