module.exports ={
  "extends": [
    "next",
    "turbo",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "autofix",
    "prettier"
  ],
  "plugins": [
    "react-hooks",
    "@typescript-eslint",
    "testing-library",
    "jest-dom",
    "jsx-a11y",
    "simple-import-sort"
  ],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": ["apps/*/tsconfig.json"]
      }
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "rules": {
    "no-unused-vars": "error",
    "arrow-body-style": ["error", "as-needed"],
   "react/self-closing-comp": ["error", { "component": true, "html": true }],
    "@typescript-eslint/no-unused-vars": "error",
    "no-else-return": "error",
    "no-console": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-unneeded-ternary": "error",
    "import/no-extraneous-dependencies": [2, { "devDependencies": true }],
    "import/no-unresolved": "error"
  },
  "overrides": [
    // Only use Testing Library lint rules in jest test files
    {
      "files": ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
      "extends": ["plugin:testing-library/react"],
      "env": { "jest": true }
    },
    // use Cypress lint rules in Cypress test files
    {
      "files": ["cypress/e2e/**/*.cy.js", "cypress/support/*"],
      "extends": ["plugin:cypress/recommended"],
      "env": { "cypress/globals": true }
    }
  ],
  "ignorePatterns": [
    "node_modules",
    "public",
    "styles",
    ".next",
    "coverage",
    "dist",
    ".turbo"
  ]
}
