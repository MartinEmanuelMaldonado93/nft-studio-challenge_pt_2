"use client";
import { shaderMaterial } from "@react-three/drei";
import { Object3DNode } from "@react-three/fiber";
import { Color } from "three";
import planeFragment from "../shaders/plane.fragment.glsl";
import planeVertex from "../shaders/plane.vertex.glsl";

type PlaneShaderMaterial = {
	uAlpha: number;
	uMultiplier: number;
	uColorA: Color;
	uColorB: Color;
	uColorC: Color;
	// uTime: number;
} & { key: string } & JSX.IntrinsicElements["shaderMaterial"];

export const PlaneShaderMaterial = shaderMaterial(
	{
		uAlpha: 0.5,
		uMultiplier: 32,
		uColorA: new Color(0x48a11d),
		uColorB: new Color(0x48a11d),
	},
	planeVertex,
	planeFragment
);

declare module "@react-three/fiber" {
	interface ThreeElements {
		planeShaderMaterial: Object3DNode<PlaneShaderMaterial, PlaneShaderMaterial>;
	}
}
