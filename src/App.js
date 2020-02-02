import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import { AuthProvider } from './context/AuthContext';
import { Authentication } from './context/AuthContext';

import { Login } from './components/Login.page';
import { SignUp } from './components/SignUp.page';
import { Main } from './components/Main.page';
import { LoadingPage } from './components/Loading.page';

const App = () => {
  const { authLoading } = useContext(Authentication);
  
  return (
    <AuthProvider>
      <div className="App">
        {authLoading?(<LoadingPage />):(
          <Switch>
            <Route exact path="/signup" component={ SignUp } />
            <Route exact path="/login" component={ Login } />
            <Route path="/" component={ Main } />
          </Switch>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
