function solve(time: number[], distance: number[]) {
  let totalRecordCount = 1
  for (let i = 0; i < time.length; i += 1) {
    const t = time[i]
    const d = distance[i]

    let recordCount = 0
    let speed = 1
    while (speed < t) {
      const timeToTravel = t - speed
      const distanceTravelled = speed * timeToTravel

      if (distanceTravelled > d) {
        recordCount += 1
      }

      speed += 1
    }

    if (recordCount) {
      totalRecordCount *= recordCount
    }
  }

  return totalRecordCount
}

export default {
  part1({ lines }) {
    const [time, distance] = lines.map((it) =>
      it
        .split(':')
        .slice(1)
        .flatMap((s) => s.split(/\s+/).map(Number)),
    )

    return solve(time, distance)
  },
  part2({ lines }) {
    const [time, distance] = lines.map((it) =>
      it
        .split(':')
        .slice(1)
        .map((s) => Number(s.replaceAll(/\s+/g, ''))),
    )

    return solve(time, distance)
  },
} satisfies Day
