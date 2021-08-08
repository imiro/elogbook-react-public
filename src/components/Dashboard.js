import React, { Component } from 'react'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

      stase :[],
      isSearchable: true, 
      showTable : false,
      caseTip : false,
      competencyTip : false,
      sortingStateColumnExtensions : [
        { columnName: 'diagnosis', sortingEnabled: false },
        { columnName: 'kompetensi', sortingEnabled: false },
        { columnName: 'jumlah', sortingEnabled: true },
      ],
    };
  }
  render() {

    const toggleCaseTip = () =>{
      this.setState(prevState => ({
        caseTip: !prevState.caseTip
      }));
    }

    const toggleCompetencyTip = () =>{
      this.setState(prevState => ({
        competencyTip: !prevState.competencyTip
      }));
    }

    const optionStase = [
      { value: '1', label: 'Stase 1' },
      { value: '2', label: 'Stase 2' },
      { value: '3', label: 'Stase 3' },
    ]

    const handleStaseChange = e => {
      this.setState({
        stase : e,
        showTable : true,
      })
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
    const rows = [ 
      { diagnosis: "Trauma Kimia" , kompetensi: "3A", jumlah: "0" },
      { diagnosis: "Luka Tembak" , kompetensi: "3A", jumlah: "1" },
    ];

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
          <Navbar page="Dashboard" />
          <div className="dashboard-box">
            <div className="top-container-dashboard">
                <div className="quote-dashboard">
                  <div className="quote-username-dashboard">Selamat Pagi, John!</div>
                  <div className="quote-content-dashboard">“We should be concerned not only about the health of individual patients, but also the health of our entire society.”</div>
                  <div className="quote-content-dashboard">- Ben Carson</div>
                </div>
                <span className="quote-logo-dashboard">
                <img src={logo}></img>
                </span>
            </div>
            <div className="stase-container">
              <label className="label-stase">Stase</label>
              <Select placeholder="Pilih Stase" options={optionStase} isSearchable={this.state.isSearchable}  className="stase" name="stase" onChange={handleStaseChange} styles={colourStyles} components={{ IndicatorSeparator }}/>
              
            </div>
           
            <div className="row1-container-dashboard">
              <div id="row1-container-dashboard-case" className="row1-container-dashboard-content">
                <img src={caseLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">12</div>
                  <div className="total-number">/ 20</div>
                  <div className="row1-title">Total kasus ditemui</div>
                </div>
              </div>
              <div id="row1-container-dashboard-competency" className="row1-container-dashboard-content">
                <img src={competencyLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">20</div>
                  <div className="total-number">/ 56</div>
                  <div className="row1-title">Total kompetensi didapat</div>
                </div>
              </div>
              <div id="row1-container-dashboard-stase" className="row1-container-dashboard-content">
                <img src={staseLogo}></img>
                <div className="row1-text">
                  <div className="progress-number">10</div>
                  <div className="total-number">/ 14</div>
                  <div className="row1-title">Total stase diselesaikan</div>
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
                  {this.state.caseTip
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
                  this.state.competencyTip
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
            {this.state.showTable ? <div id="dashboard-table-title">Diagnosis Stase Kesehatan Anak dan Remaja</div> : null}
            {this.state.showTable ?
               <Paper id="dashboard-table-content">
               <Grid
                 rows={rows}
                 columns={columns}
               >
                  <SortingState
                    columnExtensions={this.state.sortingStateColumnExtensions}
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
          </div>
          
        </div>
      </div>
    )
  }
}

export default Dashboard