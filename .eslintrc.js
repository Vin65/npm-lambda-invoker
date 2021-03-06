module.exports = {
  "env": {
    "es6": true,
    "mocha": true
  },
  "globals": {
    "expect": true
  },
  "extends": "standard",
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "mocha",
    "chai-expect"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ]
  }
};