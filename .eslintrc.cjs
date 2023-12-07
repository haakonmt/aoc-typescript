/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "no-console": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/extensions": "off",
    "no-restricted-syntax": ["off", "ForOfStatement"],
  }
};
