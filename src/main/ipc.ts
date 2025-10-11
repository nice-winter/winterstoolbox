import { ipcMain } from 'electron'

function initIpcMain() {
  // IPC test
  ipcMain.handle('ping', () => {
    console.log('pong')
    return 'pong'
  })
}

export { initIpcMain }
