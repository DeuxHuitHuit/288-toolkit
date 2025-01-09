export * from './VimeoEmbed.svelte';
export * from './YoutubeEmbed.svelte';
export * as VideoEmbed from './exports.js';
export * from './useVideoEmbed.js';
export * from './vimeo.js';
export * from './vimeoThumbnailHandler.js';
export * from './youtube.js';

/**
 * @deprecated Use `VideoEmbed.Root` instead.
 */
export { default as EmbedPlayButton } from './EmbedPlayButton.svelte';
/**
 * @deprecated Use `VideoEmbed.ProviderSelector` instead.
 */
export { default as EmbedSelector } from './EmbedSelector.svelte';
/**
 * @deprecated Use `VideoEmbed.Thumbnail` instead.
 */
export { default as EmbedThumbnail } from './EmbedThumbnail.svelte';
/**
 * @deprecated Use `VideoEmbed.Vimeo` instead.
 */
export { default as VimeoEmbed } from './VimeoEmbed.svelte';
/**
 * @deprecated Use `VideoEmbed.Youtube` instead.
 */
export { default as YoutubeEmbed } from './YoutubeEmbed.svelte';
