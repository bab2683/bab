module.exports = {
  name: 'test-lib',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/test-lib',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
