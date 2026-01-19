const globals = require("globals");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");
const pluginQuery = require("@tanstack/eslint-plugin-query");
const pluginRouter = require("@tanstack/eslint-plugin-router");

module.exports = [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "@tanstack/router": pluginRouter,
      "@tanstack/query": pluginQuery,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...(pluginRouter.configs.recommended?.rules ?? {}),
      ...(pluginQuery.configs.recommended?.rules ?? {}),
      ...(reactHooks.configs.recommended?.rules ?? {}),
      ...(reactRefresh.configs.vite?.rules ?? {}),
    },
  },
];
