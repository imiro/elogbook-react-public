import React, { Component, useState } from 'react'
import Layout from './layout'
import logo from '../assets/images/dashboard/dashboard-quote.png'
import caseLogo from '../assets/images/dashboard/case_logo.png'
import competencyLogo from '../assets/images/dashboard/competency_logo.png'
import staseLogo from '../assets/images/dashboard/stase_logo.png'
import info from '../assets/images/dashboard/info.png'
import graph1 from '../assets/images/dashboard/graph1.png'
import graph2 from '../assets/images/dashboard/graph2.png'
import left from '../assets/images/dashboard/chevron_left.png'
import right from '../assets/images/dashboard/chevron_right.png'
import MultiSelect from "react-multi-select-component";
import Select from 'react-select'
import Paper from '@material-ui/core/Paper';
import {SortingState, IntegratedSorting, DataTypeProvider,} from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';
import SwipeableViews from 'react-swipeable-views';
import { withDictionaryOptions } from './logbook'
import { useStaseCount, useEntriesCount, useSkdiDxCount, useSkdiDxDataFetcher } from '../providers/api'

function Dashboard(props) {
    const [state, setState] = useState({
      caseTip : false,
      competencyTip : false,
    })

    const sortingStateColumnExtensions = [
        { columnName: 'diagnosis', sortingEnabled: false },
        { columnName: 'kompetensi', sortingEnabled: false },
        { columnName: 'jumlah', sortingEnabled: true },
      ]
    const toggleCaseTip = () =>{
      setState(prevState => ({
        ...prevState,
	caseTip: !prevState.caseTip
      }));
    }

    const toggleCompetencyTip = () =>{
      setState(prevState => ({
        ...prevState,
	competencyTip: !prevState.competencyTip
      }));
    }
    const colourStyles = {
      control: styles => ({ ...styles, border: '1px solid #C5C9D7', borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',  boxShadow: 'none', '&:hover': {
        border: '1px solid #096D6F',
      }}),
      placeholder: base => ({
        ...base,
        color: '#C5C9D7',
      }),
    }

    // const optionStase = [
    //   { value: '1', label: 'Stase 1', searchable: false },
    //   { value: '2', label: 'Stase 2' },
    //   { value: '3', label: 'Stase 3' },
    // ]
    const skdiDxCount = useSkdiDxCount()
    const staseCount = useStaseCount()
    const fetchSkdiDxData = useSkdiDxDataFetcher()
    const [entriesCount, changeEntriesCountStase] = useEntriesCount()

    const optionStase = [{
	    value: -1,
	    label: "Semua stase"
    }, ...props.options.optionStase]
    const [selectedStase, setSelectedStase] = useState({
	    id: -1,
	    name: "Semua stase"
    })
    const [cardsData, setCardsData] = useState(null)

    const indicatorSeparatorStyle = {
      display: 'none',
    };
    const IndicatorSeparator = ({ innerProps }) => {
      return <span style={indicatorSeparatorStyle} {...innerProps} />;
    };
    const columns = [ 
      { name: 'diagnosis', title: 'Diagnosis' },
      { name: 'kompetensi', title: 'Kompetensi' },
      { name: 'jumlah', title: 'Jumlah ditemui' },];
    /* const rows = [ 
      { diagnosis: "Trauma Kimia" , kompetensi: "3A", jumlah: "0" },
      { diagnosis: "Luka Tembak" , kompetensi: "3A", jumlah: "1" },
    ]; */

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

    const hitung = data => Object.keys(data).reduce((c,i) => parseInt(data[i]) ? c+1 : c, 0);
    const handleStaseSelection = function(chosen) {
	setSelectedStase({
		id: chosen.value,
		nama: chosen.label,
		data: null
	})
	if(chosen.value > -1 ) {
		changeEntriesCountStase(chosen.value)
		fetchSkdiDxData(chosen.value)
		.then(function (data) {
			setSelectedStase({
				id: chosen.value,
				nama: chosen.label,
				data: data
			})
			setCardsData({
				nKompetensi: hitung(data) 
			})
		})
	} else {
		changeEntriesCountStase()
		setCardsData(null)
	}
    }
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

   const rows = (!selectedStase || !selectedStase.data) ? null : 
		Object.keys(selectedStase.data).map(function(dxId) {
		   let skdi_dx = props.dictionary.skdi_dx.find(x => x.id == dxId)
		   if(!skdi_dx) return {
			   diagnosis: "",
			   kompetensi: "",
			   jumlah: ""
		   }

		   return {
		   	diagnosis: skdi_dx.diagnosis,
			kompetensi: skdi_dx.kompetensi,
			jumlah: selectedStase.data[dxId]
		   }
		})
    
    return (<div className="dashboard-box">
	    {/*<Layout page="Dashboard" >*/}
          
            <div className="top-container-dashboard">
                <div className="quote-dashboard">
                  <div className="quote-username-dashboard">Selamat Pagi!</div>
                  <div className="quote-content-dashboard">“We should be concerned not only about the health of individual patients, but also the health of our entire society.”</div>
                  <div className="quote-content-dashboard">- Ben Carson</div>
                </div>
                <span className="quote-logo-dashboard">
                <img src={logo}></img>
                </span>
            </div>
            <div className="stase-container">
              <label className="label-stase">Stase</label>
              <Select placeholder="Pilih Stase" options={optionStase} isSearchable={true}  className="stase" name="stase" onChange={handleStaseSelection} styles={colourStyles} components={{ IndicatorSeparator }}/>
              
            </div>
           
            <div className="row1-container-dashboard-mobile">
            <SwipeableViews enableMouseEvents>
              <div id="row1-container-dashboard-case" className="row1-container-dashboard-content">
                <img src={caseLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">{entriesCount}</div>
                  <div className="row1-title">Total kasus ditemui</div>
                </div>
              </div>
              <div id="row1-container-dashboard-competency" className="row1-container-dashboard-content">
                <img src={competencyLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">{cardsData ? cardsData.nKompetensi : skdiDxCount ? hitung(skdiDxCount) : null}</div>
                  <div className="total-number">{"/ " + (selectedStase && selectedStase.data ? Object.keys(selectedStase.data).length : skdiDxCount ? Object.keys(skdiDxCount).length : null)}</div>
                  <div className="row1-title">Total kompetensi didapat</div>
                </div>
              </div>
              <div id="row1-container-dashboard-stase" className="row1-container-dashboard-content">
                <img src={staseLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">{staseCount}</div>
                  <div className="total-number">/ 14</div>
                  <div className="row1-title">Total stase dilalui</div>
                </div>
              </div>
              </SwipeableViews>
            </div>
            <div className="row1-container-dashboard">
              <div id="row1-container-dashboard-case" className="row1-container-dashboard-content">
                <img src={caseLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">{entriesCount}</div>
                  <div className="row1-title">Total kasus ditemui</div>
                </div>
              </div>
              <div id="row1-container-dashboard-competency" className="row1-container-dashboard-content">
                <img src={competencyLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">{cardsData ? cardsData.nKompetensi : skdiDxCount ? hitung(skdiDxCount) : null}</div>
                  <div className="total-number">{"/ " + (selectedStase && selectedStase.data ? Object.keys(selectedStase.data).length : skdiDxCount ? Object.keys(skdiDxCount).length : null)}</div>
                  <div className="row1-title">Total kompetensi didapat</div>
                </div>
              </div>
              <div id="row1-container-dashboard-stase" className="row1-container-dashboard-content">
                <img src={staseLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">{staseCount}</div>
                  <div className="total-number">/ 14</div>
                  <div className="row1-title">Total stase dilalui</div>
                </div>
              </div>
            </div>
            <div className="row2-container-dashboard">
              <div className="row2-container-dashboard-content">
                <div className="row2-title">
                  <div>Kasus Ditemui</div>
                  <img src={info} onMouseEnter={toggleCaseTip} onMouseLeave={toggleCaseTip} ></img>
                </div>
                <div className="row2-select">
                  <select name="case-period" id="case-period" className="period">
                    <option value="">Daily</option>
                    <option value="">Weekly</option>
                    <option value="">Monthly</option>
                  </select>
                  {state.caseTip
                  ?
                  <div className= "tooltiptext">Kasus ditemui adalah grafik jumlah kasus yang sudah Anda temui di stase dan waktu tertentu</div>
                  :
                  null
                  }
                  <div className="row2-select-period">
                    <img src={left}></img>
                    <div>12 Oct-18 Oct,2020</div>
                    <img src={right}></img>
                  </div>
                </div>
                <div className="dashboard-graph">
                  <img src={graph1}></img>
                </div>
              </div>
              <div className="row2-container-dashboard-content">
                <div className="row2-title">
                  <div>Kompetensi Didapat</div>
                  <img src={info} onMouseOver={toggleCompetencyTip} onMouseOut={toggleCompetencyTip}></img>
                </div>
                <div className="row2-select">
                  <select name="case-period" id="case-period" className="period">
                    <option value="">Daily</option>
                    <option value="">Weekly</option>
                    <option value="">Monthly</option>
                  </select>
                  {
                  state.competencyTip
                  ?
                  <span id="competency-tip" className="tooltiptext">Kompetensi didapat adalah grafik jumlah kompetensi yang sudah Anda dapat di stase dan waktu tertentu</span>
                  :
                  null
                  }
                  <div className="row2-select-period">
                    <img src={left}></img>
                    <div>12 Oct-18 Oct,2020</div>
                    <img src={right}></img>
                  </div>
                </div>
                <div className="dashboard-graph">
                  <img src={graph2}></img>
                </div>
              </div>
            </div>
            {(selectedStase && selectedStase.data) ? <div id="dashboard-table-title">Diagnosis Stase Kesehatan Anak dan Remaja</div> : null}
            {(selectedStase && selectedStase.data) ?
               <Paper id="dashboard-table-content">
               <Grid
                 rows={rows}
                 columns={columns}
               >
                  <SortingState
                    columnExtensions={sortingStateColumnExtensions}
                  />
                  <IntegratedSorting />
                  <CellTooltip />
                  <Table />
                  <TableHeaderRow 
                    showSortingControls
                    sortLabelComponent={sortLabel}   
                  />
               </Grid>
             </Paper>
            :
            null}
	    {/*</Layout>*/}
          </div> 
    )
}

export default withDictionaryOptions(Dashboard)
