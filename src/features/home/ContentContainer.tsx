import { Grid2 as Grid, Typography, Box } from "@mui/material";
import type React from "react";
import { type ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";
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
	return (
		<Grid 
			container 
			ref={ref} 
			spacing={3} 
			minWidth="100%" 
			maxWidth="100%" 
			paddingBottom={props.paddingBottom ?? 50} 
			justifyContent={props.textAlignment ?? "flex-start"}
			sx={{ 
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '2px',
					background: 'linear-gradient(90deg, #000000 0%, #666666 50%, transparent 100%)',
					borderRadius: '1px'
				}
			}}
		>
			{/* Subtle animated accent element */}
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 0.1, scale: 1 }}
				transition={{ duration: 2, ease: "easeOut" }}
				style={{
					position: 'absolute',
					top: '20px',
					right: '20px',
					width: '60px',
					height: '60px',
					background: 'linear-gradient(135deg, #000000, #666666)',
					borderRadius: '50%',
					filter: 'blur(20px)',
					pointerEvents: 'none',
					zIndex: 0
				}}
			/>
			
			<Grid size={12} sx={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 2, position: 'relative', zIndex: 1 }}>
				<motion.div
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
				>
					<Typography 
						variant="h2" 
						sx={{ 
							fontWeight: 300,
							fontSize: { xs: '3rem', md: '4rem' },
							color: '#000000',
							opacity: 0.8,
							letterSpacing: '0.1em',
							position: 'relative',
							cursor: 'default',
							'&::after': {
								content: '""',
								position: 'absolute',
								bottom: '-4px',
								left: 0,
								width: '100%',
								height: '2px',
								background: 'linear-gradient(90deg, #000000, #666666)',
								borderRadius: '1px'
							}
						}}
					>
						<RollingTextTypography text={numberToBinary(props.sectionIndex)} delay={0.3} />
					</Typography>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<Typography 
						variant="h3" 
						component="h2"
						sx={{ 
							fontWeight: 500,
							position: 'relative',
							cursor: 'default',
							'&:hover': {
								color: '#333333',
								transition: 'color 0.3s ease'
							}
						}}
					>
						{props.title}
					</Typography>
				</motion.div>
			</Grid>
			<Grid size={12} sx={{ marginTop: 4, position: 'relative', zIndex: 1 }}>
				{props.children}
			</Grid>
		</Grid>
	);
}

export default forwardRef(ContentContainer);
