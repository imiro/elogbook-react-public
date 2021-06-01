import React, { Component } from 'react'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'


class Logout extends Component {
  render() {
    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content">
          <Navbar />
          <h1>ini logout</h1>
        </div>
      </div>
    )
  }
}

export default Logout