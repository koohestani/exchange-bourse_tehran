import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import HomePage from './components/pages/HomePage';

import SymbolState from './context/symbol/SymbolState';

const App = () => {
  return (
    <div className="App">
      <SymbolState>
        <div className="container-fluid">
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </div>
      </SymbolState>
    </div>
  );
}

export default App;
