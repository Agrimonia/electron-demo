const { app, BrowserWindow, Notification } = require('electron');
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
    height: 830, // 高
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
  if(data.search(/baidu|google|bing/) != -1) {
    global.hostData[0].value++;
  } else if (data.search("uestc") != -1) {
    global.hostData[1].value++;
  } else if (data.search("music") != -1) {
    global.hostData[2].value++;
  } else if (data.search(/qq|tencent/) != -1) {
    global.hostData[3].value++;
  } else if (data.search(/taobao|jd/) != -1) {
    global.hostData[4].value++;
    if(Notification.isSupported()){
      throttle(showNotification(), 10000);
    };
  } else {
    global.hostData[5].value++;
  }
  return hostData;
}
// 时间戳-节流
function throttle(func, wait) {
  var context, args;
  var previous = 0;
  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}
// 弹窗通知
function showNotification() {
  const notifiWindow = new Notification({
    title: "Orz",
    body: "女神，618 再买吧！求您了！",
    closeButtonText: ""
  });
  notifiWindow.show();
};