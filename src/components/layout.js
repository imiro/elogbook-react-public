import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './NavSidebar'

export default function Layout(props) {
	
    const [showSidebar, setShowSidebar] = useState(true)
    const toggleSidebar = function(e) {
	e.preventDefault()
	setShowSidebar(current => !current)
    }

    return (
      <div className="container-dashboard">
	{showSidebar ? <Sidebar /> : null}
        <div className="content-dashboard" style={!showSidebar ? {marginLeft: 0} : {}}>
          <Navbar page={props.page} onBurgerClick={toggleSidebar} />
	    {/* <Switch>
		  <Route path="/dashboard" component={Dashboard} />
		  <Route path="/logbook" component={Logbook} />
		  <Route path="/logbook-entry" component={LogbookEntry} />
		  <Route path="/skdi" component={SKDI} />
		  <Route path="/profile" component={Profile} />
		  <Route path="/logout" component={Logout} />
	  </Switch> */}
	    {props.children}
	</div>
     </div>
    )
}
