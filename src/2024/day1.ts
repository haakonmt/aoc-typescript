import { unzip } from "lodash"

function merge(lines: string[]) {
  return unzip(lines.map((it) => it.split(/\s+/g).map(Number)))
}

export default {
  part1({ lines }) {
    const [lefts, rights] = merge(lines).map((it) => it.toSorted())

    return lefts.reduce((sum, left, index) => {
      const right = rights[index]
      return sum + Math.abs(right - left)
    }, 0)
  },
  part2({ lines }) {
    const [lefts, rights] = merge(lines)

    return lefts.reduce((sum, left) => {
      const count = rights.reduce(
        (acc, right) => (right === left ? acc + 1 : acc),
        0,
      )

      return sum + left * count
    }, 0)
  },
} satisfies Day
