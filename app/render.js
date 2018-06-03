import React from 'react';
import ReactDOM from 'react-dom';
import Navigator from './Navigator';

class MainWindow extends React.Component {  
  render() {
    return (
      <div>
        <Navigator />
      </div>
    );
  }
}
const mainWndComponent = ReactDOM.render(
  <MainWindow />, document.getElementById('content'));