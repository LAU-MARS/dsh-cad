/** Otsu's threshold for a luma image. */
export function otsuThreshold(gray) {
    const histogram = new Array(256).fill(0);
    for (const value of gray)
        histogram[value]++;
    const total = gray.length;
    let sum = 0;
    for (let t = 0; t < 256; t++)
        sum += t * histogram[t];
    let sumB = 0;
    let countB = 0;
    let best = 0;
    let bestThreshold = 127;
    for (let t = 0; t < 256; t++) {
        countB += histogram[t];
        if (countB === 0)
            continue;
        const countF = total - countB;
        if (countF === 0)
            break;
        sumB += t * histogram[t];
        const meanB = sumB / countB;
        const meanF = (sum - sumB) / countF;
        const between = countB * countF * (meanB - meanF) * (meanB - meanF);
        if (between > best) {
            best = between;
            bestThreshold = t;
        }
    }
    return bestThreshold;
}
/** Connected components over a binary mask (4-connectivity, iterative flood). */
function components(mask, width, height) {
    const labels = new Int32Array(mask.length).fill(-1);
    const groups = [];
    for (let start = 0; start < mask.length; start++) {
        if (mask[start] !== 1 || labels[start] !== -1)
            continue;
        const group = [];
        const stack = [start];
        labels[start] = groups.length;
        while (stack.length > 0) {
            const index = stack.pop();
            group.push(index);
            const x = index % width;
            const y = (index - x) / width;
            if (x > 0 && mask[index - 1] === 1 && labels[index - 1] === -1) {
                labels[index - 1] = groups.length;
                stack.push(index - 1);
            }
            if (x < width - 1 && mask[index + 1] === 1 && labels[index + 1] === -1) {
                labels[index + 1] = groups.length;
                stack.push(index + 1);
            }
            if (y > 0 && mask[index - width] === 1 && labels[index - width] === -1) {
                labels[index - width] = groups.length;
                stack.push(index - width);
            }
            if (y < height - 1 && mask[index + width] === 1 && labels[index + width] === -1) {
                labels[index + width] = groups.length;
                stack.push(index + width);
            }
        }
        groups.push(group);
    }
    return groups;
}
/** Moore-neighbor boundary trace of one labeled component (outer contour). */
function traceBoundary(labels, width, height, label, start) {
    // 8 neighbors clockwise starting from east; backtrack is tracked as pixel
    // coordinates and re-expressed relative to the current pixel each step.
    const dirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    const at = (x, y) => {
        if (x < 0 || y < 0 || x >= width || y >= height)
            return -1;
        return labels[y * width + x];
    };
    const dirIndex = (dx, dy) => {
        for (let i = 0; i < 8; i++)
            if (dirs[i][0] === dx && dirs[i][1] === dy)
                return i;
        return 0;
    };
    const sy = Math.floor(start / width);
    const sx = start - sy * width;
    // The scan found the leftmost foreground pixel of its row, so west is background.
    let bx = sx - 1;
    let by = sy;
    const boundary = [sx, sy];
    let px = sx;
    let py = sy;
    for (let step = 0, maxSteps = 8 * width * height + 16; step < maxSteps; step++) {
        const origin = dirIndex(bx - px, by - py);
        let found = -1;
        for (let k = 1; k <= 8; k++) {
            const d = (origin + k) % 8;
            if (at(px + dirs[d][0], py + dirs[d][1]) === label) {
                found = d;
                break;
            }
        }
        if (found === -1)
            break; // isolated single pixel
        const previous = (found + 7) % 8;
        bx = px + dirs[previous][0];
        by = py + dirs[previous][1];
        px += dirs[found][0];
        py += dirs[found][1];
        if (px === sx && py === sy)
            break;
        boundary.push(px, py);
    }
    return boundary;
}
function perpendicularDistance(point, index, ax, ay, bx, by) {
    const px = point[index];
    const py = point[index + 1];
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0)
        return Math.hypot(px - ax, py - ay);
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
/** RDP over [from, to]; returns kept indices (inclusive). */
function rdpRange(boundary, from, to, tolerance) {
    const keep = [];
    const stack = [[from, to]];
    keep.push(from, to);
    while (stack.length > 0) {
        const [start, end] = stack.pop();
        let maxDistance = -1;
        let split = -1;
        const ax = boundary[start * 2];
        const ay = boundary[start * 2 + 1];
        const bx = boundary[end * 2];
        const by = boundary[end * 2 + 1];
        for (let i = start + 1; i < end; i++) {
            const distance = perpendicularDistance(boundary, i * 2, ax, ay, bx, by);
            if (distance > maxDistance) {
                maxDistance = distance;
                split = i;
            }
        }
        if (maxDistance > tolerance && split !== -1) {
            keep.push(split);
            stack.push([start, split], [split, end]);
        }
    }
    return keep.sort((a, b) => a - b);
}
/**
 * Simplify a closed boundary: anchor RDP at the start and its farthest point
 * (a mid-edge start anchor alone would let a nearby corner slip through).
 */
function simplify(boundary, tolerance) {
    // Close the ring explicitly so the second RDP range ends on the start point.
    const closed = boundary.concat([boundary[0], boundary[1]]);
    const count = closed.length / 2;
    let far = 0;
    let maxDistance = -1;
    for (let i = 1; i < count - 1; i++) {
        const distance = Math.hypot(closed[i * 2] - closed[0], closed[i * 2 + 1] - closed[1]);
        if (distance > maxDistance) {
            maxDistance = distance;
            far = i;
        }
    }
    const first = rdpRange(closed, 0, far, tolerance);
    const second = rdpRange(closed, far, count - 1, tolerance);
    const indices = [...first, ...second.filter((index) => index !== far && index !== count - 1)];
    const out = [];
    for (const index of indices)
        out.push(closed[index * 2], closed[index * 2 + 1]);
    return out;
}
/** Extract simplified outer contours from a luma image, largest first. */
export function extractProfiles(image, options = {}) {
    const { width, height, gray } = image;
    const threshold = options.threshold ?? otsuThreshold(gray);
    const invert = options.invert ?? false;
    const tolerance = options.tolerance ?? 1.5;
    const scale = options.scale ?? 1;
    const minArea = options.minArea ?? 24;
    const mask = new Uint8Array(gray.length);
    for (let i = 0; i < gray.length; i++) {
        // Otsu's class split is "≤ T vs > T", so dark uses <=.
        const dark = gray[i] <= threshold;
        mask[i] = (invert ? !dark : dark) ? 1 : 0;
    }
    const labels = new Int32Array(mask.length).fill(-1);
    const profiles = [];
    for (const group of components(mask, width, height)) {
        if (group.length < minArea)
            continue;
        const label = profiles.length + 1;
        for (const index of group)
            labels[index] = label;
        const boundary = traceBoundary(labels, width, height, label, group[0]);
        for (const index of group)
            labels[index] = -1;
        if (boundary.length < 6)
            continue;
        const points = simplify(boundary, tolerance);
        if (points.length < 6)
            continue;
        // px (y down) → mm (y up)
        const mm = new Array(points.length);
        for (let i = 0; i < points.length; i += 2) {
            mm[i] = points[i] * scale;
            mm[i + 1] = (height - 1 - points[i + 1]) * scale;
        }
        profiles.push({ points: mm, area: group.length });
    }
    profiles.sort((a, b) => b.area - a.area);
    return profiles;
}
