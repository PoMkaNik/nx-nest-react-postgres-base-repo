module.exports = {
    extends: ['airbnb-typescript', 'plugin:react/recommended', 'airbnb/hooks', './base.eslintrc.js'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
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
    },
};
