import { Command } from "commander"
import { readdir } from "node:fs/promises"
import { DAY } from "../options/day.ts"
import { Paths } from "../paths.ts"
import { YEAR } from "../options/year.ts"

export const RUN = new Command("run")
  .addOption(YEAR)
  .addOption(DAY)
  .action(async (options) => {
    if (options.day) {
      await executeDay(options.day, options.year)
    } else {
      const days = await readdir(Paths.src(options.year))
      await Promise.allSettled(
        days
          .reduce<number[]>((acc, curr) => {
            const day = parseInt(curr.match(/day(\d+)\.ts/)?.[1] ?? "", 10)
            return Number.isNaN(day) ? acc : [...acc, day]
          }, [])
          .map((day) => executeDay(day, options.year)),
      )
    }
  })

async function executeDay(day: number, year: number) {
  const paths = Paths.day(year, day)

  const [module, input] = await Promise.all([
    import(paths.src),
    Bun.file(paths.input).text(),
  ])

  const code: Day = module.default

  const lines = input.split("\n").filter((it) => !!it.trim())

  const [part1, part2] = await Promise.allSettled([
    code.part1({ raw: input, lines }),
    code.part2({ raw: input, lines }),
  ])

  console.log({
    day,
    part1,
    part2,
  })
}
