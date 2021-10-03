import {EslintConfig} from "../types";


export const TYPESCRIPT_CONFIG: EslintConfig = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "no-empty-interface": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  }
}
