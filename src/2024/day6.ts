import { grid, type Grid } from '../utils.ts'

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

    let { pos, dir } = getStartingPosition(rows)

    function move() {
      const next = rows[pos.y + dir.dy]?.[pos.x + dir.dx]

      if (next?.char === '#') {
        dir = dirs[dir.right]
        return move()
      }

      return next
    }

    const visited = new Set<Cell>()

    while (pos) {
      visited.add(pos)
      pos = move()
    }

    return visited.size
  },
  part2({ lines }) {
    return lines.length
  },
} satisfies Day
