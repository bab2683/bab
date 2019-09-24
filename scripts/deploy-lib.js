function deployLib(name) {
  const version = require(`../libs/${name}/package.json`).version;

  console.log(`${name} version`, version);
}

module.exports = { deployLib };
