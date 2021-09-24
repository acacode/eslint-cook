import {ModuleConfig, EslintConfig, ModuleName} from "./types";
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


export const MODULE_NAMES_DIVIDER = '+'

export const MODULE_CONFIGS: Record<ModuleName, ModuleConfig> = {
  [ModuleName.TypeScript]: {
    name: ModuleName.TypeScript,
    defs: ["ts", "typescript"],
    conflicts: [ModuleName.Babel],
    config: TYPESCRIPT_CONFIG,
    priority: 20,
  },
  [ModuleName.Prettier]: {
    priority: 1,
    defs: ["prettier"],
    name: ModuleName.Prettier,
    conflicts: [],
    config: PRETTIER_CONFIG,
  },
  [ModuleName.React]: {
    priority: 2,
    defs: ["react", "reactjs"],
    name: ModuleName.React,
    conflicts: [],
    config: REACT_CONFIG,
  },
  [ModuleName.Import]: {
    name: ModuleName.Import,
    defs: ["import", "imports"],
    conflicts: [],
    config: IMPORT_CONFIG,
    priority: 3,
    relations: IMPORT_CONFIG_RELATIONS
  },
  [ModuleName.Effector]: {
    priority: 2,
    defs: ["effector", "effectorjs"],
    name: ModuleName.Effector,
    conflicts: [],
    config: EFFECTOR_CONFIG,
  },
  [ModuleName.Babel]: {
    priority: 0,
    defs: ["babel", "babeljs"],
    name: ModuleName.Babel,
    conflicts: [ModuleName.TypeScript],
    config: BABEL_CONFIG,
  },
  [ModuleName.A11y]: {
    priority: 0,
    defs: ["a11y"],
    name: ModuleName.A11y,
    conflicts: [],
    config: A11Y_CONFIG,
  },
  [ModuleName.Next]: {
    name: ModuleName.Next,
    defs: ["next", "nextjs"],
    conflicts: [],
    config: NEXT_CONFIG,
    priority: 100,
  },
  [ModuleName.StyledComponents]: {
    name: ModuleName.StyledComponents,
    defs: ["sc", "styled-components"],
    conflicts: [],
    config: STYLED_COMPONENTS_CONFIG,
    priority: 17,
  }
}

export const MODULE_CONFIGS_VALUES = _.values(MODULE_CONFIGS);

export const POSSIBLE_MODULE_VALUES = _.uniq(_.flatten(MODULE_CONFIGS_VALUES.map(moduleConfig => [moduleConfig.name, ...moduleConfig.defs])))
