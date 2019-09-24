const { execSync } = require('child_process');

/**
 *
 * @returns {Array<string>} Affected libraries
 */
function getAffectedLibs() {
  const result = execSync('npm run affected:libs').toString();
  const data = result.match(/- (.+)/gm);
  return data
    ? data.map(lib => {
        return lib.replace('- ', '');
      })
    : [];
}

module.exports = {
  getAffectedLibs
};
