'use strict'

/* eslint-disable jsdoc/valid-types -- importing types */
/** @typedef {import('ts-jest')} */
/* eslint-enable jsdoc/valid-types -- see above */
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  }
}
module.exports = config
