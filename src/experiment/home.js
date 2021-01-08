import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useAuth } from '../providers/auth'
import { useAPI, DictionaryResolver } from '../providers/api'

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

  useEffect(function() {
	  getUserEntries().then( (respData) => {
		//console.log('respData', respData)
		return respData.map( function(datum) {
			datum.stase  = DictionaryResolver.stase(datum.stase)
			datum.lokasi = DictionaryResolver.stase(datum.lokasi)
			datum.wahana = DictionaryResolver.stase(datum.wahana)
			return datum
		} )
	  }).then( (mappedData) => {
		console.log('mapData', mappedData)
		setData( mappedData )
	  })
  },[])

  return (
    <div>
      <div>Welcome, {user.name}!</div>
	  {/* <div><Link to="/dashboard">Dashboard</Link></div> */}
      {/* TODO: filter buttons component */}
 	{data ? <TableComponent data={data} /> : null }
    </div>
  )
}

function SlidingCardsComponent({ data }) {

}

function TableComponent({ data }) {


	return (

	<div className="row d-none-xs">
        <div className="col-md-12">
          <table className='table'>
            <thead>
		{
			Object.keys(headings).map(function(key, index) {
				return <th key={key}>{headings[key]}</th>
			})
		}
            </thead>
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
				<td>{datum.created_at}</td>
			</tr> )
		    })
		}
	    </tbody>
          </table>
        </div>
      </div>	

	)
}

