import { arr } from '../utils.ts'

interface File {
  id: number
  size: number
  blocks: number[]
}

function prepare(lines: string[]) {
  const blocks: (number | undefined)[] = []
  const availableBlocks: number[] = []

  const input = lines[0].split('').map(Number)
  const files: File[] = []

  let currentIndex = 0
  for (let i = 0; i < input.length; i++) {
    const id = Math.floor(i / 2)
    let num = input[i]
    const file: File = { id, size: num, blocks: [] }
    while (num > 0) {
      if (i % 2 === 0) {
        blocks[currentIndex] = id
        file.blocks.push(currentIndex)
      } else {
        availableBlocks.push(currentIndex)
      }
      num--
      currentIndex++
    }

    if (i % 2 === 0) {
      files.push(file)
    }
  }

  return {
    files,
    blocks,
    availableBlocks,
  }
}

function checksum(values: Array<number | undefined>) {
  return values
    .reduce<number>((sum, curr, i) => sum + ((curr ?? 0) * i), 0)
}

export default {
  part1({ lines }) {
    const { blocks, availableBlocks } = prepare(lines)

    while (availableBlocks.length) {
      const index = availableBlocks.shift()!
      let block = blocks.pop()
      while (!block) {
        block = blocks.pop()
      }
      blocks[index] = block
    }

    // FIXME: This filter is only necessary due to a bug where one block is left at the end of the list :/
    return checksum(blocks.filter((it) => typeof it === 'number'))
  },
  part2({ lines }) {
    const { blocks, files } = prepare(lines)

    while (files.length) {
      const file = files.pop()!

      let index = arr.windowed(blocks, file.size).findIndex(
        (it) => it.every((value) => typeof value !== 'number'),
      )

      if (index === -1 || index >= file.blocks[0]) {
        continue
      }

      for (const i of file.blocks) {
        delete blocks[i]
      }

      while (file.size) {
        blocks[index] = file.id
        index++
        file.size--
      }
    }

    return checksum(blocks)
  },
} satisfies Day
