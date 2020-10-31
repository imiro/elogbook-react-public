import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Button
} from 'reactstrap';
import { Switch } from '../../vibe';
import { FilterableLineChart, LogbookStats } from '../../dashboard'
import { Doughnut, Line, Bar } from 'react-chartjs-2';

export default class LogbookDashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facebook: true,
      twitter: false,
      barData: null
    };

    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(e) {
    let that = this
    LogbookStats.totalInputBy(e.target.value)
    .then(function (api_data) {
      that.changeBarData(api_data)
    })
  }
  //
  // loadData(param) {
  //   let api = "http://localhost:8001/stats/" + param
  //   return fetch(api).then(resp => resp.json())
  // }

  changeBarData(api_data) {
    var labels = [], data = [];
    for(let label in api_data)
    {
      labels.push(label)
      data.push(api_data[label])
    }

    this.setState({barData:
      {
        labels,
        datasets: [{
          data
        }]
      }
    })
  }

  componentDidMount()
  {
    let that = this
    LogbookStats.totalInputBy('stase')
    .then(function (api_data) {
      that.changeBarData(api_data)
    })
  }

  render() {
    const chartColors = {
      red: 'rgb(233, 30, 99)',
      danger: 'rgb(233, 30, 99)',
      dangerTransparent: 'rgba(233, 30, 99, .8)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 180, 0)',
      green: 'rgb(34, 182, 110)',
      blue: 'rgb(68, 159, 238)',
      primary: 'rgb(68, 159, 238)',
      primaryTransparent: 'rgba(68, 159, 238, .8)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',

      primaryShade1: 'rgb(68, 159, 238)',
      primaryShade2: 'rgb(23, 139, 234)',
      primaryShade3: 'rgb(14, 117, 202)',
      primaryShade4: 'rgb(9, 85, 148)',
      primaryShade5: 'rgb(12, 70, 117)'
    };
    const donutData = {
      labels: ['Q1', 'Q2', 'Q3'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            chartColors.primaryShade1,
            chartColors.primaryShade2,
            chartColors.primaryShade3
          ],
          hoverBackgroundColor: [
            chartColors.primaryShade4,
            chartColors.primaryShade4,
            chartColors.primaryShade4
          ]
        }
      ]
    };
    const line = {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: '# of Votes',
            data: [3, 6, 4, 10, 8, 12],
            borderColor: 'transparent',
            backgroundColor: chartColors.primary,
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            borderWidth: 4
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
    };

    var barChart;
    if(this.state.barData)
    {
      barChart = <Bar
                  data={this.state.barData}
                  options={ {
                    legend: {
                      display: false
                    }
                  }}
                 />
    } else {
      barChart = <span>Loading...</span>
    }

    return (
      <div>
        <div className="m-b">
          <h2>Good morning!</h2>
          <p className="text-muted">
            Here's what's going on with your business today.
          </p>
        </div>

        {/*}<Row>
          <Col md={8} sm={12}>
            <Card>
              <CardHeader>Traffic</CardHeader>
              <CardBody>
                <div className="full-bleed">
                  <Line
                    data={line.data}
                    width={2068}
                    height={846}
                    legend={{ display: false }}
                    options={line.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} sm={12}>
            <Card>
              <CardHeader>Product Views</CardHeader>
              <CardBody>
                <Doughnut
                  data={donutData}
                  width={908}
                  height={768}
                  legend={{ display: false }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>*/}
        <Row>
          <Col md={2}>
            <select onChange={this.handleSelectChange}>
              <option value="stase">Stase</option>
              <option value="wahana">Wahana</option>
              <option value="lokasi">Lokasi</option>
            </select>
          </Col>
          <Col md={10}>
            {barChart}
          </Col>
        </Row>
        <Row>
          <FilterableLineChart />
        </Row>
      </div>
    );
  }
}
