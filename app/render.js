import React from 'react';
import ReactDOM from 'react-dom';
//import DynamicDoughnut from './DynamicDoughnut';
const remote = require('electron').remote;
import DonutChart from 'react-donut-chart';
class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostData: remote.getGlobal('hostData')
    }
  }
  
  componentWillMount() {
    setInterval(() => {
      this.state.hostData = remote.getGlobal('hostData');
    },5000);
  }
  
  render() {
    return (
      <div>
        <DonutChart data={this.state.hostData}/>
      </div>
    );
  }
}
const mainWndComponent = ReactDOM.render(
  <MainWindow />, document.getElementById('content'));