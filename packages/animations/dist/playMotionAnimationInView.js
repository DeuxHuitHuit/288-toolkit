import { reducedMotion } from '@288-toolkit/device/media';
import { inView } from 'motion';
import { get } from 'svelte/store';
/**
 * Plays a Motion animation when the element comes into view.
 * Registers it with an optional architect (@see `createMotionArchitect`) so that if the element is in view when a navigation occurs,
 * the animation will be reversed (which can be turned off with `reverse: false`).
 * Make sure that the animation is set to `autoplay: false`, otherwise it will play immediately, potentially before the element is in view.
 */
export const playMotionAnimationInView = (node, params) => {
    const { architect, animation, reverse, inViewOptions } = params;
    const destroy = inView(node, () => {
        if (get(reducedMotion)) {
            animation.finish();
            return;
        }
        let unregisterAnim;
        if (animation.playState === 'paused') {
            animation.play();
        }
        if (reverse !== false && architect) {
            unregisterAnim = architect.registerMotionAnimation(animation);
            return () => {
                unregisterAnim?.();
                unregisterAnim = null;
            };
        }
    }, inViewOptions);
    return {
        destroy
    };
};
