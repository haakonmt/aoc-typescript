import { Command } from "commander"
import { mkdir } from "fs/promises"
import { existsSync } from "fs"
import { DAY } from "../options/day.ts"
import { Paths } from "../paths.ts"
import { YEAR } from "../options/year.ts"

const TEMPLATE = `
export default {
  part1({ lines }) {
    return lines.length
  },
  part2({ lines }) {
    return lines.length
  },
} satisfies Day
`.trimStart()

export const CREATE = new Command("create")
  .addOption(YEAR)
  .addOption(DAY.default(new Date().getDate()))
  .action(async ({ day, year }) => {
    if (!existsSync(Paths.input(year))) {
      await mkdir(Paths.input(year))
    }

    const paths = Paths.day(year, day)
    const writes: Promise<number>[] = []
    const input = Bun.file(paths.input)
    const token = process.env.SESSION_TOKEN
    if (!token) {
      writes.push(Bun.write(input, ""))
      console.warn(
        "Missing SESSION_TOKEN env variable. No input data will be fetched.",
      )
    } else {
      writes.push(
        fetch(paths.url, {
          headers: {
            cookie: `session=${token}`,
          },
        }).then((res) => Bun.write(input, res)),
      )
    }

    const code = Bun.file(paths.src)
    if (!(await code.exists())) {
      writes.push(Bun.write(code, TEMPLATE))
    }

    await Promise.all(writes)
  })
