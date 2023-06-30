import { Vector3 } from "three";

export const AMOUNT_PHOTOS = 20;
// export const randomPos = generateRandomPositions({
// 	count: AMOUNT_PHOTOS,
// 	rangeX: 4.5,
// 	rangeY: 1.5,
// 	rangeZ: 6,
// });

export function generateRandomPositions({
	count,
	rangeX = 4.5,
	rangeY = 1.5,
	rangeZ = 6,
	rotationX,
}: {
	count: number;
	rangeX?: number;
	rangeY?: number;
	rangeZ?: number;
	rotationX?: number;
}): Vector3[] {
	const positions: Vector3[] = [];

	for (let i = 0; i < count; i++) {
		const x = Math.random() * rangeX - rangeX / 2; //2.5
		const y = Math.random() * rangeY - 0.4; // 0.5 base floor
		const z = Math.random() * rangeZ - 2.5 - rangeZ / 2;

		positions.push(new Vector3(x, y, z));
	}
	return positions;
}

export function getInitialPosition() {
	let rangeX = 4.5;
	let rangeY = 1.5;
	let rangeZ = 6;
	let x: number, y: number, z: number;
	x = Math.random() * rangeX - rangeX / 2; //2.5
	y = Math.random() * rangeY - 0.4; // 0.5 base floor
	z = Math.random() * rangeZ - 1 - rangeZ / 2;
	let vecResult = new Vector3(x, y, z);
	
	const bound = 0.4;
	if (vecResult.x < 0) vecResult.x -= bound;
	if (vecResult.x > 0) vecResult.x += bound;
	
	return vecResult;
}
