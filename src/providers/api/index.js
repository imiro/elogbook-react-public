import { useAuth } from '../auth';

const endpoint = process.env.REACT_APP_API_URL 

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
