import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: '<rootDir>/',
  // }),
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
