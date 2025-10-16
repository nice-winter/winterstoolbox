import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueParser from 'vue-eslint-parser'

// 1) 使用 flat config 风格（多个对象按顺序合并），保持 electron-toolkit 的推荐配置。
// 2) 针对不同目录（main / preload / renderer）做明确的 files 区分，避免规则相互干扰。
// 3) 为 .vue 文件单独设置 vue-eslint-parser，并透传 TypeScript parser（tseslint.parser）。
// 4) 保留 Prettier 的配置与 skip-formatting，以避免与格式化工具冲突。

export default defineConfig(
  // 全局忽略路径
  { ignores: ['**/node_modules/**', '**/dist/**', '**/out/**', 'src/**/*.{js,jsx}'] },

  // electron toolkit 推荐的 TypeScript 配置（包含 parser 等）
  tseslint.configs.recommended,

  // Vue 推荐（flat）配置
  eslintPluginVue.configs['flat/recommended'],

  // 针对 *.vue 文件使用 vue-eslint-parser，并指定内部 script 使用 ts-eslint 的 parser
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

  // main 进程代码（Node 环境）
  {
    name: 'main',
    files: ['src/main/**/*.{ts,mts,cts}'],
    languageOptions: {
      // main 通常是 Node 环境，若需要可加 env 或 global variables
    },
    rules: {
      // 针对 main 的例子：允许未使用的变量（根据项目决定），这里保持默认
    }
  },

  // preload：既有 Node 又与 renderer 接壤，单独列出以便将来细化
  {
    name: 'preload',
    files: ['src/preload/**/*.{ts,mts,cts}'],
    rules: {
      // 如需特定规则可以在这里覆盖
    }
  },

  // renderer：Vite + Vue 前端代码
  {
    name: 'renderer',
    files: ['src/renderer/**/*.{ts,tsx,mts,vue}'],
    ignores: [],
    rules: {
      // Vite/define 等可能导致 no-undef 报错，按需关闭
      'no-undef': 'off'
    }
  },

  // 针对 pages 等特殊路径关闭单文件组件多词命名限制（比如页面组件只用单词时）
  {
    name: 'renderer/pages',
    files: ['src/renderer/src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  // 通用规则（TypeScript + Vue）——对整个项目生效
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
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

  // Prettier 相关：让 prettier 与 eslint 共存
  eslintConfigPrettier,
  skipFormatting
)
