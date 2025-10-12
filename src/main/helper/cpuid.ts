import { Wmi } from './wmi'
import { Win32Processor } from './wmi/win32Process'

interface ICpuInfo {
  Availability?: string
  CpuStatus?: string
  CurrentVoltage?: string
  DeviceID?: string
  LoadPercentage?: string
  Status?: string
  StatusInfo?: string
  AddressWidth?: string
  DataWidth?: string
  ExtClock?: string
  L2CacheSize?: string
  L2CacheSpeed?: string
  MaxClockSpeed?: string
  PowerManagementSupported?: string
  ProcessorType?: string
  Revision?: string
  SocketDesignation?: string
  Version?: string
  VoltageCaps?: string
  Caption?: string
  Description?: string
  InstallDate?: string
  Name?: string
  PNPDeviceID?: string
  PowerManagementCapabilities?: string
  SystemName?: string
  CurrentClockSpeed?: string
  Family?: string
  OtherFamilyDescription?: string
  Role?: string
  Stepping?: string
  UniqueId?: string
  UpgradeMethod?: string
  Architecture?: string
  AssetTag?: string
  Characteristics?: string
  L3CacheSize?: string
  L3CacheSpeed?: string
  Level?: string
  Manufacturer?: string
  NumberOfCores?: string
  NumberOfEnabledCore?: string
  NumberOfLogicalProcessors?: string
  PartNumber?: string
  ProcessorId?: string
  SecondLevelAddressTranslationExtensions?: string
  SerialNumber?: string
  ThreadCount?: string
  VirtualizationFirmwareEnabled?: string
  VMMonitorModeExtensions?: string
  PSComputerName?: string
}

class CpuInfo implements ICpuInfo {
  Availability?: string | undefined
  CpuStatus?: string | undefined
  CurrentVoltage?: string | undefined
  DeviceID?: string
  LoadPercentage?: string
  Status?: string
  StatusInfo?: string
  AddressWidth?: string
  DataWidth?: string
  ExtClock?: string
  L2CacheSize?: string
  L2CacheSpeed?: string | undefined
  MaxClockSpeed?: string
  PowerManagementSupported?: string
  ProcessorType?: string
  Revision?: string
  SocketDesignation?: string
  Version?: string | undefined
  VoltageCaps?: string | undefined
  Caption?: string
  Description?: string
  InstallDate?: string
  Name?: string
  PNPDeviceID?: string | undefined
  PowerManagementCapabilities?: string | undefined
  SystemName?: string
  CurrentClockSpeed?: string
  Family?: string
  OtherFamilyDescription?: string | undefined
  Role?: string
  Stepping?: string | undefined
  UniqueId?: string | undefined
  UpgradeMethod?: string
  Architecture?: string
  AssetTag?: string
  Characteristics?: string
  L3CacheSize?: string
  L3CacheSpeed?: string | undefined
  Level?: string
  Manufacturer?: string
  NumberOfCores?: string
  NumberOfEnabledCore?: string
  NumberOfLogicalProcessors?: string
  PartNumber?: string
  ProcessorId?: string
  SecondLevelAddressTranslationExtensions?: string
  SerialNumber?: string
  ThreadCount?: string
  VirtualizationFirmwareEnabled?: string
  VMMonitorModeExtensions?: string
  PSComputerName?: string | undefined

  raw: string[]

  constructor() {
    this.raw = new Win32Processor(new Wmi())
      .exec()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '')

    const info = Object.fromEntries(
      this.raw.map((line) => {
        const kv = line.split(' :').map((kv) => kv.trim())

        const rt = kv.length === 2 ? kv : [kv[1], undefined]
        return rt
      })
    )

    this.Availability = info['Availability']
    this.CpuStatus = info['CpuStatus']
    this.CurrentVoltage = info['CurrentVoltage']
    this.DeviceID = info['DeviceID']
    this.LoadPercentage = info['LoadPercentage']
    this.Status = info['Status']
    this.StatusInfo = info['StatusInfo']
    this.AddressWidth = info['AddressWidth']
    this.DataWidth = info['DataWidth']
    this.ExtClock = info['ExtClock']
    this.L2CacheSize = info['L2CacheSize']
    this.L2CacheSpeed = info['L2CacheSpeed']
    this.MaxClockSpeed = info['MaxClockSpeed']
    this.PowerManagementSupported = info['PowerManagementSupported']
    this.ProcessorType = info['ProcessorType']
    this.Revision = info['Revision']
    this.SocketDesignation = info['SocketDesignation']
    this.Version = info['Version']
    this.VoltageCaps = info['VoltageCaps']
    this.Caption = info['Caption']
    this.Description = info['Description']
    this.InstallDate = info['InstallDate']
    this.Name = info['Name']
    this.PNPDeviceID = info['PNPDeviceID']
    this.PowerManagementCapabilities = info['PowerManagementCapabilities']
    this.SystemName = info['SystemName']
    this.CurrentClockSpeed = info['CurrentClockSpeed']
    this.Family = info['Family']
    this.OtherFamilyDescription = info['OtherFamilyDescription']
    this.Role = info['Role']
    this.Stepping = info['Stepping']
    this.UniqueId = info['UniqueId']
    this.UpgradeMethod = info['UpgradeMethod']
    this.Architecture = info['Architecture']
    this.AssetTag = info['AssetTag']
    this.Characteristics = info['Characteristics']
    this.L3CacheSize = info['L3CacheSize']
    this.L3CacheSpeed = info['L3CacheSpeed']
    this.Level = info['Level']
    this.Manufacturer = info['Manufacturer']
    this.NumberOfCores = info['NumberOfCores']
    this.NumberOfEnabledCore = info['NumberOfEnabledCore']
    this.NumberOfLogicalProcessors = info['NumberOfLogicalProcessors']
    this.PartNumber = info['PartNumber']
    this.ProcessorId = info['ProcessorId']
    this.SecondLevelAddressTranslationExtensions = info['SecondLevelAddressTranslationExtensions']
    this.SerialNumber = info['SerialNumber']
    this.ThreadCount = info['ThreadCount']
    this.VirtualizationFirmwareEnabled = info['VirtualizationFirmwareEnabled']
    this.VMMonitorModeExtensions = info['VMMonitorModeExtensions']
    this.PSComputerName = info['PSComputerName']
  }
}

function getCpuInfo() {
  return new CpuInfo()
}

export { getCpuInfo, getCpuInfo as getCpuId }
