# i18n

## i18n handles

You can create three i18n handles with the `createI18nHandles` function:

-   `langInfo`: Sets the locale, language, and region in the event locals.
-   `langRedirect`: Redirects to the user's preferred language if the site is localized (has more
    than one supported locale) and the request is for the root
-   `langAttribute`: Renders the correct html lang attribute

```ts
import { createI18nHandles } from '@288-toolkit/i18n/server';

const { langInfo, langRedirect, langAttribute } = createI18nHandles({
	supportedLocales: ['en-ca', 'fr-ca'],
	defaultLocale: ['en-ca']
});

export const handle = sequence(langInfo, langRedirect, langAttribute);
```

Make sure the `langInfo` is always placed before the other two.

Next, you need to change the html `lang` attribute inside `app.html` to `%lang%` so that it be
replaced by the current language.

Finally, to get type safety for the locals, you need to extend the `App.Locals` interface.

In `app.d.ts`:

```ts
import type { LangInfo } from '@288-toolkit/i18n';

declare global {
	namespace App {
		interface Locals extends LangInfo<typeof ['en-ca', 'fr-ca']> {
			// ...
		}
	}
}
```

## Translation files

You must write translations in a `.ts` file named after the language. For example, if your supported
languages are 'en' and 'fr', you will have `en.ts` dans `fr.ts`.

In `en.ts`:

```ts
export const en = {
	hello: 'world',
	color: 'green'
};
```

Typescript can help you making sure that your translation objects all have the same form. You can
generate a type from the default translations and use it to cast the other objects. Typescript will
indicate an error if properties don't match.

In `en.ts`:

```ts
export type GlobalTranslations = typeof en;
```

In `fr.ts`:

```ts
import type { GlobalTranslations } from './en';

export const fr: GlobalTranslations = {
	hello: 'monde',
	colorr: 'vert' // Typescript error
};
```

These files should all live inside the same folder. You can split your translations in as many
folders as you want and load them only as needed.

## Loading translations

To load the translations, use `createTranslationsLoader`. It accepts an array of translation
objects. Each translation must have a key and an object of loader functions for every supported
language. A loader function is essentially a function that returns a dynamic import.

[!IMPORTANT] Do NOT `await` the import or it will not work. The 'awaiting' happens later.

Because of how Vite processes dynamic imports, there are several limitations to keep in mind when
writing the import path. They are listed here:
[https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations).

```ts
import { createTranslationsLoader } from '@288-toolkit/i18n';

export const loadTranslations = createTranslationsLoader([
	{
		key: 'global',
		loaders: {
			en: () => import('./lib/translations/global/en'),
			fr: () => import('./lib/translations/global/fr')
		}
	},
	{
		key: 'newsletter',
		loaders: {
			en: () => import('./lib/translations/newsletter/en'),
			fr: () => import('./lib/translations/newsletter/fr')
		}
	}
]);
```

To load some translations for a current layout or route, call `loadTranslations()` inside a
**universal** load function. It accepts an array of translation keys and the current **locale**.
Therefore, we suggest passing i18n locals to the client via a server load function.

In `+layout.server.ts`:

```ts
export const load = async ({ event }) => {
	return {
		locale: event.locals.locale,
		language: event.locals.language,
		region: event.locals.region
	};
};
```

In `+layout.ts`:

```ts
export const load = async ({ data }) => {
	await loadTranslations(['global', 'newsletter'], data.locale);
};
```

## Using translations

To use these translations in your project, you need to create a translation function with
`createTranslate()`. This function accepts a key that corresponds to the translation key in the
config (the same that you used with `loadTranslations()`). You can also pass your translation type
to get typesafety for the translation keys.

```ts
import { createTranslate } from '@288-toolkit/i18n';

export const t = createTranslate<GlobalTranslations>('global');
```

```ts
import { createTranslate } from '@288-toolkit/i18n';

export const t = createTranslate<NewsletterTranslations>('newsletter');
```

### The translation function

The translation function accepts as a first argument a string with the property key you want to
access. It will return the property value associated with the current language. You can access
nested properties by using dot notation (`'my.nested.property'`).

The translation values can be strings, numbers, booleans, arrays and objects. `string` is the
default return type. If you want to get a different type, use the first template parameter to
specify a different return type.

In `fr.ts`:

```ts
const PROJECT = {
	translatableTitle: 'This is my title',
	my: {
		nested: {
			property: 'This is my nested property'
		}
	},
	myArrayProp: ['hello', 'world'],
	myComplexProp: [
		{
			id: 1,
			firstName: 'Oliver',
			lastName: 'Twist'
		},
		{
			id: 2,
			firstName: 'Luke',
			lastName: 'Skywalker'
		}
	]
};
```

In `fr.ts`:

```ts
const PROJECT = {
	translatableTitle: 'Ceci est mon titre',
	my: {
		nested: {
			property: 'Ceci est pas propriété imbriquée'
		}
	},
	myArrayProp: ['bonjour', 'monde'],
	myComplexProp: [
		{
			id: 1,
			firstName: 'Oliver',
			lastName: 'Twist'
		},
		{
			id: 2,
			firstName: 'Luke',
			lastName: 'Skywalker'
		}
	]
};
```

