"use client";
import Navbar from "@components/navbar/Navbar";
import OverlayPresentation from "@components/overlay/OverlayPresentation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import CanvasGallery from "@three/CanvasScene";

export default function Home() {
	const [overlay, setOverlay] = useState(true);

	useEffect(() => {
		setTimeout(() => setOverlay(false), 2500);
	}, []);

	return (
		<main className={styles.main}>
			<Navbar />
			<AnimatePresence>{overlay && <OverlayPresentation />}</AnimatePresence>
			<CanvasGallery />
		</main>
	);
}
