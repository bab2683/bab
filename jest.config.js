module.exports = {
  collectCoverageFrom: [
    'apps/**/*.ts',
    'libs/**/*.ts',
    '!apps/**/src/polyfills.ts',
    '!apps/**/src/**/*.animations.ts',
    '!apps/**/src/**/*.config.ts',
    '!apps/**/src/**/*.constants.ts',
    '!apps/**/src/**/*.enum.ts',
    '!apps/**/src/**/*.map.ts',
    '!apps/**/src/**/*.mock.ts',
    '!apps/**/src/**/*.model.ts',
    '!apps/**/src/**/*.module.ts',
    '!apps/**/src/**/*.routes.ts',
    '!apps/**/src/**/*.actions.ts',
    '!apps/**/src/**/*.state.ts',
    '!apps/**/src/**/index.ts',
    '!apps/**/src/**/main.ts',
    '!apps/**/src/environments/**',
    '!libs/**/polyfills.ts',
    '!libs/**/*.animations.ts',
    '!libs/**/*.config.ts',
    '!libs/**/*.constants.ts',
    '!libs/**/*.enum.ts',
    '!libs/**/*.map.ts',
    '!libs/**/*.mock.ts',
    '!libs/**/*.model.ts',
    '!libs/**/*.module.ts',
    '!libs/**/*.routes.ts',
    '!libs/**/*.actions.ts',
    '!libs/**/*.state.ts',
    '!libs/**/index.ts',
    '!libs/**/main.ts',
    '!libs/**/public-api.ts',
    '!**/node_modules/**'
  ],
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  passWithNoTests: true,
  resolver: '@nrwl/jest/plugins/resolver',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  }
};
