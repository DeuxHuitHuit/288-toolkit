/**
 * Get Vercel headers from a request.
 */
export declare const getVercelIpHeaders: (request: Request) => {
    country: string | null;
    region: string | null;
    city: string | null;
    latitude: string | null;
    longitude: string | null;
    timezone: string | null;
    ip: string;
};
