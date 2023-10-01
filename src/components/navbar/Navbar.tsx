"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import style from "./Navbar.module.scss";
import SuperRareSvg from "./superRareSvg";
import { itemVariants, parentList } from "./variants-motion";

export default function Navbar() {
	const ref = useRef<HTMLHeadingElement>(null);
	const [openModal, setOpenModal] = useState(false);

	function handleClickModal(event: React.MouseEvent<HTMLButtonElement>) {
		setOpenModal((prev) => !prev);
	}
	return (
		<header ref={ref} className={`${style.header}`}>
			<div className={style.header__menu}>
				<button className={style.header__menu_icon} onClick={handleClickModal}>
					<FaBarsStaggered />
				</button>
				<button className={style.header__menu_title}>
					3 YEARS OF NFT STUDIOS
				</button>
			</div>
			<div className={style.header__logo_center}>
				<div>NFT STUDIOS</div>
				<SuperRareSvg />
			</div>

			{/* <div className={style.header__logo_center}>SUPER RARE</div> */}
			<div className={style.header__wallet}>
				<span>conect your wallet</span>
			</div>
			<AnimatePresence>
				{openModal && <ModalMenu setOpenModal={setOpenModal} />}
			</AnimatePresence>
		</header>
	);
}

function ModalMenuMotion({
	setOpenModal,
}: {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<motion.div
			className={style.modal}
			transition={{ type: "spring", damping: 15, stiffness: 90, mass: 1.2 }}
			initial={{ opacity: 0, x: "-100%" }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0 }}
		>
			<button className={style.modal__btn} onClick={() => setOpenModal(false)}>
				<span>-</span>
			</button>
			<div className={style.modal__title}>Art Auctions</div>
			<motion.ul
				className={style.modal__ul}
				variants={parentList}
				initial='closed'
				animate='open'
			>
				<motion.li variants={itemVariants}>ARTIST</motion.li>
				<motion.li variants={itemVariants}>FAQ</motion.li>
				<motion.li variants={itemVariants}>TIPS</motion.li>
				<motion.li variants={itemVariants}>TIPS</motion.li>
				<motion.li variants={itemVariants}>ABSOLUTE RARE</motion.li>
			</motion.ul>

			<motion.div
				className={style.modal__footer}
				variants={parentList}
				initial='closed'
				animate='open'
			>
				<motion.div variants={itemVariants}>JOIN US ON DISCORD</motion.div>
				<motion.div variants={itemVariants}>VISIT VAULT</motion.div>
				<motion.div variants={itemVariants}>
					TERMS OF SERVICE AND NFT OWNER LICENSE
				</motion.div>
				<motion.div variants={itemVariants}>PRIVACY POLICY</motion.div>
			</motion.div>
		</motion.div>
	);
}

function ModalMenu({
	setOpenModal,
}: {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<motion.div
			className={style.modal}
			transition={{ type: "spring", damping: 15, stiffness: 90, mass: 1.2 }}
			initial={{ opacity: 0, x: "-100%" }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0 }}
		>
			<button className={style.modal__btn} onClick={() => setOpenModal(false)}>
				<span>-</span>
			</button>
			<div className={style.modal__title}>Art Auctions</div>
			<motion.ul
				className={style.modal__ul}
				variants={parentList}
				initial='closed'
				animate='open'
			>
				<motion.li variants={itemVariants}>ARTIST</motion.li>
				<motion.li variants={itemVariants}>FAQ</motion.li>
				<motion.li variants={itemVariants}>TIPS</motion.li>
				<motion.li variants={itemVariants}>TIPS</motion.li>
				<motion.li variants={itemVariants}>ABSOLUTE RARE</motion.li>
			</motion.ul>

			<motion.div
				className={style.modal__footer}
				variants={parentList}
				initial='closed'
				animate='open'
			>
				<motion.div variants={itemVariants}>JOIN US ON DISCORD</motion.div>
				<motion.div variants={itemVariants}>VISIT VAULT</motion.div>
				<motion.div variants={itemVariants}>
					TERMS OF SERVICE AND NFT OWNER LICENSE
				</motion.div>
				<motion.div variants={itemVariants}>PRIVACY POLICY</motion.div>
			</motion.div>
		</motion.div>
	);
}
