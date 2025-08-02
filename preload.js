const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onTcpData: (callback) => ipcRenderer.on('tcp-data', (event, data) => callback(data))
});
