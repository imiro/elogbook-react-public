import React, { useState, useEffect } from 'react'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import search from '../assets/images/logbook/search.png'
import info from '../assets/images/dashboard/info.png'
import sort from '../assets/images/dashboard/sort.png'
import MultiSelect from "react-multi-select-component";
import Paper from '@material-ui/core/Paper';
import {SortingState, IntegratedSorting, DataTypeProvider,} from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { useSkdiDxList, useSkdiDxCount } from '../providers/api'
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';


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
  const [filter, setFilter] = useState([])
  const handleSistemChange = function(e) {
	  setSistem(e.map(k => k.value))
    setFilter(e)
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

   const placeholderSistem =
    {
      "allItemsAreSelected": "Semua opsi dipilih",
      "noOptions": "tidak ada opsi",
      "search": "Cari opsi",
      "selectAll": "Pilih semua",
      "selectSomeItems": "Sistem"
    }

    const columns = [ 
      { name: 'diagnosis', title: 'Diagnosis' },
      { name: 'kompetensi', title: 'Kompetensi' },
      { name: 'jumlah', title: 'Jumlah ditemui' },];

    const [sortingStateColumnExtensions] = useState([
      { columnName: 'diagnosis', sortingEnabled: false },
      { columnName: 'kompetensi', sortingEnabled: false },
      { columnName: 'jumlah', sortingEnabled: true },
    ]);

    const [tableColumnExtensions] = useState([
      { columnName: 'kompetensi',  width: 150 },
      { columnName: 'jumlah',  width: 150 },
    ]);

    const TooltipFormatter = ({ value }) => (
      <Tooltip title={(
        <span>
          {value}
        </span>
      )}
      >
        <span>
          {value}
        </span>
      </Tooltip>
    );
  
    const CellTooltip = props => (
      <DataTypeProvider
        for={columns.map(({ name }) => name)}
        formatterComponent={TooltipFormatter}
        {...props}
      />
    );

    const SortingIcon = ({ direction }) => (
      direction === 'asc'
        ? <ArrowUpward style={{ fontSize: '18px', color:'#FFFFFF' }} />
        : <ArrowDownward style={{ fontSize: '18px', color:'#FFFFFF' }} />
    );
  
    const sortLabel = ({ disabled,onSort,children, direction }) => (
      disabled === false
      ?
        <div className="skdi-sort" onClick={onSort}>
          {children}
          <div className="sort-table-icon">
          {( <SortingIcon direction={direction}/>)}
          </div>
        </div>
      : 
      <div>
        {children}
      </div>
    );
      
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
            <div className="skdi-row2">
              { tableData ? 
              <MultiSelect className="skdi-select" overrideStrings={placeholderSistem}
              options={Object.keys(tableData).map(k => ({value:k, label: k})) }
              value={filter}
              labelledBy="Sistem" 
              onChange={handleSistemChange} /> : null 
              }
            </div>
            
	    {/* { tableData ? 
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
		    : null }  */}
        
      { tableData ? 
          Object.keys(tableData)
          .filter(kategori => !sistem.length || sistem.includes(kategori))
          .map(kategori => (
              <>
              <div className="skdi-table-title">{kategori}</div>
              <Paper className="skdi-table-content"> 
              <Grid 
              columns={columns}
              rows=    
                { 
                  tableData[kategori]
                  .filter(kdata => (!filterTingkat.length || filterTingkat.includes(kdata.kompetensi)))
                  .map(kdata => (
                      { diagnosis: kdata.diagnosis, kompetensi: kdata.kompetensi, jumlah: kdata.n }     
                  ))
                }
              >
              <SortingState
                columnExtensions={sortingStateColumnExtensions}
              />
              <IntegratedSorting />
              <CellTooltip />
              <Table 
                columnExtensions={tableColumnExtensions}  
              />
              <TableHeaderRow 
                showSortingControls
                sortLabelComponent={sortLabel}   
              />
            </Grid>   
                 
          </Paper>        
     
              </>) )
		    : 
        null 
        
        } 
          </div>
        </div>
      </div>
    )
}

export default SKDI
