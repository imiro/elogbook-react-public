import React, { useState } from 'react'
import {NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useCreateEntry, useSkdiDxList, useSkdiKtnList, useDictionary } from '../providers/api'
import { withDictionaryOptions } from './logbook'

function LogbookEntry (props) {
  const { state: locationState } = useLocation()
  const history = useHistory()
  const createEntry = useCreateEntry()

  const [isSearchable, setSearchable] = useState(true)
  const [skdi, setSkdi] = useState({
	  dx: [],
	  ktn: []
  })
  const toggleSearchable = () => setSearchable(state => !state)
  const handleSkdiChange = (type) => {
	return function (newValue) {
		setSkdi(prev => ( {...skdi, [type]: newValue} ))
	}
  }

  const form = React.createRef()
  const handleSubmit = function(e) {
	const params = ["tanggal", "stase", "wahana", "lokasi", "nrm", "nama",
			"gender", "usia", "satuanusia", "catatan"]
	let inputs = {}
	for(var p of params)
	  inputs[p] = form.current[p].value
	
	inputs.skdi_dx = []
	inputs.skdi_keterampilan = []
	inputs.dx_extra = []
	inputs.keterampilan_extra = []  
	for(let dx of skdi.dx) {
		if(dx.__isNew__) inputs.dx_extra.push(dx.value)
		else inputs.skdi_dx.push(dx.value)
	}
	for(let ktn of skdi.ktn) {
		if(ktn.__isNew__) inputs.keterampilan_extra.push(ktn.value)
		else inputs.skdi_keterampilan.push(ktn.value)
	}
	console.group('Submit clicked')
	console.log(inputs)
	console.groupEnd()

	// TODO handle edit instead of insert
	if(locationState && locationState.editing) {

	} else
	  createEntry(inputs)
	  .then(function handleSuccess() {
			history.push({
				pathname: '/logbook',
				state: {
					successfulEntry: true
				}
			})
		}, async function handleFailure(err) {
		  // handle validation failure etc
			alert("Error. Pastikan data yang Anda masukkan sudah lengkap")
			console.log(err.status, err.statusText)
			console.log(await err.text())
		})
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;


      const colourStyles = {
        multiValue: (styles) => ({
            ...styles,
            display:'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            position:'relative',
            alignItems:'center',
            backgroundColor: '#008C8F',
            borderRadius: '16px',
            width:'120px',
          height: '40px',
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
          width:'24px',
          height: '24px',
          cursor:'pointer',
        }),
      };

      /*const optionStase = [
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
      ]*/
      const { optionStase, optionRS, optionRoom } = props.options
      const optionDiagnosis = props.dictionary.skdi_dx.map(x => ({
	      value: x.id,
	      label: x.diagnosis
	}))
	const optionSkill = props.dictionary.skdi_ktn.map(x => ({
	      value: x.id,
	      label: x.keterampilan
	}))

      const optionGender = [
        { value: 'lk', label: 'Laki-laki' },
        { value: 'pr', label: 'Perempuan' }
      ]

      const optionTime = [
        { value: 'bulan', label: 'Bulan' },
        { value: 'tahun', label: 'Tahun' }
      ]

      /*const optionDiagnosis = useSkdiDxList().map(x => ({
	      value: x.id,
	      label: x.diagnosis
	})) */

      const optionAction = [
        { value: '1', label: 'Tindakan 1' },
        { value: '2', label: 'Tindakan 2' },
        { value: '3', label: 'Tindakan 3' }
      ]

      /*
      const optionSkill = useSkdiKtnList().map(x => {
	return {value: x.id, label: x.keterampilan}
      })*/
	console.log('skdi', skdi)


    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar />
          <div className="navbar-divider"></div>
          <div className="profile-bar">
            <NavLink id="logbook-back" style={{ textDecoration: 'none' }} to="/logbook" ><img src={chevronLeft} ></img>Kembali</NavLink>
            <button id="logbook-save-entry" style={{ textDecoration: 'none' }} onClick={e => handleSubmit(e)}>Simpan Entry Baru</button>
          </div>
          <div className="logbook-box">
	    <form ref={form}>
            <div id="logbook-entry" className="logbook-entry">
                    <div className="logbook-entry-title">Data Entry Baru</div> 
                    <label>Tanggal</label>
                    <input type="date"id="idDate" className="logbook-entry-input" defaultValue={today} name="tanggal"></input> 
                    <label>Stase</label>
                    <Select placeholder="Pilih stase" options={optionStase} isSearchable={isSearchable} className="logbook-entry-select" name="stase" />
                    <label>Lokasi Rumah Sakit</label>
                    <Select placeholder="Pilih lokasi rumah sakit"options={optionRS} name="wahana" className="logbook-entry-select" />
                    <label>Ruangan</label>
                    <Select placeholder="Pilih ruangan"options={optionRoom} name="lokasi" className="logbook-entry-select" />
                    <label>NRM</label>
                    <input type="text" placeholder="Masukkan NRM" name="nrm" className="logbook-entry-input"></input>
                    <label>Inisial Pasien</label>
                    <input type="text" placeholder="Masukkan inisial pasien" name="nama" className="logbook-entry-input"></input>
                    <label>Jenis Kelamin</label>
                    <Select placeholder="Pilih jenis kelamin" name="gender" options={optionGender} className="logbook-entry-select" />
                    <label>Usia</label>
                    <div className="logbook-entry-age">
                      <input type="number" name="usia" placeholder="Usia Pasien" id="idAge" className="logbook-entry-input"></input>
                      <Select placeholder="Pilih waktu" name="satuanusia" options={optionTime} id="idTime" className="logbook-entry-select" />
                    </div>
                    <label>Diagnosis</label>
                    <CreatableSelect name="dx" placeholder="Pilih diagnosis pasien"options={optionDiagnosis} onChange={handleSkdiChange("dx")} isMulti styles={colourStyles} className="logbook-entry-select" />
                    <label>Tingkat kompetensi Diagnosis</label>
                    <input readOnly type="text" placeholder="Tingkat kompetensi" className="logbook-entry-input"
	    		value={skdi.dx.filter(({__isNew__: baru}) => !baru).map(x => props.dictionary.skdi_dx.find(y => y.id == x.value).kompetensi).join(",")}></input>
	    {/*<label>Jenis Tindakan</label>
                    <Select placeholder="Pilih jenis tindakan"options={optionAction} className="logbook-entry-select" />*/}
                    <label>Keterampilan</label>
                    <CreatableSelect  placeholder="Pilih keterampilan"options={optionSkill} isMulti className="logbook-entry-select" styles={colourStyles} onChange={handleSkdiChange("ktn")} />
                    <label>Tingkat kompetensi Keterampilan</label>
                    <input readOnly type="text" placeholder="Tingkat kompetensi"className="logbook-entry-input"
	    		value={skdi.ktn.filter(({__isNew__: baru}) => !baru).map(x => props.dictionary.skdi_ktn.find(y => y.id == x.value).kompetensi).join(",")}></input>
                    <label>Catatan</label>
                    <textarea name="catatan" placeholder="Masukkan catatan pribadi"></textarea>
                  </div>
                </form></div>
              </div>
            </div>
    );
}

export default (withDictionaryOptions(LogbookEntry))
