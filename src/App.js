import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import { Login } from './components/Login.page';
import { SignUp } from './components/SignUp.page';
import { Main } from './components/Main.page';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/signup" component={ SignUp } />
        <Route path="/login" component={ Login } />
        <Route path="/" component={ Main } />
      </Switch>
    </div>
  );
}

export default App;
