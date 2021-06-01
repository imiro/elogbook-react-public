import React, { Component } from 'react'
import { NavLink, Link, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import logo from '../assets/sidebar/elogbook.png'
import dashboardLogo from '../assets/sidebar/dashboard.png'
import logbookLogo from '../assets/sidebar/logbook.png'
import skdiLogo from '../assets/sidebar/skdi.png'



class Sidebar extends Component {

  render() {
    return (
      <div className="sidebar-dashboard">
          <div className="logo-container-sidebar-dashboard">
             <img className="logo-elogbook-sidebar" src={logo}></img>
          </div>
          <div className="side-menu">
            <NavLink className="side-menu-tab" activeClassName="menu-active" style={ {textDecoration: 'none'}} to='/dashboard'>
              <img src={dashboardLogo}></img>
              <div>Dashboard</div>
            </NavLink>
            <NavLink className="side-menu-tab" activeClassName="menu-active"  style={{ textDecoration: 'none' }} to='/logbook'>
                <img src={logbookLogo}></img>
                <div>Logbook</div>
            </NavLink>
            <NavLink className="side-menu-tab" activeClassName="menu-active" style={ {textDecoration: 'none'} } to='/skdi'>
                <img src={skdiLogo}></img>
                <div>SKDI</div>
            </NavLink>
          </div>
      </div>
    )
  }
}

export default Sidebar

