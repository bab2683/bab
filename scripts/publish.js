const { execSync } = require('child_process');

const { getDeployableLibs, getPublishType } = require('./affected');
const { deployLib } = require('./publish-lib');

const { getTagForRelease } = require('./tagging');

const type = getPublishType();

if (type) {
  console.log(`${type} publish started`);

  const deployableLibs = getDeployableLibs();

  if (deployableLibs.length) {
    console.log('deployable libs', deployableLibs);
    console.log('publishing deployable libs');

    deployableLibs.forEach(lib => {
      deployLib(lib, type);
    });
    console.log(`${type} publish finished`);

    console.log('creating tag');

    const tag = getTagForRelease(deployableLibs);

    execSync(`git tag -a ${tag}`);

    execSync('git push && git push --tags');
    console.log('tags pushed to repo');
  } else {
    console.log('no deployable libs');
  }
} else {
  console.log('no meaningful changes to publish');
}
