import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './NavSidebar'
import Main from './Main'

class Test extends Component {
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Sidebar />
          <Route path='/test' component={Main} />
        </Router>
      </div>
    )
  }
}

export default Test