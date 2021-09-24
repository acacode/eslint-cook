
export const enum ModuleName {
  Babel = "babel",
  A11y = "a11y",
  TypeScript = "typescript",
  Import = "import",
  React = "react",
  Next = "next",
  Prettier = "prettier",
  Effector = "effector"
}

export type EslintConfigRuleValue = "error" | "warn" | "off" | 0 | 1 | 2

export type EslintConfigRules = Record<string, DynamicRulePatcher | EslintConfigRuleValue | [EslintConfigRuleValue, Record<string, unknown>]>

export type GeneratorConfig = {
  moduleNames: ModuleName[];
  moduleConfigs: ModuleConfig[];
}

export interface EslintConfig {
  [key: string]: unknown;

  extends: string[];
  plugins: string[];

  rules?: EslintConfigRules;
}

export type EslintConfigRelations = Partial<Record<ModuleName, EslintConfig>>

export type ModuleConfig = {
  name: ModuleName;
  defs: string[];
  priority: number;
  config: EslintConfig;
  conflicts: ModuleName[];
  relations?: EslintConfigRelations;
}

export type DynamicRulePatcher = (generatorConfig: GeneratorConfig) => EslintConfigRuleValue | [EslintConfigRuleValue, Record<string, unknown>];
