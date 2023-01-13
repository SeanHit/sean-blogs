module.exports = {
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "prettier",
      "prettier/@typescript-eslint", 
      "eslint:recommended",
      "plugin:react/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
     "project": "./tsconfig.json",
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "prettier/prettier": [
        "error",
        {
          "singleQuote": true,
          "bracketSameLine": false,
          "trailingComma": "es5",
          "printWidth": 100
        }
      ],
  }
}