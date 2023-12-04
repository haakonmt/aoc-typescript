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
  product(a: (string | number)[]) {
    return a.reduce<number>((acc, curr) => acc * Number(curr), 1)
  },
}
