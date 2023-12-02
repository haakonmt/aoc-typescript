const limits: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
}

const regex = /(\d+) (green|blue|red)/g

function isInsideLimit([, value, color]: RegExpMatchArray) {
  return parseInt(value, 10) <= limits[color]
}

export default {
  part1({ lines }) {
    return lines.reduce((acc, line, idx) => {
      const matches = [...line.matchAll(regex)]

      return matches.every(isInsideLimit) ? acc + idx + 1 : acc
    }, 0)
  },
  part2({ lines }) {
    return lines.reduce((sum, line) => {
      const matches = [...line.matchAll(regex)]

      const maximums = matches.reduce<Record<string, number>>(
        (acc, [, value, color]) => {
          const max = acc[color]
          const numVal = parseInt(value, 10)
          return {
            ...acc,
            [color]: numVal > max ? numVal : max,
          }
        },
        {
          red: 0,
          green: 0,
          blue: 0,
        },
      )

      return (
        sum + Object.values(maximums).reduce((acc, value) => acc * value, 1)
      )
    }, 0)
  },
} satisfies Day
