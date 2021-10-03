import {Command} from "commander";
import * as _ from "lodash"
import {CLIOption} from "./types";
import { version, name } from "../../package.json"

export class CLI<T> {
  private command: Command;

  constructor(options: CLIOption[]) {
    this.command = _.reduce(options, (command, option) => {
      return command[option.required ? 'requiredOption' : 'option'](
        option.declaration,
        option.description,
        option.defaultValue
      )
    }, new Command(name))

    this.command
      .version(version, "-v, --version", "output the current version")
      .description("Generate eslint configuration file")
  }

  get options() {
    this.command.parse(process.argv);

    return this.command.opts<T>()
  }

  get help() {
    return this.command.helpInformation()
  }
}
