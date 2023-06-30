"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
	Object3DNode,
	ShaderMaterialProps,
	extend,
	useFrame,
} from "@react-three/fiber";
import {
	Color,
	DoubleSide,
	Group,
	IUniform,
	MathUtils,
	Mesh,
	MeshStandardMaterial,
	ShaderMaterial,
	Vector3,
} from "three";
import { Leva, useControls } from "leva";
import { Plane, Sparkles, shaderMaterial, useScroll } from "@react-three/drei";
import ContainerImages from "./ContainerImages";
import { PlaneShaderMaterial } from "./PlaneShaderMaterial";
import { LayerMaterialC } from "./LayerMaterial";

extend({ PlaneShaderMaterial });

export function Corridor() {
	const corridorRef = useRef<Group>(null!);
	const shaderRef = useRef<any>(null!);
	const scroll = useScroll();

	useFrame((state, delta) => {
		if (corridorRef.current) {
			const offset = scroll.offset + 1;
			corridorRef.current.position.setZ(+offset);
		}
		if (shaderRef.current) {
			shaderRef.current.uTime = state.clock.elapsedTime;
		}
	});

	// useEffect(() => {
		/** Custom scroll event that inverts scroll direction effect */
		// cause some issues
		function Scroll(event: Event) {
			const { scrollTop, clientHeight, scrollHeight } = scroll.el;
			const diff = Math.floor(scrollTop + clientHeight) - scrollHeight;

			if (diff < 0 && diff > -1.5) {
				const damp = 1 - scroll.offset;
				scroll.el.scrollTop = scroll.offset = -damp;
			}
		}

		// scroll.el.addEventListener("scroll", Scroll, {
		// 	passive: true,
		// });

		// return () => scroll.el.removeEventListener("scroll", Scroll);
	// }, []);

	const stripesControls = useControls("stripes", {
		alpha: {
			min: 0,
			max: 1,
			value: 0.5,
		},
		colorA: "#48a11d",
		colorB: "#82f55c",
	});
	const largeBottomTop = 6;
	const largeSides = 16;

	return (
		<>
			{/* <Leva  /> */}
			<group ref={corridorRef}>
				{/* bottom */}
				<mesh position={[0, -1.5, 0]} rotation={[-(Math.PI / 2), 0, 0]}>
					<planeGeometry  args={[largeBottomTop, largeSides, 3]} />
					<planeShaderMaterial
						 
						uAlpha={stripesControls.alpha}
						uMultiplier={32}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
				</mesh>
				{/* top */}
				<mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<planeShaderMaterial 
						uAlpha={stripesControls.alpha} 
						uMultiplier={32}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
					<planeGeometry args={[largeBottomTop, largeSides, 3]} />
				</mesh>
				{/* left */}
				<mesh rotation={[0, Math.PI / 2, 0]} position={[-3.0, 0, 0]}>
					<planeShaderMaterial 
						uAlpha={stripesControls.alpha} 
						uMultiplier={32}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
					<planeGeometry args={[largeSides, 3, 3]} />
				</mesh>
				{/* right */}
				<mesh rotation={[0, -(Math.PI / 2), 0]} position={[3, 0, 0]}>
					<planeShaderMaterial 
						uAlpha={stripesControls.alpha} 
						uMultiplier={32}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
					<planeGeometry args={[largeSides, 3, 3]} />
				</mesh>
			</group>
			{/* background - fixed */}
			<mesh rotation={[0, 0, 0]} position={[0, 0, -4]}>
				<planeShaderMaterial
					uAlpha={stripesControls.alpha}
					uMultiplier={32}
					uColorA={stripesControls.colorA}
					uColorB={stripesControls.colorB}
				/>
				<planeGeometry args={[6, 3, 3]} />
			</mesh>
		</>
	);
}
