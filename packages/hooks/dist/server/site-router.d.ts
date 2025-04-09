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
    validSiteHandles?: T[];
    /**
     * The site handle implementation. This is used to get the site handle from the request event.
     */
    siteHandle?: (event: RequestEvent) => T;
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
    validateSiteHandle?: (validSiteHandles: T[], possibleHandle: string) => boolean;
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
export declare const defaultPathnameSplitter: (pathname: string) => string[];
/**
 * Convert the parts into a uri object.
 * This default implementation takes the first part as the site and the rest as the entry.
 * @param parts The parts to convert.
 * @returns The uri object.
 */
export declare const defaultPartsToSiteRouterObject: <T extends string = string>(parts: string[], defaultEntryUri: string) => {
    site: {
        uri: string;
        handle: T;
    };
    entry: {
        uri: string;
    };
};
/**
 * Default site handle formatter.
 * This default implementation replaces all '-' characters with '_' characters.
 * @param event The request event.
 * @returns The formatted site handle.
 */
export declare const defaultSiteHandleImplementation: <L extends SiteRouterLocals<string>, T extends string = string>(event: RequestEvent) => T;
/**
 * Default site handle validator.
 * This default implementation checks if the site handle is in the validSiteHandles array.
 * @param handle The site handle to validate.
 * @returns True if the site handle is valid, false otherwise.
 */
export declare const defaultValidateSiteHandle: <T extends string = string>(validSiteHandles: T[], possibleHandle: string) => boolean;
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
export declare const createSiteRouter: <T extends SiteHandle = SiteHandle>(options: SiteRouterHandleOptions<T>) => Handle;
export {};
