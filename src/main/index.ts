import { fileURLToPath } from 'node:url'
import { app, BrowserWindow } from 'electron/main'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { initIpcMain } from './ipcMain'
import { createWindow } from './window/createWindow'
import si from 'systeminformation'
import iconv from 'iconv-lite'

export let mainWindow: BrowserWindow

app.whenReady().then(() => {
  initIpcMain()

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow()
  })

  mainWindow = createWindow(1000, 600, 900, 500)

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(fileURLToPath(new URL('../renderer/index.html', import.meta.url)))
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

si.setPowershellParser((data) => iconv.decode(data, 'gbk'))

const info = await si.osInfo()
console.log(info)
