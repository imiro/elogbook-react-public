import React, { useState, useEffect } from 'react'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import search from '../assets/images/logbook/search.png'
import info from '../assets/images/dashboard/info.png'
import sort from '../assets/images/dashboard/sort.png'
import { useSkdiDxList, useSkdiDxCount } from '../providers/api'


function SKDI() {
   const skdi = useSkdiDxList()
   const data = useSkdiDxCount()

   const [filterTingkat, setFilterTingkat] = useState([])
   const toggleFilter = function(tingkat) {
	return function(e) {
	setFilterTingkat(current => {
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

   const changeTextColor = (e) =>{
      document.getElementById(e.target.id).style.color="#000000";
    }

    var expanded = false;

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
	console.log('eff', ntableData, data)
	setTableData(ntableData)
	}
   }, [skdi, data])

    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar />
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
            <div className="skdi-row2">
                      <select name="" id=""className="filter-box-dropdown"onChange={(e) => changeTextColor(e)}>
                        <option disabled selected value>Semua Sistem</option>
                        <option value="">Sistem 1</option>
                        <option value="">Sistem 2</option>
                        <option value="">Sistem 3</option>
                      </select>
            </div>
	    { tableData ? 
	      Object.keys(tableData).map(kategori => (
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
