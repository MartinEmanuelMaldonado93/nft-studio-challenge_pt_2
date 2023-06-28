varying vec2 vUv;
void main() {
	vUv = uv;//texture
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}