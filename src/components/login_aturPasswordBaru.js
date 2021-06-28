import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoginStaticPage from './login_background'
import { setPassword } from '../providers/api'


export default function LoginForgotPasswordPage() {  
const [isHideNew, setHideNew] = useState("false");

  let query = new URLSearchParams(useLocation().search)
	
  const togglePasswordNew = () => {
    setHideNew(!isHideNew);
    const password = document.querySelector('#passwordbaru');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
  };

const [isHideConfirm, setHideConfirm] = useState("false");

  const togglePasswordConfirm = () => {
    setHideConfirm(!isHideConfirm);
    const password = document.querySelector('#passwordkonfirmasi');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
  };

const [isSaved, setSaved] = useState(false);

  const toggleAlertSaved = () => {
    setSaved(!isSaved);
    // document.getElementById('alert-password-text').innerHTML = "Password berhasil disimpan";
  };

    const [redirect, setRedirect] = useState(false)
    if(redirect)
	return <Redirect to="/dashboard" />

    const handleFormSubmit = function(e) {
	e.preventDefault()
	const token = query.get("token"), email = query.get("email")
	let { password, password_confirmation } = e.target
	password = password.value
	password_confirmation = password_confirmation.value
	setPassword({
		token,
		email,
		password,
		password_confirmation
	}).then(async function(resp) {
		if(resp.ok) {
			setSaved(true)
			setTimeout(() => setRedirect(true), 1500)
		} else {
			console.error(resp)
			alert('Gagal. Pastikan kedua password Anda sama. Tautan Anda mungkin sudah kadaluwarsa.')
			// handle error
		}
	}).catch(function() {
		alert('Network error')
	})
    }

    return (
      <div className="container-login">
      <LoginStaticPage/>
        <div className={isSaved ? "alert-password-saved" : "alert-password"}></div>
	{isSaved ? <span id="alert-password-saved-text">Password berhasil disimpan</span>
		 : <span id="alert-password-text">Atur password baru Anda yang nanti dapat digunakan untuk masuk ke dalam akun <br></br>E-logbook Anda dengan menggunakan email UI</span>}
        <div className="form-new-password">
            <div className="login-text">Atur Password Baru</div>
            <form onSubmit={e => handleFormSubmit(e)}>
                <div className="form-input">
                    <label htmlFor="password" className="login-label">Password Baru</label>
                    <div className= "password-box">
                    <input id="passwordbaru" type="password" name="password" placeholder="Masukkan Password Baru Anda" className="login-textfield"></input>
                    <div id="togglePassword" className={isHideNew ? "hide-password" : "show-password"} onClick={togglePasswordNew}></div>
                    </div>
                    <label htmlFor="password" className="login-label">Konfirmasi Password </label>
                    <div className= "password-box">
                    <input id="passwordkonfirmasi" type="password" name="password_confirmation" placeholder="Konfirmasi Password Anda" className="login-textfield"></input>
                    <div id="togglePassword" className={isHideConfirm ? "hide-password" : "show-password"} onClick={togglePasswordConfirm}></div>
                    </div>
                    <button id="" value="simpan" className="send-button" >Simpan</button>
                    </div>
            </form>
            </div>
      </div>
    ) 
}
