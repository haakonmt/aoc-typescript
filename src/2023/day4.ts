import { arr } from "../utils.ts"

function getWinners(line: string) {
  const [, winningCards, playerCards] = line
    .match(/.*:\s+([\d\s]+)\s+\|\s+([\d\s]+)\s*/)!
    .map((i) => i.split(/\s+/))

  return arr.intersect(winningCards, playerCards)
}

export default {
  part1({ lines }) {
    return lines.reduce((acc, curr) => {
      const winners = getWinners(curr)

      return acc + winners.reduce((s) => (s ? 2 * s : 1), 0)
    }, 0)
  },
  part2({ lines }) {
    const cache: Record<number, number> = {}

    for (let i = 0; i < lines.length; i += 1) {
      cache[i] ??= 1

      const winners = getWinners(lines[i])

      for (let j = 0; j < winners.length; j += 1) {
        const key = i + j + 1
        cache[key] ??= 1
        cache[key] += cache[i]
      }
    }

    return arr.sum(Object.values(cache))
  },
} satisfies Day
