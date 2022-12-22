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
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
  settings: {
    "import/ignore": ["react-native"],
  },
}
