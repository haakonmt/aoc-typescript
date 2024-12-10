// eslint-disable-next-line ts/no-empty-object-type
export type Cell<T extends Record<string, unknown> = {}> = {
  x: number
  y: number
  char: string
} & T

export class Grid<T extends Record<string, unknown>> extends Array<Array<Cell<T>>> {
  constructor(lines: string[], fill?: (x: number, y: number, char: string) => T) {
    super(lines.length)

    for (let y = 0; y < lines.length; y++) {
      const row = lines[y]
      this[y] = Array.from({ length: row.length }, (_, x) => ({ x, y, char: row[x], ...(fill?.(x, y, row[x]) as T) }))
    }
  }

  // eslint-disable-next-line ts/no-empty-object-type
  static create<T extends Record<string, unknown> = {}>(lines: string[], fill?: (x: number, y: number, char: string) => T): Grid<T> {
    return new Grid(lines, fill)
  }

  print(toString: (cell: Cell<T>) => string = String) {
    // eslint-disable-next-line no-console
    console.log(this.map((row) => row.map(toString).join('')).join('\n'))
  }

  contains(cell: Pick<Cell<any>, 'x' | 'y'>) {
    return !!this[cell.y]?.[cell.x]
  }

  getSiblings(cell: Cell<T>, diagonal = false) {
    const { x, y } = cell
    const siblings = [
      this[y]?.[x - 1],
      this[y]?.[x + 1],
      this[y - 1]?.[x],
      this[y + 1]?.[x],
    ]
    return (diagonal
      ? siblings.concat([
        this[y - 1]?.[x - 1],
        this[y - 1]?.[x + 1],
        this[y + 1]?.[x - 1],
        this[y + 1]?.[x + 1],
      ])
      : siblings).filter(Boolean)
  }
}
