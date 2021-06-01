import React, { Component } from 'react'
import {NavLink, Redirect, useHistory} from 'react-router-dom'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

class LogbookEntry extends Component <*, State>{
  state = {
    isSearchable: true,
  };
  toggleSearchable = () => this.setState(state => ({ isSearchable: !state.isSearchable }));
  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  handleInputChange = (inputValue: any, actionMeta: any) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      const {
        isSearchable,
      } = this.state;

      const colourStyles = {
        multiValue: (styles) => ({
            ...styles,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor: '#008C8F',
            borderRadius: '16px',
            padding:'3px 6px 3px 6px',
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: '#FFFDFF',
        }),
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          backgroundColor: '#FFFDFF',
          color: '#008C8F',
          borderRadius: '50%',
          width:'14px',
          height: '14px',
          cursor:'pointer',
        }),
      };

      const optionStase = [
        { value: '1', label: 'Stase 1', searchable: false },
        { value: '2', label: 'Stase 2' },
        { value: '3', label: 'Stase 3' },
      ]

      const optionRS = [
        { value: '1', label: 'RS 1' },
        { value: '2', label: 'RS 2' },
        { value: '3', label: 'RS 3' }
      ]

      const optionRoom = [
        { value: '1', label: 'Ruangan 1' },
        { value: '2', label: 'Ruangan 2' },
        { value: '3', label: 'Ruangan 3' }
      ]

      const optionGender = [
        { value: '1', label: 'Laki-laki' },
        { value: '2', label: 'Perempuan' }
      ]

      const optionTime = [
        { value: '1', label: 'Bulan' },
        { value: '2', label: 'Tahun' }
      ]

      const optionDiagnosis = [
        { value: '1', label: 'Diagnosis 1' },
        { value: '2', label: 'Diagnosis 2' },
        { value: '3', label: 'Diagnosis 3' }
      ]

      const optionAction = [
        { value: '1', label: 'Tindakan 1' },
        { value: '2', label: 'Tindakan 2' },
        { value: '3', label: 'Tindakan 3' }
      ]

      const optionSkill = [
        { value: '1', label: 'Keterampilan 1' },
        { value: '2', label: 'Keterampilan 2' },
        { value: '3', label: 'Keterampilan 3' }
      ]


    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar />
          <div className="navbar-divider"></div>
          <div className="profile-bar">
            <NavLink id="logbook-back" onClick="" style={{ textDecoration: 'none' }} to="/logbook" ><img src={chevronLeft} ></img>Kembali</NavLink>
            <NavLink id="logbook-save-entry" onClick="" style={{ textDecoration: 'none' }} to="/logbook" >Simpan Entry Baru</NavLink>
          </div>
          <div className="logbook-box">
            <div id="logbook-entry" className="logbook-entry">
                    <div className="logbook-entry-title">Data Entry Baru</div> 
                    <label>Tanggal</label>
                    <input type="date"id="idDate" className="logbook-entry-input" defaultValue={today}></input> 
                    <label>Stase</label>
                    <Select placeholder="Pilih stase"options={optionStase} isSearchable={isSearchable} className="logbook-entry-select" />
                    <label>Lokasi Rumah Sakit</label>
                    <Select placeholder="Pilih lokasi rumah sakit"options={optionRS} className="logbook-entry-select" />
                    <label>Ruangan</label>
                    <Select placeholder="Pilih ruangan"options={optionRoom} className="logbook-entry-select" />
                    <label>NRM</label>
                    <input type="text" placeholder="Masukkan NRM" className="logbook-entry-input"></input>
                    <label>Inisial Pasien</label>
                    <input type="text" placeholder="Masukkan inisial pasien" className="logbook-entry-input"></input>
                    <label>Jenis Kelamin</label>
                    <Select placeholder="Pilih jenis kelamin"options={optionGender} className="logbook-entry-select" />
                    <label>Usia</label>
                    <div className="logbook-entry-age">
                      <input type="number" placeholder="Usia Pasien" id="idAge" className="logbook-entry-input"></input>
                      <Select placeholder="Pilih waktu"options={optionTime} id="idTime" className="logbook-entry-select" />
                    </div>
                    <label>Diagnosis</label>
                    <CreatableSelect placeholder="Pilih diagnosis pasien"options={optionDiagnosis} onChange={this.handleChange} onInputChange={this.handleInputChange} isMulti styles={colourStyles} className="logbook-entry-select" />
                    <label>Tingkat kompetensi Diagnosis</label>
                    <input type="text" placeholder="Tingkat kompetensi"className="logbook-entry-input"></input>
                    <label>Jenis Tindakan</label>
                    <Select placeholder="Pilih jenis tindakan"options={optionAction} className="logbook-entry-select" />
                    <label>Keterampilan</label>
                    <Select  placeholder="Pilih keterampilan"options={optionSkill} isMulti className="logbook-entry-select" styles={colourStyles} />
                    <label>Tingkat kompetensi Keterampilan</label>
                    <input type="text" placeholder="Tingkat kompetensi"className="logbook-entry-input"></input>
                    <label>Catatan</label>
                    <textarea placeholder="Masukkan catatan pribadi"></textarea>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

export default LogbookEntry