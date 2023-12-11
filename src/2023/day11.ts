import { arr, grid, num } from "../utils.ts"

function parseInput(lines: string[]) {
  const cells: Cell[] = []
  const columns: number[] = []
  const rows: number[] = []

  for (let y = 0; y < lines.length; y += 1) {
    const line = lines[y]
    if (/^\.+$/.test(line)) {
      rows.push(y)
    }

    for (let x = 0; x < line.length; x += 1) {
      if (line[x] === "#") {
        cells.push({ x, y })
        columns[x] = 0
      } else {
        columns[x] ??= x
      }
    }
  }

  return {
    cells,
    rows,
    columns: columns.filter(Boolean),
  }
}

function solve(lines: string[], factor: number) {
  const { cells, rows, columns } = parseInput(lines)

  const distances = cells.flatMap((cell, i, self) =>
    self.slice(i).map((other) => {
      const d = grid.manhattanDistance(cell, other)

      const emptyRows = rows.filter(num.inRange(other.y, cell.y))
      const emptyColumns = columns.filter(num.inRange(cell.x, other.x))

      return d + (factor - 1) * (emptyRows.length + emptyColumns.length)
    }),
  )

  return arr.sum(distances)
}

export default {
  part1({ lines }) {
    return solve(lines, 2)
  },
  part2({ lines }) {
    return solve(lines, 1_000_000)
  },
} satisfies Day
