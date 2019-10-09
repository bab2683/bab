const { getDeployableLibs, getPublishType } = require('./affected');
const { deployLib } = require('./publish-lib');

const branch = process.argv.splice(2)[0];
const type = getPublishType();

if (type) {
  console.log(`${type} publish started`);

  const deployableLibs = getDeployableLibs(branch);

  if (deployableLibs.length) {
    console.log('deployable libs', deployableLibs);
    console.log('publishing deployable libs');

    deployableLibs.forEach(lib => {
      deployLib(lib, type);
    });
    console.log(`${type} publish finished`);
  } else {
    console.log('no deployable libs');
  }
} else {
  console.log('no meaningful changes to publish');
}
