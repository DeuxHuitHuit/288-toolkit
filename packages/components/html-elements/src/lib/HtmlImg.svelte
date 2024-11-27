<script lang="ts">
	import type { Maybe } from '@288-toolkit/types';

	interface Props {
		src: Maybe<string>;
		srcset?: Maybe<string>;
		alt?: Maybe<string>;
		[key: string]: any;
	}

	let { src, srcset = null, alt = null, ...rest }: Props = $props();
</script>

<img srcset={srcset || null} src={!srcset ? src : null} alt={alt || ''} {...rest} />
