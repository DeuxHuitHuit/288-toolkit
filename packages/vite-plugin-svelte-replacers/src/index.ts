import { createFilter } from '@rollup/pluginutils';
import chalk from 'chalk';
import { EventEmitter } from 'events';
import path from 'path';
import type { Options } from 'svelte-preprocess/dist/types';
import type { Plugin, ResolvedConfig } from 'vite';

type Replacer = Record<'js' | 'html', Options.Replace[number]>;

const WARN = chalk.black.bgYellow('▲ [WARNING]');
const BACKSLASH_N = '\n'.charCodeAt(0);

const emptyLines = (match: string) => new Array(match.split('\n').length - 1).fill('\n').join('');

const reverseCountLines = (code: string, offset: number) => {
	let line = 1;
	for (let i = offset; i >= 0; i--) {
		if (code.charCodeAt(i) === BACKSLASH_N) {
			line++;
		}
	}
	return line;
};

const whenDevReplacer =
	(production: boolean, e?: EventEmitter) =>
	(match: string, devPart: string, prodPart: string, offset: number, code: string) => {
		const line = reverseCountLines(code, offset);
		const height = reverseCountLines(
			production ? devPart : prodPart,
			production ? devPart.length - 1 : prodPart.length - 1
		);
		const end = line + height;
		e?.emit('whenDev', {
			offset,
			line,
			end,
			removed: production ? devPart : prodPart,
			kept: production ? prodPart : devPart
		});

		return match.replace(
			production ? devPart : prodPart,
			emptyLines(production ? devPart : prodPart)
		);
	};
const ifDevReplacer =
	(production: boolean, e?: EventEmitter) =>
	(match: string, p1: string, offset: number, code: string) => {
		if (!production) {
			return match;
		}

		const line = reverseCountLines(code, offset);
		const height = reverseCountLines(p1, p1.length - 1);
		const end = line + height;
		e?.emit('ifDev', {
			offset,
			line,
			height,
			end,
			removed: p1
		});

		return emptyLines(match);
	};
const ifNotDevReplacer =
	(production: boolean, e?: EventEmitter) =>
	(match: string, p1: string, offset: number, code: string) => {
		if (production) {
			return match;
		}

		const line = reverseCountLines(code, offset);
		const height = reverseCountLines(p1, p1.length - 1);
		const end = line + height;
		e?.emit('ifNotDev', {
			offset,
			line,
			height,
			end,
			removed: p1
		});

		return emptyLines(match);
	};

const deprecatedCodeReplacer =
	(buildWithDeprecatedApi: boolean, e?: EventEmitter) =>
	(match: string, p1: string, offset: number, code: string) => {
		if (buildWithDeprecatedApi) {
			return match;
		}
		const line = reverseCountLines(code, offset);
		const height = reverseCountLines(p1, p1.length - 1);
		const end = line + height;
		e?.emit('deprecated', { offset, line, height, end, deprecated: match });

		// Replace deprecated code with new line characters, to preserve line numbers
		return emptyLines(match);
	};

type DevReplacerOptions = { production: boolean };
export const whenDev = (options: DevReplacerOptions, e?: EventEmitter) =>
	({
		html: [
			/<!--#when dev-->(?!(?:#when dev|:else|\/when))(.+?)<!--:else-->(?!(?:#when dev|:else|\/when))(.+?)<!--\/when-->/gis,
			whenDevReplacer(options.production, e)
		],
		js: [
			/\/\/#when dev(?!(?:#when dev|:else|\/when))(.+?)\/\/:else(?!(?:#when dev|:else|\/when))(.+?)\/\/\/when/gis,
			whenDevReplacer(options.production, e)
		]
	}) satisfies Replacer;
export const ifDev = (options: DevReplacerOptions, e?: EventEmitter) =>
	({
		html: [
			/<!--#if dev-->(?!(?:#if dev|\/if))(.*?)<!--\/if-->/gis,
			ifDevReplacer(options.production, e)
		],
		js: [
			/\/\/#if dev(?!(?:#if dev|\/if))(.*?)\/\/\/if/gis,
			ifDevReplacer(options.production, e)
		]
	}) satisfies Replacer;
