import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/styles.scss';
import { AuthWrapper, PrivateRoute } from './providers/auth'
import LoginPage from './components/login'
import HomePage from './components/home'
import LoginForgotPasswordPage from './components/login_forgotPassword'
import LoginSetupPasswordPage from './components/login_setupPassword'
import LoginConfirmPasswordPage from './components/login_confirmPassword'
import LoginAturPasswordBaruPage from './components/login_aturPasswordBaru'
import Test from './components/Test'
import './assets/css/bootstrap.min.css'
import './assets/css/light-bootstrap-dashboard.css'

import * as Mirage from './mirage'

export default function App() {

  return (
    <AuthWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/login-forgot-password" component={LoginForgotPasswordPage} />
          <Route path="/login-setup-password" component={LoginSetupPasswordPage} />
          <Route path="/login-confirm-password" component={LoginConfirmPasswordPage} />
          <Route path="/login-atur-password-baru" component={LoginAturPasswordBaruPage} />
          <Route path="/test" component={Test} />
        </Switch>
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute component={HomePage} />
          
      </BrowserRouter>
    </AuthWrapper>
  );
}

