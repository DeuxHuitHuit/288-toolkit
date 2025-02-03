import { normalize, removeTrailingSlash } from '@288-toolkit/strings';
import { urlCanParse } from './urlCanParse.js';
/**
 * Creates a function that builds URLs for entries.
 * Craft 5 compatible. (Not compatible with Craft 4)
 */
export const createEntryUrlBuilder = ({ siteUrl, shouldRemoveTrailingSlash = true }) => {
    if (!urlCanParse(siteUrl)) {
        throw new Error('Invalid site URL');
    }
    const SITE_URL = new URL(siteUrl);
    return (entry) => {
        if (!entry?.url || !urlCanParse(entry.url)) {
            const empty = {
                raw: null,
                decodedPath: () => '',
                normalizePath: () => empty,
                toAbsolute: () => null,
                toSchemeLess: () => null,
                /** @deprecated Use `toSchemeLess` instead. */
                toLanguageRelative: () => null,
                /* @enddeprecated */
                toString: () => ''
            };
            return empty;
        }
        const url = new URL(entry.url);
        // Replace host and protocol with the site URL
        url.host = SITE_URL.host;
        url.protocol = SITE_URL.protocol;
        // Replace trailing slash in the pathname
        if (shouldRemoveTrailingSlash) {
            url.pathname = removeTrailingSlash(url.pathname);
        }
        const self = {
            raw: url,
            decodedPath() {
                return url.pathname.split('/').map(decodeURIComponent).join('/');
            },
            normalizePath() {
                url.pathname = url.pathname
                    .split('/')
                    .map((part) => normalize(decodeURIComponent(part)))
                    .join('/');
                return self;
            },
            toString() {
                return url.toString();
            },
            toAbsolute() {
                return url.toString();
            },
            toSchemeLess() {
                const { pathname, hash, search } = url;
                return `${pathname}${search}${hash}`;
            },
            /** @deprecated Use `toSchemeLess` instead. */
            toLanguageRelative() {
                return url.pathname.split('/').filter(Boolean).slice(1).join('/');
            }
            /* @enddeprecated */
        };
        return self;
    };
};
