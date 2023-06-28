"use client";
import { Object3DNode } from "@react-three/fiber";
import { Color, ShaderMaterial, Texture } from "three";
import { shaderMaterial } from "@react-three/drei";
import planeVertex from "../(three)/(shaders)/plane.vertex.glsl";
import planeFragment from "../(three)/(shaders)/plane.fragment.glsl";

type PlaneShaderMaterial = {
	uAlpha: number;
	uMultiplier: number;
	uColorA: Color;
	uColorB: Color;
	uColorC: Color;
	uTime: number;
} & { key: string } & JSX.IntrinsicElements["shaderMaterial"];

export const PlaneShaderMaterial = shaderMaterial(
	{
		uAlpha: 0.5,
		uMultiplier: 42,
		uColorA: new Color(0x48a11d),
		uColorB: new Color(0x48a11d),
		uColorC: new Color(0x000000),
		uTime: 0,
	},
	planeVertex,
	planeFragment
);

declare module "@react-three/fiber" {
	interface ThreeElements {
		planeShaderMaterial: Object3DNode<
			PlaneShaderMaterial,
			PlaneShaderMaterial
		>;
	}
}
