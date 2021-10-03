import {EslintConfig, EslintConfigRules, EslintConfigRuleValue, GeneratorConfig} from "./types";
import * as _ from "lodash";
import { cosmiconfigSync } from "cosmiconfig";

const mergeRules = (generatorConfig: GeneratorConfig, configA: EslintConfig, configB: EslintConfig): EslintConfigRules => {
  const ruleNames = _.uniq([..._.keys(configA.rules), ..._.keys(configB.rules)]);
  const rules: EslintConfigRules = {};

  const mergeRule = _.curry(_.assign, 2)(rules)

  _.each(ruleNames, rule => {
    const rawRuleA = _.get(configA.rules, [rule]);
    const rawRuleB = _.get(configB.rules, [rule])

    const ruleA = typeof rawRuleA === "function" ? rawRuleA(generatorConfig) : rawRuleA;
    const ruleB = typeof rawRuleB === "function" ? rawRuleB(generatorConfig) : rawRuleB;

    if (_.isArray(ruleA) && _.isArray(ruleB)) {
      const [, ruleOptionsA] = ruleA;
      const [ruleValueB, ruleOptionsB] = ruleB;

      return mergeRule({ [rule]: [ruleValueB, _.merge({}, ruleOptionsA, ruleOptionsB)] })
    }

    mergeRule({ [rule]: _.isUndefined(ruleB) ? ruleA : ruleB })
  })

  return rules;
}

export const mergeEslintConfigs = (
  generatorConfig: GeneratorConfig,
  configA: EslintConfig,
  configB: EslintConfig,
): EslintConfig => {
  const merged = _.merge(
    {},
    _.omit(configA, ["extends", "plugins", "rules"]),
    _.omit(configB, ["extends", "plugins", "rules"])
  );

  return {
    ...merged,
    extends: _.uniq([...configA.extends, ...configB.extends]),
    plugins: _.uniq([...configA.plugins, ...configB.plugins]),
    rules: mergeRules(generatorConfig, configA, configB),
  }
}


export const searchConfig = <T = Record<string, unknown>>(packageName: string) => {
  const foundPackageConfig = cosmiconfigSync(packageName).search()

  return ((foundPackageConfig && foundPackageConfig.config) || {}) as T;
}
