import * as fs from "fs-extra"
import * as path from "path"
import {EslintConfig, GeneratorConfig} from "./types";
import * as yaml from "js-yaml"
import {mergeEslintConfigs} from "./utils";
import {EMPTY_ESLINT_CONFIG} from "../constants";
import {CLIParsedOptions} from "../cli/types";

export class EslintFileConfigGenerator {
  private readonly output: string;

  constructor(private options: CLIParsedOptions, private generatorConfig: GeneratorConfig) {
    this.output = path.resolve(process.cwd(), this.options.output);
  }

  private async getCurrentConfig() {
    let result: EslintConfig | null = null;
    let format: 'json' | 'yaml' = 'json';
    let fileContent: string = ''

    try {
      fileContent = (await fs.readFile(this.output, 'utf-8')).toString();
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

  private convertConfig(configStruct: EslintConfig, format: 'json' | 'yaml'): string {
    switch(format) {
      case 'yaml': return yaml.dump(configStruct);
      default: return JSON.stringify(configStruct, null, 2)
    }
  }

  async generate(config: EslintConfig) {
    const [currentConfig, format] = await this.getCurrentConfig();
    const nextConfig = mergeEslintConfigs(this.generatorConfig, (!this.options.rewrite && currentConfig) || EMPTY_ESLINT_CONFIG, config);
    const result = this.convertConfig(nextConfig, format)

    await fs.writeFile(this.output, result, {encoding: "utf-8"});
  }
}
