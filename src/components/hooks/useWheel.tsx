import { useEffect, useMemo, useState } from "react";

export default function useWheelEvent() {
	const [wheelData, setWheelData] = useState({ deltaY: 0, deltaX: 0 });
	
	function handleWheelEvent(event: WheelEvent) {
		setWheelData({ deltaY: event.deltaY, deltaX: event.deltaX });
	}

	useEffect(() => {
		document.body.addEventListener("wheel", handleWheelEvent);

		return () => {
			document.body.removeEventListener("wheel", handleWheelEvent);
		};
	}, []);
	
	const memoizedWheelData = useMemo(() => wheelData, [wheelData]);

	return memoizedWheelData;
}

