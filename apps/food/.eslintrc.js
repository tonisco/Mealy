/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...require("esconfig/native-eslint"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  ignorePatterns: [
    ".eslintrc.js",
    "babel.config.js",
    "metro.config.js",
    "tailwind.config.js",
  ],
}
