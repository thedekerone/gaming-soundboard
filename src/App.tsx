import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import AudioManager from './Audio/components/AudioManager';
import Home from './pages/Home';

export default function App() {
  return (
    <AudioManager>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AudioManager>
  );
}
