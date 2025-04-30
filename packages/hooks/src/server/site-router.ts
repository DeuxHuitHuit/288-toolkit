import type { Handle, RequestEvent } from '@sveltejs/kit';

/**
 * The handle of the site.
 */
type SiteHandle = string;

/**
 * The uri object with site and entry properties.
 */
export type SiteRouter<T extends SiteHandle = SiteHandle> = {
	default?: true;
	valid: boolean;
	parts: string[];
	site: {
		uri: string;
		handle: T;
	};
	entry: {
		uri: string;
	};
};

// Used for internal validation purposes only
type InternalSiteRouter<T extends SiteHandle = SiteHandle> = Omit<SiteRouter<T>, 'valid' | 'parts'>;

/**
 * Options for the siteRouter handle.
 */
export type SiteRouterHandleOptions<T extends SiteHandle = SiteHandle> = {
	/**
	 * The default site uri. This is part of the public url
	 */
	defaultSiteUri: string;
	/**
	 * The default entry uri. This is part of the public url
	 */
	defaultEntryUri?: string;
	/**
	 * The default site handle. This might not be part of the public url and
	 * is used to identify the craft site we want to fetch data from.
	 */
	defaultSiteHandle?: T;
	/**
	 * The valid site handles. This is used to validate the site handle.
	 */
	validSiteHandles?: ReadonlyArray<T>;
	/**
	 * The site handle implementation. This is used to get the site handle from the request event.
	 */
	siteHandle?: (event: RequestEvent, siteRouter: InternalSiteRouter<T>) => T;
	/**
	 * The pathname splitter. This is used to split the pathname into site and entry parts.
	 */
	pathnameSplitter?: (pathname: string) => string[];
	/**
	 * The parts to site router object. This is used to convert the parts array into a site router object.
	 */
	partsToSiteRouterObject?: (parts: string[], defaultEntryUri: string) => InternalSiteRouter<T>;
	/**
	 * The validate site handle. This is used to validate the site handle.
	 */
	validateSiteHandle?: (validSiteHandles: ReadonlyArray<T>, possibleHandle: string) => boolean;
};

/**
 * Let's make sure the locals object has the uri object with site and entry properties.
 */
type SiteRouterLocals<T extends SiteHandle = SiteHandle> = App.Locals & {
	siteRouter: SiteRouter<T>;
};

/**
 * Split the pathname into site and entry parts.
 * This default implementation splits the pathname by the '/' character and filters out empty strings.
 * @param pathname The pathname to split.
 * @returns The site and entry parts.
 */
export const defaultPathnameSplitter = (pathname: string) => pathname.split('/').filter((x) => !!x);

/**
 * Convert the parts into a uri object.
 * This default implementation takes the first part as the site and the rest as the entry.
 * @param parts The parts to convert.
 * @returns The uri object.
 */
export const defaultPartsToSiteRouterObject = <T extends SiteHandle = SiteHandle>(
	parts: string[],
	defaultEntryUri: string
) =>
	({
		site: {
			uri: parts[0],
			handle: '' as T
		},
		entry: {
			uri: parts.slice(1).map(decodeURIComponent).join('/') || defaultEntryUri
		}
	}) satisfies InternalSiteRouter<T>;

/**
 * Default site handle formatter.
 * This default implementation replaces all '-' characters with '_' characters.
 * @param event The request event.
 * @param siteRouter The site router object.
 * @returns The formatted site handle.
 */
export const defaultSiteHandleImplementation = <T extends SiteHandle = SiteHandle>(
	_event: RequestEvent,
	siteRouter: InternalSiteRouter<T>
) => {
	return siteRouter.site.uri.replaceAll('-', '_') as T;
};

/**
 * Default site handle validator.
 * This default implementation checks if the site handle is in the validSiteHandles array.
 * @param handle The site handle to validate.
 * @returns True if the site handle is valid, false otherwise.
 */
export const defaultValidateSiteHandle = <T extends SiteHandle = SiteHandle>(
	validSiteHandles: ReadonlyArray<T>,
	possibleHandle: string
) => Boolean(possibleHandle) && validSiteHandles.includes(possibleHandle as T);

/**
 * This handle is responsible for setting the siteRouter object in the locals object.
 * Its responsibility is to split the pathname into site and entry parts and convert
 * them into a siteRouter object. It also formats the site handle.
 *
 * Many parts of the implementation are customizable through the options.
 *
 * Those values will be used by other hooks and should also be used when requesting
 * an entry from the CMS.
 *
 * If the url is empty or if the site handle is not valid, the default values will be used.
 *
 * @param options The options for the siteRouter handle.
 * @returns The siteRouter handle.
 */
export const createSiteRouter: <T extends SiteHandle = SiteHandle>(
	options: SiteRouterHandleOptions<T>
) => Handle = <L extends SiteRouterLocals<T>, T extends SiteHandle = SiteHandle>({
	defaultSiteUri,
	defaultSiteHandle = '' as T,
	defaultEntryUri = '' as const,
	validSiteHandles = [] as ReadonlyArray<T>,
	siteHandle = defaultSiteHandleImplementation<T>,
	pathnameSplitter = defaultPathnameSplitter,
	partsToSiteRouterObject = defaultPartsToSiteRouterObject<T>,
	validateSiteHandle = defaultValidateSiteHandle<T>
}: SiteRouterHandleOptions<T>) => {
	return <LL extends SiteRouterLocals = L>({ event, resolve }: Parameters<Handle>[0]) => {
		const path = event.url.pathname;
		const parts = pathnameSplitter(path);
		const locals = event.locals as LL;

		if (!parts.length) {
			// If there are no parts, use the default site uri and entry uri
			locals.siteRouter = {
				default: true,
				valid: true,
				parts,
				site: {
					uri: defaultSiteUri,
					handle: defaultSiteHandle
				},
				entry: {
					uri: defaultEntryUri
				}
			};
		} else {
			const internalSiteRouter = partsToSiteRouterObject(parts, defaultEntryUri);

			// Make sure the site handle is set and properly formatted
			if (!internalSiteRouter.site.handle) {
				internalSiteRouter.site.handle = siteHandle(event, internalSiteRouter);
			}

			if (validateSiteHandle(validSiteHandles, internalSiteRouter.site.handle)) {
				locals.siteRouter = {
					...internalSiteRouter,
					parts,
					valid: true
				};
			} else {
				locals.siteRouter = {
					default: true,
					valid: false,
					parts,
					site: {
						uri: defaultSiteUri,
						handle: defaultSiteHandle
					},
					entry: internalSiteRouter.entry
				};
			}
		}

		return resolve(event);
	};
};
