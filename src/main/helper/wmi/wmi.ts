import { execSync } from 'node:child_process'
import iconv from 'iconv-lite'

export class Wmi {
  constructor() {}

  query(str: string, format?: 'json' | 'list') {
    let formatArgs = ''
    switch (format) {
      case 'json':
        formatArgs = 'ConvertTo-Json -Depth 1'
        break
      case 'list':
        formatArgs = 'Format-List *'
        break
      default:
        formatArgs = 'ConvertTo-Json -Depth 1'
    }

    const cmd = `powershell.exe -Command "Get-CimInstance -Query '${str}' | ${formatArgs}"`

    return iconv.decode(execSync(cmd), 'cp936')
  }
}

const wmi = new Wmi()

export { wmi }
