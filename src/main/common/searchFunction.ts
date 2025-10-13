type SearchCondition<T> = {
  [K in keyof T]: {
    key: K
    keyword: T[K]
    matchWholeWord?: boolean
  }
}[keyof T]

function search<T>(arr: T[], ...conditions: SearchCondition<T>[]) {
  return arr.filter((item) =>
    conditions.every((cond) => {
      const { key, keyword, matchWholeWord = true } = cond
      const value = item[key]

      if (value == null) return false

      if (matchWholeWord) {
        return value === keyword
      }

      // 模糊匹配
      const valStr = String(value).toLowerCase()
      const keyStr = String(keyword).toLowerCase()
      return valStr.includes(keyStr)
    })
  )
}

export { search }
