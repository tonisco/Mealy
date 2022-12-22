/** */
module.exports = {
  ...require("esconfig/native-eslint"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
}
