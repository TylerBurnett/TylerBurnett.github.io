import type { Theme } from "@mui/material";
import { pixels } from "@pacote/pixels";

export type ResponsiveBreakpoint = {
	height: string;
	width: string;
};

export type CanvasSize = {
	height: number;
	width: number;
};

export const CalculateCanvasSize = (
	theme: Theme,
	breakPoints: { xs?: ResponsiveBreakpoint; sm?: ResponsiveBreakpoint; md?: ResponsiveBreakpoint; lg?: ResponsiveBreakpoint; xl?: ResponsiveBreakpoint },
): CanvasSize => {
	const breakpoints = Object.entries(theme.breakpoints.values)
		.map((b) => b[1])
		.filter((b) => b < window.innerWidth);

	const closestBreakpoint = [breakPoints.xs, breakPoints.sm, breakPoints.md, breakPoints.lg, breakPoints.xl]
		.slice(0, breakpoints.length)
		.filter((v) => v !== undefined)
		.at(-1);

	if (closestBreakpoint !== undefined)
		return {
			height: pixels(closestBreakpoint.height),
			width: pixels(closestBreakpoint.width),
		};

	return { height: 0, width: 0 };
};
