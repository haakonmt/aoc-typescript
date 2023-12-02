import { Command } from "commander"
import { CREATE } from "./commands/create.ts"
import { RUN } from "./commands/run.ts"

export const cli = new Command("aoc").addCommand(CREATE).addCommand(RUN)
