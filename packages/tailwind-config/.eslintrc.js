/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...require("esconfig/native-eslint"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  ignorePatterns: [".eslintrc.js", "index.js", "postcss.js"],
}
