import { defineConfig, globalIgnores } from 'eslint/config';
import _import from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['dist/*']),
  {
    extends: compat.extends('plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'),

    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      import: fixupPluginRules(_import),
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
      },
    },

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@entity/*'],
              message: 'Import entities from the @entity barrel export instead.',
            },
          ],
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'linebreak-style': ['error', 'unix'],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^@nestjs', '^\\w'], ['^@'], ['^\\.']],
        },
      ],

      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],

    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/^\\.\\./]',
          message: 'Do not use relative parent imports. Use path aliases instead.',
        },
        {
          selector: 'ExportNamedDeclaration[source.value=/^\\.\\./]',
          message: 'Do not use relative parent exports. Use path aliases instead.',
        },
        {
          selector: 'ExportAllDeclaration[source.value=/^\\.\\./]',
          message: 'Do not use relative parent exports. Use path aliases instead.',
        },
        {
          selector: 'TSUnionType > TSNullKeyword',
          message: 'Do not annotate types with `| null`.',
        },
        {
          selector: 'TSUnionType > TSUndefinedKeyword',
          message: 'Do not annotate types with `| undefined`.',
        },
      ],
    },
  },
]);
