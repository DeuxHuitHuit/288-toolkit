import { Config } from './types';

let config: Config;

export const defineConfig = (c: Config) => {
	config = c;
};

export const getConfig = () => {
	if (!config) {
		throw new Error(
			'288 Toolkit config is not defined. Use `defineConfig` inside `src/hooks.ts` to set it.'
		);
	}
	return config;
};
