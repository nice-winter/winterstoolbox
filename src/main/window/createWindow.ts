import { fileURLToPath } from 'node:url'
import { shell } from 'electron/common'
import { BrowserWindow } from 'electron/main'

import icon from '../../../resources/icon.png?asset'

/**
 * Create a browser window.
 */
function createWindow(
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
  preload?: string
) {
  const window = new BrowserWindow({
    width,
    height,
    minWidth,
    minHeight,
    frame: false,
    show: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: preload || fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false
    },

    hasShadow: true,
    titleBarStyle: 'hidden'
    // ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
  })

  window.setBackgroundMaterial('acrylic')

  window.hookWindowMessage(0x0116, () => {
    window.setEnabled(false)
    window.setEnabled(true)
  })

  window.on('ready-to-show', () => {
    window.show()
  })

  window.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  return window
}

export { createWindow }
