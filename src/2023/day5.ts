import { arr } from '../utils.ts'

interface Range {
  src: number
  dest: number
  length: number
}

function parseInput([seedLine, ...lines]: string[]) {
  const [, seeds] = seedLine
    .split(':')
    .map((it) => it.trim().split(/\s+/).map(Number))

  const ranges: Range[][] = []
  for (const line of lines) {
    if (line.includes('map')) {
      ranges.push([])
    } else if (line.trim()) {
      const [destRangeStart, srcRangeStart, rangeLength] = line
        .split(/\s+/)
        .map(Number)

      ranges.at(-1)!.push({
        src: srcRangeStart,
        dest: destRangeStart,
        length: rangeLength,
      })
    }
  }
  return { ranges, seeds }
}

function findLocation(seed: number, chainedRanges: Range[][]) {
  return chainedRanges.reduce((value, ranges) => {
    const range = ranges.find(
      (it) => it.src <= value && value < it.src + it.length,
    )

    return range ? range.dest + (value - range.src) : value
  }, seed)
}

export default {
  part1({ lines }) {
    const { seeds, ranges } = parseInput(lines)

    let min = Infinity
    for (const seed of seeds) {
      const location = findLocation(seed, ranges)

      min = Math.min(min, location)
    }
    return min
  },
  part2({ lines }) {
    const { seeds, ranges } = parseInput(lines)

    const chunks = arr.chunk(seeds, 2)
    let min = Infinity
    for (const [seed1, seed2] of chunks) {
      for (let seed = seed1; seed < seed1 + seed2; seed += 1) {
        const location = findLocation(seed, ranges)

        min = Math.min(min, location)
      }
    }
    return min
  },
} satisfies Day
