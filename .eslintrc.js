module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  rules:{
    "@typescript-eslint/prefer-optional-chain": "error"
  }
}
