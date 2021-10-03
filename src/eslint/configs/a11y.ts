import {ModuleConfig, EslintConfig, ModuleName} from "../types";


export const A11Y_CONFIG: EslintConfig = {
  plugins: [
    "jsx-a11y"
  ],
  extends: [
    "plugin:jsx-a11y/recommended"
  ],
}
