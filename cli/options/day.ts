import { Option } from 'commander'

export const DAY = new Option('-d, --day <day>', 'Day').argParser((value) => {
  let day = new Date().getDate()
  if (value) {
    day = Math.max(1, Math.min(Number.parseInt(value, 10), 25))
  }

  if (Number.isNaN(day)) {
    throw new TypeError(`Invalid day "${value}"`)
  }

  return day
})
