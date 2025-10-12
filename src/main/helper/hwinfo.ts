import { wmi } from './wmi/wmi'
import { Win32CacheMemory } from './wmi/Win32_CacheMemory'
import { Win32Processor } from './wmi/Win32_Processor'
import { writeFileSync } from 'node:fs'
import { Win32_PnPEntity } from './wmi/Win32_PnPEntity'

function getCpuInfo() {
  const cpuInfo = new Win32Processor()
  const cacheMemory = new Win32CacheMemory()

  return new Win32Processor()
}

function getAll() {
  const className = [
    'Win32_1394Controller',
    'Win32_1394ControllerDevice',
    'Win32_AllocatedResource',
    'Win32_AssociatedProcessorMemory',
    'Win32_BaseBoard',
    'Win32_BIOS',
    'Win32_Bus',
    'Win32_CacheMemory',
    'Win32_ControllerHasHub',
    'Win32_DeviceBus',
    'Win32_DeviceMemoryAddress',
    'Win32_DeviceSettings',
    'Win32_DMAChannel',
    // 'Win32_FloppyController',
    'Win32_IDEController',
    'Win32_IDEControllerDevice',
    'Win32_InfraredDevice',
    'Win32_IRQResource',
    'Win32_MemoryArray',
    'Win32_MemoryArrayLocation',
    'Win32_MemoryDevice',
    'Win32_MemoryDeviceArray',
    'Win32_MemoryDeviceLocation',
    'Win32_MotherboardDevice',
    'Win32_OnBoardDevice',
    'Win32_ParallelPort',
    'Win32_PCMCIAController',
    'Win32_PhysicalMemory',
    'Win32_PhysicalMemoryArray',
    'Win32_PhysicalMemoryLocation',
    'Win32_PNPAllocatedResource',
    'Win32_PNPDevice',
    'Win32_PNPEntity',
    'Win32_PortConnector',
    'Win32_PortResource',
    'Win32_Processor',
    'Win32_SCSIController',
    'Win32_SCSIControllerDevice',
    'Win32_SerialPort',
    'Win32_SerialPortConfiguration',
    'Win32_SerialPortSetting',
    'Win32_SMBIOSMemory',
    'Win32_SoundDevice',
    'Win32_SystemBIOS',
    'Win32_SystemDriverPNPEntity',
    'Win32_SystemEnclosure',
    'Win32_SystemMemoryResource',
    'Win32_SystemSlot',
    'Win32_USBController',
    'Win32_USBControllerDevice',
    'Win32_USBHub'
  ]

  // const result: string[] = []

  // className.forEach((cls) => {
  //   const cmd = `SELECT * FROM ${cls}`
  //   const stdout = wmi.query(cmd, 'list')
  //   result.push(`---------------------------- ${cls} ----------------------------`)
  //   result.push(...stdout.split('\n'))
  // })

  // const file = result.join('\n')

  // writeFileSync('./hwinfo.txt', file)

  const r = new Win32_PnPEntity().findDriver(
    {
      key: 'DeviceID',
      keyword: `PCI\\VEN_8086&DEV_`,
      matchWholeWord: false
    },
    {
      key: 'Caption',
      keyword: 'Intel(R) LPC Controller/eSPI Controller',
      matchWholeWord: false
    }
  )

  console.log(r)
}

export { getCpuInfo, getCpuInfo as getCpuId, getAll }
