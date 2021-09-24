const { version: localVersion, name } = require("./package.json");
const { exec } = require("child_process");

const getRemoteVersion = (name) =>
  new Promise((resolve, reject) => {
    exec(`npm view ${name} version`, (error, stdout, stderr) => {
      if (error) return reject(error);
      return resolve(stdout);
    })
  })

const checkVersion = async () => {
  const remoteVersion = await getRemoteVersion(name);
  if (remoteVersion.trim() === localVersion.trim()) {
    console.error(`${name} package with version ${localVersion.trim()} already exist`);
    process.exit(1);
  }
}

checkVersion()
