const { execSync } = require('child_process');
const { getDeployableLibs } = require('./affected');

/**
 * @param {Array<string>} libs
 * @returns {string} New tag for release
 */
function getTagForRelease(libs) {
  const lastTag = execSync('git tag | sort -V | tail -1').toString();

  if (lastTag) {
    return createReleaseTag(lastTag, libs);
  }
  return createFirstTag(libs);
}

/**
 * @param {string} lastTag
 * @param {Array<string>} libs
 * @returns {string} New tag for release
 */
function createReleaseTag(lastTag, libs) {
  const splitted = lastTag.replace('v', '').split('.');
  const major = Number(splitted[0]),
    minor = Number(splitted[1]),
    patch = Number(splitted[2]);

  let newVersion;

  if (patch > 8) {
    if (minor > 8) {
      newVersion = `${major + 1}.${0}.${0}`;
    } else {
      newVersion = `${major}.${minor + 1}.${0}`;
    }
  } else {
    newVersion = `${major}.${minor}.${patch + 1}`;
  }

  return `v${newVersion}-release -m "Publish ${newVersion}, ${createMessage(
    libs
  )}"`;
}

/**
 * @param {Array<string>} libs
 * @returns {string} First tag
 */
function createFirstTag(libs) {
  return `v1.0.0-release -m "First publish, ${createMessage(libs)}"`;
}

/**
 * @param {Array<string>} libs
 * @returns {string} First tag
 */
function createMessage(libs) {
  return `affected libs: ${libs.join()}`;
}

/**
 * @description saves version and changes and saves it to the repo
 */
function commitAndSaveChanges() {
  console.log('creating tag');

  const tag = getTagForRelease(getDeployableLibs());

  execSync(`git tag -a ${tag}`);

  execSync('git add -A && git push && git push --tags');
  console.log('tags pushed to repo');
}

commitAndSaveChanges();
