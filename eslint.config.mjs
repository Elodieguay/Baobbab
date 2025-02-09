import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
    // Conf js par défaut
    eslint.configs.recommended,
    // Configuration TS par défaut
    ...tseslint.configs.recommended,
    // Common
    { ignores: ['**/dist/*', 'node_modules/*', 'services/postgres/data/**'] },

    
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            tsPlugin,
            prettier,
        },
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.node,
                myCustomGlobal: 'readonly',
            },
            parser: tsParser,
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': [
                "error",
                {
                    "allowExpressions": true, 
                    "allowTypedFunctionExpressions": true, 
                    "allowHigherOrderFunctions": true
                }
            ],
            '@typescript-eslint/no-unused-vars': 'off',
            'prettier/prettier': 'error',
            'no-unused-vars': 'off',
            'no-console': 'off',
            'no-warning-comments': 'off',
            '@typescript-eslint/consistent-type-imports': 'off',
        },
    },
    // Frontend
    {
        files: ['apps/webapp/**/*.{js, jsx, ts, tsx}'],
        plugins: {
            react,
            'react-refresh': reactRefresh,
            reactHooks,
        },
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                myCustomGlobal: 'readonly',
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            'react-refresh/only-export-components': 'warn',
            '@typescript-eslint/explicit-function-return-type':'off', 
        },
    },
    // Backend
    {
        files: ['apps/api/**/*.{js, jsx, ts, tsx}'],
    },
    // DTOs
    {
        files: ['packages/dtos/**/*.{js, jsx, ts, tsx}'],
    },
];
