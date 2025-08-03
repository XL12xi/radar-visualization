const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const net = require('net');
const { saveRadarData, getAllUsers, addUser } = require('./src/db/models');

let win; // 全局变量，供 TCP 使用

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, 'build/index.html')); // 只在这里写一次
}

// 等待 app 准备好，再创建窗口和启动 TCP 服务
app.whenReady().then(() => {
  createWindow();
  startTCPServer();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出（除 macOS）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/*---------------------------------------------------------*/
// TCP 数据监听部分
function startTCPServer() {
  const tcpServer = net.createServer((socket) => {
    console.log('📡 TCP 客户端连接成功');

    socket.on('data', (data) => {
      const message = data.toString();
      console.log('📨 接收到数据:', message);

      saveRadarData(message); // 保存到数据库

      if (win && win.webContents) {
        win.webContents.send('tcp-data', message); // 向前端发送数据
      }
    });

    socket.on('end', () => {
      console.log('❌ TCP 客户端断开连接');
    });

    socket.on('error', (err) => {
      console.error('🚨 TCP 连接错误:', err.message);
    });
  });

  tcpServer.listen(4000, () => {
    console.log('🚀 TCP 服务器已启动，监听端口 4000');
  });
}

/*---------------------------------------------------------*/
// 用户相关 IPC 处理
ipcMain.handle('get-all-users', () => getAllUsers());
ipcMain.handle('add-user', (event, name, role) => addUser(name, role));
