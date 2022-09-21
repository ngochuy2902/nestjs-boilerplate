import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '.it.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    './src/**/*.(t|j)s',
    '!src/main.ts',
    '!src/database/**',
    '!src/config/**',
    '!src/share/module/**',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov', 'json', 'html'],
};
