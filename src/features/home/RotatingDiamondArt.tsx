import { useTheme } from "@mui/material";
import { type P5CanvasInstance, ReactP5Wrapper, type Sketch } from "@p5-wrapper/react";

type verticeList = {
	x: number;
	y: number;
	z: number;
}[];

// Define the vertices for an elongated octahedron
const vertices: verticeList = [
	{ x: 0, y: 150, z: 0 }, // Top vertex
	{ x: 0, y: -150, z: 0 }, // Bottom vertex
	{ x: 100, y: 0, z: 0 }, // Right vertex
	{ x: -100, y: 0, z: 0 }, // Left vertex
	{ x: 0, y: 0, z: 100 }, // Front vertex
	{ x: 0, y: 0, z: -100 }, // Back vertex
];

export default function RotatingDiamondArt() {
	const theme = useTheme();

	const sketch: Sketch = (p5: P5CanvasInstance) => {
		let angleY = 0;

		p5.setup = () => {
			p5.createCanvas(300, 500, "webgl");
			p5.disableFriendlyErrors = true;
			p5.stroke(0);
		};

		p5.draw = () => {
			p5.background(theme.palette.background.default);
			p5.rotateY(angleY);
			p5.noFill();

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

	return <ReactP5Wrapper sketch={sketch} />;
}
