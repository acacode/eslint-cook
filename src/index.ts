import * as _ from "lodash";
import {bgGreen, black, bold} from "nanocolors";
import {CLI} from "./cli";
import {EslintModulesParser} from "./eslint/eslint.modules.parser";
import {EslintConfigGenerator} from "./eslint/eslint.config.generator";
import {EslintFileConfigGenerator} from "./eslint/file.config.generator";
import {CLIParsedOptions} from "./cli/types";
import {CLI_OPTIONS} from "./cli/constants";

const main = () => {
  const cli = new CLI<CLIParsedOptions>(CLI_OPTIONS);
  const options = cli.options;

  console.info("Start cooking your eslint configuration :)")

  const modulesParser = new EslintModulesParser(options);
  const configGenerator = new EslintConfigGenerator(options, modulesParser);
  const fileConfigGenerator = new EslintFileConfigGenerator(options, modulesParser);

  fileConfigGenerator.generate(configGenerator.generate())
    .then(() => {
      console.info(`${bold('succeeded')} patched\\created eslint config! ${bold(`Enjoy!`)}`)

      const deps = _.map(modulesParser.dependencies, dep => `${dep.name}@${dep.version}`).join(" ")

      console.log(
        bold("You need to install this dev deps: ") + "\r\n" +
        "  npm:  " + black(bold(bgGreen("npm i -D " + deps))) + "\r\n" +
        "  yarn: " + black(bold(bgGreen("yarn add -D " + deps)))
      )
    })
    .catch(e => {
      console.error("Problem with generating your eslintrc file :(");
      console.error(e)
    })
}

main();
