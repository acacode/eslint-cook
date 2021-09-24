import {EslintConfig} from "../types";


export const UNICORN_CONFIG: EslintConfig = {
  plugins: ['unicorn'],
  extends: ['plugin:unicorn/recommended']
}
