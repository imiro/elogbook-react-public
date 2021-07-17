import React, { Component } from 'react'
import { NavLink, Link, useLocation} from 'react-router-dom'
import expand from '../assets/images/navbar/expand_more.png'
import profile from '../assets/images/navbar/profile.png'
import logout from '../assets/images/navbar/logout.png'
import logoutPopup from '../assets/images/navbar/logout_popup.png'
import { useAuth } from '../providers/auth'
import { useHistory } from 'react-router-dom'


class Popup extends Component {
  constructor(props) {
	  super(props)
  }

  handleLogout() {
	// TODO refactor this to be inside auth instead?
	this.props.auth.updateCredentials(null)
	this.props.history.push('/login')
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <img src={logoutPopup}></img>
          <div className='logout-title'>Log Out</div>
          <div className='logout-text'>Apakah Anda yakin ingin keluar dari<br></br>E-logbook?</div>
          <div className='logout-button-box'>
            <button className='logout-cancel-button' onClick={this.props.closePopup}>Batal</button>
            <button onClick={this.handleLogout.bind(this)} className='logout-button'>Keluar</button>
          </div>
        </div>
      </div>
    );
  }
}

class Navbar extends Component {
 
  constructor(props) {
    super(props);
    this.state = {isToggle: false,  showPopup: false};
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  toggleDropdown(e) {
    this.setState({isToggle: !this.state.isToggle});
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      isToggle: !this.state.isToggle
    });
  }

  render() {
    
    let pathname = window.location.pathname;
    pathname = pathname.slice(1);
    pathname = pathname.charAt(0).toUpperCase()+pathname.slice(1);
    if(pathname=="Skdi"){
      pathname="SKDI";
    }
    else if(pathname=="Logbook-entry"){
      pathname="Logbook";
    }
    
    return (

<div>
<nav className="navbar navbar-expand-lg navbar-dashboard" >
      <div className="navbar-title">{pathname}</div>
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
      {this.state.showPopup ? 
          <Popup
	    auth={this.props.auth} history={this.props.history}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
          <div className=" navbar-avatar-box">
              <div className= "navbar-avatar">JD</div>
              <a className="navbar-name" onClick={this.toggleDropdown}>
                John Doe
              </a>
              <img className="navbar-expand" onClick={this.toggleDropdown} src={expand}></img>
            <div className="dropdown-menu-box" style={{display: this.state.isToggle ? 'block': 'none'}}>
              <div className="dropdown-item-avatar-box">
                <div className= "dropdown-item-avatar">JD</div>
                <div className= "dropdown-item-text">
                  <div className="dropdown-item-username">{this.props.auth.user.name}</div>
                  <div className="dropdown-item-id">{this.props.auth.user.npm ? this.props.auth.user.npm : ""}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-menu-box-bottom">
                <NavLink className="dropdown-item-menu"  style={ {textDecoration: 'none'}} to='/profile'><img src={profile}></img> Lihat Profil</NavLink>
                <div className="dropdown-item-menu" onClick={this.togglePopup}><img src={logout}></img>Sign Out</div>
              </div>
            </div>
          </div>
      </div>
    </nav>
    </div>
    )
  }
}

function withHooks(Component) {
	
	return function (props) {
		const auth =  useAuth()
		const history = useHistory()

		return <Component
			{...props}
			auth={auth} history={history} />
	}
}

export default withHooks(Navbar)
