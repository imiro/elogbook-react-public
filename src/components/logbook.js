import React, { Component } from 'react'
import {NavLink,  useLocation, useHistory } from 'react-router-dom'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import nodata from '../assets/images/logbook/no_data.png'
import search from '../assets/images/logbook/search.png'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import { AlignLeft } from 'react-feather';
import LogbookData from './logbook_data'
import { useEntries, useCompleteDictionary } from '../providers/api'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import dialog from '../assets/images/logbook/dialog.png'

class Logbook extends Component <*, State> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
   

  render() {
   
    var popup = null;
    if(this.props.location.state != null) {
	if(this.props.location.state.successfulEntry) {
                    popup = 
		    <Popup modal defaultOpen>
                      {close => (
                        <div className="popup-new-entry" >
                          <img src={dialog} ></img>
                          <div className="popup-new-entry-title" >
			      {this.props.location.state.newEntry ? 
				      <>Entry Baru Disimpan</> :
				      <>Entry Disimpan</>}
                          </div>
                          <div className="popup-new-entry-content" >
			      {this.props.location.state.newEntry ? 
				      <>Entry baru yang Anda masukkan telah berhasil disimpan</> :
				      <>Entry yang Anda ubah telah berhasil disimpan</>}
                            
                          </div>
                        </div>
                      )}
                    </Popup>
	}
    }

    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar page="Logbook"/>
          <div className="navbar-divider"></div>
                <div className="profile-bar">
                   <select name="kategori" id="kategori">
                   <option disabled selected value>Kategori</option>
                   <option value="">Diagnosis</option>
                   <option value="">Keterampilan</option>
                 </select>
                 <div id= "logbook-search-box"className="logbook-search-box">
                   <input id="search" type="text" placeholder="Cari"></input><img src={search}></img>
                 </div>
                 <NavLink id="logbook-new-entry" style={{ textDecoration: 'none' }} to='/logbook-entry'>
                    <div>  + Tambah Entry Baru</div>
                 </NavLink>
                </div>        
          <div className="logbook-box">
	    { popup }
	    { this.props.data ? 
	    <LogbookData {...this.props.options}
	    		 dictionary={this.props.dictionary}
	    		 data={this.props.data} /> :
		    null }
          </div>
        </div>
      </div>
      
    )
  }
}

export function withDictionaryOptions(Component) {
	return function(props) {
	const dict = useCompleteDictionary()

	function toValueLabel(obj) {
		var ret = []
		for(var key in obj)
		   ret.push({
			   value: key,
			   label: obj[key]
		   })
		return ret;
	}
	
	// TODO show loading component instead of this
	if(!dict) return null

	const options = {
	   optionRS: toValueLabel(dict.wahana),
	   optionStase: toValueLabel(dict.stase),
	   optionRoom: toValueLabel(dict.lokasi),
	   optionCompetence: toValueLabel({
		'1': '1', '2': '2',
		'3A': '3A', '3B': '3B', '4A': '4A', '4B': '4B'
	   })
	}

	return <Component options={options}
			  dictionary={dict} {...props} />
	}
}

function injectAPI(Component) {
	const InjectedLogbook = function(props) {
		const entries = useEntries()
		return <Component {...props} 
		        data={entries} 
			/>
	}
	
	return withDictionaryOptions(InjectedLogbook);
}

export default injectAPI(Logbook)
