import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  ping: () => {
    return electronAPI.ipcRenderer.invoke('ping')
  },

  getElectronProcessVersions: () => electronAPI.process.versions,

  hwinfo: () => {
    return electronAPI.ipcRenderer.invoke('hwinfo')
  }
}

/**
 * Use `contextBridge` APIs to expose Electron APIs to
 * renderer only if `contextIsolation` is enabled, otherwise
 * just add to the DOM global.
 */
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
