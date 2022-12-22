/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "universe/native",
    "universe/shared/typescript-analysis",
    "@react-native-community",
    "turbo",
    "../../.eslintrc.cjs",
    "prettier",
  ],
  parserOptions: {
    requireConfigFile: false,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
    },
  ],
}
