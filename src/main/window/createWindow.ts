import { fileURLToPath } from 'node:url'
import { shell } from 'electron/common'
import { BrowserWindow, type BrowserWindowConstructorOptions } from 'electron/main'

import icon from '../../../resources/icon.png?asset'

const baseOptions: BrowserWindowConstructorOptions = {
  frame: false,
  show: false,
  fullscreenable: false,
  autoHideMenuBar: true,
  hasShadow: true,
  titleBarStyle: 'hidden',
  ...(process.platform === 'linux' ? { icon } : {})
  // ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
}

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
    ...baseOptions,
    webPreferences: {
      preload: preload || fileURLToPath(new URL('../preload/index.mjs', import.meta.url)),
      sandbox: false
    }
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

export { baseOptions, createWindow }
