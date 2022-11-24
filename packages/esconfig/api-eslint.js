module.exports ={
    "extends": [
      "airbnb",
      "airbnb-typescript",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "turbo",
      "prettier",
    ],
    "plugins": [
      "@typescript-eslint",
      "testing-library",
      "jest-dom",
      "import ",
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
      "no-else-return": "error",
      "no-console": "warn",
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
    ],
    "ignorePatterns": [
      "node_modules",
      "coverage",
      "dist",
      ".turbo"
    ]
  }
  