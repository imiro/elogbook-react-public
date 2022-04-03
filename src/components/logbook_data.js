import React, { Component, useState } from 'react'
import MultiSelect from "react-multi-select-component";
import LogbookTable from './logbookTable'
import cancel from '../assets/images/logbook/cancel.png'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import nodata from '../assets/images/logbook/no_data.png'
import FontAwesome from 'react-fontawesome'
import { useXlsxExporter } from '../providers/api'


function LogbookData(props) {
    let [selected_filters, set_selected_filters] = useState({
        stase: [],
        rs: [],
        room: [],
        competence: [],
        startDate: null,
        endDate: null
    }),
    setSelected = function(update) {
        set_selected_filters(function(current) {
            return {
                ...current,
                ...update
            }
        })
    }
    
    let setStaseSelected = e => setSelected({stase: e})
    let setRSSelected = e => setSelected({rs: e})
    let setRoomSelected = e => setSelected({room: e})
    let setCompetenceSelected = e => setSelected({competence: e})

    let onChangeDate = function (dates) {
        const [joinStartDate, joinEndDate] = dates
        setSelected({
            startDate: joinStartDate,
            endDate: joinEndDate
        })
    }

    let cancelFilter = function(item, index) {
        let newFilter = joinFilters()
        newFilter.splice(index, 1)
        let new_selected_filters = JSON.parse(JSON.stringify(selected_filters))
        let joinStartDate = selected_filters.startDate, joinEndDate = selected_filters.endDate

        new_selected_filters.stase = new_selected_filters.stase.filter(x => newFilter.includes(x.label))
        new_selected_filters.rs = new_selected_filters.rs.filter(x => newFilter.includes(x.label))
        new_selected_filters.room = new_selected_filters.room.filter(x => newFilter.includes(x.label))
        new_selected_filters.competence = new_selected_filters.competence.filter(x => newFilter.includes(x.label))

        if(joinStartDate!=null && joinEndDate!=null){
            let dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
            if(!newFilter.includes(dateRange))  
                new_selected_filters.startDate = new_selected_filters.endDate = null
        }

        set_selected_filters(new_selected_filters)
    }

    let cancelFilterAll = function(e) {
        set_selected_filters({
            stase: [],
            rs: [],
            room: [],
            competence: [],
            startDate: null,
            endDate: null
        })
    }

    function todayFormatted() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    function joinFilters() {
        let joined = []
        let joinStase = selected_filters.stase
        let joinRS = selected_filters.rs
        let joinRoom = selected_filters.room
        let joinCompetence = selected_filters.competence
        let joinStartDate = selected_filters.startDate
        let joinEndDate = selected_filters.endDate
    
        for (let i=0; i < joinStase.length; i++)
            joined = joined.concat(joinStase[i].label)
      
        for (let i=0; i < joinRS.length; i++)
            joined = joined.concat(joinRS[i].label)
        
        for (let i=0; i < joinRoom.length; i++)
          joined = joined.concat(joinRoom[i].label)
        
        for (let i=0; i < joinCompetence.length; i++)
          joined = joined.concat(joinCompetence[i].label)
        
        if(joinStartDate!=null && joinEndDate!=null) {
          let dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
          joined = joined.concat(dateRange)
        }
        return joined
    }
  
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
        // color: '#FFFDFF',
        color:'#000000',
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

    let placeholderStase =
    {
        "allItemsAreSelected": "Semua opsi dipilih",
        "noOptions": "tidak ada opsi",
        "search": "Cari opsi",
        "selectAll": "Pilih semua",
        "selectSomeItems": "Pilih stase"
    },
    placeholderLokasiRS =
    {
        ...placeholderStase,
        "selectSomeItems": "Pilih lokasi RS"
    },
    placeholderRuangan =
    {
        ...placeholderStase,
        "selectSomeItems": "Pilih ruangan"
    },
    placeholderKompetensi =
    {
        ...placeholderStase,
        "selectSomeItems": "Kompetensi"
    }

    if( !props.optionRS || !props.optionRoom || 
        !props.optionStase || !props.optionCompetence )
    {
       return "Loading..."
    }

    if( !props.data.length )
        return <div id="logbook-nodata" className="logbook-nodata"><img src={nodata}></img></div>
    
    var processedData = processData(props.data, props.dictionary, selected_filters)
    var filter = joinFilters()
    var today = todayFormatted()

    return (
    <div id="logbook-data" className="logbook-data">
        <div>
          <DownloadButton />
        </div>
  
        <div className="logbook-filter-title">Filter </div>
        <div className="logbook-filter-wrapper">
        <div className="logbook-filter-container">
        <div className="logbook-filter">
          <div className="filter-box">
              <div className="filter-box-title">Stase</div>
              <MultiSelect
                options={props.optionStase}
                value={selected_filters.stase}
                onChange={setStaseSelected}
                labelledBy="Pilih Stase" 
                className="filter-box-dropdown"
                overrideStrings={placeholderStase}
              />
          </div>
          <div className="filter-box">
              <div className="filter-box-title">Lokasi RS</div>
              <MultiSelect
                options={props.optionRS}
                value={selected_filters.rs}
                onChange={setRSSelected}
                labelledBy="Pilih lokasi RS" 
                className="filter-box-dropdown"
                overrideStrings={placeholderLokasiRS}
              />
          </div>
          <div className="filter-box">
              <div className="filter-box-title">Ruangan</div>
              <MultiSelect
                options={props.optionRoom}
                value={selected_filters.room}
                onChange={setRoomSelected}
                labelledBy="Pilih ruangan" 
                className="filter-box-dropdown"
                overrideStrings={placeholderRuangan}
              />
          </div>
          <div className="filter-box">
              <div className="filter-box-title">Kompetensi</div>
              <MultiSelect
                options={props.optionCompetence}
                value={selected_filters.competence}
                onChange={setCompetenceSelected}
                labelledBy="Kompetensi" 
                className="filter-box-dropdown"
                overrideStrings={placeholderKompetensi}
              />
          </div>        
              <div className="filter-box">
                <div className="filter-box-title">Tanggal</div>
                    <DatePicker 
                        selected={selected_filters.startDate}
                        onChange={onChangeDate}
                        startDate={selected_filters.startDate}
                        endDate={selected_filters.endDate}
                        selectsRange
                        dateFormat="yyyy/MM/dd"
                        className="filter-date-dropdown"
                        placeholderText="Pilih tanggal"
                    />
              </div>
              
              {filter == "" ? <div className="logbook-filter-cancelAll-disabled">
                Hapus Semua
              </div> : <div className="logbook-filter-cancelAll" onClick={cancelFilterAll}> Hapus Semua </div>}
        </div></div></div>
        <div className="logbook-filter-result">
          {filter.map((item, index) => (<div key={index} className="logbook-filter-item" ><div>{item}</div><img src={cancel} className="logbook-filter-cancel" onClick={()=>cancelFilter(item, index)}></img></div>))}
        </div>
      { processedData.length ? 
	      <LogbookTable greeting="hello" data={processedData}/>
	      : <div id="logbook-nodata" className="logbook-nodata"><img src={nodata}></img></div> }
  </div>
)
}

