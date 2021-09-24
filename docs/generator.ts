import * as eta from "eta";
import * as path from "path"
import {POSSIBLE_MODULE_VALUES, MODULE_CONFIGS, MODULE_CONFIGS_VALUES} from "../src/constants";
import * as fs from "fs"
import * as _ from "lodash"
import {mergeEslintConfigs} from "../src/utils";
import {EslintConfig, EslintConfigRelations, GeneratorConfig, ModuleName} from "../src/types";

const generate = async () => {

  const generatorConfig: GeneratorConfig = {
    moduleNames: _.map(MODULE_CONFIGS_VALUES, "name"),
    moduleConfigs: MODULE_CONFIGS_VALUES,
  }

  const readme = await eta.renderFile(path.resolve(__dirname, "./template.md"), {
    possibleModuleNames: POSSIBLE_MODULE_VALUES,
    eslintConfigs: _.map(MODULE_CONFIGS, moduleConfig => ({
      name: moduleConfig.name,
      config: mergeEslintConfigs(generatorConfig, { extends: [], plugins: [] }, moduleConfig.config),
      conflicts: moduleConfig.conflicts,
      defs: moduleConfig.defs,
      relations: _.reduce<EslintConfigRelations, { config: EslintConfig, name: ModuleName }[]>(
        moduleConfig.relations,
        (acc, relation, relationKey) => ([
          ...acc,
          {
            name: relationKey as ModuleName,
            config: mergeEslintConfigs(generatorConfig, { extends:[], plugins: [] }, relation),
          }
        ]), [])
    }))
  })

  if (!readme) return;

  fs.writeFile(path.resolve(__dirname, '../README.md'), readme, _.noop)
}

generate().finally(_.noop);

