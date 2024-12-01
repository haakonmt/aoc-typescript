import { num } from '../utils.ts'

const lineRegex = /^(?<name>\w+) = \((?<L>\w+), (?<R>\w+)\)$/

function createNodes([instructions, ...lines]: string[]) {
  const nodes: Record<string, { name: string, L: string, R: string }> = {}

  for (const line of lines) {
    const { name, L, R } = lineRegex.exec(line)?.groups ?? {}
    nodes[name] = { L, R, name }
  }

  function next(state: State): State {
    const i = state.steps % instructions.length
    const steps = state.steps + 1

    const dir = instructions[i] as 'L' | 'R'
    const node = nodes[state.node][dir]

    return {
      node,
      i,
      steps,
    }
  }

  return { nodes, next }
}

interface State {
  node: string
  i: number
  steps: number
}

export default {
  part1({ lines }) {
    const { next } = createNodes(lines)

    let state: State = { node: 'AAA', i: 0, steps: 0 }

    while (state.node !== 'ZZZ') {
      state = next(state)
    }

    return state.steps
  },
  part2({ lines }) {
    const { nodes, next } = createNodes(lines)

    const starts = Object.keys(nodes).filter((it) => it.endsWith('A'))

    let lcms = [1]
    for (const node of starts) {
      const cache: Record<string, Set<number>> = {}

      let state: State = { node, i: 0, steps: 0 }
      const ends: number[] = []
      while (!cache[state.node]?.has(state.i)) {
        cache[state.node] ??= new Set()
        cache[state.node].add(state.i)

        state = next(state)

        if (state.node.endsWith('Z')) {
          ends.push(state.steps)
        }
      }

      const oldLcms = [...lcms]
      lcms = ends.flatMap((it) => oldLcms.map((lcm) => num.lcm(lcm, it)))
    }

    return Math.min(...lcms)
  },
} satisfies Day
