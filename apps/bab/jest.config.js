module.exports = {
  name: 'bab',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/bab',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
