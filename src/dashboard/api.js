const api = "http://localhost:8001/stats/"

class API {

  totalInputBy(param)
  {
    return fetch(api + param).then(res => res.json())
  }

  dailyInput(start_date, end_date)
  {
    var resource = api + "sumdaily"
    resource += "?start=" + start_date
    resource += "&end=" + end_date
    return fetch(resource).then(res => res.json())
  }

}

const ls = new API()
export default ls;
