import React, { Component, useState } from 'react'
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
import sort from '../assets/images/dashboard/sort.png'
import Select from 'react-select'
import MultiSelect from "react-multi-select-component";
import { withDictionaryOptions } from './logbook'
import { useSkdiDxCount, useSkdiDxDataFetcher } from '../providers/api'

function Dashboard(props) {
    const showTable = () =>{
      document.getElementById("dashboard-table-title").style.display = "block";
      document.getElementById("dashboard-table-content").style.display = "block";
    }

    const showCaseTip = () =>{
      document.getElementById("case-tip").style.visibility = "visible";
    }

    const hideCaseTip = () =>{
      document.getElementById("case-tip").style.visibility = "hidden";
    }

    const showCompetencyTip = () =>{
      document.getElementById("competency-tip").style.visibility = "visible";
    }

    const hideCompetencyTip = () =>{
      document.getElementById("competency-tip").style.visibility = "hidden";
    }

    // const optionStase = [
    //   { value: '1', label: 'Stase 1', searchable: false },
    //   { value: '2', label: 'Stase 2' },
    //   { value: '3', label: 'Stase 3' },
    // ]
    const skdiDxCount = useSkdiDxCount()
    const fetchSkdiDxData = useSkdiDxDataFetcher()

    const optionStase = props.options.optionStase
    const [selectedStase, setSelectedStase] = useState(null)
    const [cardsData, setCardsData] = useState(null)

    const hitung = data => Object.keys(data).reduce((c,i) => data[i] ? c+1 : c, 0);
    const handleStaseSelection = function(chosen) {
	setSelectedStase({
		id: chosen.value,
		nama: chosen.label,
		data: null
	})
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
    }

	
    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar page="Dashboard" />
          <div className="dashboard-box">
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
	    {/* <select name="stase" className="stase" onChange={showTable}>
                <option disabled selected value>Pilih Stase</option>
                <option value="">Stase 1</option>
                <option value="">Stase 2</option>
                <option value="">Stase 3</option>
              </select> */}
	      <Select options={optionStase} onChange={handleStaseSelection} />
              {/* <MultiSelect
                        options="[]"
                        value="[]"
                        labelledBy="Pilih Stase" 
                        className="stase"
                        // overrideStrings={this.placeholderStase}
                      /> */}
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
                  <div className="progress-number">{cardsData ? cardsData.nKompetensi : skdiDxCount ? hitung(skdiDxCount) : null}</div>
                  <div className="total-number">{"/ " + (selectedStase && selectedStase.data ? Object.keys(selectedStase.data).length : skdiDxCount ? Object.keys(skdiDxCount).length : null)}</div>
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
                  <img src={info} onMouseOver={showCaseTip} onMouseOut={hideCaseTip}></img>
                </div>
                <div className="row2-select">
                  <select name="case-period" id="case-period" className="period">
                    <option value="">Daily</option>
                    <option value="">Weekly</option>
                    <option value="">Monthly</option>
                  </select>
                  <span id="case-tip" className="tooltiptext">Kasus ditemui adalah grafik jumlah kasus yang sudah Anda temui di stase dan waktu tertentu</span>
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
                  <img src={info} onMouseOver={showCompetencyTip} onMouseOut={hideCompetencyTip}></img>
                </div>
                <div className="row2-select">
                  <select name="case-period" id="case-period" className="period">
                    <option value="">Daily</option>
                    <option value="">Weekly</option>
                    <option value="">Monthly</option>
                  </select>
                  <span id="competency-tip" className="tooltiptext">Kompetensi didapat adalah grafik jumlah kompetensi yang sudah Anda dapat di stase dan waktu tertentu</span>
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
	    { (!selectedStase || !selectedStase.data) ? null : 
            <><div style={{display: 'block'}} id="dashboard-table-title">Diagnosis Stase {selectedStase.nama}</div>
              <table style={{display: 'block'}} id="dashboard-table-content">
		<thead>
                <tr>
                  <th>Diagnosis</th>
                  <th>Kompetensi</th>
                  <th><img src={sort}></img>Jumlah ditemui</th>
                </tr>
		</thead>
		<tbody>
		{ Object.keys(selectedStase.data).map(dxId => (
		<tr key={dxId}>
		  <td>{props.dictionary.skdi_dx.find(x => x.id == dxId).diagnosis}</td>
		  <td>{props.dictionary.skdi_dx.find(x => x.id == dxId).kompetensi}</td>
		  <td>{selectedStase.data[dxId]}</td>
		</tr>
		)) }
		</tbody>
              </table>
	    </>}
          </div> 
        </div>
      </div>
    )
}

export default withDictionaryOptions(Dashboard)
