import { arr } from '../utils.ts'

export default {
  part1({ lines }) {
    return lines
      .map(Number)
      .reduce(
        ({ prev, sum }, curr) => ({
          prev: curr,
          sum: prev < curr ? sum + 1 : sum,
        }),
        {
          prev: Number.MAX_SAFE_INTEGER,
          sum: 0,
        },
      )
      .sum
  },
  part2({ lines }) {
    const windowed = arr.windowed(
      lines.map(Number),
      3,
    )

    return windowed.reduce(
      ({ prev, sum }, curr) => {
        const currSum = arr.sum(curr)
        return {
          prev: currSum,
          sum: prev < currSum ? sum + 1 : sum,
        }
      },
      {
        prev: Number.MAX_SAFE_INTEGER,
        sum: 0,
      },
    ).sum
  },
} satisfies Day
