import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoginStaticPage from './login_background'

export default function LoginForgotPasswordPage() {  
    return (
      <div className="container-login">
      <LoginStaticPage/>
        <div className="form-forgot-password">
          <div className="login-text">Lupa Password</div>
          <div className="login-confirm">
            <div>Masukkan Email UI yang Anda gunakan,</div>
            <div> Kami akan mengirimkan link untuk </div> 
            <div> mengatur password baru </div> 
          </div>
          <form>
            <div className="form-input">
              <label for="email" className="login-label">Email UI </label>
              <input id="email" type="email" name="email" placeholder="Masukkan Email UI Anda" className="login-textfield"></input>
              <Link id="link-login" to="/login-confirm-password" ><button id="forgot-password-submit" value="Kirim" className="send-button">Kirim</button></Link>
              <div className="login-confirm">Kembali ke halaman <Link id="link-login" to="/login" >Login</Link></div>
            </div>
          </form>
        </div>
      </div>
    ) 
}

