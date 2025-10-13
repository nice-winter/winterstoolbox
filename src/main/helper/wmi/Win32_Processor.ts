import { wmi } from './wmi'
import { Win32_CacheMemory } from './Win32_CacheMemory'

interface IWin32_Processor {
  AddressWidth: number
  Architecture: number
  AssetTag: string
  Availability: number
  Caption: string
  Characteristics: number
  ConfigManagerErrorCode: number
  ConfigManagerUserConfig: boolean
  CpuStatus: number
  CreationClassName: string
  CurrentClockSpeed: number
  CurrentVoltage: number
  DataWidth: number
  Description: string
  DeviceID: string
  ErrorCleared: boolean
  ErrorDescription: string
  ExtClock: number
  Family: number
  InstallDate: Date | null
  L1CacheSize: number
  L2CacheSize: number
  L2CacheSpeed: number | null
  L3CacheSize: number
  L3CacheSpeed: number
  LastErrorCode: number
  Level: number
  LoadPercentage: number
  Manufacturer: string
  MaxClockSpeed: number
  Name: string
  NumberOfCores: number
  NumberOfEnabledCore: number
  NumberOfLogicalProcessors: number
  OtherFamilyDescription: string | null
  PartNumber: string
  PNPDeviceID: string | null
  PowerManagementCapabilities: number[] | null
  PowerManagementSupported: boolean
  ProcessorId: string
  ProcessorType: number
  PSComputerName: string | null
  Revision: string | null
  Role: string
  SecondLevelAddressTranslationExtensions: boolean
  SerialNumber: string | null
  SocketDesignation: string
  Status: string
  StatusInfo: number
  Stepping: string | null
  SystemCreationClassName: string
  SystemName: string
  ThreadCount: number
  UniqueId: string | null
  UpgradeMethod: number
  Version: string
  VirtualizationFirmwareEnabled: boolean
  VMMonitorModeExtensions: boolean
  VoltageCaps: number | null
}

/**
 * Win32_Processor class
 *
 * The Win32_Processor WMI class represents a device that can interpret a
 * sequence of instructions on a computer running on a Windows operating system.
 *
 * @url https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-processor
 */
class Win32_Processor implements IWin32_Processor {
  AddressWidth!: number
  Architecture!: number
  AssetTag!: string
  Availability!: number
  Caption!: string
  Characteristics!: number
  ConfigManagerErrorCode!: number
  ConfigManagerUserConfig!: boolean
  CpuStatus!: number
  CreationClassName!: string
  CurrentClockSpeed!: number
  CurrentVoltage!: number
  DataWidth!: number
  Description!: string
  DeviceID!: string
  ErrorCleared!: boolean
  ErrorDescription!: string
  ExtClock!: number
  Family!: number
  InstallDate!: Date | null
  L1CacheSize!: number
  L2CacheSize!: number
  L2CacheSpeed!: number | null
  L3CacheSize!: number
  L3CacheSpeed!: number
  LastErrorCode!: number
  Level!: number
  LoadPercentage!: number
  Manufacturer!: string
  MaxClockSpeed!: number
  Name!: string
  NumberOfCores!: number
  NumberOfEnabledCore!: number
  NumberOfLogicalProcessors!: number
  OtherFamilyDescription!: string | null
  PartNumber!: string
  PNPDeviceID!: string | null
  PowerManagementCapabilities!: number[] | null
  PowerManagementSupported!: boolean
  ProcessorId!: string
  ProcessorType!: number
  PSComputerName!: string | null
  Revision!: string | null
  Role!: string
  SecondLevelAddressTranslationExtensions!: boolean
  SerialNumber!: string | null
  SocketDesignation!: string
  Status!: string
  StatusInfo!: number
  Stepping!: string | null
  SystemCreationClassName!: string
  SystemName!: string
  ThreadCount!: number
  UniqueId!: string | null
  UpgradeMethod!: number
  Version!: string
  VirtualizationFirmwareEnabled!: boolean
  VMMonitorModeExtensions!: boolean
  VoltageCaps!: number | null

  constructor(...keys: string[]) {
    const raw = wmi.query(`SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_Processor`)
    Object.assign(this, JSON.parse(raw) as IWin32_Processor)

    const LevelCacheMemory = new Win32_CacheMemory().getLevelCache()

    this.L1CacheSize = LevelCacheMemory[0]
    this.L2CacheSize = LevelCacheMemory[1]
    this.L3CacheSize = LevelCacheMemory[2]
  }

  reset() {}

  setPowerState() {}
}

export { Win32_Processor, type IWin32_Processor }
