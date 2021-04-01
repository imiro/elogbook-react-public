import React from 'react'
import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoginStaticPage from './login_background'

export default function LoginForgotPasswordPage() {  
const [isHideNew, setHideNew] = useState("false");

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

const [isSaved, setSaved] = useState("false");

  const toggleAlertSaved = () => {
    setSaved(!isSaved);
    document.getElementById('alert-password-text').innerHTML = "Password berhasil disimpan";
  };

    return (
      <div className="container-login">
      <LoginStaticPage/>
        <div className={isSaved ? "alert-password" : "alert-password-saved"}></div>
        <span id={isSaved ? "alert-password-text" : "alert-password-saved-text"}>Atur password baru Anda yang nanti dapat digunakan untuk masuk ke dalam akun <br></br> E-logbook Anda dengan menggunakan email UI</span>
        
        <div className="form-new-password">
            <div className="login-text">Atur Password Baru</div>
            <form>
                <div className="form-input">
                    <label for="password" className="login-label">Password Baru</label>
                    <div className= "password-box">
                    <input id="passwordbaru" type="password" name="password" placeholder="Masukkan Password Baru Anda" className="login-textfield"></input>
                    <div id="togglePassword" className={isHideNew ? "hide-password" : "show-password"} onClick={togglePasswordNew}></div>
                    </div>
                    <label for="password" className="login-label">Konfirmasi Password </label>
                    <div className= "password-box">
                    <input id="passwordkonfirmasi" type="password" name="password" placeholder="Konfirmasi Password Anda" className="login-textfield"></input>
                    <div id="togglePassword" className={isHideConfirm ? "hide-password" : "show-password"} onClick={togglePasswordConfirm}></div>
                    </div>
                    <button id="" value="simpan" className="send-button" onClick={toggleAlertSaved}>Simpan</button>
                    </div>
            </form>
            </div>
      </div>
    ) 
}