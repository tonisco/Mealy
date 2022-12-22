/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "../../.eslintrc.cjs",
    "universe/native",
    "universe/shared/typescript-analysis",
    "@react-native-community",
    "turbo",
    "prettier",
  ],
  parserOptions: {
    requireConfigFile: false,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
}
