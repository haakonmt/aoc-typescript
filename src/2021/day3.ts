import { bits } from '../utils.ts'

export default {
  part1({ lines }) {
    const sums: number[] = []
    for (const line of lines) {
      const chars = line.split('')
      for (let i = 0; i < chars.length; i++) {
        const value = Number(chars[i])
        sums[i] ??= 0
        if (value === 0) {
          sums[i]--
        } else if (value === 1) {
          sums[i]++
        }
      }
    }

    let gammaRate = ''
    for (const sum of sums) {
      gammaRate += sum < 0 ? '0' : '1'
    }

    const gamma = Number.parseInt(gammaRate, 2)

    return gamma * bits.flip(gamma)
  },
  part2({ lines }) {
    return lines.length
  },
} satisfies Day
