import { ipcMain } from 'electron'
import { hwinfo } from './helper/hwinfo'

function initIpcMain() {
  ipcMain.handle('ping', () => {
    console.log('pong')
    return 'pong'
  })

  ipcMain.handle('hwinfo', async () => {
    return await hwinfo()
  })
}
export { initIpcMain }
