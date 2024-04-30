<script context="module">import { writable, readonly } from 'svelte/store';
import { createTypedContext } from '@288-toolkit/typed-context';
const CONTEXT_KEY = '__videoEmbed__';
const { setContext, getContext } = createTypedContext(CONTEXT_KEY);
export const getVideoEmbedContext = getContext;
</script>

<script>export let url = null;
const playing = writable(false);
const preconnect = writable(false);
const requestPreconnect = () => {
    preconnect.set(true);
};
const play = () => {
    playing.set(true);
};
setContext({
    playing: readonly(playing),
    preconnect: readonly(preconnect),
    requestPreconnect,
    play,
    url
});
</script>

<slot playing={$playing} preconnect={$preconnect} {play} {requestPreconnect} />
