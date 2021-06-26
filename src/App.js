import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { AuthWrapper, PrivateRoute } from './providers/auth'
import LoginPage from './components/login'
import HomePage from './components/home'
import LoginForgotPasswordPage from './components/login_forgotPassword'
import LoginSetupPasswordPage from './components/login_setupPassword'
import LoginConfirmPasswordPage from './components/login_confirmPassword'
import LoginAturPasswordBaruPage from './components/login_aturPasswordBaru'
import Dashboard from './components/dashboard'
import Logbook from './components/logbook'
import LogbookEntry from './components/logbook_entry'
import SKDI from './components/skdi'
import Profile from './components/profile'
import Logout from './components/logout'
import Tes from './components/logbookTable'
// import './assets/css/bootstrap.min.css'
// import './assets/css/light-bootstrap-dashboard.css'

import * as Mirage from './mirage'

export default function App() {

  return (
    <AuthWrapper>
      <HashRouter>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/login-forgot-password" component={LoginForgotPasswordPage} />
          <Route path="/login-setup-password" component={LoginSetupPasswordPage} />
          <Route path="/login-confirm-password" component={LoginConfirmPasswordPage} />
          <Route path="/login-atur-password-baru" component={LoginAturPasswordBaruPage} />
          {/* <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} /> */}
        </Switch>
          {/* <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute component={HomePage} /> */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/logbook" component={Logbook} />
          <PrivateRoute path="/logbook-entry" component={LogbookEntry} />
          <PrivateRoute path="/skdi" component={SKDI} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/logout" component={Logout} />
      </HashRouter>
    </AuthWrapper>
  );
}

