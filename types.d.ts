type Part<T> = (input: { raw: string; lines: string[] }) => T | Promise<T>

type Day<T1 = number, T2 = T1> = {
  part1: Part<T1>
  part2: Part<T2>
}
