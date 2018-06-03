const { app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const child_process = require('child_process');

const isDevelopment = true;
if (isDevelopment) {
  /* eslint-disable */
  require('electron-reload')(__dirname, {
    electron: require('${__dirname}/../../node_modules/electron'),
    ignored: /node_modules|[\/\\]\./
  });
}
let mainWindow, cap, hostData;
function createWindow() {
  mainWindow = new BrowserWindow({ 
    height: 600, // 高
    width: 800, // 宽
  });
  // 启动文件入口，如 index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  // 开启 Chromium DevTools
  // mainWindow.webContents.openDevTools();
  // 监听窗口关闭事件
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
// 加载就绪
app.on('ready', () => {
  global.hostData = [{
        label: "search",
        value: 0
      },
      {
        label: "uestc",
        value: 0
      },
      {
        label: "music",
        value: 0
      },
      {
        label: "tencent",
        value: 0
      },
      {
        label: "shopping",
        value: 0
      },
      {
        label: "others",
        value: 0
      }
    ];
  createWindow();
  cap = child_process.spawn('node', ['./app/cap.js']);
  cap.on('close', (code) => {
    console.log('child process exited with code ' + code);
  });
  cap.stdout.on('data', function (data) {
    
    console.log('stdout: ' + data);
    dataFilter('' + data);
  });
  /*
  cap.on('message', function (data) {
    console.log(data);
    global.hostData = dataFilter(data);
    console.log(global.hostData);
  });
  */
});
// 监听所有窗口关闭的事件
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    child_process.exit(2);
    console.log("cap exit!");
    app.quit();
  }
});
// 激活窗口
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function dataFilter(data) {
  console.log(global.hostData[0]);
  console.log(global.hostData[1]);
  console.log(global.hostData[2]);
  console.log(global.hostData[3]);
  console.log(global.hostData[4]);
  console.log(global.hostData[5]);
  if(data.search(/baidu|google|bing/) != -1) {
    global.hostData[0].value++;
  } else if (data.search("uestc") != -1) {
    global.hostData[1].value++;
  } else if (data.search("music") != -1) {
    global.hostData[2].value++;
  } else if (data.search(/qq|tencent/) != -1) {
    global.hostData[3].value++;
  } else if (data.search(/taobao|jd.com/) != -1) {
    global.hostData[4].value++;
  } else {
    global.hostData[5].value++;
  }
  return hostData;
}