In `AnyFile.svelte`:

```svelte
<script lang="ts">
	import { t } from '$lib/translations/global';

	// Getting an array of strings
	const myArrayProp = t<string[]>('myArrayProp');

	// Getting a complex type
	const myComplexProp = t<Translations['myComplexProp']>('myComplexProp');
</script>

<h1>{t('translatableTitle')}</h1>
<h2>{t('my.nested.property')}</h2>

// At /en, output is:
<h1>This is my title</h1>
<h2>This is my nested property</h2>
// At /fr, output is:
<h1>Ceci est mon titre</h1>
<h2>Ceci est pas propriété imbriquée</h2>

{#each myArrayProp as word}
	{word}
	<br />
{/each}
{#each myComplexProp as person}
	{person.id} - {person.firstName}
	{person.lastName}
	<br />
{/each}
```

If no translation is found, a warning will be printed to the browser console (in dev mode only). The
output of the function will be the key passed in.

### Dynamic data in translations

You can have dynamic translations with the bracket syntax:

In `en.ts`:

```ts
const PROJECT = {
	myDynamicTranslation: 'Available from {startDate} to {endDate}'
};
```

In `fr.ts`:

```ts
const PROJECT: Translation.Project = {
	myDynamicTranslation: 'Disponible du {startDate} au {endDate}'
};
```

You can then pass a data object containing the dynamic values as a second argument to the `t`
function.

These will work with any value type (string, array or object).

In `AnyFile.svelte`

```html
<script lang="ts">
	import { t } from '$lib/translations/global';
</script>

<p>{t('myDynamicTranslation', { startDate: '13/01/2021', endDate: '16/01/2021' })}</p>

// At /en, output is:
<p>Available from 13/01/2021 to 16/01/2021</p>
// At /fr, output is:
<p>Disponible du 13/01/2021 au 16/01/2021</p>
```

### Pluralization

The API also supports pluralization. It uses the `Intl.PluralRules` object. You may look at
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules to
familiarize yourself with it.

In order to pluralize a message, you must provide multiple alternatives, each separated by a rule
formatted as follow:

```
|<rule>:
```

When calling the `t` function, you must provide a `count` number in the data object. The `count`
will determine which alternative is returned.

The available rules are the following, ordered by priority:

-   A specific number, like `4` or `32`.
-   A range of two numbers separated by a dash, like `2-5`.
-   One of the tags returned by `Intl.PluralRules.prototype.select()`, which are: `zero`, `one`,
    `two`, `few`, `many`, and `other`.

For example, with the following message string:

```ts
const en = {
	relatedArticles: `
	|one: One related article
	|other: {count} related articles
	|4: Four related articles
	|2-4: A few related articles`
};
```

we get the following result:

```ts
t('relatedArticles', { count: 0 }); // '0 related articles' (corresponds to the 'other' tag)
t('relatedArticles', { count: 1 }); // 'One related article' (corresponds to the 'one' tag)
t('relatedArticles', { count: 2 }); // 'A few related articles' (corresponds to the '2-4' range)
t('relatedArticles', { count: 4 }); // 'Four related articles' (corresponds to the number '4')
```

This API also supports ordinal pluralization. To enable it, pass `ordinal: true` in the data object.

For example, with the following message string:

```ts
const en = {
	ordinalSuffix: `
	|one: st
	|two: nd
	|few: rd
	|other: th`
};
```

we get the following result:

```ts
t('ordinalSuffix', { count: 0, ordinal: true }); // 'th' (corresponds to the 'other' tag)
t('ordinalSuffix', { count: 1, ordinal: true }); // 'st' (corresponds to the 'one' tag)
t('ordinalSuffix', { count: 2, ordinal: true }); // 'nd' (corresponds to the 'two' tag)
t('ordinalSuffix', { count: 3, ordinal: true }); // 'rd' (corresponds to the 'few' tag)
t('ordinalSuffix', { count: 4, ordinal: true }); // 'th' (corresponds to the 'other' tag)
```

## Translations on the server

To use translations on the server, you need to use the server version of `createTranslate()`. The
differences are that this one returns a promise, accepts a `Translation` object as first argument
(instead of a key) and requires the language as second argument. The returned function is exactly
the same as the client side version.

```ts
import { createServerTranslate } from '@288-toolkit/i18n/server';
import type { Translation } from '@288-toolkit/i18n';

const translationObject: Translation = {
	key: 'global',
	loaders: {
		en: () => import('./lib/translations/global/en.ts'),
		fr: () => import('./lib/translations/global/fr.ts')
	}
};

export const load = async (event) => {
	const t = await createServerTranslate<GlobalTranslations>(
		translationObject,
		event.locals.language
	);
	return {
		title: t('myTitle')
	};
};
```
