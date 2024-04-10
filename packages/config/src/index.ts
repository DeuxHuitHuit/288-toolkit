import { Config } from './types';

let config: Config;

export const defineConfig = (c: Config) => {
	config = c;
};

export const getConfig = () => config;
