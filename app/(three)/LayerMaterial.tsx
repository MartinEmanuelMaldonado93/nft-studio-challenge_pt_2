import { shaderMaterial } from "@react-three/drei";
import { Object3DNode, extend } from "@react-three/fiber";
import layerFragment from "./(shaders)/layer.fragment.glsl";
import layerVertex from "./(shaders)/layer.vertex.glsl";
import THREE, { Texture } from "three";

// This material takes care of wiggling and punches a hole into
// alpha regions so that the depth-of-field effect can process the layers.
// Credit: Gianmarco Simone https://twitter.com/ggsimm
type LayerMaterial = {
	textr: null | Texture;
	movement: number[];
	scale: number;
	factor: number;
	wiggle: number;
	time: number;
} & { key: string } & JSX.IntrinsicElements["shaderMaterial"];
// } & { key: string } & typeof THREE.ShaderMaterial;

export const LayerMaterialC = shaderMaterial(
	{ textr: null, movement: [0, 0, 0], scale: 1, factor: 0, wiggle: 0, time: 0 },
	layerVertex,
	layerFragment
);

declare module "@react-three/fiber" {
	interface ThreeElements {
		layerMaterial: Object3DNode<LayerMaterial, typeof LayerMaterialC>;
	}
}
