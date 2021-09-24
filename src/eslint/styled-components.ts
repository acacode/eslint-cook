import {EslintConfig} from "../types";


export const STYLED_COMPONENTS_CONFIG: EslintConfig = {
  extends: [],
  plugins: [
    "better-styled-components"
  ],
  rules: {
    "better-styled-components/sort-declarations-alphabetically": 2,
  }
}
