import * as eta from "eta";
import * as path from "path"
import {POSSIBLE_MODULE_VALUES, MODULE_CONFIGS, MODULE_CONFIGS_VALUES} from "../src/constants";
import * as fs from "fs"
import * as _ from "lodash"
import {mergeEslintConfigs} from "../src/utils";
import {GeneratorConfig} from "../src/types";

const generate = async () => {

  const generatorConfig: GeneratorConfig = {
    moduleNames: _.map(MODULE_CONFIGS_VALUES, "name"),
    moduleConfigs: MODULE_CONFIGS_VALUES,
  }

  const readme = await eta.renderFile(path.resolve(__dirname, "./template.md"), {
    possibleModuleNames: POSSIBLE_MODULE_VALUES,
    eslintConfigs: _.map(MODULE_CONFIGS, moduleConfig => ({
      name: moduleConfig.name,
      config: mergeEslintConfigs(generatorConfig, { extends: [], plugins: [] }, moduleConfig.config)
    }))
  })

  if (!readme) return;

  console.info("readme", readme)

  fs.writeFile(path.resolve(__dirname, '../README.md'), readme, _.noop)
}

generate().finally(_.noop);

