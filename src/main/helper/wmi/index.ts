import { execSync } from 'node:child_process'
import { exec as sudoexec } from '@vscode/sudo-prompt'
import { Win32Processor } from './win32Process'

type ExecCallbackFnParams<T> = T extends (
  cmd: string,
  options?: (error: unknown, stdout: infer S, stderr: infer E) => void
) => unknown
  ? { stdout: S; stderr: E }
  : never

export class Wmi {
  win32Process: Win32Processor

  constructor() {
    this.win32Process = new Win32Processor(this)
  }

  query(str: string, sudo?: boolean) {
    const cmd = `powershell.exe -Command "Get-CimInstance -Query '${str}' | Format-List *"`

    return execSync(cmd).toString()

    // return new Promise<ExecCallbackFnParams<typeof sudoexec>>((res, reject) => {
    //   if (sudo) {
    //     sudoexec(cmd, { name: `Winters Toolbox Helper` }, (err, stdout, stderr) => {
    //       if (err) {
    //         reject(err)
    //       }

    //       stdout = stdout?.toString()

    //       res({ stdout, stderr })
    //     })
    //   } else {
    //     exec(cmd, (err, stdout, stderr) => {
    //       if (err) {
    //         reject(err)
    //       }

    //       res({ stdout, stderr })
    //     })
    //   }
    // })
  }
}
