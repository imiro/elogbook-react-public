import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useAuth } from '../providers/auth'
import { useAPI, DictionaryResolver } from '../providers/api'
import { ResponsiveCardsComponent } from './CardsComponent'

import { Popover, PopoverBody, Button } from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'

const headings = {
  "id": "#",
  "stase": "Stase",
  "tanggal": "Tanggal",
  "lokasi": "Tempat",
  "nama": "Identitas",
  "nrm": "NRM",
  "diagnosis": "Diagnosis",
  "kegiatan": "Kegiatan",
  "created_at": "Diinput Tanggal"
}

export default function HomePage() {
  const { user } = useAuth()
  const { getUserEntries } = useAPI()
  const [data, setData] = useState(null) 
  const [filters, setFilters] = useState(
	  DictionaryResolver.dictWithBoolValue(true))

  function handleFilterToggle(kind) {
	return function (key) {
		return function(e) {
			setFilters({
				...filters,
				[ kind ]: {
					...filters[kind],
					[key]: !filters[kind][key]
				}
			})
		}
	}
  }

  useEffect(function() {
	  getUserEntries().then( (respData) => {
		  setData(respData)
	  })
  },[])


	function dataFilterer(datum) {
		let bool = (filters.stase[datum.stase] &&
			filters.lokasi[datum.lokasi] &&
			filters.wahana[datum.wahana] )
		return bool
	}

	function dataMapper(datum) {
		let datum_new = {...datum}
		datum_new.stase  = DictionaryResolver.stase(datum.stase)
		datum_new.lokasi = DictionaryResolver.lokasi(datum.lokasi)
		datum_new.wahana = DictionaryResolver.wahana(datum.wahana)
		return datum_new
	} 
	
  return (
    <div>
      <div>Welcome, {user.name}!</div>
	  {/* <div><Link to="/dashboard">Dashboard</Link></div> */}
	 <AFilterComponent kind="stase" onToggle={handleFilterToggle("stase")} filterData={filters.stase} placeholder="Stase" />
	  <AFilterComponent kind="wahana" onToggle={handleFilterToggle("wahana")} filterData={filters.wahana} placeholder="Wahana" />
	  <AFilterComponent kind="lokasi" onToggle={handleFilterToggle("lokasi")} filterData={filters.lokasi} placeholder="Lokasi" /> 
 	{data ? <TableComponent datanya={data.filter(dataFilterer).map(dataMapper)} /> : null }
    </div>
  )
}

function dateHelper(dateString) {
	let date = new Date(dateString)
	const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	return (date.getDate() + "-" + month[date.getMonth()] + "-" + date.getFullYear() )
}

function AFilterComponent({ placeholder, onToggle, kind, filterData }) {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const toggleOpen = () => setDropdownOpen(prevState => !prevState)
	return (
	  <div className="d-inline-block">
		<Button id={kind} type="button" onClick={toggleOpen}>
		{placeholder}
		</Button>
		{'  '}
		<Popover placement='bottom' isOpen={dropdownOpen} target={kind} toggle={toggleOpen} >
			<PopoverBody>
			{Object.keys(filterData).map(function (qey) {
			return <label key={qey} onClick={onToggle(qey)}>
				<input type='checkbox'
					checked={filterData[qey]}
					onChange={onToggle(qey)}
				/>
				{DictionaryResolver[kind](qey)}
				</label>
			}) }
			</PopoverBody>
		</Popover>

	</div>
	)
	return (
		<Dropdown className='d-inline-block' isOpen={dropdownOpen} toggle={toggleOpen}>
			<DropdownToggle caret>{placeholder}</DropdownToggle>
			<DropdownMenu>
			{Object.keys(filterData).map(function (qey) {
			return <DropdownItem key={qey} onClick={onToggle(qey)}><label>
				<input type='checkbox'
			checked={filterData[qey]}
			onChange={onToggle(qey)}
				/>
				{DictionaryResolver[kind](qey)}
				</label></DropdownItem>
			}) }
			</DropdownMenu>
		</Dropdown>
	)
}

function SlidingCardsComponent({ data }) {

}

function TableComponent({ datanya }) {

	const data = datanya

	return (

	<div className="row d-none d-lg-block">
        <div className="col-md-12">
          <table className='table'>
            <thead><tr>
		{
			Object.keys(headings).map(function(key, index) {
				return <th key={key}>{headings[key]}</th>
			})
		}
            </tr></thead>
	    <tbody>
		{ data.map(function (datum) {
			return (
			 <tr key={datum.id}>
				<td>{datum.id}</td>
				<td>{datum.stase}</td>
				<td>{datum.tanggal}</td>
				<td>{datum.lokasi} {datum.wahana}</td>
				<td>{datum.nama} ({datum.gender == "pr" ? "Perempuan" : "Laki-laki"}, {datum.usia} {datum.satuanusia})</td>
				<td>{datum.nrm}</td>
				<td>{datum.diagnosis}</td>
				<td>{datum.kegiatan == "tindakan" ? ("Tindakan: " + datum.tindakan) : "Anamnesis/PF/Edukasi" }</td>
				<td>{dateHelper(datum.created_at)}</td>
			</tr> )
		    })
		}
	    </tbody>
          </table>
        </div>
      </div>	

	)
}

