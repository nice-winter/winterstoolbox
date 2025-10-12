import { Wmi } from '.'

export class Win32Processor {
  wmi: Wmi

  constructor(wmi: Wmi) {
    this.wmi = wmi
  }

  exec(...keys: string[]) {
    return this.wmi.query(`SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_Processor`)
  }
}