function processData(data, dictionary, state) {
	
    /*
     * Structure of each 'data' item from server is as follows:
     * {
         id: ({ index }) => index,
         noentry: '105986',
         nrm: '487441',
         tanggal: '07/05/2016',
         stase : 'Bedah dan ATLS',
         lokasiRS: 'RSCM',
         ruangan: 'Poliklinik',
         inisialPasien: 'IT',
         jenisKelamin: 'Perempuan',
         usia: '15',
         diagnosis: 'Text',
         kompetensiDiagnosis: '4A, 4A',
         // jenisTindakan: 'Observasi',
         // jenisKeterampilan: 'Text',
         // kompetensiKeterampilan: '1, 2',
         keterampilan: 'Apendektomi (Asistensi)',
         catatan: 'Tidak ada gejala'
     }
    *
    */
	if(!dictionary.stase) return [];
	if(!dictionary.skdi_dx.length) return [];
        
        var { stase, rs, room, competence, startDate, endDate } = state
	    
	if(stase.length)
	  data = data.filter(item => stase.find(x => x.value == item.stase))
	if(rs.length)
	  data = data.filter(item => rs.find(x => x.value == item.wahana))
	if(room.length)
	  data = data.filter(item => room.find(x => x.value == item.lokasi))
	if(competence.length)
	  data = data.filter(item => {
		for(var dx of item.skdi_dx) {
			var sdx = dictionary.skdi_dx.find(o => o.id == dx)
			if(sdx && sdx.kompetensi && competence.find(k => k.value == sdx.kompetensi))
				return true
		}
		return false
	  })
  	 if(startDate && endDate)
	    data = data.filter(item => {
		const date = new Date(item.tanggal)
		const {startDate, endDate} = this.state
		// DatePicker sets the selection hours to current time
		// so need to set the hours to standardize
		date.setHours(0,0,0,0)
		startDate.setHours(0,0,0,0)
		endDate.setHours(23,59,59,0)
		return (startDate <= date && date <= endDate)
	    })
	// console.log('processData data', data)
	return data.map(item => {
          var ret = {
		  noentry: item.id,
		  nrm: item.nrm,
		  tanggal: item.tanggal,
		  stase: dictionary.stase[item.stase],
		  lokasiRS: dictionary.wahana[item.wahana],
		  ruangan: dictionary.lokasi[item.lokasi],
		  inisialPasien: item.nama,
		  jenisKelamin: item.gender == "lk" ? "Laki-laki" : "Perempuan",
		  usia: item.usia,
		  jenisTindakan: dictionary.kode[item.kode],
		  catatan: item.catatan,
	  }
	  ret.diagnosis = item.skdi_dx.map(x => dictionary.skdi_dx.find(o => o.id == x).diagnosis)
                              .join(', ')
	  ret.kompetensiDiagnosis = item.skdi_dx.map(x => dictionary.skdi_dx.find(o => o.id == x).kompetensi).join(',')
	  if(item.dx_extra)
		ret.diagnosis += (item.skdi_dx.length ? ", " : "") + item.dx_extra.join(', ')

	   ret.jenisKeterampilan = item.skdi_ktn.map(x => dictionary.skdi_ktn.find(o => o.id == x).keterampilan).join(',')
	   ret.kompetensiKeterampilan = item.skdi_ktn.map(x => dictionary.skdi_ktn.find(o => o.id == x).kompetensi).join(',')
	   if(item.keterampilan_extra) 
		ret.jenisKeterampilan += (item.skdi_ktn.length ? ", " : "") + item.keterampilan_extra.join(", ") 
          if(item.keterampilan_x)
             ret.keterampilan_x = item.keterampilan_x.map(o => o.keterampilan).join(', ')
             // TODO add 'level' as well, need to fetch daftar level from db

	   // for editing entry to work
	   ret.raw = item
	   // console.log('processData', ret)
	   return ret;
	});
}

function DownloadButton(props) {
    const xlsxExport = useXlsxExporter()
    const [disabled, setDisabled] = useState(false)

    const downloadHandler = function(e) {
        e.preventDefault()
        setDisabled(true)
        xlsxExport(
          function success(url) {
              window.open(url, "_blank")
              setDisabled(false)
          },
          function failure(err) {
              console.error(err)
              setDisabled(false)
          }
        )
    }
    return (
    <button className="btn-hijau" style={{marginBottom: "16px"}}
        disabled={disabled}
        onClick={downloadHandler} >
        <FontAwesome name="download" /> Unduh semua (.xlsx)
    </button>)
}

  export default LogbookData
