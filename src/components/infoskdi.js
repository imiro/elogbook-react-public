import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import Layout from './layout'
import chevronLeft from '../assets/images/profile/chevron_left.png'


function infoSKDI() {
    return (
	<Layout page="SKDI / Informasi Kompetensi" >
          <div className="navbar-divider"></div>
          <div className="profile-bar">
          <NavLink id="logbook-back" style={{ textDecoration: 'none' }} to="/skdi" ><img src={chevronLeft} ></img>Kembali</NavLink>
          </div>
          <div className="dashboard-box">
            <div className="info-box-skdi">
              <div className="info-skdi-title"> Tentang Kompetensi </div>
              <div className="info-skdi-subtitle"> Tingkat Kemampuan 1: mengenali dan menjelaskan </div>
              <div className="info-skdi-paragraph">
                Tingkat Kemampuan 1: mengenali dan menjelaskan Lulusan dokter mampu mengenali dan menjelaskan gambaran klinik penyakit, dan mengetahui cara yang paling tepat untuk mendapatkan informasi lebih lanjut mengenai penyakit tersebut, selanjutnya menentukan rujukan yang paling tepat bagi pasien. Lulusan dokter juga mampu menindaklanjuti sesudah kembali dari rujukan.
              </div>
              <div className="info-skdi-subtitle"> Tingkat Kemampuan 2: mendiagnosis dan merujuk </div>
              <div className="info-skdi-paragraph">
                Lulusan dokter mampu membuat diagnosis klinik terhadap penyakit tersebut dan menentukan rujukan yang paling tepat bagi penanganan pasien selanjutnya. Lulusan dokter juga mampu menindaklanjuti sesudah kembali dari rujukan.
              </div>
              <div className="info-skdi-subtitle">Tingkat Kemampuan 3: mendiagnosis, melakukan penatalaksanaan awal, dan merujuk </div>
              <div className="info-skdi-subtitle">3A. Bukan gawat darurat</div>
              <div className="info-skdi-paragraph">
                Lulusan dokter mampu membuat diagnosis klinik dan memberikan terapi pendahuluan pada keadaan yang bukan gawat darurat. Lulusan dokter mampu menentukan rujukan yang paling tepat bagi penanganan pasien selanjutnya. Lulusan dokter juga mampu menindaklanjuti sesudah kembali dari rujukan.
              </div>
              <div className="info-skdi-subtitle">3B. Gawat darurat</div>
              <div className="info-skdi-paragraph">
                Lulusan dokter mampu membuat diagnosis klinik dan memberikan terapi pendahuluan pada keadaan gawat darurat demi menyelamatkan nyawa atau mencegah keparahan dan/atau kecacatan pada pasien. Lulusan dokter mampu menentukan rujukan yang paling tepat bagi penanganan pasien selanjutnya. Lulusan dokter juga mampu menindaklanjuti sesudah kembali dari rujukan.
              </div>
              <div className="info-skdi-subtitle">Tingkat Kemampuan 4: mendiagnosis, melakukan penatalaksanaan secara mandiri dan tuntas</div>
              <div className="info-skdi-paragraph">
                Lulusan dokter mampu membuat diagnosis klinik dan melakukan penatalaksanaan penyakit tersebut secara mandiri dan tuntas.
                <br></br>1. 4A. Kompetensi yang dicapai pada saat lulus dokter
                <br></br>2. 4B. Profisiensi (kemahiran) yang dicapai setelah selesai internsip dan/atau Pendidikan Kedokteran Berkelanjutan (PKB)
                <br></br><br></br>Dengan demikian didalam Daftar Penyakit ini level kompetensi tertinggi adalah 4A
              </div>
            </div>
          </div>
	</Layout>
    )
}

export default infoSKDI
