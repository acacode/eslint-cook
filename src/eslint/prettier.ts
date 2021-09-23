import {ModuleConfig, EslintConfig, ModuleName, EslintConfigRules} from "../types";
import {searchConfig} from "../utils";


export const PRETTIER_CONFIG: EslintConfig = {
  plugins: [
    "prettier"
  ],
  extends: [
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": () => {
      const prettierConfig = searchConfig<EslintConfigRules>("prettier");

      return [
        "error",
        {
          "endOfLine": "auto",
          "printWidth": 80,
          "tabWidth": 2,
          "trailingComma": "all",
          "semi": true,
          ...prettierConfig
        }
      ]
    },
  }
}
