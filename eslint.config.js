import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintPluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig(
  {
    name: 'global/ignores',
    ignores: ['**/node_modules/**', '**/dist/**', '**/out/**', 'src/**/*.{js,jsx}']
  },

  tseslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser
      }
    }
  },

  {
    name: 'main',
    files: ['src/main/**/*.{ts,mts,cts}'],
    languageOptions: {},
    rules: {}
  },

  {
    name: 'preload',
    files: ['src/preload/**/*.{ts,mts,cts}'],
    rules: {}
  },

  {
    name: 'renderer',
    files: ['src/renderer/**/*.{ts,tsx,mts,vue}'],
    ignores: [],
    rules: {
      'no-undef': 'off',
      'no-irregular-whitespace': 'off',
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' }
        }
      ]
    }
  },

  {
    name: 'renderer/pages',
    files: ['src/renderer/src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  {
    name: 'global/rules',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off'
    }
  },

  eslintConfigPrettier,
  skipFormatting
)
