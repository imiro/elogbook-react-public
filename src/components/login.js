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
      if(process.env.REACT_APP_MOCK_USER === 'true') {
	    console.warn("Mock SSO user")
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

  
	attemptPasswordLogin(e.target.email.value,
			     e.target.password.value)
	.then(function (tkn) {
		updateCredentials(tkn)
	}).catch(function (e) {
		console.log(e)
    
		setWrong(true);
		// if(e.status == 422)
    // alert(e.statusText)
		// else
		// 	alert(e.statusText)
	})
  }
  const [isWrong, setWrong] = useState(false);

  if(user) {
    // TODO redirect to original location, using callbacks
    // SEE https://reactrouter.com/web/example/auth-workflow

	  // TODO to dashboard if password set, to password setting otherwise
    if(user.is_password_set)
    	return <Redirect to="/dashboard" />
    else
	  return <Redirect to={`/login-atur-password-baru?email=${user.email}&token=${user.set_password_token}`} />

    return (
      <div>
        <div>User: <pre>{JSON.stringify(user)}</pre></div>
      </div>
    )
  } else {
    
    return (
    <div className="container-login">
      <LoginStaticPage/>
      <div className= "container-form-login">
        <div className="container-error-login">
        {isWrong? 
          <div className="alert-login"></div> : null }
         {isWrong ? 
        <span className="alert-login-text">Password/ Email UI yang Anda masukkan tidak sesuai, silahkan <br></br> masukkan password/ Email UI yang benar</span>
        :null
        }
        </div>
        <div className="form-login">
          <div className="login-text">Login</div>
          <form onSubmit={e => handleLogin(e)}>
              <label htmlFor="email" className="login-label">Email UI </label>
            {/* <div className="form-input">
            <div className="login-text">Login</div> */}
              <div className= "email-box">
                <input id="email" type="email" name="email" placeholder="Masukkan Email UI Anda" className={emailError ? "login-textfield-error" : "login-textfield"} onChange={(e) => validateEmail(e)}></input>
                <span className="email-error"><img id="email-error" src={error}/>{emailError}</span> 
              </div>
              <label htmlFor="password" className="login-label">Password </label>
              <div className= "password-box">
                <input id="password" type="password" name="password" placeholder="Masukkan Password Anda" className="login-textfield"></input>
                <div id="togglePassword" className={isHide ? "hide-password" : "show-password"} onClick={togglePassword}></div>
              </div>
              <div className="forgot-password">
                <Link id="forgot-password" to="/login-forgot-password">Lupa password?</Link>
              </div>
              <input id="login-submit" type="submit" value="Login" className="login-button" />
              <div className="login-or"><img src={atau}></img></div>
              {/* <div className="login-sso-submit" type="submit" value="Login dengan SSO" onClick={e => handleSSOLogin(e)}>Login dengan SSO</div> */}
              <Link className="login-sso-submit" type="submit" value="Login dengan SSO" to="/login-atur-password-baru">Login dengan SSO</Link>
              <div className="login-confirm"><div>Pertama kali menggunakan E-Logbook? </div><div>Silahkan Login dengan SSO terlebih dahulu</div> </div>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
    ) 
  }
}
