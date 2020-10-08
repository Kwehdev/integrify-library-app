module.exports = {
  globalSetup: './src/testUtils/globalSetup.ts',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testUtils/setupTests.ts'],
}
