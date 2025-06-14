import filenameRules from 'eslint-plugin-filename-rules';
import importHelpers from 'eslint-plugin-import-helpers';
import importPlugin from 'eslint-plugin-import';
import nx from '@nx/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default {
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    plugins: {
        '@nx': nx,
        '@typescript-eslint': typescriptEslint,
        'import-helpers': importHelpers,
        'import': importPlugin,
        'prettier': prettier,
        'filename-rules': filenameRules,
    },
    rules: {
        '@typescript-eslint/indent': 'off',
        'no-case-declarations': 'error',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'default-case': ['error', { commentPattern: '^no-default' }],
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false, classes: true, variables: true, typedefs: true },
        ],
        'no-param-reassign': ['error', { props: false }],
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-function-type': 'warn',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                prefix: ['I'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid',
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
                prefix: ['T'],
                leadingUnderscore: 'forbid',
                trailingUnderscore: 'forbid',
            },
        ],
        'import-helpers/order-imports': [
            2,
            {
                groups: ['module', 'parent', ['sibling', 'index']],
                newlinesBetween: 'always',
                alphabetize: {
                    order: 'asc',
                    ignoreCase: true,
                },
            },
        ],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        '@typescript-eslint/restrict-template-expressions': 'off',

        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-unused-expressions': 'error',
    },
};
