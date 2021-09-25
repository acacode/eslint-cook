const { eslintDeps } = require("./package.json");
const { exec } = require("child_process");
const path = require('path')

const pathToInstall = path.resolve(__dirname, '../..')
const deps = Object.keys(eslintDeps).map(key => `${key}@${eslintDeps[key]}`).join(" ");

exec(`npm install --prefix ${pathToInstall} --no-save --quiet --no-audit ${deps}`, { cwd: process.cwd() }, () => {})
