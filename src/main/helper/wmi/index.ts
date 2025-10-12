import { exec } from 'node:child_process'
import { exec as sudoexec } from '@vscode/sudo-prompt'
import { Win32Process } from './win32Process'

type ExecCallbackFnParams<T> = T extends (
  cmd: string,
  options?: (error: unknown, stdout: infer S, stderr: infer E) => void
) => unknown
  ? { stdout: S; stderr: E }
  : never

export class Wmi {
  win32Process: Win32Process

  constructor() {
    this.win32Process = new Win32Process(this)
  }

  query(str: string, sudo?: boolean) {
    const cmd = `Get-CimInstance -Query "${str}"`

    return new Promise<ExecCallbackFnParams<typeof sudoexec>>((res, reject) => {
      if (sudo) {
        sudoexec(cmd, { name: `Winter's Toolbox Helper` }, (err, stdout, stderr) => {
          if (err) {
            reject(err)
          }

          stdout = stdout?.toString()

          res({ stdout, stderr })
        })
      } else {
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            reject(err)
          }

          res({ stdout, stderr })
        })
      }
    })
  }
}
