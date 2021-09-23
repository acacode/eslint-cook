import {EslintConfig, EslintConfigRules} from "../types";
import {searchConfig} from "../utils";


export const BASE_CONFIG: EslintConfig = {
  extends: [
    "eslint:recommended",
  ],
  plugins: [],
  globals: {
    process: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  env: {
    es6: true,
    browser: true,
    amd: true,
    node: true
  },
  rules: {
    "no-duplicate-imports": "error",
    "no-trailing-spaces": "error",
    "max-len": () => {
      const prettierConfig = searchConfig<EslintConfigRules>("prettier");
      const code = isNaN(+prettierConfig.printWidth) ? 80 : +prettierConfig.printWidth

      return [
        "warn",
        {
          "ignorePattern": "^import\\s.+\\sfrom\\s.+;$",
          "code": code,
          "comments": code + 40,
          "ignoreTemplateLiterals": true,
          "ignoreUrls": true,
          "ignoreStrings": true
        }
      ]
    },
    "no-console": [
      "error",
      { "allow": ["error", "warn", "info"] }
    ],
    "no-multiple-empty-lines": [
      "error", {
        "max": 1,
        "maxEOF": 0
      }
    ],
    "object-shorthand": "error",
  }
}
