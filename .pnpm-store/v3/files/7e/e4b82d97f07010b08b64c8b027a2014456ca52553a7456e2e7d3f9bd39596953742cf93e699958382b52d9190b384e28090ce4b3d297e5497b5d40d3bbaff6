import { pointInPolygon } from './index.js';
export function isPointerInGraceArea(e, area) {
    if (!area)
        return false;
    return pointInPolygon({ x: e.clientX, y: e.clientY }, area);
}
