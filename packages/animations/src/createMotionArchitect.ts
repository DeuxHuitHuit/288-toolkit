import type { AnimationControls } from 'motion';
import { createAnimationArchitect, type ArchitectParams } from './createAnimationArchitect';

/**
 *
 * @param options @see createAnimationArchitect
 * @returns An architect instance extended with:
 * - `registerMotionAnimation`: A function that takes the animation controls returned from `animate` or
 * `timline` and automatically reverses the animation when transitioning out.
 */
export const createMotionArchitect = (options?: ArchitectParams) => {
	const architect = createAnimationArchitect(options);

	const registerMotionAnimation = (animation: AnimationControls) => {
		return architect.registerAnimation(({ duration }) => {
			const { duration: animDuration, playbackRate } = animation;
			// Set the animation duration to the out duration
			animation.playbackRate =
				animDuration <= duration ? playbackRate : animDuration / duration;
			// If the animation was currently running (i.e. we're changing
			// the page as soon as it was opened), we want to stop it before reversing it
			if (animation.playState === 'running') {
				animation.stop();
			}
			animation.reverse();
		});
	};

	return {
		...architect,
		registerMotionAnimation
	};
};
