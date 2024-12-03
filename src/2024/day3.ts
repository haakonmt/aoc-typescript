export default {
  part1({ lines }) {
    let sum = 0
    for (const line of lines) {
      const matches = line.matchAll(/mul\((\d+),(\d+)\)/g)
      for (const match of matches) {
        const [, a, b] = match
        sum += Number(a) * Number(b)
      }
    }

    return sum
  },
  part2({ lines }) {
    let sum = 0
    let enabled = true
    for (const line of lines) {
      const matches = line.matchAll(/(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g)
      for (const match of matches) {
        const [, command, a, b] = match
        if (command === 'do()') {
          enabled = true
        } else if (command === 'don\'t()') {
          enabled = false
        } else if (enabled) {
          sum += Number(a) * Number(b)
        }
      }
    }

    return sum
  },
} satisfies Day
