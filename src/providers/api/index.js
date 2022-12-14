import { useAuth } from '../auth';
import { useState, useEffect } from 'react'

const endpoint = process.env.REACT_APP_API_URL 
const api_url = process.env.REACT_APP_API_URL 

function useFetchWithAuth() {
	const { token } = useAuth()
	return function(endpoint, init) {
	  var url = api_url + endpoint
	  if(!init) init = {}
	  if(init && init.headers) {
	    if(init.headers instanceof Headers)
	      init.headers.append('Authorization', 'Bearer ' + token)
	    else
	      init.headers = {...init.headers, 'Authorization': 'Bearer ' + token}
	  } else
	    init.headers = {'Authorization': 'Bearer ' + token}

	  return fetch(url, init)
	}
}

export const useEntries = function() {

	// TODO caching?
	const req = useFetchWithAuth()
	const [entries, setEntries] = useState(null);
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if(loading) return
		setLoading(true)
		req('/entries')
		   .then(res => res.json())
		   .then(json => {
			   setEntries(json.data)
			   setLoading(false)
		   })
	           .catch(err => {
			   setLoading(false)
			   throw err
		   })
	}, [])

	return entries;
}

let dictionary = null
export const useDictionary = function() {
	const [dict, setDict] = useState(dictionary)
	useEffect(() => {
		if(!dictionary || !dictionary.stase)
		  fetch(api_url + '/dictionary').then(resp => resp.json())
		  .then(d => {
			dictionary = {...d}
			setDict(d)
		  })
	}, [])

	return dict;
}

let skdi_dx = null
export const useSkdiDxList = function() {
	const [dx, setDx] = useState(skdi_dx)
	useEffect(() => {
		if(!dx || !dx.length)
			fetch(api_url + '/skdi_dx/list')
			.then(resp => resp.json())
			.then(dx_a => {
			    skdi_dx = dx_a
			    setDx(dx_a)
			})
	})

	return dx
}

let skdi_ktn = null
export const useSkdiKtnList = function() {
	const [ktn, setKtn] = useState(skdi_ktn)
	useEffect(() => {
		if(!ktn || !ktn.length)
			fetch(api_url + '/skdi_keterampilan/list')
			.then(resp => resp.json())
			.then(dx_a => {
			    skdi_ktn = dx_a
			    setKtn(dx_a)
			})
	})

	return ktn
}

export const useCompleteDictionary = function() {
	const dx = useSkdiDxList()
	const ktn = useSkdiKtnList()
	const dict = useDictionary()

	if(!dx || !ktn || !dict) return null
	return {...dict, skdi_dx: dx, skdi_ktn: ktn}
}

export const requestForgotPassword = function(email) {
	return fetch(api_url + '/forgot-password?email=' + email)
	.then(function(resp) {
		return !!resp.ok
	})
}

export const setPassword = function(params) {
	let {token, email, password, password_confirmation} = params
	console.log('sending', params)
	return fetch(api_url + '/set-password', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	}).then(function(resp) {
		if(resp.ok) return {ok: true}
		return resp.json()
		// TODO handle error
	}).then(function (err) {
		return {ok: false, ...err}
	})
}

export const useCreateEntry = function() {
	const { token } = useAuth()
	return function createEntry(inputs) {
	return fetch(api_url + '/entry', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token},
		body: JSON.stringify(inputs)
	}).then(function (resp) {
            return resp
	})
}
}

export const useEditEntry = function() {
	const fwa = useFetchWithAuth()
	return function(id, inputs) {
	return fwa('/entry/' + id, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(inputs)
	})
	}
}

export const useSkdiDxCount = function() {
	const fwa = useFetchWithAuth()
	const [count, setCount] = useState(null)
	
	useEffect(function() {
	  fwa('/skdi_dx/count?flatten=1')
	  .then(function (resp) {
	    if(resp.ok) return resp.json()
	    else throw resp
	  }).then(function (json) {
	    setCount(json)
	  })
	}, [])

	return count 
}

