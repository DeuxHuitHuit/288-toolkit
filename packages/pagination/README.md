# Pagination

Svelte components to manage pagination.

## `Pagination.svelte`

The root component that wraps the others and manages all the logic.

You must provide the `initialItems` that will be rendered on the first load, the `itemsTotal`,
`itemsPerPage` and a `getItems` function that will be called whenever a filter or the current page
is changed.

If you don't need the url to be updated, you can pass `false` to the `updateUrl` prop.

By default, the query string page key is 'page'. This can be modified via the `pageKey` prop.

The component exposes the following via slot props:

-   readonly `items` (`Item[]`): The items of the current page.
-   readonly `state` (`'idle' | 'loading' | 'error'`): The current state of the component.
-   readonly `hasActiveFilters` (`boolean`): Wether the pagination currently has active filters.
-   readonly `firstNewResultIndex` (`number`): The index of the first of the newly loaded results.
    Can be used to automatically focus that item (see `focusOnLoadMore`).

These are also exposed via context, which you can get by importing the `getPaginationContext`
function. The context laso

## `PaginationFilters.svelte`

A `GET` form containing the form elements that will serve as filters. When the form is submitted,
either through a submit button or the `filter` slot prop, the selected filter values will be
appended in the query string and the `getItems` function will be called with the updated values.

In order for your element to get picked up as a filter, it must have a name attribute, which will
correspond to its key in the query string. For example, `<select name="theme">` will correspond to
`?theme=<selected theme>`.

Filters can have single (select, radio, etc.) or multiple values (select with `multiple` attribute,
checkboxes, etc.). In any case, the value passed to the `getItems` function will be an array of the
values as strings.

It will also work without javascript since the native behavior of a `GET` form is to append the form
data in the query string and reload the page when submitted. To allow the form to be submitted, a
default button of type `submit` will be rendered and then removed once the component is hydrated. If
you still wish to have a submit button (like, for exemple, an "Apply filters" button), you can use
the `submit` slot, which will replace the default submit button.

## `PaginationNav.svelte`

A `<nav>` element that wraps the pagination links. It only renders if there are more items then
items per page.

Note that you cannot use the navigation components at the same time as `PaginationLoadMore.svelte`
or `PaginationInfiniteScroll.svelte`.

## `PaginationStep.svelte`

Wraps `PaginationLink.svelte` with steps logic.

## `PaginationLinks.svelte`

Renders all the page links and ellipses.

### A note on styling the links

`PaginationStep.svelte` and `PaginationLinks.svelte` both use the `PaginationLink.svelte` component
internally. This component renders an anchor element that you can style with classes. If you need
different styles for the different states of the link, you can use attribute selectors:

-   Pagination steps will be disabled with the `aria-disabled` attribute.
-   Pagination links will marked as current with the `aria-current` attribute.

## Example usage with Filter and Nav

