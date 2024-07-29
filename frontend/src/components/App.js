
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/details/:city" component={WeatherDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
