import { z } from 'zod'

const directionSchema = z.enum(['forward', 'down', 'up'])

const linesSchema = z.array(z.string())
  .transform((it) => it.map((s) => s.split(' ')))
  .pipe(
    z.array(
      z.tuple([directionSchema, z.number()]),
    ),
  )

type Direction = z.output<typeof directionSchema>

interface Coordinates { x: number, y: number, aim: number }

type Actions = Record<Direction, (coordinates: Coordinates, value: number) => Coordinates>

const part1Actions: Actions = {
  forward: ({ x, y, aim }: Coordinates, value) => ({ x: x + value, y, aim }),
  down: ({ x, y, aim }, value) => ({ x, y: y + value, aim }),
  up: ({ x, y, aim }, value) => ({ x, y: y - value, aim }),
}

const part2actions: Actions = {
  forward: ({ x, y, aim }: Coordinates, value) => ({ x: x + value, y: y + (aim * value), aim }),
  down: ({ x, y, aim }, value) => ({ x, y, aim: aim + value }),
  up: ({ x, y, aim }, value) => ({ x, y, aim: aim - value }),
}

function solve(lines: string[], actions: Actions) {
  const { x, y } = linesSchema
    .parse(lines)
    .reduce((coordinates, [dir, value]) => actions[dir](coordinates, value), {
      x: 0,
      y: 0,
      aim: 0,
    })

  return x * y
}

export default {
  part1({ lines }) {
    return solve(lines, part1Actions)
  },
  part2({ lines }) {
    return solve(lines, part2actions)
  },
} satisfies Day
