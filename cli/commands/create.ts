import { Command } from "commander"
import { exists, mkdir } from "fs/promises"
import { execSync } from "child_process"
import { load } from "cheerio"
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

async function createIfNotExists(path: string) {
  if (!(await exists(path))) {
    await mkdir(path)
  }
}

export const CREATE = new Command("create")
  .addOption(YEAR)
  .addOption(DAY.default(new Date().getDate()))
  .action(async ({ day, year }) => {
    await Promise.all([
      createIfNotExists(Paths.input(year)),
      createIfNotExists(Paths.src(year)),
    ])

    const paths = Paths.day(year, day)

    await Promise.all([fetchExample(), fetchInput(), writeCodeTemplate()])

    execSync(`git add ${paths.src}`)

    /**
     * Fetches the example input from the AoC website (if it can) and writes it to the example file.
     */
    async function fetchExample() {
      if (await exists(paths.example)) {
        return 0
      }

      const res = await fetch(paths.urls.task)
      const text = await res.text()
      const $ = load(text)
      const code = $("pre > code").filter((_, el) => {
        const p = $(el).parent().prev().first()
        return p.is("p") && p.text().toLowerCase().includes("for example")
      })

      let snippet: string
      if (code.length !== 1) {
        console.warn(
          `Unable to find example on page, go to ${paths.urls.task} and locate it yourself, before pasting it into ${paths.example}`,
        )
        snippet = ""
      } else {
        snippet = code.first().text().trim()
      }

      return Bun.write(Bun.file(paths.example), snippet)
    }

    /**
     * If the SESSION_TOKEN env variable is present, fetches the input data from the AoC website and writes it to the input file.
     */
    async function fetchInput() {
      if (await exists(paths.input)) {
        return 0
      }

      const token = process.env.SESSION_TOKEN
      if (!token) {
        console.warn(
          "Missing SESSION_TOKEN env variable. No input data will be fetched.",
        )
        return 0
      }

      const res = await fetch(paths.urls.input, {
        headers: {
          cookie: `session=${token}`,
        },
      })

      // @ts-expect-error No idea why this fails
      return Bun.write(Bun.file(paths.input), res)
    }

    /**
     * Writes the code template to the src file.
     */
    async function writeCodeTemplate() {
      const code = Bun.file(paths.src)
      if (await code.exists()) {
        return 0
      }

      return Bun.write(code, TEMPLATE)
    }
  })
