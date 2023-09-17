"use client";
import { useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useMemo, useRef, useState } from "react";
import { Group, MathUtils, Mesh, TextureLoader, Vector3 } from "three";
import { static_img } from "./(constants)/static";
import {
	AMOUNT_PHOTOS,
	generateRandomPositions,
	getInitialPosition,
} from "./(helpers)";
import { Artwork_SR } from "./(types)/types";
const { lerp, clamp } = MathUtils;

export default function ContainerImages() {
	const containerRef = useRef<Group>(null!);
	const [temp] = useState(() => new Vector3());
	const [img, setImg] = useState<Artwork_SR[]>();

	useFrame((state, delta) => {
		// rotation ↓ ↑
		containerRef.current.rotation.x = lerp(
			containerRef.current.rotation.x,
			clamp(state.mouse.y / 8, -1, 1),
			0.08
		);

		// rotation ← → max min
		containerRef.current.rotation.y = lerp(
			containerRef.current.rotation.y,
			clamp(state.mouse.x / 4, -1, 1),
			0.09
		);
	});
	const fillNumber = AMOUNT_PHOTOS - static_img.length; // 8
	const restPhotosArr = generateRandomPositions({ count: fillNumber });
	const randIndex = Math.floor(Math.random() * static_img.length);

	return (
		<group ref={containerRef}>
			{static_img.map((url, i) => (
				<PlaneImage key={Math.random().toString()} img_url={url} />
			))}
			{restPhotosArr.map((pos, i) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url={static_img[randIndex]}
				/>
			))}
		</group>
	);
}

function PlaneImage({ img_url }: { img_url: string }) {
	const meshRef = useRef<Mesh>(null!);
	const texture = useLoader(TextureLoader, img_url);
	const scroll = useScroll();
	const [isHovered, setHovered] = useState(false);
	const initialPosition = useMemo(() => getInitialPosition(), []);

	// increment
	useFrame(() => {
		if (meshRef.current) {
			//console.log(scroll.delta);
			let prev = meshRef.current.position.z;
			//const offset = scroll.offset + initialPosition.z;
			const deltaValue = scroll.delta > 0 ? scroll.delta + 1 : scroll.delta - 1;
			//avanzo
			// const offset = prev * (scroll.offset + 1); // by 1
			const offset = scroll.offset + 1; //  xxxxxxxxxxxxx
			meshRef.current.position.setZ(prev + scroll.delta);
			// meshRef.current.position.setZ(prev);
			// meshRef.current.position.setZ(offset);

			//if(scroll.offset < 0 ) doesn't work
			if (scroll.delta < 0) {
				// meshRef.current.position.setZ(prev - (scroll.delta - 1)); //xxxxxxxxxxxx
				meshRef.current.position.setZ(prev - 0.1);
			}
		}
		if (meshRef.current.position.z > 5) {
			//console.log("reset plane")
			meshRef.current.position.set(
				initialPosition.x,
				initialPosition.y,
				initialPosition.z
			);
		}
	});

	return (
		<motion.mesh
			castShadow
			//@ts-ignore
			ref={meshRef}
			position={initialPosition}
			rotation={[
				0,
				0,
				initialPosition.x < 0 ? Math.random() * 0.3 : Math.random() * -0.3,
			]}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			whileHover={{ rotateZ: 0, scale: 1.2 }}
			transition={{ damping: 4 }}
		>
			<planeGeometry args={[0.6, 1, 1]} />
			<motion.meshBasicMaterial map={texture} />
		</motion.mesh>
	);
}
