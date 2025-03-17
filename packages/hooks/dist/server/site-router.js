/**
 * Split the pathname into site and entry parts.
 * This default implementation splits the pathname by the '/' character and filters out empty strings.
 * @param pathname The pathname to split.
 * @returns The site and entry parts.
 */
export const defaultPathnameSplitter = (pathname) => pathname.split('/').filter((x) => !!x);
/**
 * Convert the parts into a uri object.
 * This default implementation takes the first part as the site and the rest as the entry.
 * @param parts The parts to convert.
 * @returns The uri object.
 */
export const defaultPartsToSiteRouterObject = (parts, defaultEntryUri) => ({
    site: {
        uri: parts[0],
        handle: ''
    },
    entry: {
        uri: parts.slice(1).join('/') || defaultEntryUri
    }
});
/**
 * Default site handle formatter.
 * This default implementation replaces all '-' characters with '_' characters.
 * @param event The request event.
 * @returns The formatted site handle.
 */
export const defaultSiteHandle = (event) => {
    const locals = event.locals;
    return locals.siteRouter.site.uri.replaceAll('-', '_');
};
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
 * @param options The options for the siteRouter handle.
 * @returns The siteRouter handle.
 */
export const createSiteRouter = ({ defaultSiteUri, defaultEntryUri = '', siteHandle = defaultSiteHandle, pathnameSplitter = defaultPathnameSplitter, partsToSiteRouterObject = defaultPartsToSiteRouterObject }) => {
    return ({ event, resolve }) => {
        const path = event.url.pathname;
        const parts = pathnameSplitter(path);
        const locals = event.locals;
        if (!parts.length) {
            locals.siteRouter = {
                default: true,
                site: {
                    uri: defaultSiteUri,
                    handle: ''
                },
                entry: {
                    uri: defaultEntryUri
                }
            };
        }
        else {
            locals.siteRouter = partsToSiteRouterObject(parts, defaultEntryUri);
        }
        // Make sure the site handle is set and properly formatted
        if (!locals.siteRouter.site.handle) {
            locals.siteRouter.site.handle = siteHandle(event);
        }
        return resolve(event);
    };
};
