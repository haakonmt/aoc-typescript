import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
}, {
  rules: {
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
  },
})
