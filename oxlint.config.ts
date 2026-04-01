import type { OxlintConfig } from 'oxlint';

export default {
  plugins: ['react', 'typescript', 'jsx-a11y'],

  ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}', '.next'],

  rules: {
    'typescript/ban-ts-comment': 'off',
    'typescript/no-empty-object-type': 'off',
    'typescript/no-explicit-any': 'off',
    'typescript/no-namespace': 'off',
    'typescript/no-unsafe-function-type': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
} satisfies OxlintConfig;
