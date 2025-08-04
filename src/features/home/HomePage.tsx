import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useRef } from "react";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeAutoTyping from "../common/CodeAutoTyping";
import ParallaxContainer from "../common/ParallaxContainer";
import ContentContainer from "./ContentContainer";
import Landing from "./Landing";
import ResumePreview, { DownloadResume } from "./ResumePreview";
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

			<ContentContainer ref={firstSectionRef} sectionIndex={1} title="Who am I?">
				<Grid container minWidth="100%" spacing={5} justifyContent="space-between">
					<Grid maxWidth="800px">
						<Typography variant="body1" component="p" pb={2}>
							I'm a problem-solver at heart who finds genuine satisfaction in building things that work well.
							There's something deeply rewarding about taking complex challenges and distilling them into
							elegant solutions—whether that's through code, architecture, or simply asking the right questions.
							I approach each project with curiosity and a healthy skepticism of "that's how it's always been done."
						</Typography>
						<Typography variant="body1" component="p">
							I thrive in the space between technical possibility and practical reality. When I'm not coding,
							I'm usually thinking about systems, exploring new ideas, or writing about the intersection of
							technology and thoughtful design. Brisbane keeps me grounded, but my interests span wherever
							good problems need solving.
						</Typography>
					</Grid>
					<Grid width="595px" height="312px">
						<CodeAutoTyping text={codeSample} syntaxHighlighterProps={{ style: nord, wrapLongLines: true, children: "" }} language="javascript" />
					</Grid>
				</Grid>
			</ContentContainer>

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
