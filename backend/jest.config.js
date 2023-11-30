module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs'
  },
  testRegex: 'src/.+(test)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [],
  coverageReporters: ['text-summary', 'text', 'html'],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  testEnvironment: 'node',
  testTimeout: 99999,
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  setupFiles: ['<rootDir>/jestSetup.ts']
};
