module.exports = {
  env: {
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "turbo",
    "../../.eslintrc.cjs",
    "prettier",
  ],
  plugins: ["simple-import-sort", "import"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
}
