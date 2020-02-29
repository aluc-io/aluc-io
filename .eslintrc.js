module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "google",
    //"prettier",
    //"prettier/react",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  //"plugins": ["prettier", "react", "jsx-a11y", "import", "graphql"],
  "plugins": ["react", "import", "graphql"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "arrow-body-style": "off",
    "camelcase": "warn",
    "func-names": "off",
    "global-require": "warn",
    "semi": ["warn", "never"],
    "import/no-dynamic-require": "warn",
    "import/no-extraneous-dependencies": "off",
    "object-curly-spacing": "off",
    "no-multi-spaces": "off",
    "no-console": "off",
    "quotes": "off",
    "max-len": "off",
    "operator-linebreak": "off",
    "no-multi-assign": "off",
    "no-param-reassign": "warn",
    "no-plusplus": "off",
    "no-shadow": "warn",
    "no-underscore-dangle": "warn",
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "no-nested-ternary": "off",
    "no-unused-vars": "warn",
    "prefer-destructuring": "off",
    //"prettier/prettier": ["error"],
    "react/jsx-uses-vars": "error"
  },
  "overrides": [
    {
      "files": ["*.spec.js", "*.integration.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}

