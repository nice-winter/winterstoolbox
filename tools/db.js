import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const file = readFileSync(resolve('./db/1.txt'))
  .toString()
  .split('\n')
  .filter((l) => l.trim())
  .map((i) => {
    return {
      [i.split(',')[0]]: i.split(',')[1]
    }
  })

const result = Array.from(new Map(file.flatMap(Object.entries)).entries())
  .sort(([a], [b]) => parseInt(a, 16) - parseInt(b, 16))
  .map(([k, v]) => ({ [k]: v }))

const result2 = Object.fromEntries(new Map(result.flatMap(Object.entries)).entries())

console.log(result2)

writeFileSync(resolve('./db/intelchipset.json'), JSON.stringify(result2, undefined, 2))
