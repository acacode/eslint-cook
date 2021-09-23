import { mergeEslintConfigs} from "./utils";
import {MODULE_CONFIGS, MODULE_NAMES_DIVIDER} from "./constants";
import {EslintConfig, GeneratorConfig, ModuleName} from "./types";
import {BASE_CONFIG} from "./eslint/_base_";
import * as _ from "lodash";

const configPicker = new Proxy({} as Record<string, EslintConfig>, {
  get(target, path) {
    const configuration = { ...BASE_CONFIG }
    const moduleNames = (_.split(_.toString(path), MODULE_NAMES_DIVIDER) as ModuleName[])
    const moduleConfigs = moduleNames
      .filter((moduleName) => {
        if (!MODULE_CONFIGS[moduleName])
          throw new Error(
            `unknown module "${moduleName}".`+
            `\nPossible modules: ${_.keys(MODULE_CONFIGS).map(m => `"${m}"`).join(', ')}`
          )
        return true;
      })
      .map(moduleName => MODULE_CONFIGS[moduleName])
      .sort((a, b) => a.priority > b.priority ? 1 : -1);


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
