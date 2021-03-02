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
		return [
		{
			  "id": 2,
			  "user_id": "mock",
			  "tanggal": "2020-08-10",
			  "stase": 9,
			  "wahana": 3,
			  "lokasi": "ranap",
			  "nama": "KK",
			  "gender": "lk",
			  "usia": "52",
			  "satuanusia": "tahun",
			  "nrm": "1100111",
			  "diagnosis": "efusi pleura",
			  "kegiatan": "tindakan",
			  "tindakan": "Pungsi Pleura",
			  "kode": 1,
			  "verifikator": "",
			  "verified": 0,
			  "created_at": "2020-08-10T05:41:03.000000Z"
		}
		]
	})	

	this.get("/dictionary", function() {
	    return [ {"kind":"stase","qey":"0","value":"IPD"},{"kind":"stase","qey":"1","value":"IKA"},{"kind":"stase","qey":"10","value":"Neuro"},{"kind":"stase","qey":"11","value":"Forensik"},{"kind":"stase","qey":"12","value":"MPI"},{"kind":"stase","qey":"2","value":"Bedah"},{"kind":"stase","qey":"3","value":"Obgyn"},{"kind":"stase","qey":"4","value":"Kardiologi"},{"kind":"stase","qey":"5","value":"Mata"},{"kind":"stase","qey":"6","value":"THT"},{"kind":"stase","qey":"7","value":"Kulit"},{"kind":"stase","qey":"8","value":"Psikiatri"},{"kind":"stase","qey":"9","value":"Pulmo"},{"kind":"wahana","qey":"0","value":"RSCM"},{"kind":"wahana","qey":"1","value":"RSUT"},{"kind":"wahana","qey":"2","value":"RSF"},{"kind":"wahana","qey":"3","value":"RSP"},{"kind":"wahana","qey":"4","value":"RSPI SS"},{"kind":"wahana","qey":"5","value":"RSPJNHK"},{"kind":"wahana","qey":"6","value":"Lainnya"},{"kind":"lokasi","qey":"icu","value":"ICU"},{"kind":"lokasi","qey":"igd","value":"IGD"},{"kind":"lokasi","qey":"kamar-autopsi","value":"Kamar Autopsi"},{"kind":"lokasi","qey":"ok","value":"Kamar Operasi"},{"kind":"lokasi","qey":"poliklinik","value":"Poliklinik"},{"kind":"lokasi","qey":"ranap","value":"Rawat Inap"},{"kind":"lokasi","qey":"rumah","value":"Home Visit"},{"kind":"lokasi","qey":"vk","value":"VK"},{"kind":"kode","qey":"1","value":"Observasi"},{"kind":"kode","qey":"2","value":"Asistensi"},{"kind":"kode","qey":"3","value":"Operator dalam Supervisi Tidak Langsung"},{"kind":"kode","qey":"4","value":"Operator dalam Supervisi Langsung"},{"kind":"kode","qey":"5","value":"Operator Mandiri"}]
	})
    }
})
