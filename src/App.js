import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/styles.scss';
import { AuthWrapper, PrivateRoute } from './providers/auth'
import LoginPage from './components/login'
import HomePage from './components/home'

export default function App() {

  return (
    <AuthWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute component={HomePage} />
      </BrowserRouter>
    </AuthWrapper>
  );
}