export const ifNotDev = (options: DevReplacerOptions, e?: EventEmitter) =>
	({
		html: [
			/<!--#ifnot dev-->(?!(?:#ifnot dev|\/ifnot))(.*?)<!--\/ifnot-->/is,
			ifNotDevReplacer(options.production, e)
		],
		js: [
			/\/\/#ifnot dev(?!(?:#ifnot dev|\/ifnot))(.*?)\/\/\/ifnot/gis,
			ifNotDevReplacer(options.production, e)
		]
	}) satisfies Replacer;

type DeprecatedReplacerOptions = { buildWithDeprecatedApi: boolean };
export const deprecated = (options: DeprecatedReplacerOptions, e?: EventEmitter) =>
	({
		html: [
			/[\s]*<!--[\s*]*?@deprecated(?!(?:@deprecated|@enddeprecated))(.*?)<!--\s*@enddeprecated\s*-->/gis,
			deprecatedCodeReplacer(options.buildWithDeprecatedApi, e)
		],
		js: [
			/[\s]*\/\*\*[\s*]*?@deprecated(?!(?:@deprecated|@enddeprecated))(.*?)\/\*\*?\s*@enddeprecated\s*\*\//gis,
			deprecatedCodeReplacer(options.buildWithDeprecatedApi, e)
		]
	}) satisfies Replacer;

export const createReplacers = (
	options?: Partial<DevReplacerOptions & DeprecatedReplacerOptions>,
	e?: EventEmitter
) => {
	const _options = {
		production: false,
		buildWithDeprecatedApi: false,
		...(options || {})
	};
	const _whenDev = whenDev(_options, e);
	const _ifDev = ifDev(_options, e);
	const _ifNotDev = ifNotDev(_options, e);
	const _deprecated = deprecated(_options, e);
	return [
		// Support preprocessor conditional code
		// which allows us to remove/replace content from production build
		// NOTE: The order IS important, the keywords NEED to be different
		_whenDev.html,
		_ifDev.html,
		_ifNotDev.html,
		_deprecated.html,
		_whenDev.js,
		_ifDev.js,
		_ifNotDev.js,
		_deprecated.js
	] satisfies Options.Replace;
};

type IncludeExcludePatterns = string | RegExp | (string | RegExp)[];
export type SvelteReplacersOptions = {
	include?: IncludeExcludePatterns;
	exclude?: IncludeExcludePatterns;
} & Partial<DevReplacerOptions & DeprecatedReplacerOptions>;

/**
 * A simple reducer to apply the replacers to the code.
 * @param acc The accumulator
 * @param [regex, replacement] The regex and replacement from `createReplacers()`.
 */
export const reducer = (
	acc: string,
	[regex, replacement]: [RegExp, Exclude<Options.Replace[number][1], string>]
) => acc.replace(regex, replacement);

/**
 * Quick transform function to remove/replace content from production build.
 * Creates the replacers and applies them to the code.
 * @param code The code to transform
 * @param options The options to use
 */
export const transform = (
	code: string,
	options?: Partial<DevReplacerOptions & DeprecatedReplacerOptions>
) => createReplacers(options).reduce(reducer, code);

type Transformer = {
	transform: (code: string, id: string) => string;
	closeBundle?: () => void;
};

