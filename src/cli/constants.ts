import {CLIOption} from "./types";


export const CLI_OPTIONS: CLIOption[] = [
  {
    declaration: '-m, --modules [names...]',
    description: 'module names',
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
