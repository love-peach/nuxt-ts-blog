module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  globals: {
    Vue: true,
    Vuex: true,
  },
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 200, // 换行字符串阈值
        semi: true, // 句末加分号
        singleQuote: true, // 用单引号
        trailingComma: 'es5', // 最后一个对象元素加逗号
        bracketSpacing: true, // 对象，数组加空格
        jsxBracketSameLine: false, // jsx > 是否另起一行
        arrowParens: 'avoid', // (x) => {} 是否要有小括号
        proseWrap: 'preserve', // 是否要换行
      },
    ],
  }
}
