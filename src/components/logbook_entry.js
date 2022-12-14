import React, { useState, useEffect } from 'react'
import {NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import Layout from './layout'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useEditEntry, useCreateEntry } from '../providers/api'
import { withDictionaryOptions } from './logbook'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import dialog from '../assets/images/logbook/dialog.png'

import { colourStyles, colourStylesMulti } from './logbook_entry.styles.js'

function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;
  return today
}

function LogbookEntry (props) {
  const { state: locationState } = useLocation()
  const history = useHistory()
  const createEntry = useCreateEntry()
  const editEntry = useEditEntry()
  const [error, setError] = useState({})

  // BEGIN: SKDI related states
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
  const handleSkdiChange = (type) => {
	return function (newValue) {
		setSkdi(prev => ( {...skdi, [type]: newValue} ))
	}
  }
  // END: SKDI related states

  const [isSearchable, setSearchable] = useState(true)
  const toggleSearchable = () => setSearchable(state => !state)

  // BEGIN: form values initialization
  const params = ["tanggal", "stase", "wahana", "lokasi", "nrm", "nama",
			"gender", "usia", "satuanusia", "catatan"]
  const usingReactSelect = ["stase", "wahana", "lokasi", "gender", "satuanusia"]
  const [inputValues, setInputValues] = useState(params.reduce(
  function (init, p) {
	if(locationState && locationState.data && locationState.data.raw
		&& locationState.data.raw[p])
	  init[p] = locationState.data.raw[p]
	else
	  init[p] = (p == "tanggal" ? getTodayDate() : "")
	return init
  }, {}))
  // END: values initialization

  // BEGIN: keterampilan_x initialization
  const [keterampilanX, setKeterampilanX] = useState(
    // locationState ? locationState.data?.raw?.keterampilan_x : null // not enabled on CRA's babel :((
    locationState && locationState.data && locationState.data.raw ?
    locationState.data.raw.keterampilan_x : null
  )
  const handleKeterampilanXchange = function(command, options) {
    setKeterampilanX(function(current) {
      let newVal = []
      if(current) newVal = JSON.parse(JSON.stringify(current)) // deep copy!!
      switch(command) {
        case "TAMBAH":
          newVal.push(options)
          break;
        case "HAPUS":
          newVal.splice(options.i, 1)
          break;
        case "EDIT":
          let { i, k, v } = options
          newVal[i][k] = v
          break;
      }
      // console.log('onChange command options old new', command, options, current, newVal)
      return newVal
    })
    // setKeterampilanX([{keterampilan: "tes", level: 2}])
  }
  // END: keterampilan_x

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
  const handleSubmit = function(e, closePopup) {
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
        inputs.keterampilan_x = !keterampilanX ? [] : keterampilanX.filter(
          function({ keterampilan, level }) { return keterampilan.length }
        )
	console.group('Submit clicked')
	console.log(inputs)
	console.groupEnd()

	// TODO handle network error better
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
            } else { // validation error
              closePopup()
              console.warn(resp)
              console.warn(resp.status, resp.statusText)
              setError(await resp.json())
            }
          })
          .catch(function (err) {
               console.error(err)
               closePopup()
               window.alert("Network error")
          })
	} else
	  createEntry(inputs)
	  .then(async function handle(resp) {
              if(!resp.ok) {
                // most likely validation error
                // if(resp.status == 422) // to verify validation error
                console.warn(resp)
                closePopup()
                setError(await resp.json())
                return
              }
              history.push({
                pathname: '/logbook',
                state: {
                  successfulEntry: true,
                  newEntry:true,
                }
              })
           }, function handleNetworkError(err) {
               console.error(err)
               closePopup()
               window.alert("Network error.")
           })
  }

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
        { value: 'hari', label: 'Hari' },
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

      const indicatorSeparatorStyle = {
        display: 'none',
      };
      const IndicatorSeparator = ({ innerProps }) => {
        return <span style={indicatorSeparatorStyle} {...innerProps} />;
      };

    const ErrorPlaceholderWithState = function({ field }) {
      return <ErrorPlaceholder errorState={error} field={field} />
    }

    // TODO validate before submit
    // TODO clear error state upon editing
    return (<>
	    {/*<Layout page={locationState?"Logbook / Edit Entry":"Logbook / Entry Baru"} >*/}
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
                    <div className="popup-new-entry-button-save" onClick={e => handleSubmit(e, close)}>Simpan</div>
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
                    <input type="date" id="idDate" className="logbook-entry-input" name="tanggal" value={inputValues.tanggal} onChange={handleInputChange("tanggal")} ></input> 
                    <ErrorPlaceholderWithState field="tanggal" />
                    <label>Stase</label>
                    <Select placeholder="Pilih stase" options={optionStase} isSearchable={isSearchable} className="logbook-entry-select" name="stase" value={optionStase.filter(x => x.value == inputValues.stase)} onChange={handleInputChange("stase")} styles={colourStyles} components={{ IndicatorSeparator }} />
                    <ErrorPlaceholderWithState field="stase" />
                    <label>Lokasi Rumah Sakit</label>
                    <Select placeholder="Pilih lokasi rumah sakit"options={optionRS} name="wahana" className="logbook-entry-select" value={optionRS.filter(x => x.value == inputValues.wahana)} onChange={handleInputChange("wahana")} styles={colourStyles} components={{ IndicatorSeparator }}/>
                    <ErrorPlaceholderWithState field="wahana" />
                    <label>Ruangan</label>
                    <Select placeholder="Pilih ruangan"options={optionRoom} name="lokasi" className="logbook-entry-select" value={optionRoom.filter(x => x.value == inputValues.lokasi)} onChange={handleInputChange("lokasi")} styles={colourStyles} components={{ IndicatorSeparator }} />
                    <ErrorPlaceholderWithState field="lokasi" />
                    <label>NRM</label>
                    <input type="text" placeholder="Masukkan NRM" name="nrm" className="logbook-entry-input" value={inputValues.nrm} onChange={handleInputChange("nrm")}></input>
                    <ErrorPlaceholderWithState field="nrm" />
                    <label>Inisial Pasien</label>
                    <input type="text" placeholder="Masukkan inisial pasien" name="nama" className="logbook-entry-input" value={inputValues.nama} onChange={handleInputChange("nama")}></input>
                    <ErrorPlaceholderWithState field="nama" />
                    <label>Jenis Kelamin</label>
                    <Select placeholder="Pilih jenis kelamin" name="gender" options={optionGender} className="logbook-entry-select" value={optionGender.filter(x => x.value == inputValues.gender)} onChange={handleInputChange("gender")} styles={colourStyles} components={{ IndicatorSeparator }}/>
                    <ErrorPlaceholderWithState field="gender" />
                    <label>Usia</label>
                    <div className="logbook-entry-age">
                      <input type="number" name="usia" placeholder="Usia Pasien" id="idAge" className="logbook-entry-input" value={inputValues.usia} onChange={handleInputChange("usia")}></input>
                      <Select placeholder="Pilih waktu" name="satuanusia" options={optionTime} id="idTime" className="logbook-entry-select" value={optionTime.filter(x => x.value == inputValues.satuanusia)} onChange={handleInputChange("satuanusia")} styles={colourStyles} components={{ IndicatorSeparator }}/>
                    </div>
                    <ErrorPlaceholderWithState field="usia" />
                    <label>Diagnosis</label>
                    <CreatableSelect name="dx" placeholder="Pilih diagnosis pasien"options={optionDiagnosis} onChange={handleSkdiChange("dx")} isMulti styles={colourStylesMulti} value={skdi.dx} components={{ IndicatorSeparator }}/>
                    <label>Tingkat kompetensi Diagnosis</label>
                    <input readOnly type="text" placeholder="Tingkat kompetensi" className="logbook-entry-input"
	    		value={skdi.dx.filter(({__isNew__: baru}) => !baru).map(x => props.dictionary.skdi_dx.find(y => y.id == x.value).kompetensi).join(",")}></input>
                    <ErrorPlaceholderWithState field="diagnosis" />
	    {/*<label>Jenis Tindakan</label>
                    <Select placeholder="Pilih jenis tindakan"options={optionAction} className="logbook-entry-select" />*/}
                  {/* TODO SKDI Keterampilan
                    <label>Keterampilan</label>
                    <CreatableSelect  placeholder="Pilih keterampilan"options={optionSkill} isMulti styles={colourStylesMulti} value={skdi.ktn} onChange={handleSkdiChange("ktn")} components={{ IndicatorSeparator }} />
                    <label>Tingkat kompetensi Keterampilan</label>
                    <input readOnly type="text" placeholder="Tingkat kompetensi"className="logbook-entry-input"
	    		value={skdi.ktn.filter(({__isNew__: baru}) => !baru).map(x => props.dictionary.skdi_ktn.find(y => y.id == x.value).kompetensi).join(",")}></input>
                  */}

                    <label>Keterampilan</label>
                    <KeterampilanX values={keterampilanX} onChange={handleKeterampilanXchange} />

                    <label>Catatan</label>
                    <textarea name="catatan" placeholder="Masukkan catatan pribadi"></textarea>
                  </div>
                </form></div>
	    {/*</Layout>*/}
	  </>
    );
}

