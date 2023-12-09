import { arr } from "../utils.ts"

function buildHistory(line: string) {
  const original = line.split(/\s+/).map(Number)
  const history = [original]

  let current = history[history.length - 1]
  while (current.some((it) => it !== 0)) {
    const differences: number[] = []
    for (let i = 0; i < current.length - 1; i += 1) {
      differences.push(current[i + 1] - current[i])
    }
    history.push(differences)
    current = history[history.length - 1]
  }

  return history
}

export default {
  part1({ lines }) {
    return arr.sumBy(lines, (line) => {
      const history = buildHistory(line)

      return arr.sum(history.map((it) => it[it.length - 1]))
    })
  },
  part2({ lines }) {
    return arr.sumBy(lines, (line) => {
      const history = buildHistory(line)

      return history.toReversed().reduce((diff, curr) => curr[0] - diff, 0)
    })
  },
} satisfies Day
