import process from 'node:process'

export class Paths {
  static input(year: number) {
    return `${process.cwd()}/input/${year}`
  }

  static src(year: number) {
    return `${process.cwd()}/src/${year}`
  }

  static day(year: number, day: number) {
    return {
      input: `${this.input(year)}/day${day}-input.txt`,
      src: `${this.src(year)}/day${day}.ts`,
      example: `${this.input(year)}/day${day}-example.txt`,
      urls: {
        task: `https://adventofcode.com/${year}/day/${day}`,
        input: `https://adventofcode.com/${year}/day/${day}/input`,
      },
    }
  }
}
