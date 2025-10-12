import { Win32CacheMemory } from './wmi/win32CacheMemory'
import { Win32Processor } from './wmi/win32Processor'

function getCpuInfo() {
  const cpuInfo = new Win32Processor()
  const cacheMemory = new Win32CacheMemory()

  return new Win32Processor()
}

export { getCpuInfo, getCpuInfo as getCpuId }
