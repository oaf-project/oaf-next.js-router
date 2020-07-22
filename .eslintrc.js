module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:functional/recommended",
    "plugin:functional/external-recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:total-functions/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  env: {
    es6: true,
    browser: true,
  },
  plugins: [
    "sonarjs",
    "functional",
    "@typescript-eslint",
    "prettier",
    "total-functions"
    // TODO replace tslint's no-any and no-unsafe-any
    // See https://github.com/typescript-eslint/typescript-eslint/issues/791
  ],
  rules: {
    // Additional rules that are not part of `eslint:recommended`.
    // See https://eslint.org/docs/rules/
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-await-in-loop": "error",
    "no-new-wrappers": "error",
    "eqeqeq": "error",
    "no-caller": "error",
    "require-unicode-regexp": "error",
    "no-loss-of-precision": "error",
    // Make typescript-eslint rules more aggressive.
    "@typescript-eslint/consistent-type-assertions": ["error", {
      "assertionStyle": "never",
    }],
    "no-restricted-globals": [
      "error",
      // Browser globals
      { name: "document" },
      { name: "window" },
      { name: "navigator" },
      // https://github.com/danielnixon/readonly-types
      { name: "URL" },
      { name: "URLSearchParams" },
      { name: "Date" },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
