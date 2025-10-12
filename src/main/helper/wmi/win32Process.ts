import { Wmi } from '.'

export class Win32Process {
  wmi: Wmi

  constructor(wmi: Wmi) {
    this.wmi = wmi
  }

  async get(...keys: string[]) {
    return await this.wmi.query(
      `SELECT ${keys.length > 0 ? keys.join(', ') : '*'} FROM Win32_Processor`
    )
  }
}
