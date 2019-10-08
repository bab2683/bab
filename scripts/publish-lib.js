const { execSync } = require('child_process');

/**
 *
 * @param {string} name - name of the library to publish
 * @param {string} type - type of publish to be done: Major | Minor | Patch
 */
function deployLib(name, type) {
  const currentVersion = require(`../libs/${name}/package.json`).version;

  console.log(`${name}: current version`, currentVersion);

  const newVersion = execSync(`(cd libs/${name} && npm version ${type})`)
    .toString()
    .replace('v', '');

  console.log(`${name}: new version`, newVersion);

  console.log(`${name}: start building`);
  execSync(`npm run ng build ${name}`);
  console.log(`${name}: library built`);
  console.log('creating tar file');
  const tarFileName = `${name}.tar.gz`;

  execSync(`tar -cvzf ${tarFileName} dist/libs/${name}`);
  console.log('tar file created');
  console.log('verify files');
  execSync(`tar -ztvf ${tarFileName}`);
  console.log('publishing');
  execSync(`npm publish ${tarFileName}`);
  console.log(`${name} published`);
}

module.exports = { deployLib };
