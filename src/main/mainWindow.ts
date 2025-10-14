import { join } from 'node:path'
import { shell, BrowserWindow } from 'electron'
import { is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow

/**
 * Create the main browser window.
 */
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 900,
    minHeight: 500,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    },

    hasShadow: true,
    titleBarStyle: 'hidden'
    // ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
  })

  mainWindow.setBackgroundMaterial('acrylic')

  mainWindow.hookWindowMessage(0x0116, () => {
    mainWindow.setEnabled(false)
    mainWindow.setEnabled(true)
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

export { createMainWindow, mainWindow }
