import {CLIOption} from "./types";
import {POSSIBLE_MODULE_DEFS} from "../constants";


export const CLI_OPTIONS: CLIOption[] = [
  {
    declaration: '-m, --modules [names...]',
    description: `eslint module names.\r\npossible values: ${POSSIBLE_MODULE_DEFS.join(', ')}`,
    required: true,
  },
  {
    declaration: '-r, --rewrite',
    description: 'rewrite existing eslint config file',
    defaultValue: false,
  },
  {
    declaration: '-o, --output <string>',
    description: 'output path',
    defaultValue: './.eslintrc',
  }
]
