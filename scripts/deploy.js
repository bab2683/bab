const { readdirSync } = require('fs');
const { getAffectedLibs } = require('./affected');
const { deployLib } = require('./deploy-lib');

const affectedLibs = getAffectedLibs();

/**
 * @param {string[]} libs
 * @return {Array<string>} Deployable libraries
 */
function getDeployableLibs(libs) {
  return libs.filter(lib => {
    const files = readdirSync(`./libs/${lib}`);
    return files.indexOf('package.json') > -1;
  });
}

if (affectedLibs.length) {
  console.log('affected libs', affectedLibs);

  const deployableLibs = getDeployableLibs(affectedLibs);

  if (deployableLibs.length) {
    console.log('deployable libs', deployableLibs);

    console.log('building deployable libs');

    deployableLibs.forEach(lib => {
      deployLib(lib);
    });
  } else {
    console.log('no deployable libs');
  }
} else {
  console.log('no changes to libraries present');
}
