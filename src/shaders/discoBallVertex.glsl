varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;
uniform float uTime;
uniform float uScrollProgress;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;

    // Scale based on scroll progress
    vec3 pos = position;
    float scale = 1.0 + uScrollProgress * 2.0;
    pos *= scale;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vPosition = mvPosition.xyz;
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * mvPosition;
}
