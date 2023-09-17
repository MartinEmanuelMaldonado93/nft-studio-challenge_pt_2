"use client";
import { Loader } from "@react-three/drei";
import Navbar from "@components/navbar/Navbar";
import CanvasGallery from "@three/CanvasScene";
import styles from "./page.module.scss";

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar />
			<CanvasGallery />
			<Loader
				containerStyles={{ border: "3px solid white" }} // Flex layout styles
				// innerStyles={...inner} // Inner container styles
				// barStyles={...bar} // Loading-bar styles
				// dataStyles={...data} // Text styles
				dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
				initialState={(active) => false} // Initial black out state
			/>
		</main>
	);
}
