module.exports = {
  ...require("esconfig/native-eslint"),
  parserOptions: {
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  settings: {
    "import/ignore": ["react-native"],
  },
}
