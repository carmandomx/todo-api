/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts'],
  roots: ["<rootDir>/src"],
  preset: 'ts-jest',
  testEnvironment: 'node',
};