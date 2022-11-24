module.exports={
    ...require('esconfig/api-eslint'),
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: './tsconfig.json',
    },
  }