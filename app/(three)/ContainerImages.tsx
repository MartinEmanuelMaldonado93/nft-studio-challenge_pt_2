"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
	CanvasTexture,
	Color,
	Group,
	MathUtils,
	Mesh,
	TextureLoader,
	Vector3,
} from "three";
import { useScroll, useTexture } from "@react-three/drei";
import { Artwork_SR } from "./(types)/types";
import { motion } from "framer-motion-3d";
import {
	AMOUNT_PHOTOS,
	generateRandomPositions,
	getInitialPosition,
} from "./(helpers)";
import { clamp, smoothstep } from "three/src/math/MathUtils";
import { getImagesData_Server } from "../serverActions";
import { static_img } from "./(constants)/static";
const { lerp } = MathUtils;

export default function ContainerImages() {
	const containerRef = useRef<Group>(null!);
	const [temp] = useState(() => new Vector3());
	const [img, setImg] = useState<Artwork_SR[]>();

	useFrame((state, delta) => {
		// rotation ↓ ↑
		containerRef.current.rotation.x = lerp(
			containerRef.current.rotation.x,
			state.mouse.y / 8,
			2 * delta
		);
		// rotation ← →
		containerRef.current.rotation.y = lerp(
			containerRef.current.rotation.y,
			state.mouse.x / 4,
			0.5 * delta
		);
	});


	const fillNumber = AMOUNT_PHOTOS - static_img.length;// 8
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

	useFrame(() => {
		if (!meshRef.current) return;
		let prev = meshRef.current.position.z;
		meshRef.current.position.setZ(prev + scroll.delta);
		if (meshRef.current.position.z > 4) {
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
			<motion.meshBasicMaterial
				map={texture}
				opacity={1}
				transition={{ stiffness: 50 }}
			/>
		</motion.mesh>
	);
}
