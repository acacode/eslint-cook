import { mergeEslintConfigs} from "./utils";
import { MODULE_CONFIGS_VALUES, MODULE_NAMES_DIVIDER, POSSIBLE_MODULE_VALUES } from "./constants";
import {EslintConfig, GeneratorConfig, ModuleName} from "./types";
import {BASE_CONFIG} from "./eslint/_base_";
import * as _ from "lodash";

const configPicker = new Proxy({} as Record<string, EslintConfig>, {
  get(target, path) {
    const configuration = { ...BASE_CONFIG }
    const moduleConfigs =
      (_.split(_.toString(path), MODULE_NAMES_DIVIDER) as ModuleName[])
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
    const moduleNames = moduleConfigs.map(moduleConfig => moduleConfig.name);


    const generatorConfig: GeneratorConfig = {
      moduleNames,
      moduleConfigs
    }

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
});


export const configs = configPicker;
export const rules = {};
