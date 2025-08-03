const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 监听 TCP 数据推送
  onTcpData: (callback) => ipcRenderer.on('tcp-data', (event, data) => callback(data)),
  // 用户相关
  getAllUsers: () => ipcRenderer.invoke('get-all-users'),
  addUser: (name, role) => ipcRenderer.invoke('add-user', name, role),
});