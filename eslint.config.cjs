const base = require("@mono/eslint/base");
const honoBun = require("@mono/eslint/hono-bun");
const reactVite = require("@mono/eslint/react-vite");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/.next/**",
      "**/routeTree.gen.ts",
      "**/routeTree.gen.d.ts",
      "eslint.config.cjs",
      "libraries/eslint/**/*.cjs",
    ],
  },

  ...base,
  ...honoBun,

  ...reactVite,

  prettier,
];
