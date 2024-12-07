import { arr, grid, type Grid } from '../utils.ts'

interface Cell {
  x: number
  y: number
  char: string
}

const dirs = {
  '^': { dx: 0, dy: -1, right: '>' },
  'v': { dx: 0, dy: 1, right: '<' },
  '<': { dx: -1, dy: 0, right: '^' },
  '>': { dx: 1, dy: 0, right: 'v' },
} as const

function getStartingPosition(grid: Grid<Cell>) {
  for (const row of grid) {
    for (const cell of row) {
      const dir = dirs[cell.char as keyof typeof dirs]
      if (dir) {
        return { pos: cell, dir }
      }
    }
  }

  throw new Error('Starting position not found')
}

export default {
  part1({ lines }) {
    const rows = grid.create<Cell>(lines, (x, y, char) => ({
      x,
      y,
      char,
    }))

    return run(rows)
  },
  part2({ lines }) {
    const rows = grid.create<Cell>(lines, (x, y, char) => ({
      x,
      y,
      char,
    }))

    return arr.sumBy(
      rows.flat().filter((cell) => cell.char !== '#' && !(cell.char in dirs)),
      (cell) => {
        try {
          run(rows, cell)
          return 0
        } catch {
          return 1
        }
      },
    )
  },
} satisfies Day

function run(grid: Grid<Cell>, obstacle?: Cell) {
  let { pos, dir } = getStartingPosition(grid)

  function move() {
    const next = grid[pos.y + dir.dy]?.[pos.x + dir.dx]

    if (next?.char === '#' || (!!obstacle && next === obstacle)) {
      dir = dirs[dir.right]
      return move()
    }

    return next
  }

  const visited = new Set<Cell>()
  const dirMap = new Map<Cell, Array<typeof dir>>()

  while (pos) {
    const visitedDirs = dirMap.get(pos) ?? []
    if (visitedDirs.includes(dir)) {
      throw new Error('Loop detected')
    }
    dirMap.set(pos, [...visitedDirs, dir])
    visited.add(pos)
    pos = move()
  }

  return visited.size
}
