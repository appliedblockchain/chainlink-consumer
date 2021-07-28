import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './features/Home';
import PriceConsumer from './features/PriceConsumer';
import VRF from './features/VRF';
import APIConsumer from './features/APIConsumer';

function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/price-consumer">Price Consumer</Link>
        </li>
        <li>
          <Link to="/vrf">VRF</Link>
        </li>
        <li>
          <Link to="/api-consumer">API Consumer</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/price-consumer">
          <PriceConsumer />
        </Route>
        <Route path="/vrf">
          <VRF />
        </Route>
        <Route path="/api-consumer">
          <APIConsumer />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
