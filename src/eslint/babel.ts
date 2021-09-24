import {ModuleConfig, EslintConfig, ModuleName} from "../types";


export const BABEL_CONFIG: EslintConfig = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
  },
  plugins: [],
  extends: [],
}
