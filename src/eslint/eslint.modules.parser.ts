import * as _ from "lodash";
import {MODULE_CONFIGS, MODULE_CONFIGS_VALUES, POSSIBLE_MODULE_DEFS} from "../constants";
import {GeneratorConfig, ModuleConfig, ModuleConfigDep, ModuleName} from "./types";
import {CLIParsedOptions} from "../cli/types";

export class EslintModulesParser implements GeneratorConfig {
  constructor(private options: CLIParsedOptions) {}

  get moduleNames(): ModuleName[] {
    return this.options.modules
      .map(rawDef => {
        const moduleDef = _.toLower(rawDef);
        const moduleConfig = MODULE_CONFIGS_VALUES.find(moduleConfig => [moduleConfig.name, ...moduleConfig.defs].includes(moduleDef));

        if (!moduleConfig) {
          throw new Error(
            `unknown module definition "${rawDef}".`+
            `\nPossible import modules definitions: ${POSSIBLE_MODULE_DEFS.map(m => `"${m}"`).join(', ')}`
          )
        }

        return moduleConfig.name;
      })
  }

  get moduleConfigs(): ModuleConfig[] {
    return this.moduleNames
      .map(moduleName => MODULE_CONFIGS[moduleName])
      .sort((a, b) => a.priority > b.priority ? 1 : -1);
  }

  get dependencies(): ModuleConfigDep[] {
    return _.flatten(_.map(this.moduleConfigs, "deps"))
  }
}
