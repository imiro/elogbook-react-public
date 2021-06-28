import React, { Component } from 'react'
import MultiSelect from "react-multi-select-component";
import LogbookTable from './logbookTable'
import cancel from '../assets/images/logbook/cancel.png'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import nodata from '../assets/images/logbook/no_data.png'

class LogbookData extends Component{

    constructor(props) {
      super(props);
      this.state = {
	filter:[],
        stase :[],
        rs: [],
        room: [],
        competence:[],
        // startDate: new Date(),
        startDate: null,
        endDate: null,
        rangeDate: "", 
	optionStase: [],
	optionRoom: [],
	optionRS: [],
	optionCompetence: []
      };
    }

    setStaseSelected = e => {
    //   alert(this.state.stase[0].label)
      let joined = [];
      let joinRS = this.state.rs
      let joinRoom = this.state.room
      let joinCompetence = this.state.competence
      let joinStartDate = this.state.startDate
      let joinEndDate = this.state.endDate
      let dateRange = "" 
    
      for (let i=0; i < e.length; i++){
          joined = joined.concat(e[i].label)
      }

      for (let i=0; i < joinRS.length; i++){
          joined = joined.concat(joinRS[i].label)
      }
      for (let i=0; i < joinRoom.length; i++){
        joined = joined.concat(joinRoom[i].label)
      }
      for (let i=0; i < joinCompetence.length; i++){
        joined = joined.concat(joinCompetence[i].label)
    }

    if(joinStartDate!=null && joinEndDate!=null){
      let dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
      joined = joined.concat(dateRange)
    }

      this.setState({
        stase: e,
        filter: joined
      })
    }
  
    setRSSelected = e => {
        //   alert(this.state.stase[0].label)
          let joined = [];
          let joinStase = this.state.stase
          let joinRoom = this.state.room
          let joinCompetence = this.state.competence
          let joinStartDate = this.state.startDate
          let joinEndDate = this.state.endDate
          let dateRange = ""
        
          for (let i=0; i < joinStase.length; i++){
              joined = joined.concat(joinStase[i].label)
          }
    
          for (let i=0; i < e.length; i++){
              joined = joined.concat(e[i].label)
          }
          for (let i=0; i < joinRoom.length; i++){
            joined = joined.concat(joinRoom[i].label)
          }
          for (let i=0; i < joinCompetence.length; i++){
            joined = joined.concat(joinCompetence[i].label)
        }

        if(joinStartDate!=null && joinEndDate!=null){
          let dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
          joined = joined.concat(dateRange)
        }
    
          this.setState({
            rs: e,
            filter: joined
          })
        }
  
        setRoomSelected = e => {
            //   alert(this.state.stase[0].label)
              let joined = [];
              let joinStase = this.state.stase
              let joinRS = this.state.rs
              let joinCompetence = this.state.competence
              let joinStartDate = this.state.startDate
              let joinEndDate = this.state.endDate
              let dateRange = ""
            
              for (let i=0; i < joinStase.length; i++){
                  joined = joined.concat(joinStase[i].label)
              }
        
              for (let i=0; i < joinRS.length; i++){
                  joined = joined.concat(joinRS[i].label)
              }
              for (let i=0; i < e.length; i++){
                joined = joined.concat(e[i].label)
              }
              for (let i=0; i < joinCompetence.length; i++){
                joined = joined.concat(joinCompetence[i].label)
            }

            if(joinStartDate!=null && joinEndDate!=null){
              let dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
              joined = joined.concat(dateRange)
            }
        
              this.setState({
                room: e,
                filter: joined
              })
            }

  
        setCompetenceSelected = e => {
            //   alert(this.state.stase[0].label)
              let joined = [];
              let joinStase = this.state.stase
              let joinRS = this.state.rs
              let joinRoom = this.state.room
              let joinStartDate = this.state.startDate
              let joinEndDate = this.state.endDate
              let dateRange = ""
            
              for (let i=0; i < joinStase.length; i++){
                  joined = joined.concat(joinStase[i].label)
              }
        
              for (let i=0; i < joinRS.length; i++){
                  joined = joined.concat(joinRS[i].label)
              }
              for (let i=0; i < joinRoom.length; i++){
                joined = joined.concat(joinRoom[i].label)
              }
              for (let i=0; i < e.length; i++){
                joined = joined.concat(e[i].label)
            }

            if(joinStartDate!=null && joinEndDate!=null){
              let dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
              joined = joined.concat(dateRange)
            }
        
              this.setState({
                competence: e,
                filter: joined
              })
            }

