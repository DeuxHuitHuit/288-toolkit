import type { Maybe } from '@288-toolkit/types';
import { Context } from 'runed';

export class VideoEmbedApi {
	#playing = $state(false);
	#preconnect = $state(false);
	#url = $state<Maybe<string> | undefined>(undefined);

	constructor(url?: Maybe<string>) {
		this.#url = url;
	}

	/**
	 * Request preconnect
	 */
	requestPreconnect = () => {
		this.#preconnect = true;
	};

	/**
	 * Play the video
	 */
	play = () => {
		this.#playing = true;
	};

	/**
	 * The URL of the video
	 */
	get url() {
		return this.#url;
	}

	/**
	 * Indicates if preconnect has been requested
	 */
	get playing() {
		return this.#playing;
	}

	/**
	 * Indicates if the video is currently playing
	 */
	get preconnect() {
		return this.#preconnect;
	}
}

export const videoEmbedContext = new Context<VideoEmbedApi>('video-embed-context');
