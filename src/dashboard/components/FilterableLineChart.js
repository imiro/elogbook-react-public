import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import {
  Col
} from 'reactstrap';
import { Line } from 'react-chartjs-2'
import LogbookStats from '../api'

export default function FilterableLineChart(props)
{
  var minus30days = new Date()
  minus30days.setDate(minus30days.getDate()-30)

  var [data, setData] = useState(null)
  var [startDate, setStartDate] = useState(minus30days)
  var [endDate, setEndDate] = useState(new Date())

  var getFormattedDate = function (s) {
    function dua(x) {
        if(x < 10) return "0"+x
        return ""+x
    }

    return s.getFullYear() + "-"
           + dua(s.getMonth()+1) + "-"
           + dua(s.getDate())
  }

  var handleDateChange = function () {
    // assert(startDate <= endDate)
    var allDates = []
    var datesAndValues = {}
    for(var s = new Date(startDate);s <= endDate;s.setDate(s.getDate()+1))
    {
      allDates.push(s)
      datesAndValues[getFormattedDate(s)] = 0
    }

    LogbookStats.dailyInput(getFormattedDate(startDate),
                            getFormattedDate(endDate))
    .then(function(data) {
      let formattedData = {
        labels: [],
        datasets: [{
          data: []
        }]
      }
      var tdata = Object.assign(datesAndValues, data)
      for(let label in tdata)
      {
        formattedData.labels.push(label)
        formattedData.datasets[0].data.push(data[label])
      }
      setData(formattedData)
    })
  }

  useEffect(function() {
    handleDateChange()
  }, [startDate, endDate])

  var lineChart = !data ? <span>Loading...</span> :
                          <Line
                              data={data}
                           />

  return (
    <React.Fragment>
      <Col md={2}>
        <span>Start date</span>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          format="y-MM-dd"
          minDate={new Date(2020, 6, 11)}
          // maxDate={endDate ? new Date(endDate) : null}
        />
        <span>End date</span>
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          format="y-MM-dd"
          // minDate={startDate ? new Date(startDate) : null}
          maxDate={new Date()}
        />
      </Col>
      <Col md={10}>
        {lineChart}
      </Col>
    </React.Fragment>
  )

}
