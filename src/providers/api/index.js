import { useAuth } from '../auth';

const useAPI = function() {
  const { token } = useAuth()
  const endpoint = process.env.REACT_APP_API_URL + "/stats/"

  function fetchWithAuth(url, init)
  {
    url = endpoint + url
    if(init.headers) {
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
    return fetchWithAuth(param).then(res => res.json())
  }

  const dailyInput = (start_date, end_date) =>
  {
    var resource = "sumdaily"
    resource += "?start=" + start_date
    resource += "&end=" + end_date
    return fetchWithAuth(resource).then(res => res.json())
  }

  return {
    totalInputBy,
    dailyInput
  }
}
