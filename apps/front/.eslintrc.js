module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'next',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'arrow-body-style': 0,
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    'consistent-return': 0,
    'default-case': 0,
    'no-restricted-exports': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'no-void': 0,
    // メディアのキャプションについての設定
    'jsx-a11y/media-has-caption': 0,
    'jsx-a11y/anchor-is-valid': 0,
    // onClickなどに直接async functionを渡せるようにする
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    'react/jsx-props-no-spreading': 0,
  },
  ignorePatterns: ['.eslintrc.*', '*.config.*'],
}
