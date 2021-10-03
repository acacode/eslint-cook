
export type CLIOption = {
  declaration: string;
  description: string;
  defaultValue?: string | boolean;
  required?: boolean;
}

export type CLIParsedOptions = {
  modules: string[],
  rewrite?: boolean;
  output?: string;
}
