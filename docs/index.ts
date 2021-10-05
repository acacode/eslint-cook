import * as eta from "eta";
import * as path from "path"
import {MODULE_CONFIGS, MODULE_CONFIGS_VALUES} from "../src/constants";
import * as fs from "fs"
import * as _ from "lodash"
import {EslintConfig, EslintConfigRelations, ModuleName} from "../src/eslint/types";
import {CLI} from "../src/cli";
import {CLI_OPTIONS} from "../src/cli/constants";
import {EslintConfigProcessor} from "../src/eslint/EslintConfigProcessor";
import {GeneratorConfig} from "../src/eslint/GeneratorConfig";
import {CLIParsedOptions} from "../src/cli/types";

const ALL_MODULE_NAMES = MODULE_CONFIGS_VALUES.map(config => config.name);

const MODULE_DEFS_BY_NAME = MODULE_CONFIGS_VALUES.reduce<{ name: ModuleName, def: string }[]>(
  (acc, moduleConfig) => {
    return [
      ...acc,
      ..._.uniq([moduleConfig.name, ...moduleConfig.defs]).map(def => ({ name: moduleConfig.name, def }))
    ]
  }, [])

const PATHS = {
  TEMPLATE: path.resolve(__dirname, "./readme.template.md"),
  README: path.resolve(__dirname, '../README.md'),
}

const generate = async () => {
  const cli = new CLI<CLIParsedOptions>(CLI_OPTIONS);
  const generatorConfig = new GeneratorConfig({ modules: ALL_MODULE_NAMES })
  const processor = new EslintConfigProcessor(generatorConfig);

  const readme = await eta.renderFile(PATHS.TEMPLATE, {
    packageName: "eslint-cook",
    possibleModuleNames: MODULE_DEFS_BY_NAME,
    help: cli.help,
    eslintConfigs: _.map(MODULE_CONFIGS, moduleConfig => ({
      ...moduleConfig,
      config: processor.merge({ extends: [], plugins: [] }, moduleConfig.config),
      relations: _.reduce<EslintConfigRelations, { config: EslintConfig, name: ModuleName }[]>(
        moduleConfig.relations,
        (acc, relation, relationKey) => ([
          ...acc,
          {
            name: relationKey as ModuleName,
            config: processor.merge({ extends:[], plugins: [] }, relation),
          }
        ]), [])
    }))
  })

  if (!readme) return;

  fs.writeFile(PATHS.README, readme, _.noop)
}

generate().catch(e => {
  console.error("error while generating documentation", e);
});

