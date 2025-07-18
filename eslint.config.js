import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ['js/recommended', prettier],
    rules: {
      // "semi": "error"
    },
  },
]);
