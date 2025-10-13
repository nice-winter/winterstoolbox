import { wmi } from './wmi'
import { search } from '../../common/searchFunction'

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

/**
 * Win32_PnPEntity class
 *
 * The Win32_PnPEntity WMI class represents the properties of a Plug and Play device.
 * Plug and Play entities are shown as entries in the Device Manager located in Control Panel.
 *
 * @url https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-pnpentity
 */
class Win32_PnPEntity extends Array<IWin32_PnPEntity> {
  private _drivers: Array<IWin32_PnPEntity>

  constructor(...keys: string[]) {
    const raw = wmi.query(`SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_PnPEntity`)

    const drivers = JSON.parse(raw) as Array<IWin32_PnPEntity>

    super(...drivers)
    this._drivers = drivers
  }

  findDriver(...conditions: SearchCondition<IWin32_PnPEntity>[]) {
    return search(this._drivers, ...conditions)
  }
}

export { Win32_PnPEntity, type IWin32_PnPEntity }
