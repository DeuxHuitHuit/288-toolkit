import eslint from '@eslint/js';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
	{
		ignores: ['**/.*', '**/node_modules/**', '.vercel', '.sveltekit', '**/dist/**/*']
	},
	eslint.configs.recommended,
	...tsEslint.configs.recommended,
	...tsEslint.configs.stylistic,
	...eslintPluginSvelte.configs['flat/prettier'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsEslint.parser
			}
		}
	},
	{
		files: ['**/*.ts', '**/*.js'],
		languageOptions: {
			parser: tsEslint.parser
		}
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_+$', varsIgnorePattern: '^\\$\\$(Props|Events|Slots)|_+$' }
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/array-type': 'off',
			'@typescript-eslint/consistent-indexed-object-style': 'off',
			'@typescript-eslint/prefer-for-of': 'off',
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-undef': 'off',
			'no-implied-eval': 'error',
			'no-eval': 'error',
			curly: 'error'
		}
	}
);
