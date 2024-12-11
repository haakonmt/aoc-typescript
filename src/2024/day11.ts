function parse(lines: string[]) {
  return lines[0].split(/\s/).map(Number)
}

function blink(input: number[], iterations: number) {
  let frequency = new Map<number, number>()

  for (const num of input) {
    frequency.set(num, (frequency.get(num) || 0) + 1)
  }

  function splitNumber(num: number): [number, number] {
    const length = Math.floor(Math.log10(Math.abs(num))) + 1
    const divisor = 10 ** (length / 2)
    const left = Math.floor(num / divisor)
    const right = num % divisor
    return [left, right]
  }

  for (let i = 0; i < iterations; i++) {
    const newFrequency = new Map<number, number>()

    for (const [num, count] of frequency.entries()) {
      if (num === 0) {
        newFrequency.set(1, (newFrequency.get(1) || 0) + count)
      } else {
        const length = Math.floor(Math.log10(Math.abs(num))) + 1
        if (length % 2 === 0) {
          const [left, right] = splitNumber(num)
          newFrequency.set(left, (newFrequency.get(left) || 0) + count)
          newFrequency.set(right, (newFrequency.get(right) || 0) + count)
        } else {
          const transformed = num * 2024
          newFrequency.set(transformed, (newFrequency.get(transformed) || 0) + count)
        }
      }
    }

    frequency = newFrequency
  }

  let totalLength = 0
  for (const count of frequency.values()) {
    totalLength += count
  }

  return totalLength
}

export default {
  part1({ lines }) {
    const input = parse(lines)
    return blink(input, 25)
  },
  part2({ lines }) {
    const input = parse(lines)
    return blink(input, 75)
  },
} satisfies Day
