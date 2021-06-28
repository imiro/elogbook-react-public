import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoginStaticPage from './login_background'
import { requestForgotPassword } from '../providers/api'

export default function LoginForgotPasswordPage() {  
	const [email, setEmail] = useState('')
	const [passwordSent, setPasswordSent] = useState(false)

	const handleClick = function(e) {
		e.preventDefault()
		requestForgotPassword(email)	
		.then(function (ok) {
			// redirect to next page regardless link sent or not
			setPasswordSent(true)
		}, function () {
			alert('Network error')

		})
	}

    if(passwordSent)
	return <Redirect to="/login-confirm-password" />

    return (
      <div className="container-login">
      <LoginStaticPage/>
        <div className="form-forgot-password">
          <form onSubmit={e => handleClick(e)}>
            <div className="form-input">
              <div className="login-text">Lupa Password</div>
              <div className="login-confirm">
                <div>Masukkan Email UI yang Anda gunakan,</div>
                <div> Kami akan mengirimkan link untuk </div> 
                <div> mengatur password baru </div> 
              </div>
              <label for="email" className="login-label">Email UI </label>
              <input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Masukkan Email UI Anda" className="login-textfield"></input>
              <button id="forgot-password-submit" value="Kirim" className="send-button" onClick={e => handleClick(e)}>Kirim</button>
              <div className="login-confirm">Kembali ke halaman <Link id="link-login" to="/login" >Login</Link></div>
            </div>
          </form>
        </div>
      </div>
    ) 
}

