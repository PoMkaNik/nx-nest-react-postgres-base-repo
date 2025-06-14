import baseConfig from './base.flat.mjs';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    'react': react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...baseConfig.rules,
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/prop-types': [0],
    'react/react-in-jsx-scope': 'off',
    'import-helpers/order-imports': [
      2,
      {
        groups: ['/^react(-dom)?$/', 'module', 'parent', ['sibling', 'index']],
        newlinesBetween: 'always',
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/jsx-key': ['error', { checkFragmentShorthand: true, warnOnDuplicates: true }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@mui/icons-material', '!@mui/icons-material/'],
            message: 'Please use import IconName @mui/icons-material/[icon-name] instead.',
          },
        ],
      },
    ],
    'import/no-duplicates': 'error',

    // Базовые React правила
    'react/display-name': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/require-render-return': 'error',
  },
};
