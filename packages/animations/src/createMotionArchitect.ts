import { type AnimationPlaybackControls } from 'motion';
import { createAnimationArchitect, type ArchitectParams } from './createAnimationArchitect.js';

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
			const { duration: animDuration, speed } = animation;
			// If the animation was currently running (i.e. we're changing
			// the page as soon as it was opened), we want to pause it before reversing it
			animation.pause();
			// Calculate the new speed to fit the out duration
			const newSpeed = animDuration <= duration ? speed : animDuration / duration;
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
