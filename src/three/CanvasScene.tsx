"use client";
import { useRef, useState } from "react";
import { Loader, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ContainerImages from "./ContainerImages";
import Corridor from "./Corridor";
import style from "./CanvasScene.module.scss";

export default function CanvasGallery() {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const [enabled, enable] = useState(true);

	return (
		<>
			<Canvas
				ref={canvasRef}
				className={style.canvas}
				camera={{ far: 500, fov: 80, position: [0, 0.3, 4] }}
			>
				<ambientLight intensity={0.01} />
				<fog attach='fog' args={[0x000000, 1, 9]} />
				<ScrollControls infinite eps={0.01} damping={0.4}>
					<Scroll>
						<Corridor />
						<ContainerImages />
					</Scroll>
				</ScrollControls>
				{/** If PerfMon detects a low framerate it will switch back to harsh shadows */}
				{/* <PerformanceMonitor onDecline={() => enable(false)} /> */}
				{/* <OrbitControls /> */}
				{/* <EffectsProcessing /> */}
			</Canvas>
			<Loader />
		</>
	);
}
