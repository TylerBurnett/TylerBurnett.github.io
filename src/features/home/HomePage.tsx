import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useRef } from "react";
import { motion } from "framer-motion";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeAutoTyping from "../common/CodeAutoTyping";
import ParallaxContainer from "../common/ParallaxContainer";
import ContentContainer from "./ContentContainer";
import Landing from "./Landing";
import ResumePreview, { DownloadResume } from "./ResumePreview";
import RotatingDiamondArt from "./RotatingDiamondArt";
import "./ContentSection.css";

const codeSample =
	" //TODO: Refactor this, it takes ~80 years to complete\r\nfunction simulateLife() {\r\n  const tyler = new Human();\r\n\r\n  while (!tyler.isDead) {\r\n    tyler.percieve();\r\n    tyler.understand();\r\n    tyler.learn();\r\n  }\r\n}";

export default function HomePage() {
	const firstSectionRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Landing scrollToSectionRef={firstSectionRef} />

			<Box marginTop="40vh" marginBottom="40vh">
				<ParallaxContainer baseVelocity={2}>Eat. Sleep. Code. Repeat.</ParallaxContainer>
				<Grid container justifyContent="center">
					<Grid>
						<RotatingDiamondArt />
					</Grid>
				</Grid>
				<ParallaxContainer baseVelocity={-2}>Eat. Sleep. Code. Repeat.</ParallaxContainer>
			</Box>

			<Box className="content-section-background" sx={{ position: 'relative', py: 8 }}>
				<div className="content-grid-overlay" />
				<div className="floating-accent" />
				<div className="floating-accent" />
				<div className="floating-accent" />
				
				<ContentContainer ref={firstSectionRef} sectionIndex={1} title="Young and Aspiring">
				<Grid 
					container 
					minWidth="100%" 
					spacing={6} 
					justifyContent="space-between"
					sx={{
						background: 'linear-gradient(145deg, #F1F1F1 0%, #F8F8F8 50%, #F1F1F1 100%)',
						borderRadius: '12px',
						padding: { xs: 3, md: 4 },
						boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
						position: 'relative',
						'&::before': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: '12px',
							padding: '1px',
							background: 'linear-gradient(145deg, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.05))',
							mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
							maskComposite: 'xor'
						}
					}}
				>
					<Grid size={{ xs: 12, lg: 7 }} sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						gap: 3,
						position: 'relative'
					}}>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.2 }}
						>
							<Typography 
								variant="body1" 
								component="p"
								sx={{
									lineHeight: 1.8,
									fontSize: { xs: '1rem', md: '1.1rem' },
									position: 'relative',
									'&:hover': {
										color: '#222222',
										transition: 'color 0.3s ease'
									},
									'&::first-letter': {
										fontSize: '1.4em',
										fontWeight: 600,
										color: '#000000'
									}
								}}
							>
								Hi there! I'm Tyler, a Full-Stack Developer based in Brisbane. Although I have only spent 3 years in a professional capacity, I've been developing my solutions at
								home from as young as 13, and ten years later, I'm still writing code and engineering solutions. It's safe to say that I'm passionate about what I do, and I couldn't
								be happier.
							</Typography>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1.4 }}
						>
							<Typography 
								variant="body1" 
								component="p"
								sx={{
									lineHeight: 1.8,
									fontSize: { xs: '1rem', md: '1.1rem' },
									position: 'relative',
									'&:hover': {
										color: '#222222',
										transition: 'color 0.3s ease'
									}
								}}
							>
								When it comes to my work, good discipline and engineering practice are paramount. I'm committed to delivering quality systems and user experiences, and I believe in
								doing the job right, even if it means taking a little extra time. Rushing to market and ignoring technical debt is a recipe for disaster, and I'm not willing to
								compromise on quality.
							</Typography>
						</motion.div>
						
						{/* Subtle decorative element */}
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '120px' }}
							transition={{ duration: 1, delay: 2 }}
							style={{
								height: '2px',
								background: 'linear-gradient(90deg, #000000, transparent)',
								marginTop: '16px',
								borderRadius: '1px'
							}}
						/>
					</Grid>
					<Grid size={{ xs: 12, lg: 5 }} sx={{ 
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'flex-start'
					}}>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 1.6 }}
							whileHover={{ 
								y: -4,
								transition: { duration: 0.2 }
							}}
							style={{ width: '100%', maxWidth: '595px' }}
						>
							<Box sx={{
								width: '100%',
								height: '312px',
								position: 'relative',
								borderRadius: '8px',
								overflow: 'hidden',
								boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
								'&:hover': {
									boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
									transition: 'box-shadow 0.3s ease'
								},
								'&::before': {
									content: '""',
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									height: '24px',
									background: '#2E3440',
									zIndex: 1,
									display: 'flex',
									alignItems: 'center'
								},
								'&::after': {
									content: '"• • •"',
									position: 'absolute',
									top: '6px',
									left: '12px',
									color: '#88C0D0',
									fontSize: '12px',
									zIndex: 2,
									fontFamily: 'monospace'
								}
							}}>
								{/* Terminal title */}
								<Box sx={{
									position: 'absolute',
									top: '4px',
									left: '50%',
									transform: 'translateX(-50%)',
									color: '#D8DEE9',
									fontSize: '11px',
									fontFamily: 'monospace',
									zIndex: 2
								}}>
									life-simulation.js
								</Box>
								
								<CodeAutoTyping 
									text={codeSample} 
									syntaxHighlighterProps={{ 
										style: nord, 
										wrapLongLines: true, 
										children: "",
										customStyle: {
											background: '#2E3440',
											margin: 0,
											padding: '24px 16px 16px 16px',
											fontSize: '14px',
											lineHeight: '1.5'
										}
									}} 
									language="javascript" 
								/>
							</Box>
						</motion.div>
					</Grid>
				</Grid>
			</ContentContainer>
		</Box>

			<Grid container justifyContent="space-around" alignItems="top">
				<Grid order={{ xs: 2, lg: 1 }}>
					<ResumePreview />
				</Grid>
				<Grid order={{ xs: 1, lg: 2 }} maxWidth={{ lg: "50%" }}>
					<ContentContainer sectionIndex={3} title="Get it on paper" textAlignment={{ xs: "center", lg: "flex-start" }} paddingBottom={5}>
						<Typography variant="body1" component="p" textAlign={{ xs: "center", lg: "left" }} paddingBottom={3}>
							You can download a copy of my resume by clicking the button below. If you have any questions, feel free to reach out to me via email or phone.
						</Typography>
						<Grid container justifyContent={{ xs: "center", lg: "flex-start" }}>
							<Button variant="outlined" onClick={DownloadResume}>
								Download Resume
							</Button>
						</Grid>
						<Typography variant="body1" component="p" textAlign={{ xs: "center", lg: "left" }} paddingTop={3}>
							This resume was last updated on <b>8/03/2025</b>
						</Typography>
					</ContentContainer>
				</Grid>
			</Grid>
		</>
	);
}
