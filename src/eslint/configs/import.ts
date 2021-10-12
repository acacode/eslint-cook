import {EslintConfig, EslintConfigRelations, ModuleName} from "../types";

export const IMPORT_CONFIG: EslintConfig = {
  plugins: [
    "import",
  ],
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  settings: {
    "import/resolver": {
      alias: {
        extensions: [".js", ".jsx", ".json"]
      }
    }
  },
  rules: {
    "import/order": [
      "error",
      {
        "groups": [
          ["external"],
          ["builtin"],
          ["internal"],
          ["parent"],
          ["sibling"],
          ["object"],
          ["index"]
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}


export const IMPORT_CONFIG_RELATIONS: EslintConfigRelations = {
  [ModuleName.TypeScript]: {
    plugins: [],
    extends: [
      "plugin:import/typescript"
    ],
    settings: {
      "import/resolver": {
        alias: {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        }
      }
    },
  }
}
