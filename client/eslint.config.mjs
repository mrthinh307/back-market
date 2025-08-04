import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';

export default antfu(
  {
    react: true,
    typescript: true,

    // Configuration preferences
    lessOpinionated: true,
    isInEditor: false,

    // Code style
    stylistic: {
      semi: true,
    },

    // Format settings
    formatters: {
      css: true,
    },

    // Ignored paths
    ignores: ['migrations/**/*'],
  },
  // --- Next.js Specific Rules ---
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  // --- Accessibility Rules ---
  jsxA11y.flatConfigs.recommended,
  // --- Testing Rules ---
  {
    files: ['**/*.test.ts?(x)'],
    ...jestDom.configs['flat/recommended'],
  },
  // --- E2E Testing Rules ---
  {
    files: ['**/*.spec.ts', '**/*.e2e.ts'],
    ...playwright.configs['flat/recommended'],
  },
  // --- Custom Rule Overrides ---
  {
    rules: {
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'test/padding-around-all': 'error', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
      'style/jsx-quotes': 'off', // JSX code
      'no-console': 'off', // Allow console logs
      'style/multiline-ternary': 'off',
      'perfectionist/sort-imports': 'on', // Enable sorting of imports
      'perfectionist/sort-named-imports': 'on', // Enable sorting of named imports
      'perfectionist/sort-exports': 'off', // Disable sorting of exports
      'style/jsx-closing-tag-location': 'off', // Disable closing tag location rule
      'style/no-trailing-spaces': 'off', // Disable trailing spaces rule
      'style/arrow-parens': 'off', // Disable arrow parens rule
      'prefer-arrow-callback': 'off', // Disable prefer arrow callback rule
      'style/jsx-curly-newline': 'off', // Disable JSX curly newline rule
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off', // Disable direct set state in useEffect
      'style/operator-linebreak': 'off', // Disable operator linebreak rule
      'style/jsx-one-expression-per-line': 'off', // Disable one expression per line in JSX
    },
  },
);
