module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-import'],

  rules: {
    'no-var': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@(?!(.*\\.style$))',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@**/*.style',
            group: 'unknown',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
