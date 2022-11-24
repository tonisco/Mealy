module.exports={
  ...require('esconfig/next-eslint'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}