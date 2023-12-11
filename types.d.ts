type Input = { raw: string; lines: string[] }
type Part<T, ParsedInput> = (input: ParsedInput) => T | Promise<T>

/*
type Day<ParsedInput = Input, T1 = number, T2 = T1> =
  | {
      prepare(input: Input): ParsedInput
      part1: Part<T1, ParsedInput>
      part2: Part<T2, ParsedInput>
    }
  | {
      part1: ParsedInput extends Input ? Part<T1, ParsedInput> : never
      part2: ParsedInput extends Input ? Part<T2, ParsedInput> : never
    }
 */

type Day<ParsedInput = Input, T1 = number, T2 = T1> = ParsedInput extends Input
  ? {
      part1: Part<T1, Input>
      part2: Part<T2, Input>
    }
  : {
      prepare(input: Input): ParsedInput
      part1: Part<T1, ParsedInput>
      part2: Part<T2, ParsedInput>
    }

type Cell = { x: number; y: number }
