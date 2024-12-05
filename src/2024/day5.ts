import { takeWhile } from 'lodash'
import { arr } from '../utils.ts'

function solve(lines: string[], sumFn: (update: number[], isOrdered: boolean, rules: Map<number, number[]>) => number) {
  const rules = takeWhile(lines, (line) => /^\d+\|\d+$/.test(line)).map((it) => it.split('|').map(Number))
  const updates = lines.slice(rules.length).map((update) => update.split(',').map(Number))

  const sortedRules = new Map<number, number[]>()

  for (const [a, b] of rules) {
    if (!sortedRules.has(a))
      sortedRules.set(a, [])
    if (!sortedRules.has(b))
      sortedRules.set(b, [])

    sortedRules.get(a)!.push(b)
  }

  let sum = 0
  for (const update of updates) {
    let ordered = true
    for (const [a, b] of arr.windowed(update, 2)) {
      if (!sortedRules.get(a)?.includes(b)) {
        ordered = false
        break
      }
    }

    sum += sumFn(update, ordered, sortedRules)
  }

  return sum
}

export default {
  part1({ lines }) {
    return solve(lines, (update, isOrdered) => {
      if (isOrdered) {
        return update[Math.floor(update.length / 2)]
      }
      return 0
    })
  },
  part2({ lines }) {
    return solve(lines, (update, isOrdered, rules) => {
      if (!isOrdered) {
        const sorted = update.toSorted(
          (a, b) => rules.get(a)?.includes(b) ? -1 : 1,
        )

        return sorted[Math.floor(sorted.length / 2)]
      }

      return 0
    })
  },
} satisfies Day
