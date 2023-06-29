"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Color, Group, MathUtils, Mesh, TextureLoader, Vector3 } from "three";
import { useScroll } from "@react-three/drei";
import useSWR, { useSWRConfig } from "swr";
import { Artwork_SR } from "./(types)/types";
import { motion } from "framer-motion-3d";
import { getInitialPosition, getRandomPosition, randomPos } from "./(helpers)";
import { clamp, smoothstep } from "three/src/math/MathUtils";
const { lerp } = MathUtils;

export default function ContainerImages() {
	const containerRef = useRef<Group>(null!);
	const [temp] = useState(() => new Vector3());
	const [img, setImg] = useState<Artwork_SR[]>();
	const static_img = [
		"nft0.jpg",
		"nft1.jpg",
		"nft2.jpg",
		"nft3.jpg",
		"nft4.jpg",
		"nft5.jpg",
		"nft6.jpg",
	];
	// const { data, error, isLoading } = useSWR("artists", () =>
	// 	fetch(
	// 		"https://most-expensive-nft-artworks.p.rapidapi.com/artworks?page=1&sort=usd_price",
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				"X-RapidAPI-Key":
	// 					"617e3a44bfmsh068af74f6f9a92bp19a375jsn678322e5767d",
	// 				"X-RapidAPI-Host": "most-expensive-nft-artworks.p.rapidapi.com",
	// 			},
	// 		}
	// 	)
	// );

	// useEffect(() => {
	// 	(async () => {
	// 		const imgs: Artwork_SR[] = await data?.json();
	// 		img && setImg(img);
	// 		console.log(imgs);
	// 	})();
	// }, [data]);

	const rads = MathUtils.degToRad(20);
	const smooth = 0.1;
	useFrame((state, delta) => {
		// rotation ↓ ↑
		containerRef.current.rotation.x = lerp(
			containerRef.current.rotation.x,
			-(state.mouse.y / 10),
			0.5 * delta
		);
		// rotation ← →
		containerRef.current.rotation.y = lerp(
			containerRef.current.rotation.y,
			state.mouse.x / 4,
			0.5 * delta
		);
	});

	return (
		<group ref={containerRef}>
			{static_img.map((url, i) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url={url}
					// pos={getRandomPosition()}
				/>
			))}
			{randomPos.map((pos, i) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url="/nft0.jpg"
					pos={pos}
				/>
			))}
		</group>
	);
}

function PlaneImage({ img_url, pos }: { img_url: string; pos?: Vector3 }) {
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
			rotation={[0, 0, initialPosition.x < 0 ? 0.03 : -0.05]}
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
