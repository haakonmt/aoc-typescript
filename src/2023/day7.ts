const ORDERED_TYPES = [
  'high-card',
  'one-pair',
  'two-pairs',
  'three-of-a-kind',
  'full-house',
  'four-of-a-kind',
  'five-of-a-kind',
] as const

type CardType = (typeof ORDERED_TYPES)[number]

interface SolveParams {
  lines: string[]
  jWeight: number
  getType: (cardCounts: Record<string, number>) => CardType
}

function solve({ lines, jWeight, getType }: SolveParams) {
  const faceCardValues: Record<string, number> = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    J: jWeight,
  }

  const hands = lines.map((line) => {
    const [hand, bid] = line.split(' ')
    const counts: Record<string, number> = {}
    const order: number[] = []

    for (const card of hand) {
      counts[card] ??= 0
      counts[card] += 1
      order.push(faceCardValues[card] ?? Number(card))
    }

    return {
      order,
      bid: Number(bid),
      type: getType(counts),
    }
  })

  return hands
    .toSorted((a, b) => {
      if (a.type === b.type) {
        for (let i = 0; i < a.order.length; i += 1) {
          const diff = a.order[i] - b.order[i]
          if (diff !== 0) {
            return diff
          }
        }
      }

      return ORDERED_TYPES.indexOf(a.type) - ORDERED_TYPES.indexOf(b.type)
    })
    .reduce((acc, hand, idx) => acc + (idx + 1) * hand.bid, 0)
}

export default {
  part1({ lines }) {
    return solve({
      lines,
      jWeight: 11,
      getType(cardCounts) {
        const values = Object.values(cardCounts)
        switch (values.length) {
          case 1:
            return 'five-of-a-kind'
          case 2:
            return values.includes(4) ? 'four-of-a-kind' : 'full-house'
          case 3:
            return values.includes(3) ? 'three-of-a-kind' : 'two-pairs'
          case 4:
            return 'one-pair'
          default:
            return 'high-card'
        }
      },
    })
  },
  part2({ lines }) {
    return solve({
      lines,
      jWeight: 1,
      getType({ J: jokerCount = 0, ...cards }) {
        const values = Object.values(cards)

        if (values.length <= 1) {
          return 'five-of-a-kind'
        }

        if (values.some((it) => it + jokerCount === 4)) {
          return 'four-of-a-kind'
        }

        if (values.some((it) => it + jokerCount === 3)) {
          return values.length === 2 ? 'full-house' : 'three-of-a-kind'
        }

        if (values.length < 4) {
          return 'two-pairs'
        }

        if (values.length === 4) {
          return 'one-pair'
        }

        return 'high-card'
      },
    })
  },
} satisfies Day
