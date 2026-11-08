/**
 * Linear interpolation between two values.
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number}
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a value from one range to another.
 * @param {number} value - Input value
 * @param {number} inMin - Input range minimum
 * @param {number} inMax - Input range maximum
 * @param {number} outMin - Output range minimum
 * @param {number} outMax - Output range maximum
 * @returns {number}
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  return clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax));
}

/**
 * Generate a random number within a range.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Convert degrees to radians.
 * @param {number} deg
 * @returns {number}
 */
export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Hermite interpolation (smoothstep).
 * Returns 0 if x <= edge0, 1 if x >= edge1, smooth curve between.
 * @param {number} edge0
 * @param {number} edge1
 * @param {number} x
 * @returns {number}
 */
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
