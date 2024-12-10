import type { Cell } from '../Grid.ts'
import { Grid } from '../Grid.ts'

export default {
  part1({ lines }) {
    const grid = Grid.create(lines, (_x, _y, char) => ({ num: Number(char) }))

    function calculatedReachedCells(cell: Cell<{ num: number }>, path: Cell<{ num: number }>[] = []) {
      const siblings = grid.getSiblings(cell)

      const nines = new Set<Cell<{ num: number }>>()

      for (const sibling of siblings) {
        if (sibling.num - cell.num === 1) {
          if (sibling.num === 9) {
            nines.add(sibling)
          } else {
            const subNines = calculatedReachedCells(sibling, [...path, cell])
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
        if (cell.num === 0) {
          const reachedCells = calculatedReachedCells(cell)
          totalPaths += reachedCells.size
        }
      }
    }

    return totalPaths
  },
  part2({ lines }) {
    const grid = Grid.create(lines, (_x, _y, char) => ({ num: Number(char) }))

    function calculatedReachedCells(cell: Cell<{ num: number }>) {
      const siblings = grid.getSiblings(cell)

      let score = 0

      for (const sibling of siblings) {
        if (sibling.num - cell.num === 1) {
          if (sibling.num === 9) {
            score += 1
          } else {
            score += calculatedReachedCells(sibling)
          }
        }
      }

      return score
    }

    let totalScore = 0
    for (const row of grid) {
      for (const cell of row) {
        if (cell.num === 0) {
          totalScore += calculatedReachedCells(cell)
        }
      }
    }

    return totalScore
  },
} satisfies Day
