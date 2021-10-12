import * as _ from "lodash";
import {MODULE_CONFIGS, MODULE_CONFIGS_VALUES, POSSIBLE_MODULE_DEFS} from "../constants";
import { ModuleConfig, ModuleConfigDep, ModuleName} from "./types";
import {CLIParsedOptions} from "../cli/types";

export class GeneratorConfig implements CLIParsedOptions {
  constructor(private options: CLIParsedOptions) {
    Object.assign(this, _.omit(options, 'modules'));
  }

  get modules(): ModuleName[] {
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

  get configs(): ModuleConfig[] {
    return this.modules
      .map(moduleName => MODULE_CONFIGS[moduleName])
      .sort((a, b) => a.priority > b.priority ? 1 : -1);
  }

  get dependencies(): ModuleConfigDep[] {
    return _.flatten(_.map(this.configs, "deps"))
  }
}
