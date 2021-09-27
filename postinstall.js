import {MODULE_CONFIGS} from "./dist/constants";

const path = require('path');
const {PluginManager} = require("live-plugin-manager");

const pluginManager = new PluginManager({
  cwd: process.cwd(),
  pluginsPath: path.join(process.cwd(), "node_modules"),
  npmInstallMode: "useCache"
})

console.info("installing eslint plugins/configs for usage")

Promise.all(MODULE_CONFIGS.reduce((depsPromises, moduleConfig) =>
  [
    ...depsPromises,
    ...moduleConfig.deps.map(dep => pluginManager.installFromNpm(dep.name, dep.version))
  ]
))
  .then(() => console.info("succeeded installed eslint plugins/configs for eslint-plugin-dynamic usage"))
  .catch(() => console.error("failed to install eslint plugins/configs"))
