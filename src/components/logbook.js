import React, { Component } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import nodata from '../assets/images/logbook/no_data.png'
import search from '../assets/images/logbook/search.png'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import { AlignLeft } from 'react-feather';
import LogbookData from './logbook_data'

class Logbook extends Component <*, State> {
  constructor(props) {
    super(props);
    this.state = {isData: true};
  }
  handleData = () =>{
    this.setState({
      isData:!this.state.isData
    })
  }


  render() {
    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar />
          <div className="navbar-divider"></div>
                <div className="profile-bar">
                   <select name="kategori" id="kategori">
                   <option disabled selected value>Kategori</option>
                   <option value="">Kategori 1</option>
                   <option value="">Kategori 2</option>
                   <option value="">Kategori 3</option>
                 </select>
                 <div id= "logbook-search-box"className="logbook-search-box">
                   <input id="search" type="text" placeholder="Cari"></input><img src={search}></img>
                 </div>
                 <NavLink id="logbook-new-entry" style={{ textDecoration: 'none' }} to='/logbook-entry'>
                    <div>  + Tambah Entry Baru</div>
                 </NavLink>
                </div>        
          <div className="logbook-box">
          {this.state.isData ? <LogbookData/> : 
              null
          }
          </div>
        </div>
      </div>
      
    )
  }
}

export default Logbook