const path = require('path');
const {PluginManager} = require("live-plugin-manager");
const ESLINT_DEPS = require('./eslint-deps.json')

const pluginManager = new PluginManager({
  cwd: process.cwd(),
  pluginsPath: path.join(process.cwd(), "node_modules"),
  npmInstallMode: "useCache"
})

console.info("installing eslint plugins/configs for usage")

Promise.all(ESLINT_DEPS.reduce((depsPromises, deps) =>
  [
    ...depsPromises,
    ...deps.map(dep => pluginManager.installFromNpm(dep.name, dep.version))
  ]
))
  .then(() => console.info("succeeded installed eslint plugins/configs for eslint-plugin-dynamic usage"))
  .catch(() => console.error("failed to install eslint plugins/configs"))
