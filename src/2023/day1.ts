const digits: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

function solve(lines: string[], regex: RegExp) {
  return lines.reduce((acc, line) => {
    const matches = [...line.matchAll(regex)]

    const [first, last] = [0, -1].map((idx) => {
      const match = matches.at(idx)?.[1] ?? ""
      return digits[match] || match
    })

    return acc + parseInt(first + last, 10)
  }, 0)
}

export default {
  part1({ lines }) {
    return solve(lines, /(?=(\d))/g)
  },
  part2({ lines }) {
    return solve(
      lines,
      new RegExp(`(?=(\\d|${Object.keys(digits).join("|")}))`, "g"),
    )
  },
} satisfies Day
