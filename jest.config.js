module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['./dist'],
  testPathIgnorePatterns: ['./dist'],
  testTimeout: 10000,
};
