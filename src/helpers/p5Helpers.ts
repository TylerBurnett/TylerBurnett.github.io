export const CalculateCanvasSize = (baseHeight: number, baseWidth: number, padding: number): { height: number; width: number } => {
	let width = baseWidth;
	if (baseWidth - padding * 2 > window.innerWidth) {
		width = window.innerWidth - padding * 2;
	}

	const heightPercentage = baseHeight / 1080;
	const height = window.innerHeight * heightPercentage;

	return { width, height };
};
