import { BROWSER } from 'esm-env';
const getPerfEntriesByType = (type) => {
    if (!window.performance?.getEntriesByType) {
        return [];
    }
    return window.performance.getEntriesByType(type);
};
// We run the code in an IIIF because its not reliable beyond initial page load.
// We would need to remove 'holes' created by the browser being idle.
export const estimatedAvailableMegaBytesPerSeconds = (() => {
    if (!BROWSER || !window?.performance) {
        return 0;
    }
    const navigationEntry = getPerfEntriesByType('navigation');
    const resourceEntries = getPerfEntriesByType('resource');
    if (!resourceEntries.length || !navigationEntry.length) {
        return 0;
    }
    const stats = resourceEntries.reduce((memo, entry) => {
        // Safari does not support decodedBodySize, so we use a 55k heuristic
        // isNaN returns true for NaN AND undefined
        memo.size += isNaN(entry.decodedBodySize) ? 55_000 : entry.decodedBodySize;
        memo.maxDuration = Math.max(memo.maxDuration, entry.responseEnd);
        return memo;
    }, {
        maxDuration: 0,
        size: 0
    });
    const initialResponseLag = navigationEntry[0].responseStart;
    const sizeInMb = stats.size / 1024 / 1024;
    const timeInSecs = (stats.maxDuration - initialResponseLag) / 1000;
    return sizeInMb / timeInSecs;
})();
