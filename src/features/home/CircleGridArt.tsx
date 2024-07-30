import { CalculateCanvasSize } from "../../helpers/p5Helpers";
import { type P5CanvasInstance, ReactP5Wrapper, type Sketch } from "@p5-wrapper/react";

const sketch: Sketch = (p5: P5CanvasInstance) => {
	const baseHeight = 500;
	const baseWidth = 1000;
	const padding = 20;

	let rows: number;
	let cols: number;
	let circleSize: number;
	let circleSpacing: number;
	let time = 0;
	const gridSize = 5;
	const noiseResolution = 2;
	const noiseMagnitude = 5;
	const gridSpacing = 50; // spacing between circles in the grid
	const cursorRadius = 100; // radius of cursor effect

	p5.setup = () => {
		const { width, height } = CalculateCanvasSize(baseHeight, baseWidth, padding);

		// Create the canvas and bind it immediately
		p5.createCanvas(width, height);
		p5.disableFriendlyErrors = true;

		rows = Math.floor((p5.height * gridSize) / gridSpacing);
		cols = Math.floor((p5.width * gridSize) / gridSpacing);
		circleSize = p5.width / (cols * 3);
		circleSpacing = gridSpacing;
		p5.noStroke();
	};

	p5.windowResized = () => {
		const { width, height } = CalculateCanvasSize(baseHeight, baseWidth, padding);
		p5.resizeCanvas(width, height);
	};

	p5.draw = () => {
		p5.background("#F1F1F1");
		time += 0.0015;

		const mouse = p5.createVector(p5.mouseX, p5.mouseY);

		// Calculate the horizontal and vertical offset of the grid
		const xOffset = (p5.width - cols * gridSpacing) / 2;
		const yOffset = (p5.height - rows * gridSpacing) / 2;

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const x = circleSpacing * j + circleSpacing / 2 + xOffset;
				const y = circleSpacing * i + circleSpacing / 2 + yOffset;
				const distance = p5.dist(x, y, mouse.x, mouse.y);

				const noiseVal = p5.noise(x / noiseResolution, y / noiseResolution, time) * noiseMagnitude;

				if (distance < cursorRadius) {
					const proximity = 1 - distance / cursorRadius; // proximity is 1 when the mouse is directly over the circle, and 0 when it is at the edge of the cursor radius
					const circleSizeAdjusted = circleSize + noiseVal * circleSize * 2 * proximity;

					p5.fill(0);
					p5.ellipse(x, y, circleSizeAdjusted, circleSizeAdjusted);
				} else {
					const circleSizeAdjusted = circleSize + noiseVal * circleSize * 2;

					if (x > p5.width || x < 0 || y > p5.height || y < 0) {
						continue; // Skip this circle if it's outside the canvas
					}

					p5.fill(0);
					p5.ellipse(x, y, circleSizeAdjusted, circleSizeAdjusted);
				}
			}
		}
	};
};

export default function CircleGridArt() {
	return <ReactP5Wrapper sketch={sketch} />;
}
