<script lang="ts">
	import { isExternalUrl } from '@288-toolkit/url';
	import type { Maybe } from '@288-toolkit/types';

	interface Props {
		href: string;
		rel?: Maybe<string>;
		target?: Maybe<string>;
		children?: import('svelte').Snippet<[{ external: boolean }]>;
		[key: string]: any;
	}

	let { href, rel = null, target = null, children, ...rest }: Props = $props();

	const isExternal = href ? isExternalUrl(href) : false;
</script>

<a
	{href}
	rel={isExternal ? 'noopener noreferrer' : rel}
	target={target || isExternal ? '_blank' : null}
	{...rest}
>
	{@render children?.({ external: isExternal })}
</a>
