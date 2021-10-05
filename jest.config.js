module.exports = {
  roots: [
    '<rootDir>/tests',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  testMatch: [
    '**/*.spec.ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  collectCoverage: process.env.WATCHMODE ? false : true,
  collectCoverageFrom: ['src/components/**/*.tsx', 'src/store/sagas/**/*.ts'],
}