```svelte
<!-- +page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { Pagination, PaginationLink, PaginationNav } from '$lib/components/ui/pagination';

	const news = [
		/* ... */
	];
	const newsCount = 288;
	const NEWS_PER_PAGE = 12;
	const getItems = async (offset, filters) => {
		// Make a request to Craft, get the news with the provided offset and filters and return them along with the entry count.
		return { items: fetchedNews, itemsTotal: fetchedNewsCount };
	};
</script>

<Pagination
	initialItems={news}
	{getItems}
	itemsTotal={newsCount}
	itemsPerPage={NEWS_PER_PAGE}
	let:items
	let:state
>
	<PaginationFilters let:activeFilters let:filter>
		<!-- Single value filter -->
		<select name="category" on:change={filter}>
			{#each categories as category}
				<option
					value={category.slug}
					selected={!!activeFilters.find(
						(filter) => filter.key === 'category' && filter.value === category.slug
					)}
				>
					{category.title}
				</option>
			{/each}
		</select>
		<!-- Multiple values filter -->
		{#each themes as theme}
			<label>
				<input
					type="checkbox"
					name="theme"
					value={theme.slug}
					checked={!!activeFilters.find(
						(filter) => filter.key === 'category' && filter.value === category.slug
					)}
					on:change={filter}
				/>
				<span>{theme.title}</span>
			</label>
		{/each}
	</PaginationFilters>
	{#if state === 'idle'}
		<div in:fade={{ duration: 200 }}>
			{#each items as item}
				<!-- Display items... -->
			{/each}
		</div>
	{/if}
	{#if state === 'loading'}
		<!-- Display loading state -->
	{/if}
	{#if state === 'error'}
		<!-- Display error state -->
	{/if}
	<PaginationNav class="py-100 text-24 flex items-center justify-between">
		<PaginationStep
			direction="prev"
			class="py-30 rounded-10 bg-[turquoise] px-60 text-[darkblue] hover:bg-[darkblue] hover:text-[turquoise] aria-disabled:pointer-events-none aria-disabled:opacity-30"
		>
			<!-- Arrow svg -->
			<ArrowRight class="w-90 h-auto rotate-180" />
		</PaginationStep>
		<div class="flex items-center space-x-40">
			<PaginationLinks
				neighbours={3}
				class="border-1 border-currentColor aria-current:pointer-events-none aria-current:bg-[darkblue] rounded-full hover:text-[turquoise]"
				classEllipsis="flex items-center"
			>
				<svelte:fragment slot="ellpisis">
					<!-- Ellipsis svg -->
					<Ellipsis />
				</svelte:fragment>
			</PaginationLinks>
		</div>
		<PaginationStep
			direction="next"
			class="py-30 rounded-10 bg-[turquoise] px-60 text-[darkblue] hover:bg-[darkblue] hover:text-[turquoise] aria-disabled:pointer-events-none aria-disabled:opacity-30"
		>
			<!-- Arrow svg -->
			<ArrowRight class="w-90 h-auto" />
		</PaginationStep>
	</PaginationNav>
</Pagination>
```

## `PaginationLoadMore.svelte`

A 'load more' button.

## `PaginationInfiniteScroll.svelte`

Loads items on scroll until no more items are found by observing a full screen div(`height: 100vh;`)
and loading new items at a specified threshold.

## `focusOnLoadMore`

An action that can be used on pagination items to focus the first element that was added with a
'load more' or infinite scroll strategy in order to improve a11y.

#### Example usage

We need to have 5 files:

-   Our initial query on `+page.server.ts`
-   Our endpoint to load more items when a click occurs on the load more button or we reached the
    threshold in `routes/api/get-my-items/+server.ts`
-   Our getItems function that accept `limit` and `offset` as an optional param
-   Our graphQL query
-   Our svelte component with the getItems query.

```ts
// +page.server.ts
import type { Blog_Portal } from 'src/craft';
import { graphql } from '$gql/builder';
import { query } from '$lib/server/craft/query';
import { getBlogArticles } from '$lib/server/getBlogArticles';
import { ARTICLES_PER_PAGE } from '$lib/constants';

export const load = query(
	graphql<{ entry: Blog_Portal }>().page('...BlogPortal')
)
	.load((entry, event) => {
		const page = Number(url.searchParams.get('page')) || 1;
		const limit = ARTICLES_PER_PAGE * page;

		return getBlogArticles({
			limit
		});
	)};
```

```ts
// routes/api/get-blog-articles/+server.ts
import { ARTICLES_PER_PAGE } from '$lib/constants';
import { getBlogArticles } from '$lib/server/getBlogArticles';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	try {
		const limit = ARTICLES_PER_PAGE;
		const offset = url.searchParams.get('offset');
		const data = await getBlogArticles({
			limit,
			offset: Number(offset) || 0
		});
		return json(data);
	} catch (error) {
		console.error(error);
		return json({ items: [], itemsTotal: 0 });
	}
};
```

