export const getVercelIpHeaders = (request) => {
    return {
        country: request.headers.get('x-vercel-ip-country'),
        region: request.headers.get('x-vercel-ip-region'),
        city: request.headers.get('x-vercel-ip-city'),
        latitude: request.headers.get('x-vercel-ip-latitude'),
        longitude: request.headers.get('x-vercel-ip-longitude'),
        timezone: request.headers.get('x-vercel-ip-timezone'),
        // forwarded-for headers and contain a list of ip.
        // First, create a string with all values, then split them.
        // Second, jump thru a Set to get unique values and join it again.
        ip: Array.from(new Set([
            request.headers.get('x-vercel-forwarded-for'),
            request.headers.get('x-forwarded-for'),
            request.headers.get('x-real-ip')
        ]
            .filter(Boolean)
            .join(',')
            .split(',')
            .map((ip) => ip.trim())
            .filter(Boolean))).join(', ')
    };
};
