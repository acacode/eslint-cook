import {ModuleConfig, EslintConfig, ModuleName} from "./types";
import {BABEL_CONFIG} from "./eslint/babel";
import {A11Y_CONFIG} from "./eslint/a11y";
import {NEXT_CONFIG} from "./eslint/next";
import {REACT_CONFIG} from "./eslint/react";
import {IMPORT_CONFIG, IMPORT_CONFIG_RELATIONS} from "./eslint/import";
import {PRETTIER_CONFIG} from "./eslint/prettier";
import {TYPESCRIPT_CONFIG} from "./eslint/typescript";
import {EFFECTOR_CONFIG} from "./eslint/effector";


export const MODULE_NAMES_DIVIDER = '+'

export const MODULE_CONFIGS: Record<ModuleName, ModuleConfig> = {
  [ModuleName.Effector]: {
    priority: 2,
    name: ModuleName.Effector,
    conflicts: [],
    config: EFFECTOR_CONFIG,
  },
  [ModuleName.Prettier]: {
    priority: 1,
    name: ModuleName.Prettier,
    conflicts: [],
    config: PRETTIER_CONFIG,
  },
  [ModuleName.Babel]: {
    priority: 0,
    name: ModuleName.Babel,
    conflicts: [ModuleName.TypeScript],
    config: BABEL_CONFIG,
  },
  [ModuleName.A11y]: {
    priority: 0,
    name: ModuleName.A11y,
    conflicts: [],
    config: A11Y_CONFIG,
  },
  [ModuleName.Next]: {
    name: ModuleName.Next,
    conflicts: [],
    config: NEXT_CONFIG,
    priority: 100,
  },
  [ModuleName.React]: {
    priority: 2,
    name: ModuleName.React,
    conflicts: [],
    config: REACT_CONFIG,
  },
  [ModuleName.Import]: {
    name: ModuleName.Import,
    conflicts: [],
    config: IMPORT_CONFIG,
    priority: 3,
    relations: IMPORT_CONFIG_RELATIONS
  },
  [ModuleName.TypeScript]: {
    name: ModuleName.TypeScript,
    conflicts: [ModuleName.Babel],
    config: TYPESCRIPT_CONFIG,
    priority: 20,
  },
}
