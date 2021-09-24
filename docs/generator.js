const eta = require("eta");
const path = require("path");
const { POSSIBLE_MODULE_VALUES } = require("../dist/constants");
const fs = require("fs");
const _ = require("lodash")


const generate = async () => {
  const readme = await eta.renderFile(path.resolve(__dirname, "./template.md"), {
    possibleModuleNames: POSSIBLE_MODULE_VALUES,
  })

  console.info("readme", readme)

  fs.writeFile(path.resolve(__dirname, '../README.md'), readme, _.noop)
}

generate();

