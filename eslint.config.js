const eslint = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')

module.exports = [
    eslint.configs.recommended,
    {
        ignores: ['**/generated/**', 'src/generated/**'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                global: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearTimeout: 'readonly',
                clearInterval: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
            'react/react-in-jsx-scope': 'off', // Not needed with React 17+
            'no-undef': 'off', // TypeScript handles this
            'no-unused-vars': 'off', // Use TypeScript version instead
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
        languageOptions: {
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                global: 'readonly',
            },
        },
    },
]