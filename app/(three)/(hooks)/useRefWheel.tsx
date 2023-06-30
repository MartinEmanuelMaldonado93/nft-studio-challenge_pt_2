import { useEffect, useMemo, useRef } from "react";

export default function useRefWheelEvent() {
	const wheelDataRef = useRef({ deltaY: 0, deltaX: 0 });
	// IS SCROLLING + OR -
	function handleWheelEvent(event: WheelEvent) {
		// wheelDataRef.current = { deltaY: event.deltaY, deltaX: event.deltaX };
		wheelDataRef.current.deltaY = event.deltaY;
		wheelDataRef.current.deltaX = event.deltaX;

		console.log("Wheel event!");
	}

	useEffect(() => {
		document.body.addEventListener("wheel", handleWheelEvent);

		return () => {
			document.body.removeEventListener("wheel", handleWheelEvent);
		};
	}, []);

	return wheelDataRef.current;
}
