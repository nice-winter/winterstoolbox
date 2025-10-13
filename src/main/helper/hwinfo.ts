import systeminfo from 'systeminformation'

function hwinfo() {
  return systeminfo.getStaticData()
}

export { hwinfo }
