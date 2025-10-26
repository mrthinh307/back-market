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
      'curly': 'off', // Disable curly rule
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'test/padding-around-all': 'error', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
      'style/jsx-quotes': 'off', // JSX code
      'ts/consistent-type-definitions': 'off', // Disable consistent type definitions rule
      'ts/consistent-type-imports': 'off', // Disable consistent type imports rule
      'no-console': 'off', // Allow console logs
      'style/multiline-ternary': 'off',
      'style/comma-dangle': 'off', // Disable comma dangle rule
      'style/jsx-closing-tag-location': 'off', // Disable closing tag location rule
      'style/no-trailing-spaces': 'off', // Disable trailing spaces rule
      'style/arrow-parens': 'off', // Disable arrow parens rule
      'style/eol-last': 'off', // Disable newline at end of file rule
      'prefer-arrow-callback': 'off', // Disable prefer arrow callback rule
      'style/jsx-curly-newline': 'off', // Disable JSX curly newline rule
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off', // Disable direct set state in useEffect
      'react/no-array-index-key': 'off', // Disable array index key rule
      'style/operator-linebreak': 'off', // Disable operator linebreak rule
      'style/jsx-one-expression-per-line': 'off', // Disable one expression per line in JSX
      'style/quotes': 'off', // Disable quotes rule
      'style/indent': 'off', // Disable indent rule
      'style/indent-binary-ops': 'off', // Disable indent binary operators rule
      'import/consistent-type-specifier-style': 'off', // Disable consistent type specifier style
      'perfectionist/sort-named-imports': 'off', // Disable sorting named imports
      'perfectionist/sort-imports': 'off', // Disable sorting imports
      'perfectionist/sort-type-imports': 'off', // Disable sorting type imports
      'perfectionist/sort-named-exports': 'off', // Disable sorting exports
      'perfectionist/sort-exports': 'off', // Disable sorting exports
    },
  },
);