```ts
// server/graphql/getBlogArticles.ts
import { graphql } from '$gql/builder';
import { query } from '$lib/server/craft/query';

type Variables = {
	limit: number;
	offset?: number;
};

export const getBlogArticles = async (variables: Variables) => {
	try {
		return query(
			qraphql<{
				items: Articles_Default_Entry[];
				itemsTotal: number;
			}>()
				.query('getBlogArticles')
				.entries('items')
				.paginate('itemsTotal')
		)
			.variables(variables)
			.fetch();
	} catch (error) {
		console.error(error);
		return { items: [], itemsTotal: 0 };
	}
};
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
	import { Pagination } from '$lib/components/ui/pagination';
	import PaginationLoadMore from '$com/ui/pagination/PaginationLoadMore.svelte';

	export let data;

	$: entry = data.entry;
	$: items = data.items;
	let initialItems = items;
	let itemsTotal = placementsCount || 0;

	const getItems = async (offset: Offset) => {
		try {
			const searchParams = new URLSearchParams({
				offset: offset.toString()
			});
			const res = await fetch(`/api/get-placements?${searchParams.toString()}`);
			const data = await res.json();

			itemsTotal = data?.placementsTotal || 0;
			return data;
		} catch (error) {
			console.error(error);
			return { items: [], itemsTotal: 0 };
		}
	};
</script>

<Pagination
	{initialItems}
	{getItems}
	{itemsTotal}
	itemsPerPage={PLACEMENTS_ITEMS_PER_PAGE}
	let:items
	let:state
>
	{#if items?.length}
		{#each items as item, index}
			<YourComponent {item} />
		{/each}
	{/if}
	<PaginationLoadMore
		class="border-1 text-16 bp:px-20 bp:py-8 bp:text-24 rounded-full border-black px-12 py-4 uppercase"
	/>
</Pagination>
```

## Building GraphQL pagination queries

The Craft GraphQL Api is poorly documented, especially regarding `relatedTo` queries, so here is a
some helpful information regarding the queries you have to make to use this component to the
fullest.

Let's say we have to fetch all the articles of a CMS.

Our basic query could look like this:

```graphql
query getArticles($siteId: [QueryArgument]!) {
	entries(section: ["article"], siteId: $siteId, orderBy: "postDate") {
		id
		title
	}
}
```

With the `graphql()` api, it would look like this:

```ts
type Article = {
	id: string;
	title: string;
	section: 'article';
	postDate: Date;
};
const q = graphql<{ entries: Article[] }>()
	.query('getArticles')
	.useSite()
	.entries()
	.fields<'entries'>({ id: true, title: true })
	.filter<'entries'>('section', 'article')
	.orderBy<'entries'>('postDate');
```

With this, we fetch all articles from the current site in one query. But we want to paginate them so
we don't have to potentially load hundreds of article every time!

### Paginated queries

To get paginated articles, we need to add 2 parameters to the query: `offset` and `limit`.

The `offset` is the number of entries (in our case, articles) that will be skipped. If we have an
offset of 12, we will get all the entries except from the first 12. This parameter is provided by
the `Pagination.svelte` component in the `getItems` function so you can use it in your query.

The `limit` is the number of entries we want to get back. This is a constant you determine. It also
corresponds to the `itemsPerPage` prop of the `Pagination.svelte` component.

Combined, these parameters allow us to query entries within a certain range. For exemple, we can
query 10 articles, starting from the 30th. That will give us the 31st to the 40th articles.

Our query should now look like this:

```graphql
query getArticles($siteId: [QueryArgument]!, $offset: Int, $limit: Int) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		offset: $offset
		limit: $limit
	) {
		id
		title
	}
}
```

With the `graphql()` api, it would look like this:

```ts
const q = graphql<{ entries: Article[] }>()
	.query('getArticles')
	.useSite()
	.entries()
	.fields<'entries'>({ id: true, title: true })
	.filter<'entries'>('section', 'article')
	.offset()
	.limit()
	.orderBy<'entries'>('postDate');
```

As you can see, variables and arguments are added with `.offset()` and `.limit()`.

### Filtered queries

We now want users to be able to filter the articles. In the `getItems` function, you get the
selected filters as a second argument. You can use these values and pass them to your query.

Assuming you are filtering entries using Craft's entries, you can filter your query like this:

```graphql
query getArticles($siteId: [QueryArgument]!, $category: [String]) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		relatedToEntries: [{ section: ["categories"], slug: $category }]
	) {
		id
		title
	}
}
```

We use the `relatedToEntries` argument, which is an array of objects. You can add as many objects as
you want, each representing a specific category/filter. The `section` property is the section handle
of the entry. The `slug` property is an array of all the slugs you want to filter the articles with.

With the `graphql()` api, it would look like this:

