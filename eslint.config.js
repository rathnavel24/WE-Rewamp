import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/**
 * Layer rules (see docs/ARCHITECTURE.md). Each folder may only import "downwards":
 *   app → pages → features → components/layout → components/ui → hooks/context → content → api → config/lib/types
 */
const ban = (...groups) => ({
  'no-restricted-imports': [
    'error',
    {
      patterns: groups.map(([pattern, message]) =>
        pattern instanceof RegExp ? { regex: pattern.source, message } : { group: [pattern], message }
      )
    }
  ]
});

const NO_APP = ['@/app/**', 'The app shell is the top layer — nothing imports from it.'];
const NO_PAGES = ['@/pages/**', 'Only src/app imports pages. Move shared UI to components/ or features/.'];
const NO_FEATURES = ['@/features/**', 'Only pages and the app shell compose features.'];
const NO_FEATURE_INTERNALS = ['@/features/*/*', 'Import a feature through its index: @/features/<name>.'];
const NO_LAYOUT = ['@/components/layout/**', 'Layout is site chrome — only the app shell and pages use it.'];
const NO_CONTENT = ['@/content/**', 'The UI kit is content-free: pass content in as props.'];

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      eqeqeq: ['error', 'smart'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      ...ban(NO_APP, NO_FEATURE_INTERNALS)
    }
  },
  // Layer boundaries
  {
    files: ['src/pages/**'],
    // A page may render the shared 404 (e.g. for an unknown venture id), but no other page.
    rules: ban(NO_APP, NO_FEATURE_INTERNALS, [/^@\/pages\/(?!NotFound\/)/, NO_PAGES[1]])
  },
  { files: ['src/features/**'], rules: ban(NO_APP, NO_PAGES, NO_LAYOUT) },
  { files: ['src/components/layout/**'], rules: ban(NO_APP, NO_PAGES, NO_FEATURES) },
  { files: ['src/components/ui/**'], rules: ban(NO_APP, NO_PAGES, NO_FEATURES, NO_LAYOUT, NO_CONTENT) },
  {
    files: [
      'src/hooks/**',
      'src/context/**',
      'src/content/**',
      'src/api/**',
      'src/config/**',
      'src/lib/**',
      'src/types/**'
    ],
    rules: ban(NO_APP, NO_PAGES, NO_FEATURES, NO_LAYOUT, [
      '@/components/**',
      'Low-level modules must not depend on components.'
    ])
  },
  // Node-side config files
  { files: ['*.config.{js,ts}'], languageOptions: { globals: globals.node } },
  // Tests may reach into internals.
  { files: ['**/*.test.{ts,tsx}'], rules: { 'no-restricted-imports': 'off' } }
);
