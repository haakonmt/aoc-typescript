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
      a.slice(i * size, i * size + size),
    )
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
}
