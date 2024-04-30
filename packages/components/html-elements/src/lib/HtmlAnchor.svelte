<script lang="ts">
	import { isExternalUrl } from '@288-toolkit/url';
	import type { Maybe } from '@288-toolkit/types';

	export let href: string;
	export let rel: Maybe<string> = null;
	export let target: Maybe<string> = null;

	const isExternal = href && isExternalUrl(href);
</script>

<a
	{href}
	rel={isExternal ? 'noopener noreferrer' : rel}
	target={target || isExternal ? '_blank' : null}
	{...$$restProps}
>
	<slot external={isExternal} />
</a>
