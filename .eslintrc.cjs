module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/stylistic',
		'plugin:svelte/recommended',
		'prettier'
	],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_+$', varsIgnorePattern: '^\\$\\$(Props|Events|Slots)$' }
		],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-undef': 'off',
		'no-implied-eval': 'error',
		'no-eval': 'error',
		curly: 'error',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/consistent-indexed-object-style': 'off',
		'@typescript-eslint/prefer-for-of': 'off',
		'svelte/no-at-html-tags': 'off'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
