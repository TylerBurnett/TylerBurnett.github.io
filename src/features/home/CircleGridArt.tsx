import { useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Application, Graphics, Container } from "pixi.js";
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
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const appRef = useRef<Application | null>(null);
	const isInitializedRef = useRef(false);
	const cleanupRef = useRef<(() => void) | null>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (!canvasRef.current) return;

		const { width, height } = CalculateCanvasSize(theme, breakPoints);
		setDimensions({ width, height });

		// Create Pixi application
		const app = new Application();
		appRef.current = app;

		const initializeApp = async () => {
			try {
				await app.init({
					canvas: canvasRef.current!,
					width,
					height,
					backgroundColor: theme.palette.background.default,
					antialias: true,
				});

				isInitializedRef.current = true;

				// Setup for the animation
				const noise3D = createNoise3D();
				const noiseResolution = 500;
				const noiseMagnitude = 5;
				const gridSpacing = 50;
				const cursorRadius = 50;
				const circleSize = 2.5;
				let time = 0;

				// Create container for circles
				const circleContainer = new Container();
				app.stage.addChild(circleContainer);

				// Object pool for graphics to prevent memory leaks
				const graphicsPool: Graphics[] = [];
				const activeGraphics: Graphics[] = [];

				const getGraphicsFromPool = (): Graphics => {
					if (graphicsPool.length > 0) {
						return graphicsPool.pop()!;
					}
					return new Graphics();
				};

				const returnGraphicsToPool = (graphics: Graphics) => {
					graphics.clear();
					graphics.x = 0;
					graphics.y = 0;
					graphicsPool.push(graphics);
				};

				// Mouse position tracking
				let mouseX = 0;
				let mouseY = 0;

				// Mouse move handler
				const handleMouseMove = (event: MouseEvent) => {
					if (!canvasRef.current) return;
					const rect = canvasRef.current.getBoundingClientRect();
					mouseX = event.clientX - rect.left;
					mouseY = event.clientY - rect.top;
				};

				canvasRef.current!.addEventListener('mousemove', handleMouseMove);

				const calculateGrid = () => {
					const rows = Math.floor((height - circleSize) / gridSpacing);
					const cols = Math.floor((width - circleSize) / gridSpacing);
					return { rows, cols };
				};

				// Animation loop
				const animate = () => {
					if (!isInitializedRef.current) return;

					time += 0.006;

					// Return all active graphics to pool
					while (activeGraphics.length > 0) {
						const graphics = activeGraphics.pop()!;
						circleContainer.removeChild(graphics);
						returnGraphicsToPool(graphics);
					}

					const { rows, cols } = calculateGrid();

					// Calculate grid offsets for centering
					const xOffset = (width - cols * gridSpacing - circleSize) / 2;
					const yOffset = (height - rows * gridSpacing - circleSize) / 2;

					for (let i = 0; i < rows; i++) {
						for (let j = 0; j < cols; j++) {
							const x = gridSpacing * j + gridSpacing / 2 + xOffset;
							const y = gridSpacing * i + gridSpacing / 2 + yOffset;
							const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
							const noiseVal = noise3D(x / noiseResolution, y / noiseResolution, time) * noiseMagnitude;

							// Check canvas bounds
							if (x + circleSize / 2 > width || x - circleSize / 2 < 0 ||
								y + circleSize / 2 > height || y - circleSize / 2 < 0) {
								continue;
							}

							// Get circle graphic from pool
							const circle = getGraphicsFromPool();

							let circleSizeAdjusted: number;
							if (distance < cursorRadius) {
								const proximity = 1 - distance / cursorRadius;
								circleSizeAdjusted = circleSize + noiseVal * circleSize * 2 * proximity;
							} else {
								circleSizeAdjusted = circleSize + noiseVal * circleSize * 2;
							}

							circle.circle(0, 0, circleSizeAdjusted / 2);
							circle.fill(0x000000);
							circle.x = x;
							circle.y = y;

							circleContainer.addChild(circle);
							activeGraphics.push(circle);
						}
					}
				};

				// Start animation loop
				app.ticker.add(animate);

				// Return cleanup function
				const cleanup = () => {
					if (canvasRef.current) {
						canvasRef.current.removeEventListener('mousemove', handleMouseMove);
					}

					// Stop animation
					if (app && app.ticker) {
						app.ticker.remove(animate);
					}

					// Clean up all graphics objects
					while (activeGraphics.length > 0) {
						const graphics = activeGraphics.pop()!;
						graphics.destroy();
					}

					while (graphicsPool.length > 0) {
						const graphics = graphicsPool.pop()!;
						graphics.destroy();
					}

					// Clean up container
					if (circleContainer) {
						circleContainer.destroy({ children: true });
					}
				};

				cleanupRef.current = cleanup;
				return cleanup;

			} catch (error) {
				console.error('Failed to initialize Pixi application:', error);
				return () => {};
			}
		};

		initializeApp().catch((error) => {
			console.error('Error during app initialization:', error);
		});

		// Cleanup on unmount
		return () => {
			isInitializedRef.current = false;

			// Call our cleanup function first
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = null;
			}

			// Then destroy the app
			if (appRef.current) {
				try {
					appRef.current.destroy(true, true);
				} catch (error) {
					console.error('Error destroying Pixi application:', error);
				}
				appRef.current = null;
			}
		};
	}, [theme]);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			if (appRef.current && isInitializedRef.current && appRef.current.renderer) {
				const { width, height } = CalculateCanvasSize(theme, breakPoints);
				setDimensions({ width, height });
				appRef.current.renderer.resize(width, height);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [theme]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: dimensions.width,
				height: dimensions.height,
				display: 'block'
			}}
		/>
	);
}
