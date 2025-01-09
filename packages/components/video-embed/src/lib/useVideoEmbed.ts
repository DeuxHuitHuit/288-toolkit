import { videoEmbedContext } from './videoEmbed.svelte.js';

export const useVideoEmbed = () => {
	return videoEmbedContext.get();
};
