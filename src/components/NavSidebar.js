import React, { Component } from 'react'
import { NavLink, Link, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import logo from '../assets/sidebar/elogbook.png'
import dashboardLogo from '../assets/sidebar/dashboard.png'
import logbookLogo from '../assets/sidebar/logbook.png'
import skdiLogo from '../assets/sidebar/skdi.png'
import FontAwesome from 'react-fontawesome'


class Sidebar extends Component {

  render() {
    let collapsed = this.props.collapsed
    let sideMenuClass = collapsed ? "side-menu-tab side-menu-tab-collapsed" : "side-menu-tab"
    let burgerStyle = {color: "#C5C9D7", fontSize: "24px"}
    if(collapsed)
	  burgerStyle = {...burgerStyle, marginLeft: "32px", marginTop: "20px"}
    else
	  burgerStyle = {...burgerStyle, position: "relative", marginLeft: "50px", top: "8px"}
    return (
      <div className="sidebar-dashboard">
	    <div className="logo-container-sidebar-dashboard">
             {collapsed || <img className="logo-elogbook-sidebar" src={logo}></img> }
	    <a href="#" onClick={this.props.onBurgerClick} ><FontAwesome name="bars"
	    		  style={burgerStyle}
	    		   /></a>
          </div> 
          <div className="side-menu">
            <NavLink className={sideMenuClass} activeClassName="menu-active" style={ {textDecoration: 'none'}} to='/dashboard'>
              <img src={dashboardLogo}></img>
	    {collapsed || <div>Dashboard</div>}
            </NavLink>
            <NavLink className={sideMenuClass} activeClassName="menu-active"  style={{ textDecoration: 'none' }} to='/logbook'>
                <img src={logbookLogo}></img>
	    {collapsed || <div>Logbook</div>}
            </NavLink>
            <NavLink className={sideMenuClass} activeClassName="menu-active" style={ {textDecoration: 'none'} } to='/skdi'>
                <img src={skdiLogo}></img>
	    {collapsed || <div>SKDI</div>}
            </NavLink>
          </div>
      </div>
    )
  }
}

export default Sidebar

