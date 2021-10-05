import {cosmiconfigSync} from "cosmiconfig";

export const searchConfig = <T = Record<string, unknown>>(packageName: string) => {
  const foundPackageConfig = cosmiconfigSync(packageName).search()

  return ((foundPackageConfig && foundPackageConfig.config) || {}) as T;
}
