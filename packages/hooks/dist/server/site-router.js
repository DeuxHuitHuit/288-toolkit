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
        uri: parts.slice(1).map(decodeURIComponent).join('/') || defaultEntryUri
    }
});
/**
 * Default site handle formatter.
 * This default implementation replaces all '-' characters with '_' characters.
 * @param event The request event.
 * @returns The formatted site handle.
 */
export const defaultSiteHandleImplementation = (event) => {
    const locals = event.locals;
    return locals.siteRouter.site.uri.replaceAll('-', '_');
};
/**
 * Default site handle validator.
 * This default implementation checks if the site handle is in the validSiteHandles array.
 * @param handle The site handle to validate.
 * @returns True if the site handle is valid, false otherwise.
 */
export const defaultValidateSiteHandle = (validSiteHandles, possibleHandle) => Boolean(possibleHandle) && validSiteHandles.includes(possibleHandle);
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
export const createSiteRouter = ({ defaultSiteUri, defaultSiteHandle = '', defaultEntryUri = '', validSiteHandles = [], siteHandle = (defaultSiteHandleImplementation), pathnameSplitter = defaultPathnameSplitter, partsToSiteRouterObject = (defaultPartsToSiteRouterObject), validateSiteHandle = (defaultValidateSiteHandle) }) => {
    return ({ event, resolve }) => {
        const path = event.url.pathname;
        const parts = pathnameSplitter(path);
        const locals = event.locals;
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
        }
        else {
            const internalSiteRouter = partsToSiteRouterObject(parts, defaultEntryUri);
            // Make sure the site handle is set and properly formatted
            if (!internalSiteRouter.site.handle) {
                internalSiteRouter.site.handle = siteHandle(event);
            }
            if (validateSiteHandle(validSiteHandles, internalSiteRouter.site.handle)) {
                locals.siteRouter = {
                    ...internalSiteRouter,
                    parts,
                    valid: true
                };
            }
            else {
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
