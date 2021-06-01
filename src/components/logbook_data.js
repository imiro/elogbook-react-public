import React, { Component } from 'react'
import MultiSelect from "react-multi-select-component";
import LogbookTable from './logbookTable'

class LogbookData extends Component{

    constructor(props) {
      super(props);
      this.state = {filter:[],
        stase :[],
        rs: [],
        room: [],
        competence:[],
        date:[],
      };
    }
  
    filterHandle = e => {
      let joined = [];
      if(!this.state.filter.includes(e.label)){
       joined = this.state.filter.concat(e.label);
      }
      else{
        joined = this.state.filter;
      }
      this.setState({
        filter: joined
      })
     
    }
  
    setStaseSelected = e => {
    //   alert(this.state.stase[0].label)
      let joined = "";
      let joinRS = this.state.rs
      let joinRoom = this.state.room
      let joinCompetence = this.state.competence

    
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

      this.setState({
        stase: e,
        filter: joined
      })
    }
  
    setRSSelected = e => {
        //   alert(this.state.stase[0].label)
          let joined = "";
          let joinStase = this.state.stase
          let joinRoom = this.state.room
          let joinCompetence = this.state.competence
    
        
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
    
          this.setState({
            rs: e,
            filter: joined
          })
        }
  
        setRoomSelected = e => {
            //   alert(this.state.stase[0].label)
              let joined = "";
              let joinStase = this.state.stase
              let joinRS = this.state.rs
              let joinCompetence = this.state.competence
        
            
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
        
              this.setState({
                room: e,
                filter: joined
              })
            }

  
        setCompetenceSelected = e => {
            //   alert(this.state.stase[0].label)
              let joined = "";
              let joinStase = this.state.stase
              let joinRS = this.state.rs
              let joinRoom = this.state.room
        
            
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
        
              this.setState({
                competence: e,
                filter: joined
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
  
        const optionCompetence = [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3A', label: '3A' },
          { value: '3B', label: '3B' },
          { value: '4A', label: '4A' }
        ]
         
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
                        options={optionStase}
                        value={this.state.stase}
                        onChange={this.setStaseSelected}
                        labelledBy="Pilih Stase" 
                        className="filter-box-dropdown"
                      />
                  </div>
                  <div className="filter-box">
                      <div className="filter-box-title">Lokasi RS</div>
                      {/* <Select placeholder="Pilih lokasi RS"options={optionRS} className="filter-box-dropdown" onChange={this.filterHandle}/> */}
                      <MultiSelect
                        options={optionRS}
                        value={this.state.rs}
                        onChange={this.setRSSelected}
                        labelledBy="Pilih lokasi RS" 
                        className="filter-box-dropdown"
                      />
                  </div>
                  <div className="filter-box">
                      <div className="filter-box-title">Ruangan</div>
                      {/* <Select placeholder="Pilih ruangan"options={optionRoom} className="filter-box-dropdown" onChange={this.filterHandle}/> */}
                      <MultiSelect
                        options={optionRoom}
                        value={this.state.room}
                        onChange={this.setRoomSelected}
                        labelledBy="Pilih ruangan" 
                        className="filter-box-dropdown"
                      />
                  </div>
                  <div className="filter-box">
                      <div className="filter-box-title">Kompetensi</div>
                      {/* <Select placeholder="Kompetensi"options={optionCompetence} className="filter-box-dropdown" onChange={this.filterHandle}/> */}
                      <MultiSelect
                        options={optionCompetence}
                        value={this.state.competence}
                        onChange={this.setCompetenceSelected}
                        labelledBy="Kompetensi" 
                        className="filter-box-dropdown"
                      />
                  </div>        
                      <div className="filter-box">
                        <div className="filter-box-title">Tanggal</div>
                        <input type="date"id="idDate" className="filter-box-dropdown" defaultValue={today}></input>
                      </div>
                </div>
                <div className="logbook-filter-result">
                    {this.state.filter}
                    {/* { <ul>
        {this.state.filter.map(item => {
          return <li>{item[0]}</li>;
        })}
      </ul>} */}
                </div>
                 <LogbookTable/>
          </div>
      );
    }
  }
  export default LogbookData