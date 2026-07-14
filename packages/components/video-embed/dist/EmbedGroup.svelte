<script context="module">import { writable, readonly } from 'svelte/store';
import { createTypedContext } from '@288-toolkit/typed-context';
const CONTEXT_KEY = '__videoEmbed__';
const { setContext, getContext } = createTypedContext(CONTEXT_KEY);
export const getVideoEmbedContext = getContext;
</script>

<script>export let url = null;
export let initialConsentState = 'not-required';
const _playing = writable(false);
export const playing = readonly(_playing);
const preconnect = writable(false);
const _consentState = writable(initialConsentState);
export const consentState = readonly(_consentState);
const canPlay = () => $consentState === 'accepted' || $consentState === 'not-required';
const requestPreconnect = () => {
    preconnect.set(canPlay());
};
export const play = () => {
    if (canPlay()) {
        _playing.set(true);
    }
    else if ($consentState === 'required') {
        _consentState.set('pending');
    }
};
export const stop = () => {
    _playing.set(false);
};
export const acceptConsent = () => {
    _consentState.set('accepted');
    play();
};
export const rejectConsent = () => {
    _consentState.set('rejected');
    stop();
    preconnect.set(false);
};
setContext({
    playing,
    preconnect: readonly(preconnect),
    requestPreconnect,
    play,
    stop,
    url,
    consentState,
    acceptConsent,
    rejectConsent
});
</script>

<slot
	playing={$_playing}
	preconnect={$preconnect}
	{play}
	{stop}
	{requestPreconnect}
	consentState={$consentState}
	{acceptConsent}
	{rejectConsent}
/>
