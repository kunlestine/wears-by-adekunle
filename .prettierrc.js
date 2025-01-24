// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQoute: false,
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  requireProgma: false,
  trailingComma: "all",
  useTabs: false,
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};

module.exports = config;
