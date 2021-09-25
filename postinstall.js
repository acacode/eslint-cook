const { eslintDeps } = require("./package.json")
const { exec } = require("child_process")

exec(`npm install --no-save --quiet --no-audit ${Object.keys(eslintDeps).map(key => `${key}@${eslintDeps[key]}`).join(" ")}`, { cwd: process.cwd() }, () => {})
