module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error'],
    'no-underscore-dangle': ['off'],
    'class-methods-use-this': ['off'],
    'import/no-extraneous-dependencies': 'off',
    'max-classes-per-file': 'off',
  },
};
