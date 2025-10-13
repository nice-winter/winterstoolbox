import type { ElectronAPI } from '@electron-toolkit/preload'
import type { hwinfo } from '../main/helper/hwinfo'

export interface IElectronAPI {
  ping: () => Promise<string>
  getElectronProcessVersions: () => ElectronAPI['process']['versions']
  hwinfo: typeof hwinfo
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
