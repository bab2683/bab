const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const { getDeployableLibs } = require('./affected');
const Commit = require('./commit');

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
 * @returns {Array<{content: string, path:string}>} changed files
 */
function getChangedFiles() {
  const status = execSync('git status --porcelain').toString();
  return status.match(/(?:M|MM)\s+(.+)$/gm).map(result => {
    const path = result.replace(/(M\s+|MM\s+)/gm, '');
    return {
      content: getFileContent(path),
      path
    };
  });
}

/**
 *
 * @param {string} path
 * @returns {string} content of file
 */
function getFileContent(path) {
  return readFileSync(path, 'utf8');
}

/**
 * @description saves version and changes and saves it to the repo
 */
function commitAndSaveChanges() {
  const tag = getTagForRelease(getDeployableLibs());
  const files = getChangedFiles();

  console.log('files', files);
  const context = process.env.GITHUB_CONTEXT;

  const commitCreator = new Commit({
    repo: 'bab',
    token: process.env.GITHUB_AUTH_TOKEN,
    username: context.actor
  });

  commitCreator
    .create({ branchName: 'master', files, message: tag })
    .then(result => console.log('result', result))
    .catch(err => console.log('error', err));
}

commitAndSaveChanges();
