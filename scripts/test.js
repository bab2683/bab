const { execSync } = require('child_process');

const result = execSync(
  `git http.extraheader="AUTHORIZATION: token ${
    process.env.GITHUB_AUTH_TOKEN
  }" push`
);

console.log('result', result);
