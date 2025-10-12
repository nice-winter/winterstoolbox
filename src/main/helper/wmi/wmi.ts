import { execSync } from 'node:child_process'
import iconv from 'iconv-lite'

export class Wmi {
  constructor() {}

  query(str: string) {
    const cmd = `powershell.exe -Command "Get-CimInstance -Query '${str}' | ConvertTo-Json -Depth 1"`

    return iconv.decode(execSync(cmd), 'cp936')
  }
}

const wmi = new Wmi()

export { wmi }
