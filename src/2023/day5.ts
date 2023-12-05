type Range = {
  src: number
  dest: number
  length: number
}

function solve(
  [seedLine, ...lines]: string[],
  getSeeds: (seedValues: number[]) => number[] = (it) => it,
) {
  const [, seedValues] = seedLine
    .split(":")
    .map((it) => it.trim().split(/\s+/).map(Number))

  const seeds = getSeeds(seedValues)

  const chainedRanges: Range[][] = []
  for (const line of lines) {
    if (line.includes("map")) {
      chainedRanges.push([])
    } else if (line.trim()) {
      const [destRangeStart, srcRangeStart, rangeLength] = line
        .split(/\s+/)
        .map(Number)

      chainedRanges.at(-1)!.push({
        src: srcRangeStart,
        dest: destRangeStart,
        length: rangeLength,
      })
    }
  }

  return seeds.reduce((currentMin, seed) => {
    const location = chainedRanges.reduce((value, ranges) => {
      const range = ranges.find(
        (it) => it.src <= value && value <= it.src + it.length,
      )

      return range ? range.dest + (value - range.src) : value
    }, seed)

    return Math.min(currentMin, location)
  }, Infinity)
}

export default {
  part1({ lines }) {
    return solve(lines)
  },
  part2({ lines }) {
    return solve(lines, (seeds) => {
      // TODO: Somehow make proper ranges out of the seeds
      return seeds
    })
  },
} satisfies Day
