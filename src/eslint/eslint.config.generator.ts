import * as _ from "lodash";
import {EslintConfig, GeneratorConfig} from "./types";
import {BASE_CONFIG} from "./configs/_base_";
import {mergeEslintConfigs} from "./utils";
import {CLIParsedOptions} from "../cli/types";


export class EslintConfigGenerator {
  constructor(private options: CLIParsedOptions, private generatorConfig: GeneratorConfig) {}

  generate(): EslintConfig {
    const configuration = { ...BASE_CONFIG }
    const generatorConfig = this.generatorConfig;
    const { moduleConfigs, moduleNames } = generatorConfig;

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