            onChangeDate = (dates) => {
              const[joinStartDate,joinEndDate] = dates;
              let joined = [];
              let joinStase = this.state.stase;
              let joinRS = this.state.rs;
              let joinRoom = this.state.room;
              let joinCompetence = this.state.competence;
              let dateRange = "";

              for (let i=0; i < joinStase.length; i++){
                joined = joined.concat(joinStase[i].label)
            }
      
            for (let i=0; i < joinRS.length; i++){
                joined = joined.concat(joinRS[i].label)
            }
            for (let i=0; i < joinRoom.length; i++){
              joined = joined.concat(joinRoom[i].label)
            }
            for (let i=0; i < joinCompetence.length; i++){
              joined = joined.concat(joinCompetence[i].label)
          }

          if(joinStartDate!=null && joinEndDate!=null){
            dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
            joined = joined.concat(dateRange)
          }
              this.setState({
                startDate: joinStartDate,
                endDate: joinEndDate,
                filter:joined,
              })
            };
          

            cancelFilter = (item, index) => {
              let joinStase = this.state.stase
              let joinRS = this.state.rs
              let joinRoom = this.state.room
              let joinCompetence = this.state.competence 
              let joinStartDate = this.state.startDate
              let joinEndDate = this.state.endDate
              let dateRange = ""
              if(joinStartDate!=null && joinEndDate!=null){
                dateRange = joinStartDate.getFullYear() + "/" + (joinStartDate.getMonth()+1) + "/" + joinStartDate.getDate() + " - " + joinEndDate.getFullYear()  + "/" + (joinEndDate.getMonth()+1) + "/" + joinEndDate.getDate()
              }
              let newFilter= this.state.filter
              newFilter.splice(index,1)
              // alert(newFilter)
              joinStase = joinStase.filter(x=>newFilter.includes(x.label))
              joinRS = joinRS.filter(x=>newFilter.includes(x.label))
              joinRoom = joinRoom.filter(x=>newFilter.includes(x.label))
              joinCompetence = joinCompetence.filter(x=>newFilter.includes(x.label))
              
              if(!newFilter.includes(dateRange)){
                joinStartDate=null;
                joinEndDate=null;
              }
              this.setState({
                  filter: newFilter,
                  stase: joinStase,
                  rs: joinRS,
                  room: joinRoom,
                  competence: joinCompetence,
                  startDate: joinStartDate,
                  endDate:joinEndDate,
                })
             
             }
         
             cancelFilterAll = e => {
               this.setState({
                 filter: [],
                 stase :[],
                 rs: [],
                 room: [],
                 competence:[],
                 startDate:null,
                 endDate:null,
               })
             }
           
  
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

    placeholderStase =
    {
      "allItemsAreSelected": "Semua opsi dipilih",
      "noOptions": "tidak ada opsi",
      "search": "Cari opsi",
      "selectAll": "Pilih semua",
      "selectSomeItems": "Pilih stase"
    }

    placeholderLokasiRS =
    {
      "allItemsAreSelected": "Semua opsi dipilih",
      "noOptions": "tidak ada opsi",
      "search": "Cari opsi",
      "selectAll": "Pilih semua",
      "selectSomeItems": "Pilih lokasi RS"
    }

    placeholderRuangan =
    {
      "allItemsAreSelected": "Semua opsi dipilih",
      "noOptions": "tidak ada opsi",
      "search": "Cari opsi",
      "selectAll": "Pilih semua",
      "selectSomeItems": "Pilih ruangan"
    }

    placeholderKompetensi =
    {
      "allItemsAreSelected": "Semua opsi dipilih",
      "noOptions": "tidak ada opsi",
      "search": "Cari opsi",
      "selectAll": "Pilih semua",
      "selectSomeItems": "Kompetensi"
    }
  
    componentDidMount() {
    }

    processData(data) {
	
    /*{
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
     jenisTindakan: 'Observasi',
     jenisKeterampilan: 'Text',
     kompetensiKeterampilan: '1, 2',
     catatan: 'Tidak ada gejala'
  } (*/
	if(!this.props.dictionary.stase) return [];
	if(!this.props.dictionary.skdi_dx.length) return [];
	    
	if(this.state.stase.length)
	  data = data.filter(item => this.state.stase.find(x => x.value == item.stase))
	if(this.state.rs.length)
	  data = data.filter(item => this.state.rs.find(x => x.value == item.wahana))
	if(this.state.room.length)
	  data = data.filter(item => this.state.room.find(x => x.value == item.lokasi))
	if(this.state.competence.length)
	  data = data.filter(item => {
		for(var dx of item.skdi_dx) {
			var sdx = this.props.dictionary.skdi_dx.find(o => o.id == dx)
			if(sdx && sdx.kompetensi && this.state.competence.find(k => k.value == sdx.kompetensi))
				return true
		}
		return false
	  })
  	 if(this.state.startDate && this.state.endDate)
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
		  stase: this.props.dictionary.stase[item.stase],
		  lokasiRS: this.props.dictionary.wahana[item.wahana],
		  ruangan: this.props.dictionary.lokasi[item.lokasi],
		  inisialPasien: item.nama,
		  jenisKelamin: item.gender == "lk" ? "Laki-laki" : "Perempuan",
		  usia: item.usia,
		  jenisTindakan: this.props.dictionary.kode[item.kode],
		  catatan: item.catatan,
	  }
	  ret.diagnosis = item.skdi_dx.map(x => this.props.dictionary.skdi_dx.find(o => o.id == x).diagnosis)
	  ret.kompetensiDiagnosis = item.skdi_dx.map(x => this.props.dictionary.skdi_dx.find(o => o.id == x).kompetensi).join(',')
	  ret.diagnosis = ret.diagnosis.join(', ')
	  if(item.diagnosisExtra)
		ret.diagnosis += (item.skdi_dx.length ? ", " : "") + item.diagnosisExtra
	   

