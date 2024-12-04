export async function time<T>(fn: () => T | Promise<T>) {
  const start = performance.now()
  const result = await fn()
  return {
    result,
    ms: performance.now() - start,
  }
}

export const arr = {
  intersect(a: string[], b: string[]) {
    return a.filter(Set.prototype.has, new Set(b))
  },
  sum(a: (string | number)[]) {
    return a.reduce<number>((acc, curr) => acc + Number(curr), 0)
  },
  sumBy<T>(a: T[], fn: (it: T) => number) {
    return a.reduce<number>((acc, curr) => acc + fn(curr), 0)
  },
  product(a: (string | number)[]) {
    return a.reduce<number>((acc, curr) => acc * Number(curr), 1)
  },
  chunk<T>(a: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(a.length / size) }, (_, i) =>
      a.slice(i * size, i * size + size))
  },
  windowed<T>(a: T[], size: number): T[][] {
    return Array.from({ length: a.length - size + 1 }, (_, i) =>
      a.slice(i, i + size))
  },
  withoutItemAtIndex<T>(a: T[], index: number): T[] {
    return a.filter((_, i) => i !== index)
  },
}

export const num = {
  gcd(a: number, b: number): number {
    if (b === 0) {
      return a
    }
    return num.gcd(b, a % b)
  },
  lcm(a: number, b: number): number {
    return (a * b) / num.gcd(a, b)
  },
  inRange(a: number, b: number) {
    return (n: number) => n > Math.min(a, b) && n < Math.max(a, b)
  },
}

type Grid = string[][]

export const grid = {
  create(lines: string[]): Grid {
    return lines.map((line) => line.split(''))
  },
  manhattanDistance(a: Cell, b: Cell) {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
  },
}

export const bits = {
  flip(v: number) {
    return ~v & (2 ** v.toString(2).length - 1)
  },
}

type Direction = [number, number] // Represent directions as [dx, dy]

const DIRECTIONS = [
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
  [-1, 0], // Up
  [1, 1], // Diagonal down-right
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
  [-1, -1], // Diagonal up-left
] as const satisfies Direction[]

export const algorithms = {
  countWordOccurrences(grid: Grid, word: string): number {
    const rows = grid.length
    const cols = grid[0].length
    let count = 0

    function dfs(x: number, y: number, index: number, direction: Direction): boolean {
      if (index === word.length)
        return true
      const [dx, dy] = direction
      const newX = x + dx
      const newY = y + dy

      if (
        newX < 0 || newY < 0 || newX >= rows || newY >= cols || grid[newX][newY] !== word[index]
      ) {
        return false
      }

      return dfs(newX, newY, index + 1, direction)
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x] === word[0]) {
          for (const direction of DIRECTIONS) {
            if (dfs(y, x, 1, direction)) {
              count++
            }
          }
        }
      }
    }

    return count
  },
  countXPatterns(grid: Grid, chars: [start: string, center: string, end: string]) {
    const [start, center, end] = chars

    function isXPattern(y: number, x: number): boolean {
      const tlbr = grid[y - 1]?.[x - 1] === start && grid[y + 1]?.[x + 1] === end
      const trbl = grid[y - 1]?.[x + 1] === start && grid[y + 1]?.[x - 1] === end
      const brtl = grid[y + 1]?.[x + 1] === start && grid[y - 1]?.[x - 1] === end
      const bltr = grid[y + 1]?.[x - 1] === start && grid[y - 1]?.[x + 1] === end

      return [tlbr, trbl, brtl, bltr].filter(Boolean).length === 2
    }

    let count = 0

    for (let y = 1; y < grid.length - 1; y++) {
      for (let x = 1; x < grid[y].length - 1; x++) {
        if (grid[y][x] === center && isXPattern(y, x)) {
          count++
        }
      }
    }

    return count
  },
}
