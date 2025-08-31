import { useTheme } from "@mui/material";
import { type P5CanvasInstance, ReactP5Wrapper, type Sketch } from "@p5-wrapper/react";
import { CalculateCanvasSize } from "../../helpers/dynamicCanvasScaler";
import { createNoise3D } from 'simplex-noise';

const breakPoints = {
	xs: {
		width: "84vw",
		height: "46vh",
	},
	lg: {
		width: "56vw",
		height: "46vh",
	},
};

export default function CircleGridArt() {
	const theme = useTheme();
	const sketch: Sketch = (p5: P5CanvasInstance) => {
        const noise3D = createNoise3D();
		const noiseResolution = 500;
		const noiseMagnitude = 5;
		const gridSpacing = 50; // spacing between circles in the grid
		const cursorRadius = 50; // radius of cursor effect
		const circleSize = 2.5;
		let rows: number;
		let cols: number;
		let circleSpacing: number;
		let time = 0;

		const calculateGrid = () => {
			rows = Math.floor((p5.height - circleSize) / gridSpacing);
			cols = Math.floor((p5.width - circleSize) / gridSpacing);
			circleSpacing = gridSpacing;
		};

		p5.setup = () => {
			const { width, height } = CalculateCanvasSize(theme, breakPoints);
			p5.createCanvas(width, height);
			p5.disableFriendlyErrors = true;
			calculateGrid();
			p5.noStroke();
		};

		p5.windowResized = () => {
			const { width, height } = CalculateCanvasSize(theme, breakPoints);
			p5.resizeCanvas(width, height);
			calculateGrid();
		};

		p5.draw = () => {
			p5.background(theme.palette.background.default);
			time += 0.006;

			const mouse = p5.createVector(p5.mouseX, p5.mouseY);
			// Calculate the horizontal and vertical offset of the grid
			const xOffset = (p5.width - cols * gridSpacing - circleSize) / 2;
			const yOffset = (p5.height - rows * gridSpacing - circleSize) / 2;

			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					const x = circleSpacing * j + circleSpacing / 2 + xOffset;
					const y = circleSpacing * i + circleSpacing / 2 + yOffset;
					const distance = p5.dist(x, y, mouse.x, mouse.y);
					const noiseVal = noise3D(x / noiseResolution, y / noiseResolution, time) * noiseMagnitude;

					// Make sure the circle is within canvas bounds
					if (x + circleSize / 2 > p5.width || x - circleSize / 2 < 0 || y + circleSize / 2 > p5.height || y - circleSize / 2 < 0) {
						continue;
					}

					if (distance < cursorRadius) {
						const proximity = 1 - distance / cursorRadius; // proximity is 1 when the mouse is directly over the circle, and 0 when it is at the edge of the cursor radius
						const circleSizeAdjusted = circleSize + noiseVal * circleSize * 2 * proximity;
						p5.fill(0);
						p5.ellipse(x, y, circleSizeAdjusted, circleSizeAdjusted);
					} else {
						const circleSizeAdjusted = circleSize + noiseVal * circleSize * 2;
						p5.fill(0);
						p5.ellipse(x, y, circleSizeAdjusted, circleSizeAdjusted);
					}
				}
			}
		};
	};

	return <ReactP5Wrapper sketch={sketch} loading={() => ""} />;
}
