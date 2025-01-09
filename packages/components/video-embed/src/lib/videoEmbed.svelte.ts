import { Maybe } from '@288-toolkit/types';
import { Context } from 'runed';

export class VideoEmbedApi {
	/**
	 * Indicates if the video is currently playing
	 */
	playing = $state(false);
	/**
	 * Indicates if preconnect has been requested
	 */
	preconnect = $state(false);
	/**
	 * The URL of the video
	 */
	url = $state<Maybe<string>>(null);

	constructor(url: Maybe<string>) {
		this.url = url;
	}

	/**
	 * Request preconnect
	 */
	requestPreconnect = () => {
		this.preconnect = true;
	};

	/**
	 * Play the video
	 */
	play = () => {
		this.playing = true;
	};
}

export const videoEmbedContext = new Context<VideoEmbedApi>('video-embed-context');
