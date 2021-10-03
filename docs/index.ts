import * as eta from "eta";
import * as path from "path"
import {MODULE_CONFIGS, MODULE_CONFIGS_VALUES} from "../src/constants";
import * as fs from "fs"
import * as _ from "lodash"
import {mergeEslintConfigs} from "../src/eslint/utils";
import {EslintConfig, EslintConfigRelations, GeneratorConfig, ModuleName} from "../src/eslint/types";
import {CLI} from "../src/cli";
import {CLI_OPTIONS} from "../src/cli/constants";
import { name as packageName } from "../package.json"

const generate = async () => {
  const generatorConfig: GeneratorConfig = {
    moduleNames: _.map(MODULE_CONFIGS_VALUES, "name"),
    moduleConfigs: MODULE_CONFIGS_VALUES,
  }

  const possibleModuleNames = MODULE_CONFIGS_VALUES.reduce<{ name: ModuleName, def: string }[]>(
    (acc, moduleConfig) => {
      return [
        ...acc,
        ..._.uniq([moduleConfig.name, ...moduleConfig.defs]).map(def => ({ name: moduleConfig.name, def }))
      ]
    }, [])

  const readme = await eta.renderFile(path.resolve(__dirname, "./readme.template.md"), {
    packageName: packageName,
    possibleModuleNames: possibleModuleNames,
    help: new CLI(CLI_OPTIONS).help,
    eslintConfigs: _.map(MODULE_CONFIGS, moduleConfig => ({
      ...moduleConfig,
      config: mergeEslintConfigs(generatorConfig, { extends: [], plugins: [] }, moduleConfig.config),
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

generate().catch(e => {
  console.error("error while generating documentation", e);
});

