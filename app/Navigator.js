import React from 'react';
import ReactDOM from 'react-dom';
const remote = require('electron').remote;
const fs = require('fs');
import { List, Layout, Menu, Breadcrumb, Icon } from 'antd';
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
      hostData: remote.getGlobal('hostData'),
      ip: remote.getGlobal('localhost').ip,
      list: ""//JSON.parse(fs.readFileSync("/Users/agrimonia/electron-demo/db.json")).records[0]
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
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Notification</Breadcrumb.Item>
              </Breadcrumb>
                报警网址：
                <TextArea rows={4} defaultValue={"jd"}/>
            </TabPane>
            <TabPane tab="Capture Record" key="3">
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Capture Record</Breadcrumb.Item>
              </Breadcrumb>
              本机IP: {this.state.ip}
              <List
                bordered
                dataSource={this.state.list}
                renderItem={item => (<List.Item>{item}</List.Item>)}
              />
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
  