type Maybe<T> = T | null;
export type VercelIpHeaders = {
    /**
     * A two-character ISO 3166-1 code representing the continent of the IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-continent
     */
    continent: Maybe<string>;
    /**
     * A two-character ISO 3166-1 code representing the country of the IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-country
     */
    country: Maybe<string>;
    /**
     * A two-character ISO 3166-2 code representing the region of the IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-country-region
     */
    region: Maybe<string>;
    /**
     * The city name for the location of the requester's public IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-city
     */
    city: Maybe<string>;
    /**
     * The latitude of the IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-latitude
     */
    latitude: Maybe<string>;
    /**
     * The longitude of the IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-longitude
     */
    longitude: Maybe<string>;
    /**
     * The timezone of the IP address.
     * @see https://vercel.com/docs/headers/request-headers#x-vercel-ip-timezone
     */
    timezone: Maybe<string>;
    /**
     * The IP address of the requester.
     * @see https://vercel.com/docs/headers/request-headers#x-real-ip
     */
    ip: Maybe<string>;
};
/**
 * Get Vercel headers from a request.
 *
 * @param request - The request to get the Vercel headers from.
 * @returns The Vercel headers.
 * @see https://vercel.com/docs/headers/request-headers
 */
export declare const getVercelIpHeaders: (request: Request) => VercelIpHeaders;
export {};
