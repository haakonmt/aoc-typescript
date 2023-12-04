import { arr } from "../utils.ts"

function getWinners(line: string) {
  const [, c] = line.split(":")
  const [winningCards, playerCards] = c
    .split("|")
    .map((i) => i.split(/\s+/).filter(Boolean))

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
    const cache: number[] = []

    for (let i = 0; i < lines.length; i += 1) {
      cache[i] ??= 1

      const winners = getWinners(lines[i])

      for (let j = i + 1; j < i + winners.length + 1; j += 1) {
        cache[j] ??= 1
        cache[j] += cache[i]
      }
    }

    return arr.sum(Object.values(cache))
  },
} satisfies Day
