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
import { useEntries, useDictionary, useSkdiDxList } from '../providers/api'

class Logbook extends Component <*, State> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleData = (data) => {
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
          {/*this.props.data ? <LogbookData {...this.props.options} data={this.props.data}/> : 
              null
          */ }
	    <LogbookData {...this.props.options}
	    		 dictionary={this.props.dictionary}
	    		 data={this.props.data} />
          </div>
        </div>
      </div>
      
    )
  }
}

function injectAPI(Component) {
	const InjectedLogbook = function(props) {
		const entries = useEntries()
		let dict = useDictionary()
		const skdi_dx = useSkdiDxList()
		
		function toValueLabel(obj) {
		   	var ret = []
			for(var key in obj)
			   ret.push({
				   value: key,
				   label: obj[key]
			   })
		        return ret;
		}

		const options = {
		   optionRS: toValueLabel(dict.wahana),
		   optionStase: toValueLabel(dict.stase),
		   optionRoom: toValueLabel(dict.lokasi),
		   optionCompetence: toValueLabel({
			'1': '1', '2': '2',
			'3A': '3A', '3B': '3B', '4A': '4A', '4B': '4B'
		   })
		}
		dict = {...dict, skdi_dx: skdi_dx}

		console.log('dict', dict)
		console.log('options', options)

		// console.log(entries)
		// console.log("^ entries")
		return <Component {...props} 
		        data={entries} 
			dictionary={dict} options={options} />
	}
	
	return InjectedLogbook;
}

export default injectAPI(Logbook)
