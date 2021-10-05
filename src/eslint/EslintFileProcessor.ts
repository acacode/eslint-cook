import * as fs from "fs-extra"
import {EslintConfig} from "./types";
import * as yaml from "js-yaml"
import {GeneratorConfig} from "./GeneratorConfig";

export class EslintFileProcessor {
  constructor(private generatorConfig: GeneratorConfig) {}

  async getConfig(pathToConfig: string) {
    let result: EslintConfig | null = null;
    let format: 'json' | 'yaml' = 'json';
    let fileContent: string = ''

    try {
      fileContent = (await fs.readFile(pathToConfig, 'utf-8')).toString();
    } catch (e) {}

    try {
      result = JSON.parse(fileContent);
      format = 'json'
    } catch (e) {
      try {
        result = yaml.load(fileContent) as EslintConfig;
        format = result ? 'yaml' : format
      } catch (e) {}
    }

    if (result) {
      console.info(`found existing eslint configuration (${format})`)
    }

    return [result || null, format] as const;
  }

  convertConfig(config: EslintConfig, format: 'json' | 'yaml'): string {
    switch(format) {
      case 'yaml': return yaml.dump(config);
      default: return JSON.stringify(config, null, 2);
    }
  }

  async createConfig(pathToCreate:string, config: EslintConfig, format: 'json' | 'yaml') {
    const result = this.convertConfig(config, format)

    await fs.writeFile(pathToCreate, result, {encoding: "utf-8"});
  }
}
