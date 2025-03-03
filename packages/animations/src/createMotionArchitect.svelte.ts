import { type AnimationPlaybackControls } from 'motion';
import {
	createAnimationArchitect,
	type ArchitectParams
} from './createAnimationArchitect.svelte.js';

/**
 *
 * @param options @see createAnimationArchitect
 * @returns An architect instance extended with:
 * - `registerMotionAnimation`: A function that takes the animation controls returned from `animate` or
 * `timline` and automatically reverses the animation when transitioning out.
 */
export const createMotionArchitect = (options?: ArchitectParams) => {
	const architect = createAnimationArchitect(options);

	const registerMotionAnimation = (animation: AnimationPlaybackControls) => {
		return architect.registerAnimation(({ duration }) => {
			const { duration: animDuration } = animation;
			// Calculate the new speed to fit the out duration
			const newSpeed = animDuration / duration;
			// Set a negative speed to reverse the animation
			animation.speed = -newSpeed;
			// Play the animation
			animation.play();
		});
	};

	return {
		...architect,
		registerMotionAnimation
	};
};
