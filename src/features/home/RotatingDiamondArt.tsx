import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import type p5Types from "p5";

const baseHeight = 500;
const baseWidth = 1500;
const padding = 20;

let angleY = 0;

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

const drawFace = (p5: p5Types, vertices: verticeList) => {
	p5.beginShape();
	for (const v of vertices) {
		p5.vertex(v.x, v.y, v.z);
	}
	p5.endShape(p5.CLOSE);
};

const calculateCanvasSize = (baseheight: number, baseWidth: number, padding: number): { height: number; width: number } => {
	let width = baseWidth;
	if (baseWidth - padding * 2 > window.innerWidth) {
		width = window.innerWidth - padding * 2;
	}

	const heightPercentage = baseHeight / 1080;
	const height = window.innerHeight * heightPercentage;

	return { width, height };
};

export default function RotatingDiamondArt() {
	const [canvas, setCanvas] = useState<p5Types.Renderer>();

	useEffect(() => {
		return canvas?.remove();
	});

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		const { width, height } = calculateCanvasSize(baseHeight, baseWidth, padding);

		// Create the canvas and bind it immediately
		setCanvas(p5.createCanvas(width, height, "webgl").parent(canvasParentRef));
		p5.disableFriendlyErrors = true;
	};

	const draw = (p5: p5Types) => {
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

	const windowResized = (p5: p5Types) => {
		const { width, height } = calculateCanvasSize(baseHeight, baseWidth, padding);
		p5.resizeCanvas(width, height);
	};

	return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}
