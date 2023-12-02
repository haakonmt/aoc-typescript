export class Paths {
  static input(year: number) {
    return `${process.cwd()}/input/${year}`
  }

  static src(year: number) {
    return `${process.cwd()}/src/${year}`
  }

  static day(year: number, day: number) {
    return {
      input: `${this.input(year)}/day${day}.txt`,
      src: `${this.src(year)}/day${day}.ts`,
      url: `https://adventofcode.com/${year}/day/${day}/input`,
    }
  }
}
