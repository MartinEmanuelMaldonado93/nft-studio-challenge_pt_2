varying vec2 vUv;

uniform float uMultiplier;//amount 32
uniform float uAlpha;
uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
  // mod : only positives
  vec2 mulvUv = mod(vUv * uMultiplier, 2.0);

  float gap = 0.3;

  float grid = step(gap, mulvUv.y) * step(gap, mulvUv.x);
  vec3 mixColor = mix(uColorA, uColorB, grid);

  gl_FragColor.rgba = vec4(mixColor, uAlpha);
}

// float modTime = mod(mulvUv.y, 1.0);// positive 0 - 1
// float strength = step(0.5, modTime) * step(0.5, modTime);