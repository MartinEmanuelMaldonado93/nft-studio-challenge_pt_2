"use client";
import { motion, type Variants } from "framer-motion";
import style from "./OverlayPresentation.module.scss";

export default function OverlayPresentation() {
	const overlay: Variants = {
		initial: {
			transform: "scaleX(0%) ",
			transformOrigin: "left",
		},
		shift: {
			transform: "scaleX(100%) ",
			transitionTimingFunction: "easeInOut",
		},
		shiftOut: {
			transform: "scaleX(0%) ",
			transformOrigin: "right",
		},
	};
	const container: Variants = {
		initial: {},
		"fade-in": {
			transition: {
				delayChildren: 1.2,
				staggerChildren: 0.3,
			},
		},
		"fade-out": {
			transition: {
				delayChildren: 1.5,
				staggerChildren: 0.4,
			},
		},
	};
	const items: Variants = {
		initial: {
			transform: "translateY(100%)",
			opacity: 0,
		},
		"fade-in": {
			transform: "translateY(0%)",
			opacity: 1,
			transition: {
				damping: 1,
				stiffness: 100,
			},
		},
		"fade-out": {
			transform: "translateY(-100%)",
			opacity: 0,
		},
	};

	return (
			<motion.div
				className={style.container}
				variants={overlay}
				initial={"initial"}
				animate={"shift"}
				exit={"shiftOut"}
			>
				<motion.div
					className={style.container__description}
					variants={container}
					initial='initial'
					animate='fade-in'
				>
					<motion.div variants={items}>
						Gucci® Nft 3D Gallery challenge
					</motion.div>
					<motion.div variants={items}>by Martin Maldonado</motion.div>
				</motion.div>
				<div className={style.loading}>{/* <div>loading ....</div> */}</div>
			</motion.div>
	);
}
