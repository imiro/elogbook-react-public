import { createServer } from "miragejs"
console.log("MIRAGE FILE START")

createServer({
    routes() {
	this.urlPrefix = process.env.REACT_APP_API_URL

	this.get("/sso_login", function() {

		let ret = `
<html>
 <body>
  <script type='text/javascript'>
	  window.addEventListener('message', function(e) {
		if(e.data.message == "requestToken") {
			e.source.postMessage({message: "deliverToken", result: "toKen123"}, "*")
		}
	})
   </script>
 </body>
</html>`
		return ret
	})

	this.get("/user", function() {
		return {
			name: "Test Mock User",
			role: "admin",
			api_token: "toKen123",
			user_id: "mock"
		}
	})

	// this.passthrough()
 	this.get("/entries", function() {
		var resp = {
			    "data": [
	   		 {
				"id": 4611,
				"tanggal": "2021-02-03",
				"stase": 2,
				"lokasi": "igd",
				"wahana": 2,
				"nama": "XY",
				"usia": "47",
				"satuanusia": "tahun",
				"gender": "lk",
				"nrm": "X1234",
				"keterampilan": null,
				"catatan": null,
				"kegiatan": "Anam\/PF",
				"tindakan": "",
				"kode": 2,
				"skdi_dx": [2,811]
			    }, {
				"id": 4600,
				"tanggal": "2021-06-20",
				"stase": 2,
				"lokasi": "igd",
				"wahana": 2,
				"nama": "XY",
				"usia": "47",
				"satuanusia": "tahun",
				"gender": "lk",
				"nrm": "X1234",
				"keterampilan": null,
				"catatan": null,
				"kegiatan": "Anam\/PF",
				"tindakan": "",
				"kode": 2,
				"skdi_dx": [1]
			    }
				        ]
		}
		return JSON.stringify(resp)
	})	

	this.get("/dictionary", function() {
		var ret = {
			    "stase": {
				            "0": "IPD",
				            "1": "IKA",
				            "10": "Neuro",
				            "11": "Forensik",
				            "12": "MPI",
				            "2": "Bedah",
				            "3": "Obgyn",
				            "4": "Kardiologi",
				            "5": "Mata",
				            "6": "THT",
				            "7": "Kulit",
				            "8": "Psikiatri",
				            "9": "Pulmo"
				        },
			    "wahana": [
				            "RSCM",
				            "RSUT",
				            "RSF",
				            "RSP",
				            "RSPI SS",
				            "RSPJNHK",
				            "Lainnya"
				        ],
			    "lokasi": {
				            "icu": "ICU",
				            "igd": "IGD",
				            "kamar-autopsi": "Kamar Autopsi",
				            "ok": "Kamar Operasi",
				            "poliklinik": "Poliklinik",
				            "ranap": "Rawat Inap",
				            "rumah": "Home Visit",
				            "vk": "VK"
				        },
			    "kode": {
				            "1": "Observasi",
				            "2": "Asistensi",
				            "3": "Operator dalam Supervisi Tidak Langsung",
				            "4": "Operator dalam Supervisi Langsung",
				            "5": "Operator Mandiri"
				        }
		}
		return JSON.stringify(ret)
	})

	this.get('/skdi_dx/list', function() {
		let resp = [
			    {
				            "id": 1,
				            "diagnosis": "Kekerasan tumpul",
				            "kategori": "Ilmu Kedokteran Forensik dan Medikolegal",
				    	    "kompetensi": "4A"
				        },
			    {
				            "id": 2,
				            "diagnosis": "Kekerasan tajam",
				            "kategori": "Ilmu Kedokteran Forensik dan Medikolegal",
				    	    "kompetensi": "3B"
				        },
			    {
				            "id": 811,
				            "diagnosis": "Paralisis \/ Parese Pita Suara",
				            "kategori": "Tidak ada di SKDI",
				    	    "kompetensi": ""
				        }
		]
		return JSON.stringify(resp)
	})
    }
})
