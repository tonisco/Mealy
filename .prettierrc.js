/** @type {import("prettier").Config} */
module.exports ={
    "tabWidth": 2,
    "semi": false,
    "trailingComma": "all",
    "printWidth": 80,
    "arrowParens": "always",
    "singleQuote": false,
    "jsxSingleQuote": false,
    "plugins": "[require.resolve('prettier-plugin-tailwindcss')],",
    "tailwindConfig": "./packages/tailwind-config"
  }
