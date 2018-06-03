import React from 'react';
import DonutChart from 'react-donut-chart';
const remote = require('electron').remote;
const getState = () => {
  [{
    label: '1',
    value: remote.global.hostData[0]
  },
  {
    label: '2',
    value: remote.global.hostData[1]
  },
  {
    label: '3',
    value: remote.global.hostData[2]
  },
  {
    label: '4',
    value: remote.global.hostData[3]
  },
  {
    label: '5',
    value: remote.global.hostData[4]
  },
  {
    label: '6',
    value: remote.global.hostData[4]
  }]
}

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    setInterval(() => {
      this.setState(getState());
    }, 5000);
  };
  render() {
    return (
      <div>
        <h2>Dynamicly refreshed Doughnut Example</h2>
        <DonutChart data={this.state} />
      </div>
    );
  }
};