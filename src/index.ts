import * as _ from "lodash";
import {black, bold, bgWhite} from "nanocolors";
import {CLI} from "./cli";
import {GeneratorConfig} from "./eslint/GeneratorConfig";
import {EslintConfigProcessor} from "./eslint/EslintConfigProcessor";
import {EslintFileProcessor} from "./eslint/EslintFileProcessor";
import {CLIParsedOptions} from "./cli/types";
import {CLI_OPTIONS} from "./cli/constants";
import * as path from "path";
import {PACKAGE_CONFIG} from "./constants";

const main = async () => {
  const cli = new CLI<CLIParsedOptions>(
    CLI_OPTIONS,
    (options) => ({
      output: path.resolve(process.cwd(), options.output)
    })
  );
  console.info("Start cooking your eslint configuration :)")

  const config = new GeneratorConfig(cli.options);
  const configProcessor = new EslintConfigProcessor(config);
  const fileProcessor = new EslintFileProcessor(config);

  const [existConfig, existConfigFormat] = await fileProcessor.getConfig(cli.options.output);
  const generatedConfig = configProcessor.generate();
  const resultConfig = !cli.options.rewrite && existConfig ?
    configProcessor.merge(generatedConfig, existConfig) :
    generatedConfig;

  fileProcessor.createConfig(cli.options.output, resultConfig, existConfigFormat)
    .then(() => {
      console.info(`${bold('succeeded')} patched\\created eslint config! ${bold(`Enjoy!`)}`)

      const peerDeps = _.map(PACKAGE_CONFIG.peerDeps, (version, name) => `${name}@${version}`)
      const deps = _.map(config.dependencies, dep => `${dep.name}@${dep.version}`)
      const allDeps = [...peerDeps, ...deps].join(' ')

      console.log(
        bold("You need to install this dev deps: ") + "\r\n" +
        "  npm:  " + black(bold(bgWhite("npm i -D " + allDeps))) + "\r\n" +
        "  yarn: " + black(bold(bgWhite("yarn add -D " + allDeps)))
      )
    })
    .catch(e => {
      console.error("Problem with generating your eslintrc file :(");
      console.error(e)
    })
}

main();
