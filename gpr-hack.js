import { writeFileSync, readFileSync } from "fs";

const file = readFileSync("./package.json", {
  encoding: "utf-8",
});

const json = JSON.parse(file);

json.name = "@acacode/eslint-plugin-dynamic";

writeFileSync("./package.json", JSON.stringify(json, undefined, 2));
