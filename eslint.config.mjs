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
    { ignores: [
        '**/dist/*', 
        'node_modules/*', 
        'services/postgres/data/**',     
        "**/dist/**",
        "node_modules/**",
        "**/playwright-report/**",
        "**/coverage/**",
        "**/reports/**",
        "**/*.json"
        ] 
    },
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
      
            '@typescript-eslint/no-unused-vars': 'off',
            'prettier/prettier': 'error',
            'no-unused-vars': 'off',
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-warning-comments': 'off',
            '@typescript-eslint/consistent-type-imports': 'off',
            '@typescript-eslint/no-explicit-any':'warn'

        },
    },
    // Frontend
    {
        files: ['apps/webapp/**/*.{js, jsx, ts, tsx}'],
        plugins: {
            react,
            'react-refresh': reactRefresh,
            'react-hooks':reactHooks,
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
             // Règles React Hooks recommandées
            ...reactHooks.configs.recommended.rules,
            // Règles React Refresh
            'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
            ],
            // Shadcn 
            '@typescript-eslint/no-unsafe-return': 'off', 
            '@typescript-eslint/ban-ts-comment': 'off', 
            '@typescript-eslint/no-explicit-any': 'warn', 
            // typescript
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                },
            ],  
            // React
            'react/function-component-definition': [
                'off',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],  
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',      
            'no-unused-vars': 'warn'
        },
    },
    // Backend
    {
        files: ['apps/api/**/*.{js, jsx, ts, tsx}'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true, 
                    allowTypedFunctionExpressions: false,
                    allowHigherOrderFunctions: false,
                },
            ],
        },
    },
    // DTOs
    {
        files: ['packages/dtos/**/*.{js, jsx, ts, tsx}'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true, 
                    allowTypedFunctionExpressions: false,
                    allowHigherOrderFunctions: false,
                },
            ],
        },
    },
];