export const useStaseCount = function() {
	const fwa = useFetchWithAuth()
	const [count, setCount] = useState(null)
	
	useEffect(function() {
	  fwa('/nstase')
	  .then(function (resp) {
	    if(resp.ok) return resp.json()
	    else throw resp
	  }).then(function (json) {
	    setCount(json)
	  })
	}, [])

	return count 
}

export const useSkdiDxDataFetcher = function() {
	const fwa = useFetchWithAuth()
	return function(dxId) {
	  return fwa('/skdi_dx/count?flatten=1&stase=' + dxId).then(
	   function(resp) {
		if(resp.ok) return resp.json()
		throw resp
	   }
	  )
	}
}

export const useEntriesCount = function() {
	const fwa = useFetchWithAuth()
	const [count, setCount] = useState(null)

	const changeStase = function(s) {
	let stase = s ? "?stase="+s : ""
	fwa('/entry/count' + stase)
	.then(function (resp) {
		if(resp.ok) return resp.json()
		throw resp
	}).then(function (num) {
		setCount(num)
	})
	}

	// fetch data for all stase at init
	useEffect(() => changeStase(), [])

	return [count, changeStase]
}

export const useXlsxExporter = function() {
    const fwa = useFetchWithAuth()
    return function(cbSuccess, cbFailure) {
        fwa('/entries/download')
        .then(function (resp) {
            if (resp.ok) return resp.text()
            else cbFailure(resp)
        }).then(url => cbSuccess(api_url + url))
        .catch(function (err) {
            cbFailure(err)
        })
    }

}

export const useAPI = function() {
  const { token } = useAuth()

  function fetchWithAuth(url, init)
  {
    url = endpoint + url
	if(!init) init = {}
    if(init && init.headers) {
      if(init.headers instanceof Headers)
        init.headers.append('Authorization', 'Bearer ' + token)
      else
        init.headers = {...init.headers, 'Authorization': 'Bearer ' + token}
    } else
      init.headers = {'Authorization': 'Bearer ' + token}

    return fetch(url, init)
  }

  const getUser = function(tkn) {
    
  }

  const totalInputBy = (param) =>
  {
    return fetchWithAuth('/stats/' + param).then(res => res.json())
  }

  const dailyInput = (start_date, end_date) =>
  {
    var resource = "/stats/sumdaily"
    resource += "?start=" + start_date
    resource += "&end=" + end_date
    return fetchWithAuth(resource).then(res => res.json())
  }
  
  const getUserEntries = function() {
    let url = '/entries'
    return fetchWithAuth(url)
			.then(res => {
				return	res.json()
			}).then(json => {
					return json
			})
  }

  return {
    totalInputBy,
    dailyInput,
	getUserEntries
  }
}

export const DictionaryResolver = (function() {

	let dict = {
		stase: {},
		lokasi: {},
		wahana: {},
		kode: {}
	}
	let beres = false
	
	return {
		stase(st) {
				return dict.stase[st]
		},
		wahana(w) {
				return dict.wahana[w]
		},
		lokasi(lok) {
				return dict.lokasi[lok]
		},
		kode(kod) {
				return dict.kode[kod]
		},
		fetchDictionary() {
			// TODO return cached value if exist
			return fetch(endpoint + "/dictionary")
			.then(resp => resp.json())
			.then(items => {
				for(let item of items)
				{
						let o = {}
						o[item.qey] = item.value
						Object.assign(dict[item.kind], o)
				}
					let ret = {}
					Object.keys(dict).map(function (kind) {
						ret[kind] = {}
						Object.keys(dict[kind]).map(function (qey) {
							ret[kind] = {...ret[kind], [qey]: true}
						})
					})
					return ret
			})
		},
		dictWithBoolValue(val) {
			if(!beres) return {}
			return false
		}
	}
})()
