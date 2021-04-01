import React from 'react'
import './sb-admin-2.css'
import "../../node_modules/font-awesome/css/font-awesome.min.css"
import FrameLogin from '../assets/login/frame-login.png'
import logo from '../assets/login/logo.png'
import dashboardLogo from '../assets/login/dashboard.png'
import logbookLogo from '../assets/login/logbook.png'
import skdiLogo from '../assets/login/skdi.png'


export default function LoginPage() {
    return (
          <div className="frame-login">
            <img className="background-login" src={FrameLogin}></img>
            <img className="logo-elogbook" src={logo}></img>
            <div className="elogbook-text">E-Logbook</div>
            <div className="fkui-text">Fakultas Kedokteran UI</div>
            <div className="loginLogo">
                <div>
                    <img src={dashboardLogo}></img>
                    <span><h5>Dashboard</h5></span>
                </div>
                <div>
                    <img src={logbookLogo}></img>
                    <h5>Logbook</h5>
                </div>  
                <div>
                    <img src={skdiLogo}></img>
                    <h5>SKDI</h5>
                </div>  
            </div>
          </div> 
    )
    

}