import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import { AuthWrapper, PrivateRoute } from './providers/auth'
import LoginPage from './experiment/login'
import HomePage from './experiment/home'

export default function App() {

  return (
    <AuthWrapper>
      <BrowserRouter>
        {/* <Switch>
          <Route component={DashboardLayout} />
        </Switch> */}
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute component={DashboardLayout} />
        </Switch>
      </BrowserRouter>
    </AuthWrapper>
  );
}