function ErrorPlaceholder(props) {
  const { errorState, field } = props
  // console.log('ErrorPlaceholder', errorState, field)
  if(field == 'usia') {
    if(errorState['satuanusia']) {
      errorState['usia'] = errorState['usia'] ? 
        errorState['usia']+"\n"+errorState['satuanusia'] :
        errorState['satuanusia']
      errorState['satuanusia'] = ''
    }
  } else if(field == 'diagnosis') {
    if(errorState['skdi_dx'] && errorState['dx_extra'])
      errorState['diagnosis'] = "The diagnosis field is required."
    else if(errorState['skdi_dx'])
      errorState['diagnosis'] = errorState['skdi_dx']
    else if(errorState['dx_extra'])
      errorState['diagnosis'] = errorState['dx_extra']
  }
  if( !errorState || !errorState[field] ) return null
  return (
    <div style={{color: 'red',
                 marginBottom: '5px'}} >
    { errorState[field] }
    </div> )
}

function KeterampilanX(props) {
    const { values, error, onChange } = props
    
    const levels = {
      1: "Observasi",
      2: "Asistensi",
      3: "Operator dalam Supervisi Tidak Langsung",
      4: "Operator dalam Supervisi Langsung",
      5: "Operator Mandiri"
    }

    const changeHandler = function(k,i) {
      return function(e) {
        onChange("EDIT", {i, k, v: e.target.value})
      }
    }
    
    const hapus = function(i) {
      return function(e) {
        e.preventDefault()
        if(values.length < 2) return
        onChange("HAPUS", {i})
      }
    }

    const tambahKeterampilan = function(e) {
      onChange("TAMBAH", {keterampilan: "", level: 1})
    }
    
    // TODO NICE refactor style to css
    return (
      <div>
        {
        values && values.map(function(v,i) {
          return <React.Fragment key={i}>
            <input type="text" placeholder="Keterampilan"
                   value={v.keterampilan}
                   onChange={changeHandler("keterampilan",i)}
                   className="logbook-entry-input"
                   style={ {width: "100%"} }
            />
            <div style={ {display: "flex",
                          flexDirection: "row"} } >
            <select className="form-select"
                    style={ {maxWidth: "326px", marginBottom: "16px"} }
                    value={v.level}
                    onChange={changeHandler("level",i)}>
              { Object.keys(levels).map((l,j) => (
              <option value={l} key={5*i+j}>{levels[l]}</option>
              )) }
            </select>
            <div className='profile-update-password-cancel-button'
                 style={ {width: "40px", borderColor: "red", color: "red"} }
                 onClick={hapus(i)} > - </div>
            </div>
          </React.Fragment>
        })
        }
        <div className='profile-update-password-cancel-button' 
             onClick={tambahKeterampilan}
             style={ {
               marginTop: "6px",
               marginBottom: "12px",
               marginLeft: 0
             } }
        >+ tambah</div>
      </div>
    )
}

export default (withDictionaryOptions(LogbookEntry))
