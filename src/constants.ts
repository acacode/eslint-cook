import {ModuleConfig, ModuleName} from "./types";
import {BABEL_CONFIG} from "./eslint/babel";
import {A11Y_CONFIG} from "./eslint/a11y";
import {NEXT_CONFIG} from "./eslint/next";
import {REACT_CONFIG} from "./eslint/react";
import {IMPORT_CONFIG, IMPORT_CONFIG_RELATIONS} from "./eslint/import";
import {PRETTIER_CONFIG} from "./eslint/prettier";
import {TYPESCRIPT_CONFIG} from "./eslint/typescript";
import {EFFECTOR_CONFIG} from "./eslint/effector";
import * as _ from "lodash";
import {STYLED_COMPONENTS_CONFIG} from "./eslint/styled-components";
import {UNICORN_CONFIG} from "./eslint/unicorn";
import ESLINT_DEPS from "../eslint-deps.json"

export const MODULE_NAMES_DIVIDER = '+'

export const MODULE_CONFIGS: Record<ModuleName, ModuleConfig> = {
  [ModuleName.TypeScript]: {
    name: ModuleName.TypeScript,
    defs: ["ts", "typescript"],
    deps: ESLINT_DEPS[ModuleName.TypeScript],
    docs: "https://github.com/typescript-eslint/typescript-eslint#readme",
    conflicts: [ModuleName.Babel],
    config: TYPESCRIPT_CONFIG,
    priority: 20,
  },
  [ModuleName.Prettier]: {
    priority: 1,
    defs: ["prettier"],
    deps: ESLINT_DEPS[ModuleName.Prettier],
    docs: "https://github.com/prettier/eslint-plugin-prettier#readme",
    name: ModuleName.Prettier,
    conflicts: [],
    config: PRETTIER_CONFIG,
  },
  [ModuleName.React]: {
    priority: 2,
    defs: ["react", "reactjs"],
    deps: ESLINT_DEPS[ModuleName.React],
    docs: "https://github.com/yannickcr/eslint-plugin-react#readme",
    name: ModuleName.React,
    conflicts: [],
    config: REACT_CONFIG,
  },
  [ModuleName.Import]: {
    name: ModuleName.Import,
    defs: ["import", "imports"],
    deps: ESLINT_DEPS[ModuleName.Import],
    docs: "https://github.com/import-js/eslint-plugin-import#readme",
    conflicts: [],
    config: IMPORT_CONFIG,
    priority: 3,
    relations: IMPORT_CONFIG_RELATIONS
  },
  [ModuleName.Effector]: {
    priority: 2,
    defs: ["effector", "effectorjs"],
    deps: ESLINT_DEPS[ModuleName.Effector],
    docs: "https://github.com/effector/eslint-plugin#readme",
    name: ModuleName.Effector,
    conflicts: [],
    config: EFFECTOR_CONFIG,
  },
  [ModuleName.Babel]: {
    priority: 0,
    defs: ["babel", "babeljs"],
    deps: ESLINT_DEPS[ModuleName.Babel],
    docs: "https://www.npmjs.com/package/@babel/eslint-parser",
    name: ModuleName.Babel,
    conflicts: [ModuleName.TypeScript],
    config: BABEL_CONFIG,
  },
  [ModuleName.A11y]: {
    priority: 0,
    defs: ["a11y"],
    deps: ESLINT_DEPS[ModuleName.A11y],
    docs: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme",
    name: ModuleName.A11y,
    conflicts: [],
    config: A11Y_CONFIG,
  },
  [ModuleName.Next]: {
    name: ModuleName.Next,
    defs: ["next", "nextjs"],
    deps: ESLINT_DEPS[ModuleName.Next],
    docs: "https://nextjs.org/docs/basic-features/eslint",
    conflicts: [],
    config: NEXT_CONFIG,
    priority: 100,
  },
  [ModuleName.StyledComponents]: {
    name: ModuleName.StyledComponents,
    defs: ["sc", "styled-components"],
    deps: ESLINT_DEPS[ModuleName.StyledComponents],
    docs: "https://github.com/tinloof/eslint-plugin-better-styled-components#readme",
    conflicts: [],
    config: STYLED_COMPONENTS_CONFIG,
    priority: 17,
  },
  [ModuleName.Unicorn]: {
    name: ModuleName.Unicorn,
    defs: ["unicorn"],
    deps: ESLINT_DEPS[ModuleName.Unicorn],
    docs: "https://github.com/sindresorhus/eslint-plugin-unicorn#readme",
    conflicts: [],
    config: UNICORN_CONFIG,
    priority: 5,
  }
}

export const MODULE_CONFIGS_VALUES = _.values(MODULE_CONFIGS);

export const POSSIBLE_MODULE_VALUES = _.uniq(_.flatten(MODULE_CONFIGS_VALUES.map(moduleConfig => [moduleConfig.name, ...moduleConfig.defs])))

