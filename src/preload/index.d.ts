import type { ElectronAPI } from '@electron-toolkit/preload'

export interface IElectronAPI {
  ping: () => Promise<string>
  getElectronProcessVersions: () => ElectronAPI['process']['versions']
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
