import React, { Component } from 'react'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import search from '../assets/images/logbook/search.png'
import info from '../assets/images/dashboard/info.png'
import sort from '../assets/images/dashboard/sort.png'


class SKDI extends Component {
  render() {
    const changeTextColor = (e) =>{
      document.getElementById(e.target.id).style.color="#000000";
    }

    var expanded = false;

    function showCheckboxes() {
      // alert("masuk");
      var checkboxes = document.getElementById("checkboxes");
      if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
      } else {
        checkboxes.style.display = "none";
        expanded = false;
      }
    }
    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar />
          <div className="navbar-divider"></div>
          <div className="profile-bar">
            <div className="skdi-bar-title">Kompetensi</div>
            <div className="skdi-bar-competency">1</div>
            <div className="skdi-bar-competency">2</div>
            <div className="skdi-bar-competency">3A</div>
            <div className="skdi-bar-competency">3B</div>
            <div className="skdi-bar-competency">4</div>
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
              {/* <form>
                <div class="multiselect">
                  <div class="selectBox" onClick={showCheckboxes}>
                    <select>
                      <option>Semua Sistem</option>
                    </select>
                    <div class="overSelect"></div>
                  </div>
                  <div id="checkboxes">
                    <label for="one">
                      <input type="checkbox" id="one" /><span>Sistem 1</span></label>
                    <label for="two">
                      <input type="checkbox" id="two" />Sistem 2</label>
                    <label for="three">
                      <input type="checkbox" id="three" />Sistem 3</label>
                  </div>
                </div>
              </form> */}
  
                      <select name="" id=""className="filter-box-dropdown"onChange={(e) => changeTextColor(e)}>
                        <option disabled selected value>Semua Sistem</option>
                        <option value="">Sistem 1</option>
                        <option value="">Sistem 2</option>
                        <option value="">Sistem 3</option>
                      </select>
            </div>
            <div className="skdi-table-title">Ilmu Kedokteran Forensik dan Medikolegal</div>
              <table className="skdi-table-content">
                <tr>
                  <th>Diagnosis</th>
                  <th>Kompetensi</th>
                  <th><img src={sort}></img>Jumlah ditemui</th>
                </tr>
                <tr>
                  <td>Trauma Kimia</td>
                  <td>3A</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Luka Tembak</td>
                  <td>3A</td>
                  <td>1</td>
                </tr>
              </table>
              <div className="skdi-table-title">Sistem Hematologi dan Imunologi</div>
              <table className="skdi-table-content">
                <tr>
                  <th>Diagnosis</th>
                  <th>Kompetensi</th>
                  <th><img src={sort}></img>Jumlah ditemui</th>
                </tr>
                <tr>
                  <td>Anemia defisiensi besi</td>
                  <td>3A</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Demam dengue, DHF</td>
                  <td>3A</td>
                  <td>1</td>
                </tr>
              </table>
          </div>
        </div>
      </div>
    )
  }
}

export default SKDI