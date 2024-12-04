import { algorithms, grid } from '../utils.ts'

export default {
  part1({ lines }) {
    return algorithms.countWordOccurrences(grid.create(lines), 'XMAS')
  },
  part2({ lines }) {
    return algorithms.countXPatterns(grid.create(lines), ['M', 'A', 'S'])
  },
} satisfies Day
