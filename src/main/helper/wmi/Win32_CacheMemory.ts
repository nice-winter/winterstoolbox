import { wmi } from './wmi'

interface IWin32_CacheMemory {
  Access: number
  AdditionalErrorData: number[]
  Associativity: number
  Availability: number
  BlockSize: number
  CacheSpeed: number
  CacheType: number
  Caption: string
  ConfigManagerErrorCode: number
  ConfigManagerUserConfig: boolean
  CorrectableError: boolean
  CreationClassName: string
  CurrentSRAM: number[]
  Description: string
  DeviceID: string
  EndingAddress: number
  ErrorAccess: number
  ErrorAddress: number
  ErrorCleared: boolean
  ErrorCorrectType: number
  ErrorData: number[]
  ErrorDataOrder: number
  ErrorDescription: string
  ErrorInfo: number
  ErrorMethodology: string
  ErrorResolution: number
  ErrorTime: Date
  ErrorTransferSize: number
  FlushTimer: number
  InstallDate: Date
  InstalledSize: number
  LastErrorCode: number
  Level: number
  LineSize: number
  Location: number
  MaxCacheSize: number
  Name: string
  NumberOfBlocks: number
  OtherErrorDescription: string
  PNPDeviceID: string
  PowerManagementCapabilities: number[]
  PowerManagementSupported: boolean
  Purpose: string
  ReadPolicy: number
  ReplacementPolicy: number
  StartingAddress: number
  Status: string
  StatusInfo: number
  SupportedSRAM: number[]
  SystemCreationClassName: string
  SystemLevelAddress: boolean
  SystemName: string
  WritePolicy: number
}

/**
 * Win32_CacheMemory class
 *
 * The Win32_CacheMemory WMI class represents internal and
 * external cache memory on a computer system.
 *
 * @url https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-cachememory
 * @todo extends cim-cachememory https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/cim-cachememory
 */
class Win32_CacheMemory extends Array<IWin32_CacheMemory> {
  private _caches: Array<IWin32_CacheMemory>
  constructor(...keys: string[]) {
    const raw = wmi.query(
      `SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_CacheMemory`
    )

    const caches = JSON.parse(raw) as IWin32_CacheMemory[]

    super(...caches)

    this._caches = caches
  }

  getLevelCache() {
    const L1CacheSize = this._caches
      .filter((cache) => cache.Purpose === 'L1 Cache')
      .reduce((a, b) => a + b.MaxCacheSize, 0)

    const L2CacheSize =
      this._caches.find((cache) => cache.Purpose === 'L2 Cache')?.MaxCacheSize || 0
    const L3CacheSize =
      this._caches.find((cache) => cache.Purpose === 'L3 Cache')?.MaxCacheSize || 0
    return [L1CacheSize, L2CacheSize, L3CacheSize]
  }
}

export { Win32_CacheMemory, type IWin32_CacheMemory }
