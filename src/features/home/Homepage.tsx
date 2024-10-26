import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { useRef } from "react";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeAutoTyping from "../common/CodeAutoTyping";
import ParallaxContainer from "../common/ParallaxContainer";
import ContentContainer from "./ContentContainer";
import Landing from "./Landing";
import ResumePreview from "./ResumePreview";
import RotatingDiamondArt from "./RotatingDiamondArt";

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

			<ContentContainer ref={firstSectionRef} sectionIndex={1} title="Young and Aspiring">
				<Grid container minWidth="100%" spacing={5} justifyContent="space-between">
					<Grid maxWidth="800px">
						<Typography variant="body1" component="p">
							Hi there! I'm Tyler, a Full-Stack Developer based in Brisbane. Although I have only spent 3 years in a professional capacity, I've been developing my solutions at
							home from as young as 13, and ten years later, I'm still writing code and engineering solutions. It's safe to say that I'm passionate about what I do, and I couldn't
							be happier.
						</Typography>
						<Typography variant="body1" component="p">
							When it comes to my work, good discipline and engineering practice are paramount. I'm committed to delivering quality systems and user experiences, and I believe in
							doing the job right, even if it means taking a little extra time. Rushing to market and ignoring technical debt is a recipe for disaster, and I'm not willing to
							compromise on quality.
						</Typography>
					</Grid>
					<Grid width="595px" height="312px">
						<CodeAutoTyping text={codeSample} syntaxHighlighterProps={{ style: nord, wrapLongLines: true, children: "" }} language="javascript" />
					</Grid>
				</Grid>
			</ContentContainer>

			<Grid container justifyContent="space-around" alignItems="top">
				<Grid>
					<ResumePreview />
				</Grid>
				<Grid>
					<ContentContainer sectionIndex={3} title="Get it on paper">
						<Typography variant="body1" component="p">
							This resume was last updated on <b>23/10/2024</b>
						</Typography>
					</ContentContainer>
				</Grid>
			</Grid>
		</>
	);
}
