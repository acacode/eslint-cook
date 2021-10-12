import * as _ from "lodash";
import {EslintConfig, EslintConfigRules} from "./types";
import {BASE_CONFIG} from "./configs/_base_";
import {GeneratorConfig} from "./GeneratorConfig";


export class EslintConfigProcessor {
  constructor(private config: GeneratorConfig) {}

  generate(): EslintConfig {
    let result: EslintConfig = { ...BASE_CONFIG }
    const { configs, modules } = this.config;

    for (const moduleConfig of configs) {
      const { conflicts, config: eslintConfig, relations } = moduleConfig;

      if (conflicts.some(modules.includes.bind(modules))) {
        const conflictModules = conflicts.map(m => `"${m}"`)
        throw new Error(`using "${moduleConfig.name}" module is not allowed with ${conflictModules.join(', ')}`)
      }

      result = this.merge(result, eslintConfig);

      _.keys(relations).forEach(relationKey => {
        if (configs.some(moduleConfig => moduleConfig.name === relationKey)) {
          result = this.merge(result, relations[relationKey]);
        }
      })
    }

    return result;
  }

  merge(configA: EslintConfig, configB: EslintConfig): EslintConfig {
    return {
      ..._.merge(
        {},
        _.omit(configA, ["extends", "plugins", "rules"]),
        _.omit(configB, ["extends", "plugins", "rules"])
      ),
      extends: this.mergeExtendsField(configA, configB),
      plugins: this.mergePluginsField(configA, configB),
      rules: this.mergeRulesField(configA, configB),
    }
  }

  private mergeExtendsField(configA: EslintConfig, configB: EslintConfig) {
    return _.uniq([...configA.extends, ...configB.extends])
  }
  private mergePluginsField(configA: EslintConfig, configB: EslintConfig) {
    return _.uniq([...configA.plugins, ...configB.plugins])
  }
  private mergeRulesField(configA: EslintConfig, configB: EslintConfig) {
    const ruleNames = _.uniq([..._.keys(configA.rules), ..._.keys(configB.rules)]);
    const rules: EslintConfigRules = {};

    const mergeRule = _.curry(_.assign, 2)(rules)

    _.each(ruleNames, rule => {
      const rawRuleA = _.get(configA.rules, [rule]);
      const rawRuleB = _.get(configB.rules, [rule])

      const ruleA = typeof rawRuleA === "function" ? rawRuleA(this.config) : rawRuleA;
      const ruleB = typeof rawRuleB === "function" ? rawRuleB(this.config) : rawRuleB;

      if (_.isArray(ruleA) && _.isArray(ruleB)) {
        const [, ruleOptionsA] = ruleA;
        const [ruleValueB, ruleOptionsB] = ruleB;

        return mergeRule({ [rule]: [ruleValueB, _.merge({}, ruleOptionsA, ruleOptionsB)] })
      }

      mergeRule({ [rule]: _.isUndefined(ruleB) ? ruleA : ruleB })
    })

    return rules;
  }
}
