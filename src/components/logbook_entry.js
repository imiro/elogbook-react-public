import React, { useState, useEffect } from 'react'
import {NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import Select, { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useEditEntry, useCreateEntry } from '../providers/api'
import { withDictionaryOptions } from './logbook'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import dialog from '../assets/images/logbook/dialog.png'

function LogbookEntry (props) {
  const { state: locationState } = useLocation()
  const history = useHistory()
  const createEntry = useCreateEntry()
  const editEntry = useEditEntry()


  const [isSearchable, setSearchable] = useState(true)
  const initSkdi = function(t) {
	if(!locationState || !locationState.data || !locationState.data.raw)
	  	return []
	let val = []
	const k = "skdi_" + t
	const j = t == "dx" ? "dx_extra" : "keterampilan_extra"
	const v = t == "dx" ? "diagnosis" : "keterampilan"  
	val = locationState.data.raw[k].map(x => (
		{value: x, 
		 label: props.dictionary[k].find(({id}) => x == id)[v]
		}))
	if(locationState.data.raw[j] && locationState.data.raw[j].length)
	  val = val.concat(locationState.data.raw[j].map(x => ({value: x, label: x, __isNew__: true})))
	return val
  }
  const [skdi, setSkdi] = useState({
	  dx: initSkdi("dx"),
	  ktn: initSkdi("ktn")
  })
  const toggleSearchable = () => setSearchable(state => !state)
  const handleSkdiChange = (type) => {
	return function (newValue) {
		setSkdi(prev => ( {...skdi, [type]: newValue} ))
	}
  }

  const params = ["tanggal", "stase", "wahana", "lokasi", "nrm", "nama",
			"gender", "usia", "satuanusia", "catatan"]
  const usingReactSelect = ["stase", "wahana", "lokasi", "gender", "satuanusia"]
  const [inputValues, setInputValues] = useState(params.reduce(
  function (init, p) {
	if(locationState && locationState.data && locationState.data.raw
		&& locationState.data.raw[p])
	  init[p] = locationState.data.raw[p]
	else
	  init[p] = null
	return init
  }, {}))

  const handleInputChange = function(p) {
	return function(e) {
		let val = usingReactSelect.includes(p) ? e.value : e.target.value
		setInputValues(current => {return {
			...current,
			[p]: val
		}})

	}
  }

  const form = React.createRef()
  const handleSubmit = function(e) {
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
		editEntry(locationState.data.raw.id, inputs)
		.then(async function (resp) {
			if(resp.ok) {
			history.push({
				pathname: '/logbook',
				state: {
					successfulEntry: true,
          newEntry: false
			}})
			} else {
				alert("Error")
				console.error(resp)
				console.error(resp.status, resp.statusText)
				console.error(await resp.text())
			}
		})
		.catch(function (err) {
			console.warn(err)
			alert("Network error")
		})
	} else
	  createEntry(inputs)
	  .then(function handleSuccess() {
			history.push({
				pathname: '/logbook',
				state: {
					successfulEntry: true,
          newEntry:true,
				}
			})
		}, async function handleFailure(err) {
		  // handle validation failure etc
			// alert("Error. Pastikan data yang Anda masukkan sudah lengkap")
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
        control: styles => ({ ...styles, width:'326px', marginBottom:'16px' }),
        multiValue: (styles) => ({
            ...styles,
            // display:'flex',
            // flexDirection:'row',
            // flexWrap:'wrap',
            alignItems:'center',
            // justifyContent:'space-around',
            backgroundColor: '#008C8F',
            borderRadius: '16px',
            padding:'3px 6px 3px 6px',
            cursor: 'pointer',
            whiteSpace: 'pre-wrap'
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: '#FFFDFF',
          whiteSpace: 'pre-wrap'
        }),
        multiValueRemove: (styles) => ({
          ...styles,
          // position:'absolute',
          float:'right',
          right:'16px',
          // marginTop:'3px',
          backgroundColor: '#FFFDFF',
          color: '#008C8F',
          borderRadius: '50%',
          width:'24px',
          height: '24px',
          cursor:'pointer',
        }),
      };

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
     
      // history.push("/logbook-entry", { from: "LogbookEntry" })

    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          
          <Navbar page= {locationState?"Logbook / Edit Entry":"Logbook / Entry Baru"} />
          <div className="navbar-divider"></div>
          <div className="profile-bar">
            <NavLink id="logbook-back" style={{ textDecoration: 'none' }} to="/logbook" ><img src={chevronLeft} ></img>Kembali</NavLink>
            <Popup trigger={<button id="logbook-save-entry" style={{ textDecoration: 'none' }}>{locationState?"Simpan Entry":"Simpan Entry Baru"}</button>} modal>
              {close => (
                <div className="popup-new-entry" >
                  <img src={dialog} ></img>
                  <div className="popup-new-entry-title" >
                    {locationState?"Simpan Entry":"Simpan Entry Baru"}
                  </div>
                  <div className="popup-new-entry-content" >
                    Jika Anda sudah yakin dengan semua data yang Anda isikan, silahkan {locationState?"simpan entry yang Anda telah ubah.":"simpan entry baru yang Anda telah buat."} 
                  </div>
                  <div className="popup-new-entry-button">
                    <div className="popup-new-entry-button-cancel"  onClick={() => { close();}}>Batal</div>
                    <div className="popup-new-entry-button-save" onClick={e => handleSubmit(e)}>Simpan</div>
                  </div>
                </div>
              )}
            </Popup>
            {/* <button id="logbook-save-entry" style={{ textDecoration: 'none' }} onClick={e => handleSubmit(e)}>Simpan Entry Baru</button> */}
          </div>
          <div className="logbook-box">
	    <form ref={form}>
            <div id="logbook-entry" className="logbook-entry">
                    <div className="logbook-entry-title">{locationState?"Edit Data Entry":"Data Entry Baru"}</div> 
                    <label>Tanggal</label>
                    <input type="date" id="idDate" className="logbook-entry-input" defaultValue={today} name="tanggal" value={inputValues.tanggal} onChange={handleInputChange("tanggal")} ></input> 
                    <label>Stase</label>
                    <Select placeholder="Pilih stase" options={optionStase} isSearchable={isSearchable} className="logbook-entry-select" name="stase" value={optionStase.filter(x => x.value == inputValues.stase)} onChange={handleInputChange("stase")} />
                    <label>Lokasi Rumah Sakit</label>
                    <Select placeholder="Pilih lokasi rumah sakit"options={optionRS} name="wahana" className="logbook-entry-select" value={optionRS.filter(x => x.value == inputValues.wahana)} onChange={handleInputChange("wahana")} />
                    <label>Ruangan</label>
                    <Select placeholder="Pilih ruangan"options={optionRoom} name="lokasi" className="logbook-entry-select" value={optionRoom.filter(x => x.value == inputValues.lokasi)} onChange={handleInputChange("lokasi")}/>
                    <label>NRM</label>
                    <input type="text" placeholder="Masukkan NRM" name="nrm" className="logbook-entry-input" value={inputValues.nrm} onChange={handleInputChange("nrm")}></input>
                    <label>Inisial Pasien</label>
                    <input type="text" placeholder="Masukkan inisial pasien" name="nama" className="logbook-entry-input" value={inputValues.nama} onChange={handleInputChange("nama")}></input>
                    <label>Jenis Kelamin</label>
                    <Select placeholder="Pilih jenis kelamin" name="gender" options={optionGender} className="logbook-entry-select" value={optionGender.filter(x => x.value == inputValues.gender)} onChange={handleInputChange("gender")}/>
                    <label>Usia</label>
                    <div className="logbook-entry-age">
                      <input type="number" name="usia" placeholder="Usia Pasien" id="idAge" className="logbook-entry-input" value={inputValues.usia} onChange={handleInputChange("usia")}></input>
                      <Select placeholder="Pilih waktu" name="satuanusia" options={optionTime} id="idTime" className="logbook-entry-select" value={optionTime.filter(x => x.value == inputValues.satuanusia)} onChange={handleInputChange("satuanusia")}/>
                    </div>
                    <label>Diagnosis</label>
                    <CreatableSelect name="dx" placeholder="Pilih diagnosis pasien"options={optionDiagnosis} onChange={handleSkdiChange("dx")} isMulti styles={colourStyles} value={skdi.dx} />
                    <label>Tingkat kompetensi Diagnosis</label>
                    <input readOnly type="text" placeholder="Tingkat kompetensi" className="logbook-entry-input"
	    		value={skdi.dx.filter(({__isNew__: baru}) => !baru).map(x => props.dictionary.skdi_dx.find(y => y.id == x.value).kompetensi).join(",")}></input>
	    {/*<label>Jenis Tindakan</label>
                    <Select placeholder="Pilih jenis tindakan"options={optionAction} className="logbook-entry-select" />*/}
                    <label>Keterampilan</label>
                    <CreatableSelect  placeholder="Pilih keterampilan"options={optionSkill} isMulti styles={colourStyles} value={skdi.ktn} onChange={handleSkdiChange("ktn")}  />
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
