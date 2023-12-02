import { Option } from "commander"

export const YEAR = new Option("-y, --year <year>", "Year")
  .argParser((value) => {
    let year = new Date().getFullYear()
    if (value) {
      year = Math.max(2015, Math.min(parseInt(value, 10), year))
    }

    if (Number.isNaN(year)) {
      throw new Error(`Invalid year "${value}"`)
    }

    return year
  })
  .default(new Date().getFullYear())
