import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './NavSidebar'
import Dashboard from './Dashboard'
import Logbook from './logbook'
import LogbookEntry from './logbook_entry'
import SKDI from './skdi'
import Profile from './profile'
import InfoSKDI from './/infoskdi'

export default function Layout(props) {
	
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSidebar = function(e) {
	e.preventDefault()
	setShowSidebar(current => !current)
    }

    return (
      <div className="container-dashboard">
	<Sidebar onBurgerClick={toggleSidebar} collapsed={!showSidebar} />
        <div className="content-dashboard" style={!showSidebar ? {marginLeft: "88px"} : {}}>
	    <Switch>
		  <Route exact path="/"  >
		    <Navbar page="Dashboard" onBurgerClick={toggleSidebar} />
		    <Route component={Dashboard} />
	    	  </Route>
		  <Route path="/dashboard"  >
		    <Navbar page="Dashboard" onBurgerClick={toggleSidebar} />
		    <Route component={Dashboard} />
	    	  </Route>
		  <Route path="/logbook" >
		    <Navbar page="Logbook" onBurgerClick={toggleSidebar} />
		    <Route component={Logbook} />
	    	  </Route>
		  <Route path="/logbook-entry">
		    <Navbar page={props.location.state ? "Edit entri" : "Entri baru"} onBurgerClick={toggleSidebar} />
		    <Route component={LogbookEntry} />
	    	  </Route>
		  <Route path="/skdi" >
		    <Navbar page="SKDI" onBurgerClick={toggleSidebar} />
		    <Route component={SKDI} />
	    	  </Route>
		  <Route path="/info-skdi" component={Dashboard} >
		    <Navbar page="Informasi terkait Kompetensi" onBurgerClick={toggleSidebar} />
		    <Route component={InfoSKDI} />
	    	  </Route>
		  <Route path="/profile" component={Dashboard} >
		    <Navbar page="Profile" onBurgerClick={toggleSidebar} />
		    <Route component={Profile} />
	    	  </Route>
	    {/*<Route path="/logout" component={Logout} />*/}
	  </Switch>
	    {/*<Navbar page={props.page} onBurgerClick={toggleSidebar} />
	    {props.children} */}
	</div>
     </div>
    )
}
