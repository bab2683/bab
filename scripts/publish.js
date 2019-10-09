const { getDeployableLibs, getPublishType } = require('./affected');
const { deployLib } = require('./publish-lib');

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
  } else {
    console.log('no deployable libs');
  }
} else {
  console.log('no meaningful changes to publish');
}
