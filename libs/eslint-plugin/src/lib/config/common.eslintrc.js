module.exports = {
    extends: ['./base.eslintrc.js'],
    plugins: ['unused-imports'],
    rules: {
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
        'prettier/prettier': ['warn', { singleQuote: true, endOfLine: 'auto', tabWidth: 4, printWidth: 120 }],
        'max-len': [
            'error',
            { code: 120, tabWidth: 4, comments: 120, ignorePattern: '^import [^,]+ from |^export | implements' },
        ],
    },
};
