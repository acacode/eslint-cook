import {EslintConfig} from "../types";

export const REACT_CONFIG: EslintConfig = {
  plugins: [
    "react",
    "react-hooks"
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    },
  },
  rules: {
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
  }
}