	   // console.log('processData', ret)
	   return ret;
	});
    }
  
    render() {
      var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
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
  
        const optionCompetence = [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3A', label: '3A' },
          { value: '3B', label: '3B' },
          { value: '4A', label: '4A' }
        ]
      
      if( !this.props.optionRS || !this.props.optionRoom || 
	  !this.props.optionStase || !this.props.optionCompetence )
      {
	 return "Loading..."
      }

      var processedData = this.processData(this.props.data)
      if( !this.props.data.length )
	    return <div id="logbook-nodata" className="logbook-nodata"><img src={nodata}></img></div>
         
      return (
        // <div id="logbook-nodata" className="logbook-nodata"><img src={nodata}></img></div>
        <div id="logbook-data" className="logbook-data">
          
                <div className="logbook-filter-title">Filter </div>
                <div className="logbook-filter">
                  <div className="filter-box">
                      <div className="filter-box-title">Stase</div>
                      {/* <Select placeholder="Pilih stase"
                      // value={optionStase.find(obj => obj.value === selectedValue)}
                      options={optionStase}  isSearchable={isSearchable} closeMenuOnSelect={false} className="filter-box-dropdown" onChange={this.filterHandle} /> */}
                      <MultiSelect
                        options={this.props.optionStase}
                        value={this.state.stase}
                        onChange={this.setStaseSelected}
                        labelledBy="Pilih Stase" 
                        className="filter-box-dropdown"
                        overrideStrings={this.placeholderStase}
                      />
                  </div>
                  <div className="filter-box">
                      <div className="filter-box-title">Lokasi RS</div>
                      {/* <Select placeholder="Pilih lokasi RS"options={optionRS} className="filter-box-dropdown" onChange={this.filterHandle}/> */}
                      <MultiSelect
                        options={this.props.optionRS}
                        value={this.state.rs}
                        onChange={this.setRSSelected}
                        labelledBy="Pilih lokasi RS" 
                        className="filter-box-dropdown"
                        overrideStrings={this.placeholderLokasiRS}
                      />
                  </div>
                  <div className="filter-box">
                      <div className="filter-box-title">Ruangan</div>
                      {/* <Select placeholder="Pilih ruangan"options={optionRoom} className="filter-box-dropdown" onChange={this.filterHandle}/> */}
                      <MultiSelect
                        options={this.props.optionRoom}
                        value={this.state.room}
                        onChange={this.setRoomSelected}
                        labelledBy="Pilih ruangan" 
                        className="filter-box-dropdown"
                        overrideStrings={this.placeholderRuangan}
                      />
                  </div>
                  <div className="filter-box">
                      <div className="filter-box-title">Kompetensi</div>
                      {/* <Select placeholder="Kompetensi"options={optionCompetence} className="filter-box-dropdown" onChange={this.filterHandle}/> */}
                      <MultiSelect
                        options={this.props.optionCompetence}
                        value={this.state.competence}
                        onChange={this.setCompetenceSelected}
                        labelledBy="Kompetensi" 
                        className="filter-box-dropdown"
                        overrideStrings={this.placeholderKompetensi}
                      />
                  </div>        
                      <div className="filter-box">
                        <div className="filter-box-title">Tanggal</div>
                        {/* <input type="date"id="idDate" className="filter-box-dropdown" defaultValue={today}></input> */}
                        <DatePicker 
                        selected={this.state.startDate}
                        onChange={this.onChangeDate}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        selectsRange
                        dateFormat="yyyy/MM/dd"
                        className="filter-date-dropdown"
                        placeholderText="Pilih tanggal"
                      />

                      </div>
                      
                      {this.state.filter == "" ? <div className="logbook-filter-cancelAll-disabled">
                        Hapus Semua
                      </div> : <div className="logbook-filter-cancelAll" onClick={this.cancelFilterAll}> Hapus Semua </div>}
                </div>
                <div className="logbook-filter-result">
                    {/* {this.state.filter} */}
                  {this.state.filter.map((item, index) => (<div className="logbook-filter-item" ><div>{item}</div><img src={cancel} className="logbook-filter-cancel" onClick={()=>this.cancelFilter(item, index)}></img></div>))}
                </div>
	      { processedData.length ? 
		      <LogbookTable greeting="hello" data={processedData}/>
		      : <div id="logbook-nodata" className="logbook-nodata"><img src={nodata}></img></div>}
          </div>
      );
    }
  }
  export default LogbookData
