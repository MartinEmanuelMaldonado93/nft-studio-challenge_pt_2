import { useRef, useEffect } from "react";
import { GridHelper } from "three";
import { Object3DNode, extend } from "@react-three/fiber";
import {
	EffectComposer,
	DepthOfField,
	Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

export default function EffectsProcessing() {
	const config = useControls({
		focusDistance: { value: 0.0, min: 0.0, max: 1.0 },
		bokeScale: 1.2,
		height: 450,
		focalLength: { value: 0.02, min: 0.0, max: 1.0 },
	});
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
				bokehScale={1.2}
				height={config.height} // todo : use the viewport
			/>
			<Vignette
				offset={0.57}
				darkness={0.46}
				//blendFunction={BlendFunction.NORMAL} // blend mode
			/>
		</EffectComposer>
	);
}
