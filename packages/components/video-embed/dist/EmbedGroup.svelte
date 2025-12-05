<script context="module">import { writable, readonly } from 'svelte/store';
import { createTypedContext } from '@288-toolkit/typed-context';
const CONTEXT_KEY = '__videoEmbed__';
const { setContext, getContext } = createTypedContext(CONTEXT_KEY);
export const getVideoEmbedContext = getContext;
</script>

<script>export let url = null;
const _playing = writable(false);
export const playing = readonly(_playing);
const preconnect = writable(false);
const requestPreconnect = () => {
    preconnect.set(true);
};
export const play = () => {
    _playing.set(true);
};
export const stop = () => {
    _playing.set(false);
};
setContext({
    playing,
    preconnect: readonly(preconnect),
    requestPreconnect,
    play,
    url
});
</script>

<slot playing={$_playing} preconnect={$preconnect} {play} {stop} {requestPreconnect} />
