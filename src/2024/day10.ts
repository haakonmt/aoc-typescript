import type { Cell } from '../Grid.ts'
import { Grid } from '../Grid.ts'

interface Structure {
  add: (cell: Cell) => void
  get size(): number
  [Symbol.iterator]: () => Iterator<Cell>
}

function solve(lines: string[], create: () => Structure) {
  const grid = Grid.create(lines)

  function calculatedReachedCells(cell: Cell) {
    const siblings = grid.getSiblings(cell)

    const nines = create()

    for (const sibling of siblings) {
      if (Number(sibling.char) - Number(cell.char) === 1) {
        if (sibling.char === '9') {
          nines.add(sibling)
        } else {
          const subNines = calculatedReachedCells(sibling)
          for (const subNine of subNines) {
            nines.add(subNine)
          }
        }
      }
    }

    return nines
  }

  let totalPaths = 0
  for (const row of grid) {
    for (const cell of row) {
      if (cell.char === '0') {
        const reachedCells = calculatedReachedCells(cell)
        totalPaths += reachedCells.size
      }
    }
  }

  return totalPaths
}

export default {
  part1({ lines }) {
    return solve(lines, () => new Set())
  },
  part2({ lines }) {
    return solve(lines, () => {
      const data: Cell[] = []
      return {
        add: (cell) => data.push(cell),
        get size() {
          return data.length
        },
        [Symbol.iterator]: () => data[Symbol.iterator](),
      }
    })
  },
} satisfies Day
