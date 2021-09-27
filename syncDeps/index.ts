import { MODULE_CONFIGS_VALUES } from "../src/constants";
import * as _ from "lodash"
import {ModuleConfig, ModuleConfigDep} from "../src/types";
import packageJson from "../package.json"
import * as path from "path"
import * as fs from "fs"

fs.writeFile(
  path.resolve(__dirname, "../package.json"),
  JSON.stringify({
    ...packageJson,
    peerDependencies: {
      ...(packageJson.peerEslintDependencies || {}),
      ..._.flatten(_.map(MODULE_CONFIGS_VALUES, "deps")).reduce((deps, dep) => ({ ...deps, [dep.name]: dep.version }), {})
    }
  }, null, 2),
  _.noop
)
