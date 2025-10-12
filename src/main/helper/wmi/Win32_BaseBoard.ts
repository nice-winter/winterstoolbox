import { wmi } from './wmi'

interface IWin32BaseBoard {
  Caption: string
  ConfigOptions: string[]
  CreationClassName: string
  Depth: number
  Description: string
  Height: number
  HostingBoard: boolean
  HotSwappable: boolean
  InstallDate: Date
  Manufacturer: string
  Model: string
  Name: string
  OtherIdentifyingInfo: string
  PartNumber: string
  PoweredOn: boolean
  Product: string
  Removable: boolean
  Replaceable: boolean
  RequirementsDescription: string
  RequiresDaughterBoard: boolean
  SerialNumber: string
  SKU: string
  SlotLayout: string
  SpecialRequirements: boolean
  Status: string
  Tag: string
  Version: string
  Weight: number
  Width: number
  Chipset: string
}

/**
 * Win32_BaseBoard class
 *
 * The Win32_BaseBoard WMI class represents a baseboard, which is also known as a motherboard or system board.
 *
 * @url https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-baseboard
 */
class Win32BaseBoard implements IWin32BaseBoard {
  Caption!: string
  ConfigOptions!: string[]
  CreationClassName!: string
  Depth!: number
  Description!: string
  Height!: number
  HostingBoard!: boolean
  HotSwappable!: boolean
  InstallDate!: Date
  Manufacturer!: string
  Model!: string
  Name!: string
  OtherIdentifyingInfo!: string
  PartNumber!: string
  PoweredOn!: boolean
  Product!: string
  Removable!: boolean
  Replaceable!: boolean
  RequirementsDescription!: string
  RequiresDaughterBoard!: boolean
  SerialNumber!: string
  SKU!: string
  SlotLayout!: string
  SpecialRequirements!: boolean
  Status!: string
  Tag!: string
  Version!: string
  Weight!: number
  Width!: number
  Chipset!: string

  constructor(...keys: string[]) {
    const raw = wmi.query(`SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_BaseBoard`)
    Object.assign(this, JSON.parse(raw) as IWin32BaseBoard)
  }
}

export { Win32BaseBoard, type IWin32BaseBoard }
