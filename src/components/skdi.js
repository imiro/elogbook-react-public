import React, { useState, useEffect } from 'react'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import search from '../assets/images/logbook/search.png'
import info from '../assets/images/dashboard/info.png'
import sort from '../assets/images/dashboard/sort.png'
import Select from 'react-select'
import { useSkdiDxList, useSkdiDxCount } from '../providers/api'


function SKDI() {
   const skdi = useSkdiDxList()
   const data = useSkdiDxCount()

   const [filterTingkat, setFilterTingkat] = useState([])
   const toggleFilter = function(tingkat, setFilter=setFilterTingkat) {
	return function(e) {
	setFilter(current => {
	if(current.includes(tingkat)) {
		let next = [...current]
		next.splice(current.indexOf(tingkat), 1);
		return next
	} else {
		return current.concat(tingkat)
	}
	})
	}
   }
   const [sistem, setSistem] = useState([])
   const handleSistemChange = function(e) {
	setSistem(e.map(k => k.value))
   }

   var [tableData, setTableData] = useState(null);
   useEffect(function() {
	if(skdi) {
		let ntableData = {}
		skdi.forEach(k => {
		  let kdata = {...k, n: data && data[k.id]!=null ? data[k.id] : '-'}
		  if(ntableData[k.kategori])
			ntableData[k.kategori].push(kdata)
		  else
			ntableData[k.kategori] = [kdata]
		})
	setTableData(ntableData)
	}
   }, [skdi, data])

    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar page="SKDI" />
          <div className="navbar-divider"></div>
          <div className="profile-bar">
            <div className="skdi-bar-title">Kompetensi</div>
	    { ['1', '2', '3A', '3B', '4A'].map(tingkat =>
            <div onClick={toggleFilter(tingkat)} className="skdi-bar-competency"
		  style={filterTingkat.includes(tingkat) ? {
		  	   color: 'white', background: '#008C8F'} : {}}>{tingkat}</div>
	    )}
            <div id= "skdi-search-box"className="skdi-search-box">
                <input id="skdi-search" type="text" placeholder="Cari"></input><img src={search}></img>
            </div>
          </div>
          <div className="skdi-box">
            <div className="skdi-row1">
              <div className="skdi-row1-title">
                Sistem
              </div>
              <div className="skdi-row1-info">
                <img src={info}></img>
                <div>Informasi Terkait Kompetensi</div>
              </div>
            </div>
            <div className="skdi-row2" style={{width: "600px"}}>
	    	{ tableData ? 
		  <Select isMulti 
			options={Object.keys(tableData).map(k => ({value: k, label: k}))}
			onChange={handleSistemChange} /> : null }
            </div>
	    { tableData ? 
	      Object.keys(tableData)
		 .filter(kategori => !sistem.length || sistem.includes(kategori))
		 .map(kategori => (
	      <>
              <div className="skdi-table-title">{kategori}</div>
              <table className="skdi-table-content">
                <tr>
                  <th>Diagnosis</th>
                  <th>Kompetensi</th>
                  <th><img src={sort}></img>Jumlah ditemui</th>
                </tr>
		{ 
		tableData[kategori]
		.filter(kdata => (!filterTingkat.length || filterTingkat.includes(kdata.kompetensi)))
		.map(kdata => (
                <tr>
                  <td>{kdata.diagnosis}</td>
                  <td>{kdata.kompetensi}</td>
                  <td>{kdata.n}</td>
                </tr>
		))
		}
              </table>
	      </>) )
		    : null }
          </div>
        </div>
      </div>
    )
}

export default SKDI
