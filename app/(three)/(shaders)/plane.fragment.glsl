varying vec2 vUv;
uniform float uMultiplier;
uniform float uAlpha;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;

void main() {
	vec2 mulvUv = mod(vUv * uMultiplier, 2.0);// positive 0 - 2
	float modTime = mod(mulvUv.y + uTime, 1.0);
	
	float strength = step(0.5, modTime) * step(0.5, modTime);

	vec3 mixColor = mix(uColorA, uColorB, step(0.5, mulvUv.y) * step(0.5, mulvUv.x));
	
	gl_FragColor.rgba = vec4(mixColor, uAlpha);
}