varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;
uniform float uTime;
uniform float uScrollProgress;

// Hash function for tile variation
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec3 normal = normalize(vNormal);

    // ── Spherical UV mapping for consistent tiling ──
    float theta = atan(vWorldPosition.z, vWorldPosition.x);
    float phi = acos(clamp(vWorldPosition.y / length(vWorldPosition), -1.0, 1.0));
    vec2 sphereUV = vec2(theta / 6.2831853 + 0.5, phi / 3.1415926);

    // ── Create grid of mirror tiles ──
    float tilesX = 28.0;
    float tilesY = 14.0;
    vec2 tileCoord = vec2(sphereUV.x * tilesX, sphereUV.y * tilesY);
    vec2 tileId = floor(tileCoord);
    vec2 tileUv = fract(tileCoord);

    // Unique value per tile
    float tileSeed = hash(tileId);
    float tileSeed2 = hash(tileId + vec2(37.0, 91.0));

    // ── Per-tile normal perturbation for varied reflections ──
    vec3 perturbedNormal = normalize(normal + vec3(
        sin(tileSeed * 6.2831853) * 0.12,
        cos(tileSeed * 6.2831853) * 0.12,
        sin(tileSeed2 * 6.2831853) * 0.08
    ));

    // ── View direction ──
    vec3 viewDir = normalize(-vPosition);

    // ── Multiple light sources for rich reflections ──
    // Warm gold light from upper-left, orbiting
    float orbitAngle1 = uTime * 0.3;
    vec3 light1Dir = normalize(vec3(
        sin(orbitAngle1) * 3.0,
        2.5,
        cos(orbitAngle1) * 3.0
    ));
    vec3 light1Color = vec3(0.83, 0.69, 0.22);

    // Cool silver light from upper-right, orbiting opposite
    float orbitAngle2 = uTime * 0.25 + 3.14159;
    vec3 light2Dir = normalize(vec3(
        sin(orbitAngle2) * 3.0,
        2.0,
        cos(orbitAngle2) * 3.0
    ));
    vec3 light2Color = vec3(0.78, 0.78, 0.85);

    // Pink light from below
    float orbitAngle3 = uTime * 0.2 + 1.5708;
    vec3 light3Dir = normalize(vec3(
        sin(orbitAngle3) * 2.0,
        -1.5,
        cos(orbitAngle3) * 2.0
    ));
    vec3 light3Color = vec3(1.0, 0.42, 0.62);

    // ── Specular reflection per light ──
    vec3 reflect1 = reflect(-light1Dir, perturbedNormal);
    float spec1 = pow(max(dot(viewDir, reflect1), 0.0), 40.0);

    vec3 reflect2 = reflect(-light2Dir, perturbedNormal);
    float spec2 = pow(max(dot(viewDir, reflect2), 0.0), 40.0);

    vec3 reflect3 = reflect(-light3Dir, perturbedNormal);
    float spec3 = pow(max(dot(viewDir, reflect3), 0.0), 30.0);

    // ── Diffuse lighting ──
    float diff1 = max(dot(perturbedNormal, light1Dir), 0.0) * 0.4;
    float diff2 = max(dot(perturbedNormal, light2Dir), 0.0) * 0.35;
    float diff3 = max(dot(perturbedNormal, light3Dir), 0.0) * 0.25;

    // ── Sparkle — some tiles catch light brilliantly at certain moments ──
    float sparklePhase = tileSeed * 50.0 + uTime * (1.5 + tileSeed * 1.5);
    float sparkle = pow(max(sin(sparklePhase), 0.0), 50.0);
    float sparkle2 = pow(max(sin(sparklePhase * 0.7 + 1.0), 0.0), 60.0);

    // Intensify sparkle with scroll
    float sparkleIntensity = 0.8 + uScrollProgress * 1.5;
    sparkle *= sparkleIntensity;
    sparkle2 *= sparkleIntensity;

    // ── Base chrome color with subtle variation per tile ──
    vec3 baseColor = vec3(0.75 + tileSeed * 0.08, 0.75 + tileSeed2 * 0.06, 0.80 + tileSeed * 0.05);

    // ── Combine ──
    vec3 finalColor = baseColor * 0.15; // ambient base
    finalColor += light1Color * (diff1 + spec1 * 1.8);
    finalColor += light2Color * (diff2 + spec2 * 1.5);
    finalColor += light3Color * (diff3 + spec3 * 1.0);

    // Add sparkle as white/warm hot spots
    vec3 sparkleColor = mix(vec3(1.0, 0.95, 0.8), vec3(1.0), 0.5);
    finalColor += sparkleColor * sparkle * 1.5;
    finalColor += light1Color * sparkle2 * 0.8;

    // ── Fresnel rim glow ──
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    finalColor += vec3(0.6, 0.55, 0.7) * fresnel * 0.3;

    // ── Tile edge darkening (grout lines) ──
    float edgeWidth = 0.06;
    float edgeX = smoothstep(0.0, edgeWidth, tileUv.x) * smoothstep(0.0, edgeWidth, 1.0 - tileUv.x);
    float edgeY = smoothstep(0.0, edgeWidth, tileUv.y) * smoothstep(0.0, edgeWidth, 1.0 - tileUv.y);
    float edge = edgeX * edgeY;

    // Dark grout between tiles
    finalColor = mix(vec3(0.02, 0.02, 0.03), finalColor, 0.6 + 0.4 * edge);

    // ── Slight iridescence ──
    float iridescence = sin(tileSeed * 20.0 + uTime * 0.5) * 0.5 + 0.5;
    finalColor += vec3(0.05, 0.02, 0.08) * iridescence * fresnel;

    // ── Scroll-driven intensity boost ──
    finalColor *= 1.0 + uScrollProgress * 0.5;

    // ── Tone mapping (simple Reinhard) ──
    finalColor = finalColor / (finalColor + vec3(1.0));

    gl_FragColor = vec4(finalColor, 1.0);
}
