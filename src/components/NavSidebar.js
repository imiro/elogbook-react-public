import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import logo from '../assets/login/logo.png'
import dashboardLogo from '../assets/sidebar/dashboard.png'
import logbookLogo from '../assets/sidebar/logbook.png'
import skdiLogo from '../assets/sidebar/skdi.png'


class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <div className="logo">
            <img className="logo-elogbook-sidebar" src={logo}></img>
            <Link to='/' className="simple-text">
              <div className="elogbook-text-sidebar">E-Logbook</div>
              <div className="fkui-text-sidebar">Fakultas Kedokteran UI</div>
            </Link>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link" to='/dashboard'>
                <img src={dashboardLogo}></img>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/profile'>
                <img src={logbookLogo}></img>
                <p>Logbook</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/profile'>
                <img src={skdiLogo}></img>
                <p>SKDI</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar