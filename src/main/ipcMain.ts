import { ipcMain } from 'electron'
import { hwinfo } from './helper/hwinfo'
import { mainWindow } from './mainWindow'

function initIpcMain() {
  ipcMain.handle('ping', () => {
    console.log('pong')
    return 'pong'
  })

  ipcMain.handle('hwinfo', async () => {
    return await hwinfo()
  })

  ipcMain.handle('isMaximized', () => mainWindow.isMaximized())
  ipcMain.on('minimize', () => mainWindow.minimize())
  ipcMain.on('maximize', () => mainWindow.maximize())
  ipcMain.on('unmaximize', () => mainWindow.unmaximize())
  ipcMain.on('close', () => mainWindow.close())
}
export { initIpcMain }
