# aoc-2023

Install dependencies:

```bash
bun install
```

## CLI

Create scaffolding for a day. If the day argument is not provided, today will be used as default. If the `SESSION_TOKEN` environment variable is set to your AoC session token, the CLI will attempt to retrieve your input data as well.
```bash
bun aoc create [--day <day>]
```

Run solution for a day. If the day argument is not provided, all solved days will be run.
```bash
bun aoc run [--day <day>]
```
