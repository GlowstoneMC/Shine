module.exports = {
  "extends": "standard",
  "plugins": [
    "standard",
    "promise"
  ],
  "rules": {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "ignore",
      "asyncArrow": "ignore"
    }]
  }
};