```ts
const q = graphql<{ entries: Article[] }>()
	.query('getArticles')
	.useSite()
	.variables({ category: '[String]' })
	.entries()
	.fields<'entries'>({ id: true, title: true })
	.filter<'entries'>('section', 'article')
	.relatedToEntries<'entries'>({ section: ['categories'], slug: '$category' })
	.orderBy<'entries'>('postDate');
```

Here is an example with multiple categories:

```graphql
query getArticles($siteId: [QueryArgument]!, $category: [String], $theme: [String]) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		relatedToEntries: [
			{ section: ["categories"], slug: $category }
			{ section: ["themes"], slug: $theme }
		]
	) {
		id
		title
	}
}
```

With the `graphql()` api, it would look like this:

```ts
const q = graphql<{ entries: Article[] }>()
	.query('getArticles')
	.useSite()
	.variables({ category: '[String]', theme: '[String]' })
	.entries()
	.fields<'entries'>({ id: true, title: true })
	.filter<'entries'>('section', 'article')
	.relatedToEntries<'entries'>([
		{ section: ['categories'], slug: '$category' },
		{ section: ['themes'], slug: '$theme' }
	])
	.orderBy<'entries'>('postDate');
```

> [!IMPORTANT] If one of the entry slug values is `null` or `undefined` (e.g.: no filter is selected
> for that category), you need to pass `"*"` as the category slug. Otherwise, Craft won't return any
> entry.

### Getting the entry count

The pagination component also expects you to provide the total entry count in order to calculate the
number of pages. You can get it along with your entries query like this:

```graphql
query getArticles($siteId: [QueryArgument]!) {
	entries(section: ["article"], siteId: $siteId, orderBy: "postDate") {
		id
		title
	}
	entryCount(section: ["article"], siteId: $siteId)
}
```

The count will now be accessible in the returned `data` property as `entryCount`.

With the `graphql()` api, it would look like this:

```ts
const q = graphql<{ entries: Article[] }>()
	.query('getArticles')
	.useSite()
	.entries()
	.fields<'entries'>({ id: true, title: true })
	.filter<'entries'>('section', 'article')
	.orderBy<'entries'>('postDate')
	.count('entryCount'); // This is the only thing you need to add !!
```

If you filter the entries by category, the filter arguments also need to be present in the entry
count query, because you need the filtered entries count, not the total entries count.

```graphql
query getArticles($siteId: [QueryArgument]!, $category: [String], $theme: [String]) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		relatedToEntries: [
			{ section: ["categories"], slug: $category }
			{ section: ["themes"], slug: $theme }
		]
	) {
		id
		title
	}
	entryCount(
		section: ["article"]
		siteId: $siteId
		relatedToEntries: [
			{ section: ["categories"], slug: $category }
			{ section: ["themes"], slug: $theme }
		]
	)
}
```

> [!NOTE] With the `graphql()` api, you would only need to add `.count()` at the end! The arguments
> are copied over to the count selection automatically.

### Putting it all together

We now have all the elements to build our query, which now looks like this:

```graphql
query getArticles(
	$siteId: [QueryArgument]!
	$offset: Int
	$limit: Int
	$category: [String]
	$theme: [String]
) {
	entries(
		section: ["article"]
		siteId: $siteId
		orderBy: "postDate"
		offset: $offset
		limit: $limit
		relatedToEntries: [
			{ section: ["categories"], slug: $category }
			{ section: ["themes"], slug: $theme }
		]
	) {
		id
		title
	}
	entryCount(
		section: ["article"]
		siteId: $siteId
		relatedToEntries: [
			{ section: ["categories"], slug: $category }
			{ section: ["themes"], slug: $theme }
		]
	)
}
```

With the `graphql()` api, it would look like this:

```ts
const q = graphql<{ entries: Article[] }>()
	.query('getArticles')
	.useSite()
	.variables({ category: '[String]', theme: '[String]' })
	.entries()
	.fields<'entries'>({ id: true, title: true })
	.filter<'entries'>('section', 'article')
	.orderBy<'entries'>('postDate')
	.relatedToEntries<'entries'>([
		{ section: ['categories'], slug: '$category' },
		{ section: ['themes'], slug: '$theme' }
	])
	.paginate('entryCount'); // This is the only thing you need to add !!
```

> [!NOTE] `.paginate()` will take care of everything to transform _any_ query into a paginated one.
> This is where the `graphql()` api shines the most.
