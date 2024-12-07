import { arr, math, type Operator } from '../utils.ts'

export default {
  part1({ lines }) {
    return solve(lines, ['+', '*'])
  },
  part2({ lines }) {
    return solve(lines, ['+', '*', '||'])
  },
} satisfies Day

interface Equation {
  result: number
  operands: number[]
}

function solve(lines: string[], validOperators: Operator[]) {
  const equations = lines.map<Equation>((line) => {
    const match = line.match(/^(?<result>\d+): (?<operands>[\d ]+)$/)
    return {
      result: Number(match?.groups?.result),
      operands: match?.groups?.operands.split(' ').map(Number) ?? [],
    }
  })

  return arr.sumBy(
    equations,
    (equation) => hasSolution(equation, validOperators) ? equation.result : 0,
  )
}

function hasSolution(
  equation: Equation,
  operators: Operator[],
) {
  function backtrack(currentValue: number, index: number): boolean {
    if (index === equation.operands.length) {
      return currentValue === equation.result
    }

    for (const op of operators) {
      const nextValue = math.calc(currentValue, equation.operands[index], op)
      if (nextValue !== null) {
        if (backtrack(nextValue, index + 1)) {
          return true
        }
      }
    }

    return false
  }

  return backtrack(equation.operands[0], 1)
}
