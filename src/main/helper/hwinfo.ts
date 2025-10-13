import { Win32_CacheMemory } from './wmi/Win32_CacheMemory'
import { Win32_Processor } from './wmi/Win32_Processor'
import { Win32_PnPEntity } from './wmi/Win32_PnPEntity'
import systeminfo from 'systeminformation'
import iconv from 'iconv-lite'

function getCpuInfo() {
  const cpuInfo = new Win32_Processor()
  const cacheMemory = new Win32_CacheMemory()

  return new Win32_Processor()
}

function getAll() {
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

  systeminfo.getStaticData((info) => {
    console.log(info)
  })
}

function hwinfo() {}

export { getCpuInfo, getCpuInfo as getCpuId, getAll, hwinfo }
