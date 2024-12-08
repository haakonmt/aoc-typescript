import { Grid } from '../Grid.ts'

function prepare(lines: string[]) {
  const antennas = new Map<string, Array<Cell>>()

  const grid = Grid.create(lines, (x, y, char) => {
    if (char === '.') {
      return {}
    }

    if (!antennas.has(char)) {
      antennas.set(char, [])
    }

    antennas.get(char)!.push({ x, y })
    return {}
  })

  const antinodes = new Set<string>()

  return {
    antennas,
    grid,
    antinodeCount: () => antinodes.size,
    addAntinode: (antinode: Cell) => antinodes.add(JSON.stringify(antinode)),
  }
}

export default {
  part1({ lines }) {
    const { antennas, grid, addAntinode, antinodeCount } = prepare(lines)

    for (const antennaType of antennas.values()) {
      for (const antennaA of antennaType) {
        for (const antennaB of antennaType) {
          if (antennaA === antennaB) {
            continue
          }

          const xDiff = antennaB.x - antennaA.x
          const yDiff = antennaB.y - antennaA.y
          const antinode = {
            x: antennaA.x - xDiff,
            y: antennaA.y - yDiff,
          }
          if (grid.contains(antinode)) {
            addAntinode(antinode)
          }
        }
      }
    }

    return antinodeCount()
  },
  part2({ lines }) {
    const { antennas, grid, addAntinode, antinodeCount } = prepare(lines)

    for (const antennaType of antennas.values()) {
      for (const antennaA of antennaType) {
        for (const antennaB of antennaType) {
          if (antennaA === antennaB) {
            continue
          }

          addAntinode(antennaA)

          const xDiff = antennaB.x - antennaA.x
          const yDiff = antennaB.y - antennaA.y
          const antinode = {
            x: antennaA.x - xDiff,
            y: antennaA.y - yDiff,
          }

          while (grid.contains(antinode)) {
            addAntinode(antinode)
            antinode.x -= xDiff
            antinode.y -= yDiff
          }
        }
      }
    }

    return antinodeCount()
  },
} satisfies Day
