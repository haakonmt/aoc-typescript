import { readdir } from 'node:fs/promises'
import { Command } from 'commander'
import { time } from '../../src/utils.ts'
import { DAY } from '../options/day.ts'
import { YEAR } from '../options/year.ts'
import { Paths } from '../paths.ts'

export const RUN = new Command('run')
  .addOption(YEAR)
  .addOption(DAY)
  .option('-e, --example', 'Run example input')
  .action(async (options) => {
    if (options.day) {
      await executeDay(options.day, options.year, options.example)
    } else {
      const days = await readdir(Paths.src(options.year))
      await Promise.allSettled(
        days
          .reduce<number[]>((acc, curr) => {
            const day = Number.parseInt(curr.match(/day(\d+)\.ts/)?.[1] ?? '', 10)
            return Number.isNaN(day) ? acc : [...acc, day]
          }, [])
          .map((day) => executeDay(day, options.year, options.example)),
      )
    }
  })

async function executeDay(day: number, year: number, example: boolean) {
  const paths = Paths.day(year, day)

  const [module, input] = await Promise.all([
    import(paths.src),
    Bun.file(example ? paths.example : paths.input).text(),
  ])

  const code: Day = module.default

  const lines = input.split('\n').filter((it) => !!it.trim())

  const [part1, part2] = await Promise.allSettled([
    time(() => code.part1({ raw: input, lines })),
    time(() => code.part2({ raw: input, lines })),
  ])

  console.log({
    example,
    day,
    part1,
    part2,
  })
}
