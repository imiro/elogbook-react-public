import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import { AuthWrapper, useAuth, PrivateRoute } from './auth'
import LoginPage from './experiment/login'

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
          <PrivateRoute component={DashboardLayout} />
        </Switch>
      </BrowserRouter>
    </AuthWrapper>
  );
}
