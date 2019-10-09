const { execSync } = require('child_process');
const { readdirSync } = require('fs');

/**
 * @param {string} branch
 * @returns {Array<string>} Affected libraries
 */
function getAffectedLibs(branch) {
  const result = execSync(
    `npm run affected:libs -- --base=remotes/origin/master --head=${branch}`
  ).toString();
  const data = result.match(/- (.+)/gm);
  return data
    ? data.map(lib => {
        return lib.replace('- ', '');
      })
    : [];
}

/**
 * @param {string} branch
 * @return {Array<string>} Deployable libraries
 */
function getDeployableLibs(branch) {
  const libs = getAffectedLibs(branch);
  return libs.filter(lib => {
    const files = readdirSync(`./libs/${lib}`);
    return files.indexOf('package.json') > -1;
  });
}

/**
 * @returns {string} Type of commit
 */
function getTypeOfCommit() {
  const result = execSync('git log -1 --pretty=%B').toString();
  return result.match(/(.+)\(.+\:/gm);
}

/**
 * @returns {string} Type of modifier
 */
function getPublishType() {
  const type = getTypeOfCommit();
  switch (type) {
    case 'feat':
      return 'major';
    case 'fix':
    case 'docs':
      return 'patch';
    case 'perf':
      return 'minor';
    default:
      //return null;
      return 'minor';
  }
}

module.exports = {
  getAffectedLibs,
  getDeployableLibs,
  getPublishType
};
