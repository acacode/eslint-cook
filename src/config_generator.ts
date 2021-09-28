import {mergeEslintConfigs} from "./utils";
import {MODULE_CONFIGS_VALUES, MODULE_NAMES_DIVIDER, POSSIBLE_MODULE_VALUES} from "./constants";
import {EslintConfig, GeneratorConfig, ModuleConfig, ModuleName} from "./types";
import {BASE_CONFIG} from "./eslint/_base_";
import * as _ from "lodash";

export class ConfigGenerator {
  constructor(private moduleNames: ModuleName[]) {}

  static from(rawPath: string): ConfigGenerator {
    const moduleNames = rawPath.split(' ').filter(Boolean);

    return new ConfigGenerator(moduleNames as ModuleName[]);
  }

  private get moduleConfigs(): ModuleConfig[] {
    return this.moduleNames
      .map(rawModuleDef => {
        const moduleDef = _.toLower(rawModuleDef);
        const moduleConfig = MODULE_CONFIGS_VALUES.find(moduleConfig => [moduleConfig.name, ...moduleConfig.defs].includes(moduleDef));

        if (!moduleConfig) {
          throw new Error(
            `unknown module "${rawModuleDef}".`+
            `\nPossible import modules: ${POSSIBLE_MODULE_VALUES.map(m => `"${m}"`).join(', ')}`
          )
        }

        return moduleConfig;
      })
      .sort((a, b) => a.priority > b.priority ? 1 : -1);
  }

  private get generatorConfig(): GeneratorConfig {
    return {
      moduleNames: this.moduleNames,
      moduleConfigs: this.moduleConfigs
    }
  }

  generateConfig() {
    const configuration = { ...BASE_CONFIG }
    const generatorConfig = this.generatorConfig;
    const { moduleConfigs, moduleNames } = generatorConfig

    const mergeEslintConfig = _.curry(mergeEslintConfigs)(generatorConfig, configuration)

    for (const moduleConfig of moduleConfigs) {
      const { conflicts, config: eslintConfig, relations } = moduleConfig;

      if (conflicts.some(moduleNames.includes.bind(moduleNames))) {
        throw new Error(`using "${moduleConfig.name}" module is not allowed with ${conflicts.map(m => `"${m}"`).join(', ')}`)
      }

      _.assign(configuration, mergeEslintConfig(eslintConfig))

      _.keys(relations).forEach(relationKey => {
        if (moduleConfigs.some(moduleConfig => moduleConfig.name === relationKey)) {
          _.assign(configuration, mergeEslintConfig(relations[relationKey]));
        }
      })
    }

    return configuration;
  }
}
