import { useRef, useEffect } from "react";
import { GridHelper } from "three";
import { Object3DNode, extend, useThree } from "@react-three/fiber";
import {
	EffectComposer,
	DepthOfField,
	Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

export default function EffectsProcessing() {
	const { viewport } = useThree((state) => state);
	// const config = useControls({
	// 	focusDistance: { value: 0.0, min: 0.0, max: 4.0 },
	// 	bokeScale: { value: 1.2, min: 0, max: 10 },
	// 	height: 450,
	// 	focalLength: { value: 0.02, min: 0.0, max: 1.0 },
	// });
	// const v = useControls({
	// 	offset: 0.5,
	// 	darkness: 0.5,
	// });
	return (
		<EffectComposer>
			<DepthOfField
				// focusDistance={config.focusDistance}
				// focalLength={config.focalLength}
				// bokehScale={config.bokeScale}
				focusDistance={0.0}
				focalLength={0.02}
				bokehScale={3}
			/>
			<Vignette
				offset={0.57}
				darkness={0.46}
				//blendFunction={BlendFunction.NORMAL} // blend mode
			/>
		</EffectComposer>
	);
}
