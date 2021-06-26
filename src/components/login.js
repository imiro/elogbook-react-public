import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useAuth, attemptPasswordLogin } from '../providers/auth'
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoginStaticPage from './login_background'
import atau from '../assets/login/atau.png'
import error from '../assets/login/error-warning.png'

export default function LoginPage() {

  const url = process.env.REACT_APP_API_URL + "/sso_login"

  let { token, user, updateCredentials } = useAuth()
    // let history = useHistory();
    // let location = useLocation();

  function processTokenUpdate(tok) {
    updateCredentials(tok)
  }
  
  function handleSSOLogin(ev) {
      ev.preventDefault()
      if(process.env.REACT_APP_MOCK_USER) {
            processTokenUpdate("toKen123")    
            return
      }

      window.addEventListener('message', function(e) {
        if(e.data.message == "deliverToken") {
          let tkn = e.data.result
          e.source.close()
          processTokenUpdate(tkn)
        }
      })
      let child = window.open(url)
      let interval = setInterval(function() {
      try {
        child.postMessage({message: "requestToken"}, "*")
      } catch(e) {
        if(child.closed) {
          clearInterval(interval)
          return
        }
      }
    }, 500)
  }

  const [isHide, setHide] = useState("false");

  const togglePassword = () => {
    setHide(!isHide);
    const password = document.querySelector('#password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
  };

  const [emailError, setEmailError] = useState('') 

  const validateEmail = (e) => { 
    var email = e.target.value 
  
    if (validator.isEmail(email)) { 
      setEmailError('') 
      document.getElementById("email-error").style.display = "none";
    } 
    else{
      setEmailError('Format Email yang dimasukkan salah') 
      document.getElementById("email-error").style.display = "block";
    }
  } 

  const handleLogin = (e) => {
	e.preventDefault()
	if(emailError) {
		console.log('Email not valid')
		return
	} else if(!e.target.email.value) {
		console.log('Email not set')
		return
	}

	console.log(e.target.email.value)
	console.log(e.target.password.value)
	
	attemptPasswordLogin(e.target.email.value,
			     e.target.password.value)
	.then(function (tkn) {
		updateCredentials(tkn)
	}).catch(function (e) {
		console.log(e)
		if(e.status == 422)
			alert("Email / Password tidak sesuai")
		else
			alert(e.statusText)
	})
  }

  if(user) {
    // TODO redirect to original location, using callbacks
    // SEE https://reactrouter.com/web/example/auth-workflow

	  // TODO to dashboard if password set, to password setting otherwise
    // if(user.is_password_set)
    return <Redirect to="/dashboard" />

    return (
      <div>
        <div>User: <pre>{JSON.stringify(user)}</pre></div>
      </div>
    )
  } else {
    
    return (
    <div className="container-login">
      <LoginStaticPage/>
      <div className="form-login">
        <div className="login-text">Login</div>
        <form onSubmit={e => handleLogin(e)}>
          <div className="form-input">
            <label for="email" className="login-label">Email UI </label>
            <div className= "email-box">
              <input id="email" type="email" name="email" placeholder="Masukkan Email UI Anda" className={emailError ? "login-textfield-error" : "login-textfield"} onChange={(e) => validateEmail(e)}></input>
              <span className="email-error"><img id="email-error" src={error}/>{emailError}</span> 
            </div>
            <label for="password" className="login-label">Password </label>
            <div className= "password-box">
              <input id="password" type="password" name="password" placeholder="Masukkan Password Anda" className="login-textfield"></input>
              <div id="togglePassword" className={isHide ? "hide-password" : "show-password"} onClick={togglePassword}></div>
            </div>
            <div className="forgot-password">
              <Link id="forgot-password" to="/login-forgot-password">Lupa password?</Link>
            </div>
            <input id="login-submit" type="submit" value="Login" className="login-button" />
            <div className="login-or"><img src={atau}></img></div>
            <Link id="link-login" to="/login-atur-password-baru"><button id="login-sso-submit" type="submit" value="Login dengan SSO" className="login-button" onClick={e => handleSSOLogin(e)}>Login dengan SSO</button></Link>
            <div className="login-confirm"><div>Pertama kali menggunakan E-Logbook? </div><div>Silahkan Login dengan SSO terlebih dahulu</div> </div>
          </div>
        </form>
      </div>
    </div>
    ) 
  }
}
