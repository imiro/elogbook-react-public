import React from 'react'
import { Link } from 'react-router-dom';
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoginStaticPage from './login_background'

export default function LoginForgotPasswordPage() {  
    return (
        <div className="container-login">
          <LoginStaticPage/>
          <div className="confirm-send-email">
            <div className="login-text">Cek Email Anda</div>
            <div className="confirm-email">
              <div>Kami telah mengirimkan link email untuk</div>
              <div> mengatur password baru Anda</div>
            </div>
            <div className="login-confirm">Tidak menerima Email? <Link id="link-login" to="/login-forgot-password">Kirim Ulang</Link></div>
          </div>
        </div>
    ) 
}



