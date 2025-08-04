import {Grid2 as Grid, Typography, useTheme} from "@mui/material";
import type React from "react";
import { type ForwardedRef, forwardRef } from "react";
import RollingTextTypography from "../common/RollingTextTypography";

interface ContentContainerProps {
	children?: React.ReactNode;
	sectionIndex: number;
	title: string;
	textAlignment?: React.ComponentProps<typeof Grid>["justifyContent"];
	paddingBottom?: React.ComponentProps<typeof Grid>["paddingBottom"];
}

const numberToBinary = (int: number) => {
	return (int >>> 0).toString(2).padStart(3, "0");
};

function ContentContainer(props: ContentContainerProps, ref: ForwardedRef<HTMLDivElement>) {
	const theme = useTheme();

	return (
		<Grid container ref={ref} spacing={2} minWidth="100%" maxWidth="100%" paddingBottom={props.paddingBottom ?? 50} justifyContent={props.textAlignment ?? "flex-start"} alignItems="center">
			<Grid>
				<Typography variant="code" fontSize={theme.typography.h4.fontSize}>
					<RollingTextTypography text={numberToBinary(props.sectionIndex)} delay={0.3} />
				</Typography>
				<Typography variant="h3" lineHeight={1}>
					{props.title}
				</Typography>
			</Grid>
			<Grid minWidth="100%">{props.children}</Grid>
		</Grid>
	);
}

export default forwardRef(ContentContainer);
