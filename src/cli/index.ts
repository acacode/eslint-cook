import {Command} from "commander";
import * as _ from "lodash"
import {CLIOption} from "./types";

const { version, name } = require('../../package.json')

export class CLI<T> {
  private command: Command;

  constructor(options: CLIOption[], private serializer: (raw: T) => Partial<T> = r => r) {
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

  private get rawOptions() {
    this.command.parse(process.argv);

    return this.command.opts<T>();
  }

  get options(): T {
    const rawOptions = this.rawOptions

    return {
      ...rawOptions,
      ...this.serializer(rawOptions),
    }
  }

  get help() {
    return this.command.helpInformation()
  }
}
