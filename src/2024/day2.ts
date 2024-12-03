import { arr } from '../utils.ts'

function isSafe(line: number[]) {
  let direction: 'inc' | 'dec' | undefined
  for (const [a, b] of arr.windowed(line, 2)) {
    if (a < b) {
      if (!direction) {
        direction = 'inc'
      } else if (direction === 'dec') {
        return false
      }
    } else if (a > b) {
      if (!direction) {
        direction = 'dec'
      } else if (direction === 'inc') {
        return false
      }
    } else if (a === b) {
      return false
    }

    if (Math.abs(b - a) > 3) {
      return false
    }
  }
  return true
}

export default {
  part1({ lines }) {
    let safe = 0
    for (const line of lines) {
      const report = line.split(' ').map(Number)
      if (isSafe(report)) {
        safe++
      }
    }

    return safe
  },
  part2({ lines }) {
    let safe = 0
    for (const line of lines) {
      const report = line.split(' ').map(Number)
      if (isSafe(report)) {
        safe++
      } else {
        for (let i = 0; i < report.length; i++) {
          const spliced = arr.withoutItemAtIndex(report, i)
          if (isSafe(spliced)) {
            safe++
            break
          }
        }
      }
    }

    return safe
  },
} satisfies Day
