import { useEffect, useState, useRef } from "react";

export default function useScrollDetection() {
	const [isScrolling, setIsScrolling] = useState(false);
	const [scrollDirection, setScrollDirection] = useState({
		deltaY: 0,
		deltaX: 0,
	});
	const previousDeltaRef = useRef<any>({ deltaY: 0, deltaX: 0 });

	const handleWheelEvent = (event: WheelEvent) => {
		setIsScrolling(true);
		clearTimeout(previousDeltaRef.current.timeout);

		const scrollData = {
			deltaY: event.deltaY > 0 ? 1 : -1, // 1 for down, -1 for up
			deltaX: event.deltaX > 0 ? 1 : -1, // 1 for right, -1 for left
		};

		setScrollDirection(scrollData);
		previousDeltaRef.current = { ...scrollData };

		previousDeltaRef.current.timeout = setTimeout(() => {
			setIsScrolling(false);
		}, 1000); // Adjust the duration as needed
	};

	useEffect(() => {
		document.body.addEventListener("wheel", handleWheelEvent);

		return () => {
			document.body.removeEventListener("wheel", handleWheelEvent);
			clearTimeout(previousDeltaRef.current.timeout);
		};
	}, []);

	return { isScrolling, scrollDirection };
};

