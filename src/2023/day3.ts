interface MatchesParams {
  regex: RegExp
  text: string
  range?: [number, number]
  calculateWeight?(match: RegExpExecArray, selfWeight: number): number
}

function matchAll({
  regex,
  text,
  range: [min, max] = [0, text.length],
  calculateWeight,
}: MatchesParams) {
  let match = regex.exec(text)
  const matches: number[] = []
  while (match) {
    const [start, end] = match.indices!.groups!.value!

    if (min < end && max >= start) {
      const value = parseInt(match[1], 10)
      const selfWeight = Number.isNaN(value) ? 0 : value
      matches.push(calculateWeight?.(match, selfWeight) ?? selfWeight)
    }

    match = regex.exec(text)
  }
  return matches
}

interface SolveParams {
  lines: string[]
  self: RegExp
  adjacent: RegExp

  calculateAdjacentWeights?(matches: number[]): number
}

function solve({
  lines,
  self,
  adjacent,
  calculateAdjacentWeights,
}: SolveParams) {
  return lines.reduce<number>((sum, line, i) => {
    const weights = matchAll({
      regex: self,
      text: line,
      calculateWeight(match, selfWeight) {
        // Find all adjacents in same line, and in the lines above and below
        const adjacents = [-1, 0, 1].flatMap((offset) =>
          matchAll({
            regex: adjacent,
            text: lines[i + offset] ?? "",
            // Only include matches in the same index range as the self match
            range: [match.index - 1, self.lastIndex],
          }),
        )

        if (adjacents.length) {
          const adjacentsWeight = calculateAdjacentWeights?.(adjacents) ?? 0
          return selfWeight + adjacentsWeight
        }

        return 0
      },
    })

    return sum + weights.reduce((acc, weight) => acc + weight, 0)
  }, 0)
}

const digits = /(?<value>\d+)/dg
const symbols = /(?<value>[^.\d])/dg
const gears = /(?<value>\*)/dg

export default {
  part1({ lines }) {
    return solve({
      lines,
      self: digits,
      adjacent: symbols,
    })
  },
  part2({ lines }) {
    return solve({
      lines,
      self: gears,
      adjacent: digits,
      calculateAdjacentWeights(matches) {
        return matches.length === 2
          ? matches.reduce((acc, match) => acc * match, 1)
          : 0
      },
    })
  },
} satisfies Day
