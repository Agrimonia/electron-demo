import React from 'react';
import ReactDOM from 'react-dom';
//import DynamicDoughnut from './DynamicDoughnut';
const remote = require('electron').remote;
import DonutChart from 'react-donut-chart';
class MainWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  /*
  componentWillMount() {
    setInterval(() => {
      this.setState(remote.getGlobal('hostData'));
    },1000);
  }
  */
  render() {
    return (
      <div>
        <DonutChart data={remote.getGlobal('hostData')}/>
      </div>
    );
  }
}
const mainWndComponent = ReactDOM.render(
  <MainWindow />, document.getElementById('content'));