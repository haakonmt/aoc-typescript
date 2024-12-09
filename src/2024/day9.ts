export default {
  part1({ lines }) {
    const values: number[] = []
    const availableIndices: number[] = []

    const nums = lines[0].split('').map(Number)

    let currentIndex = 0
    for (let i = 0; i < nums.length; i++) {
      const id = Math.floor(i / 2)
      let num = nums[i]
      while (num > 0) {
        if (i % 2 === 0) {
          values[currentIndex] = id
        } else {
          availableIndices.push(currentIndex)
        }
        num--
        currentIndex++
      }
    }

    while (availableIndices.length) {
      const index = availableIndices.shift()!
      let value = values.pop()
      while (!value) {
        value = values.pop()
      }
      values[index] = value
    }

    return values
      .filter((it) => it !== undefined)
      .reduce((sum, curr, i) => sum + curr * i, 0)
  },
  part2({ lines }) {
    return lines.length
  },
} satisfies Day
