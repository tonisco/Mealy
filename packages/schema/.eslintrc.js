module.exports = {
  // eslint-disable-next-line global-require
  ...require("esconfig/api-eslint"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
}
