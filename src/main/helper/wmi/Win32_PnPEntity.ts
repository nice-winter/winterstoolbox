import { wmi } from './wmi'

interface IWin32_PnPEntity {
  Availability: number
  Caption: string
  ClassGuid: string
  CompatibleID: string[]
  ConfigManagerErrorCode: number
  ConfigManagerUserConfig: boolean
  CreationClassName: string
  Description: string
  DeviceID: string
  ErrorCleared: boolean
  ErrorDescription: string
  HardwareID: string[]
  InstallDate: Date
  LastErrorCode: number
  Manufacturer: string
  Name: string
  PNPClass: string
  PNPDeviceID: string
  PowerManagementCapabilities: number[]
  PowerManagementSupported: boolean
  Present: boolean
  Service: string
  Status: string
  StatusInfo: number
  SystemCreationClassName: string
  SystemName: string
}

type SearchCondition<T> = {
  [K in keyof T]: {
    key: K
    keyword: T[K]
    matchWholeWord?: boolean
  }
}[keyof T]

class Win32_PnPEntity extends Array<IWin32_PnPEntity> {
  private _drivers: Array<IWin32_PnPEntity>

  constructor(...keys: string[]) {
    const raw = wmi.query(`SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_PnPEntity`)

    const drivers = JSON.parse(raw) as Array<IWin32_PnPEntity>

    super(...drivers)
    this._drivers = drivers
  }

  findDriver(...conditions: SearchCondition<IWin32_PnPEntity>[]) {
    return this._drivers.filter((item) =>
      conditions.every((cond) => {
        const { key, keyword, matchWholeWord = true } = cond
        const value = item[key]

        if (value == null) return false

        if (matchWholeWord) {
          return value === keyword
        }

        // 模糊匹配
        const valStr = String(value).toLowerCase()
        const keyStr = String(keyword).toLowerCase()
        return valStr.includes(keyStr)
      })
    )
  }
}

export { Win32_PnPEntity, type IWin32_PnPEntity }
