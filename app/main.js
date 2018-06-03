const { app, BrowserWindow } = require('electron');
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
let mainWindow;
let cap;
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
  createWindow();
  cap = child_process.spawn('node', ['./app/cap.js']);
  cap.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
  cap.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });
});
// 监听所有窗口关闭的事件
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    child_process.exit();
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
