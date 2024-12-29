/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
  globals: {
    React: true,
    JSX: true,
  },
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['react', 'only-warn'],
  rules: {
    'react/jsx-no-leaked-render': [
      'warn',
      //Forces linter to use && instead of ternary where possible
      { validStrategies: ['coerce', 'ternary'] },
    ],
    'react/jsx-sort-props': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
}
