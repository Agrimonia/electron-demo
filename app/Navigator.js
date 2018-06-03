import React from 'react';
import ReactDOM from 'react-dom';
const remote = require('electron').remote;
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import DonutChart from 'react-donut-chart';
const { Header, Content, Footer } = Layout;
import { Input } from 'antd';
const { TextArea } = Input;
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
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
          <img className="logo" src="../MonitoringSystem.png" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Analysis" key="1">
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Analysis</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, minHeight: 280 }}>
                <DonutChart data={this.state.hostData} />
              </div>
            </TabPane>
            <TabPane tab="Notification" key="2">
              <div>
                <TextArea rows={4} />
              </div>
            </TabPane>
            <TabPane tab="Capture Record" key="3">
              Capture Record
            </TabPane>
          </Tabs>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Monitoring System ©2018 Created by Agrimonia
      </Footer>
      </Layout>
    )
  }
}
  