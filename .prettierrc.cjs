// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */

const config = {
  useTabs: false,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  jsxBracketSameLine: false,
  parsers: ['typescript', 'css', 'json'],
  semi: false,
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-css-order', 'prettier-plugin-organize-imports'],
}

module.exports = config
