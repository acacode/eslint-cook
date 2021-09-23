import {EslintConfig} from "../types";


export const EFFECTOR_CONFIG: EslintConfig = {
  plugins: [
    "effector",
  ],
  extends: [
    "plugin:effector/recommended",
  ],
}
