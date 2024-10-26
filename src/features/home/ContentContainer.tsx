import { Grid2 as Grid, Typography } from "@mui/material";
import type React from "react";
import { type ForwardedRef, forwardRef } from "react";

interface ContentContainerProps {
	children?: React.ReactNode;
	sectionIndex: number;
	title: string;
	titleAlignment?: "center" | "flex-start" | "flex-end";
}

const numberToBinary = (int: number) => {
	return (int >>> 0).toString(2).padStart(3, "0");
};

function ContentContainer(props: ContentContainerProps, ref: ForwardedRef<HTMLDivElement>) {
	return (
		<Grid container ref={ref} spacing={2} minWidth="100%" maxWidth="100%" paddingBottom={50} justifyContent={props.titleAlignment ?? "flex-start"}>
			<Grid>
				<Typography variant="h3">{numberToBinary(props.sectionIndex)}</Typography>
			</Grid>
			<Grid>
				<Typography variant="h3" component="p">
					{props.title}
				</Typography>
			</Grid>
			<Grid minWidth="100%">{props.children}</Grid>
		</Grid>
	);
}

export default forwardRef(ContentContainer);
