import graphicsCard from '../db/graphicscard.json'
import intelChipset from '../db/intelchipset.json'
import memManufacturer from '../db/mem.json'
import memType from '../db/mem.json'

interface DataBase {
  graphicsCard: Map<string, string>
  intelChipset: Map<string, string>
  memManufacturer: Map<string, string>
  memType: Map<string, string>
}

const db: DataBase = {
  graphicsCard: new Map(Object.entries(graphicsCard)),
  intelChipset: new Map(Object.entries(intelChipset)),
  memManufacturer: new Map(Object.entries(memManufacturer)),
  memType: new Map(Object.entries(memType))
}

export function initDatabase() {
  console.log(db)
}
