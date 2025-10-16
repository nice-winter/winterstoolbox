type ExtractPromise<T> = T extends Promise<infer U> ? U : T
type Hwinfo = ExtractPromise<ReturnType<typeof window.api.hwinfo>>
type MemLayoutData = Hwinfo['memLayout'][0]
type Gpu = Hwinfo['graphics']['controllers'][0]

export function numberToChinese(num: number) {
  if (num < 0 || num > 9999) {
    return '超出范围'
  }

  if (num === 0) {
    return '零'
  }

  const normalDigits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const specialDigits = ['', '单', '双', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千']

  // 如果数字小于10，使用特殊转换（1->单，2->双）
  if (num < 10) {
    return specialDigits[num]
  }

  let result = ''
  const str = num.toString()
  const len = str.length

  for (let i = 0; i < len; i++) {
    const digit = parseInt(str[i])
    const unitIndex = len - i - 1

    if (digit === 0) {
      // 处理连续的零和末尾的零
      if (result[result.length - 1] !== '零' && i !== len - 1) {
        result += '零'
      }
    } else {
      // 十位的1特殊处理（10->十，不显示"一十"）
      if (unitIndex === 1 && digit === 1 && i === 0) {
        result += units[unitIndex]
      } else {
        result += normalDigits[digit] + units[unitIndex]
      }
    }
  }

  // 清理可能的末尾零
  if (result[result.length - 1] === '零') {
    result = result.slice(0, -1)
  }

  return result
}

export function memDisplayText(mem: MemLayoutData[]) {
  const makeKey = (it: MemLayoutData) => `${it.manufacturer}|${it.type}|${it.clockSpeed}|${it.size}`

  const formatBytesToGB = (bytes: number) => {
    const gb = bytes / 1024 ** 3
    const rounded = Math.round(gb)
    return Math.abs(gb - rounded) < 1e-9 ? `${rounded}GB` : `${gb.toFixed(2)}GB`
  }

  const map = new Map<string, { item: MemLayoutData; count: number; firstIndex: number }>()

  mem.forEach((it, idx) => {
    const key = makeKey(it)
    if (!map.has(key)) {
      map.set(key, { item: it, count: 1, firstIndex: idx })
    } else {
      map.get(key)!.count++
    }
  })

  const entries = Array.from(map.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count // 按数量降序
    return a.firstIndex - b.firstIndex // 数量相同时，保持第一次出现顺序
  })

  const result = entries.map(({ item, count }) => {
    const sizeStr = formatBytesToGB(item.size)
    const base = `${item.manufacturer} ${item.type} ${item.clockSpeed}MHz ${sizeStr}`
    return count > 1 ? `${base} x ${count}` : base
  })

  const totalSizeGB = (mem.reduce((total, current) => total + current.size, 0) || 0) / 1024 ** 3

  return {
    totalSize: totalSizeGB,
    displayText: result
  }
}

export function gpuDisplayText(gpus: Gpu[]) {
  const gpuList = gpus
    .filter((gpu) => gpu.bus && gpu.subDeviceId && gpu.vram)
    .map((gpu) => {
      const manufacturer = ''

      return {
        ...gpu,
        manufacturer
      }
    })
}