const createBuildTransformer = (
	config: ResolvedConfig,
	options?: Partial<DevReplacerOptions & DeprecatedReplacerOptions>
) => {
	const e = new EventEmitter();
	const replacers = createReplacers(options, e);
	const messages = new Set<string>();
	let id: string;
	e.on('whenDev', ({ line, end, removed, kept }) => {
		if (removed) {
			messages.add(
				`\n${WARN} Removed "when dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}\n${chalk.gray(removed)}\n`
			);
		}
		if (kept) {
			messages.add(
				`\n${WARN} Kept "when dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}\n${chalk.gray(kept)}\n`
			);
		}
	});
	e.on('ifDev', ({ line, end, removed }) => {
		if (removed) {
			messages.add(
				`\n${WARN} Removed "if dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}\n${chalk.gray(removed)}\n`
			);
		}
	});
	e.on('ifNotDev', ({ line, end, removed }) => {
		if (removed) {
			messages.add(
				`\n${WARN} Removed "if not dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}\n${chalk.gray(removed)}\n`
			);
		}
	});
	e.on('deprecated', ({ line, end, deprecated }) => {
		messages.add(
			`\n${WARN} Removed deprecated code in ${chalk.yellow(id)}:${chalk.gray(
				`${line}-${end}`
			)}\n${chalk.gray(deprecated)}\n`
		);
	});

	return {
		transform: (code: string, _id: string) => {
			id = path.relative(config.root, _id);
			return replacers.reduce(reducer, code);
		},
		closeBundle: () => {
			for (const message of messages) {
				config.logger.warnOnce(message);
			}
		}
	} satisfies Transformer;
};

const createServeTransformer = (
	config: ResolvedConfig,
	options?: Partial<DevReplacerOptions & DeprecatedReplacerOptions>
) => {
	const e = new EventEmitter();
	const replacers = createReplacers(options, e);
	let id: string;
	e.on('whenDev', ({ line, end, removed }) => {
		if (removed) {
			config.logger.warnOnce(
				`${WARN} Removed "when dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}`
			);
		}
	});
	e.on('ifDev', ({ line, end, removed }) => {
		if (removed) {
			config.logger.warnOnce(
				`${WARN} Removed "if dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}`
			);
		}
	});
	e.on('ifNotDev', ({ line, end, removed }) => {
		if (removed) {
			config.logger.warnOnce(
				`${WARN} Removed "if not dev" code in ${chalk.yellow(id)}:${chalk.gray(
					`${line}-${end}`
				)}`
			);
		}
	});
	e.on('deprecated', ({ line, end }) => {
		config.logger.warnOnce(
			`${WARN} Removed deprecated code in ${chalk.yellow(id)}:${chalk.gray(`${line}-${end}`)}`
		);
	});
	return {
		transform: (code: string, _id: string) => {
			id = path.relative(config.root, _id).replace('src/lib', '$lib');
			return replacers.reduce(reducer, code);
		}
	} satisfies Transformer;
};

/**
 * Svelte replacers plugin for Vite.
 * This plugin allows you to remove/replace content from production build.
 * IMPORTANT: Must be called *before* the sveltekit plugin.
 *
 * @param options - Options for the plugin. Everything is optional.
 * @param options.include - Include patterns
 * @param options.exclude - Exclude patterns
 * @param options.production - Production mode
 * @param options.buildWithDeprecatedApi - Build with deprecated API
 * @returns Vite plugin
 */
export const vitePluginSvelteReplacers = (options?: SvelteReplacersOptions) => {
	let transformer: Transformer;
	const userDefinedFilters = createFilter(options?.include, options?.exclude);
	const forcedFilters = createFilter(
		['./src/**/*.svelte', './src/**/*.html', './src/**/*.ts', './src/**/*.js'],
		['node_modules/**', 'vite/**']
	);

	return {
		name: 'svelte-replacers',
		enforce: 'pre',
		configResolved(config) {
			// Create the proper transformer
			transformer =
				config.command === 'serve'
					? createServeTransformer(config, options)
					: createBuildTransformer(config, options);
		},
		transform(code, id, _) {
			// Only process some files
			if (!userDefinedFilters(id) || !forcedFilters(id)) {
				return;
			}
			// Replace everything
			return transformer.transform(code, id);
		},
		closeBundle() {
			// Allow logging to happen
			transformer.closeBundle?.();
		}
	} satisfies Plugin;
};
