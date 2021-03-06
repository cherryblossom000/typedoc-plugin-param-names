'use strict'

/** @type {import('eslint').Linter.Config & {parserOptions?: import('@typescript-eslint/parser').ParserOptions}} */
const config = {
  root: true,
  extends: ['@cherryblossom/eslint-config/node'],
  reportUnusedDisableDirectives: true,
  parserOptions: {
    project: [
      './tsconfig.config.json',
      './src/tsconfig.json',
      './tests/tsconfig.json'
    ],
    tsconfigRootDir: __dirname
  },
  settings: {jsdoc: {mode: 'typescript'}},
  rules: {
    '@typescript-eslint/prefer-readonly-parameter-types': 0,
    'import/no-unused-modules': 0,
    'import/prefer-default-export': 0,
    'unicorn/prefer-module': 0
  }
}
module.exports = config
