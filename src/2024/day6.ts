import { grid, type Grid } from '../utils.ts'

interface Cell {
  x: number
  y: number
  char: string
}

function getStartingPosition(grid: Grid<Cell>) {
  for (const row of grid) {
    for (const cell of row) {
      if (['^', 'v', '<', '>'].includes(cell.char)) {
        return cell
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

    let pos = getStartingPosition(rows)

    let dir: 'up' | 'down' | 'left' | 'right'
    switch (pos.char) {
      case '^':
        dir = 'up'
        break
      case 'v':
        dir = 'down'
        break
      case '<':
        dir = 'left'
        break
      case '>':
        dir = 'right'
        break
      default:
        throw new Error('Invalid starting position')
    }

    function turnRight() {
      switch (dir) {
        case 'up':
          dir = 'right'
          break
        case 'down':
          dir = 'left'
          break
        case 'left':
          dir = 'up'
          break
        case 'right':
          dir = 'down'
          break
      }
    }

    function move() {
      let next: Cell
      switch (dir) {
        case 'up': {
          next = rows[pos.y - 1]?.[pos.x]
          break
        }
        case 'down': {
          next = rows[pos.y + 1]?.[pos.x]
          break
        }
        case 'left': {
          next = rows[pos.y]?.[pos.x - 1]
          break
        }
        case 'right': {
          next = rows[pos.y]?.[pos.x + 1]
          break
        }
      }

      if (next?.char === '#') {
        turnRight()
        return move()
      }

      pos = next
    }

    const visited = new Set<Cell>()

    while (pos) {
      visited.add(pos)
      move()
    }

    return visited.size
  },
  part2({ lines }) {
    return lines.length
  },
} satisfies Day
