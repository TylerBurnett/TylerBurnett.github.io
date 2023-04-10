import React, { useEffect, useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

const baseHeight = 500;
const baseWidth = 1000;
const padding = 20;

let rows: number, cols: number;
let circleSize: number;
let circleSpacing: number;
let time = 0;
const gridSize = 5;
const noiseResolution = 2;
const noiseMagnitude = 5;
const gridSpacing = 50; // spacing between circles in the grid
const cursorRadius = 100; // radius of cursor effect

const calculateCanvasSize = (baseheight: number, baseWidth: number, padding: number): { height: number; width: number } => {
  let width = baseWidth;
  if (baseWidth - padding * 2 > window.innerWidth) {
    width = window.innerWidth - padding * 2;
  }

  const heightPercentage = baseHeight / 1080;
  const height = window.innerHeight * heightPercentage;

  return { width, height };
};

export default function CircleGridArt() {
  const [canvas, setCanvas] = useState<p5Types.Renderer>();

  useEffect(() => {
    return canvas?.remove();
  });

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const { width, height } = calculateCanvasSize(baseHeight, baseWidth, padding);

    // Create the canvas and bind it immediately
    setCanvas(p5.createCanvas(width, height).parent(canvasParentRef));

    rows = p5.floor((p5.height * gridSize) / gridSpacing);
    cols = p5.floor((p5.width * gridSize) / gridSpacing);
    circleSize = p5.width / (cols * 3);
    circleSpacing = gridSpacing;
    p5.noStroke();
  };

  const draw = (p5: p5Types) => {
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

        if (distance < cursorRadius) {
          const proximity = 1 - distance / cursorRadius; // proximity is 1 when the mouse is directly over the circle, and 0 when it is at the edge of the cursor radius
          const noiseVal = p5.noise(x / noiseResolution, y / noiseResolution, time) * noiseMagnitude;
          const circleSizeAdjusted = circleSize + noiseVal * circleSize * 2 * proximity;

          p5.fill(0);
          p5.ellipse(x, y, circleSizeAdjusted, circleSizeAdjusted);
        } else {
          const noiseVal = p5.noise(x / noiseResolution, y / noiseResolution, time) * noiseMagnitude;
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

  const windowResized = (p5: p5Types) => {
    const { width, height } = calculateCanvasSize(baseHeight, baseWidth, padding);
    p5.resizeCanvas(width, height);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
}
