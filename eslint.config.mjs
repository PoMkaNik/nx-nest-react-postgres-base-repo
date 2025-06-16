import nx from '@nx/eslint-plugin';
import { react, nestjs, base } from './libs/eslint-plugin/src/flat-configs.mjs';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: ['**/dist', '**/node_modules', '**/tmp'],
    },

    // Базовые правила для всех файлов
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },

    // Общие библиотеки (common, sdk) - базовая конфигурация
    {
        files: ['libs/common/**/*.ts', 'libs/common/**/*.tsx', 'libs/common/**/*.js', 'libs/common/**/*.jsx',
            'libs/sdk/**/*.ts', 'libs/sdk/**/*.tsx', 'libs/sdk/**/*.js', 'libs/sdk/**/*.jsx'],
        ...base,
        languageOptions: {
            ...base.languageOptions,
            parserOptions: {
                ...base.languageOptions.parserOptions,
                project: ['libs/common/tsconfig*.json', 'libs/sdk/tsconfig*.json'],
            },
        },
    },

    // NestJS библиотека (nest-shared) - nestjs конфигурация
    {
        files: ['libs/nest-shared/**/*.ts', 'libs/nest-shared/**/*.tsx', 'libs/nest-shared/**/*.js', 'libs/nest-shared/**/*.jsx'],
        ...nestjs,
        languageOptions: {
            ...nestjs.languageOptions,
            parserOptions: {
                ...nestjs.languageOptions.parserOptions,
                project: ['libs/nest-shared/tsconfig*.json'],
            },
        },
        rules: {
            ...nestjs.rules,
            // Специальные правила для файлов миграций
            'filename-rules/match': 'off', // отключаем глобально, включим только для миграций
        },
    },

    // Специальные правила для файлов миграций в nest-shared
    {
        files: ['libs/nest-shared/**/migrations/**/[0-9][0-9]*-[A-Z][a-zA-Z0-9]*.ts'],
        rules: {
            'filename-rules/match': 'off',
        },
    },

    // React проекты (автоматически для всех fe-* приложений)
    {
        files: ['apps/fe-*/**/*.ts', 'apps/fe-*/**/*.tsx', 'apps/fe-*/**/*.js', 'apps/fe-*/**/*.jsx'],
        ignores: ['**/webpack.config.js', '**/*.config.js'],
        ...react,
        languageOptions: {
            ...react.languageOptions,
            parserOptions: {
                ...react.languageOptions.parserOptions,
                project: ['apps/fe-*/tsconfig*.json'],
            },
        },
    },

    // NestJS проекты (автоматически для всех be-* приложений)
    {
        files: ['apps/be-*/**/*.ts', 'apps/be-*/**/*.tsx', 'apps/be-*/**/*.js', 'apps/be-*/**/*.jsx'],
        ignores: ['**/webpack.config.js', '**/*.config.js'],
        ...nestjs,
        languageOptions: {
            ...nestjs.languageOptions,
            parserOptions: {
                ...nestjs.languageOptions.parserOptions,
                project: ['apps/be-*/tsconfig*.json'],
            },
        },
    },

    // Простые правила для конфигурационных файлов
    {
        files: ['**/webpack.config.js', '**/*.config.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
];
