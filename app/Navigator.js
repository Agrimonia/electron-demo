import React from 'react';
import ReactDOM from 'react-dom';
const remote = require('electron').remote;
import { Layout, Menu, Breadcrumb } from 'antd';
import DonutChart from 'react-donut-chart';
const { Header, Content, Footer } = Layout;

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostData: remote.getGlobal('hostData')
    }
  }
  componentWillMount() {
    setInterval(() => {
      this.state.hostData = remote.getGlobal('hostData');
    }, 5000);
  }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Analysis</Menu.Item>
            <Menu.Item key="2">Notification</Menu.Item>
            <Menu.Item key="3">Capture Record</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Analysis</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 280 }}>
            <DonutChart data={this.state.hostData} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Monitoring System ©2018 Created by Agrimonia
      </Footer>
      </Layout>
    )
  }
}
  