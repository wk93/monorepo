const base = require("@mono/eslint/base");
const honoBun = require("@mono/eslint/hono-bun");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.next/**",

      "eslint.config.cjs",
      "libraries/eslint/**/*.cjs",
    ],
  },

  ...base,
  ...honoBun,

  prettier,
];
