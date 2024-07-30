import { ReactP5Wrapper, type Sketch, type P5CanvasInstance } from "@p5-wrapper/react";
import { CalculateCanvasSize } from "../../helpers/p5Helpers";

type verticeList = {
	x: number;
	y: number;
	z: number;
}[];

const sketch: Sketch = (p5: P5CanvasInstance) => {
	const baseHeight = 500;
	const baseWidth = 1500;
	const padding = 20;

	let angleY = 0;

	// Define the vertices for an elongated octahedron
	const vertices: verticeList = [
		{ x: 0, y: 150, z: 0 }, // Top vertex
		{ x: 0, y: -150, z: 0 }, // Bottom vertex
		{ x: 100, y: 0, z: 0 }, // Right vertex
		{ x: -100, y: 0, z: 0 }, // Left vertex
		{ x: 0, y: 0, z: 100 }, // Front vertex
		{ x: 0, y: 0, z: -100 }, // Back vertex
	];

	p5.setup = () => {
		const { width, height } = CalculateCanvasSize(baseHeight, baseWidth, padding);

		// Create the canvas and bind it immediately
		p5.createCanvas(width, height, "webgl");
		p5.disableFriendlyErrors = true;
	};

	p5.windowResized = () => {
		const { width, height } = CalculateCanvasSize(baseHeight, baseWidth, padding);
		p5.resizeCanvas(width, height);
	};

	p5.draw = () => {
		p5.background("#F1F1F1");
		p5.rotateY(angleY);
		p5.noFill();
		p5.stroke(0);

		drawFace(p5, [vertices[0], vertices[2], vertices[4]]);
		drawFace(p5, [vertices[0], vertices[4], vertices[3]]);
		drawFace(p5, [vertices[0], vertices[3], vertices[5]]);
		drawFace(p5, [vertices[0], vertices[5], vertices[2]]);
		drawFace(p5, [vertices[1], vertices[2], vertices[4]]);
		drawFace(p5, [vertices[1], vertices[4], vertices[3]]);
		drawFace(p5, [vertices[1], vertices[3], vertices[5]]);
		drawFace(p5, [vertices[1], vertices[5], vertices[2]]);

		angleY += 0.01;
	};

	const drawFace = (p5: P5CanvasInstance, vertices: verticeList) => {
		p5.beginShape();
		for (const v of vertices) {
			p5.vertex(v.x, v.y, v.z);
		}
		p5.endShape(p5.CLOSE);
	};
};

export default function RotatingDiamondArt() {
	return <ReactP5Wrapper sketch={sketch} />;
}
