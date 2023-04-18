import React from "react";
import Landing from "./Landing";
import ContentContainer from "./ContentContainer";
import { Grid, Typography } from "@mui/material";
import CodeAutoTyping from "../common/CodeAutoTyping";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import ResumePreview from "./ResumePreview";

const codeSample =
  " //TODO: Refactor this function, it takes ~80 years to complete\r\nfunction simulateLife() {\r\n  const tyler = new Human();\r\n\r\n  while (!tyler.isDead) {\r\n    tyler.percieve();\r\n    tyler.understand();\r\n    tyler.learn();\r\n  }\r\n}";

export default function HomePage() {
  return (
    <>
      <Landing />
      <ContentContainer sectionIndex={1} title="Young and Aspiring">
        <Grid container minWidth="100%" spacing={5} justifyContent="space-between">
          <Grid item maxWidth="800px">
            <Typography variant="body1" paragraph>
              Hi there! I'm Tyler, a Full-Stack Developer based in Brisbane. Although I have only spent 3 years in a professional capacity, I've been developing my solutions at
              home from as young as 13, and ten years later, I'm still writing code and engineering solutions. It's safe to say that I'm passionate about what I do, and I couldn't
              be happier.
            </Typography>
            <Typography variant="body1" paragraph>
              When it comes to my work, good discipline and engineering practice are paramount. I'm committed to delivering quality systems and user experiences, and I believe in
              doing the job right, even if it means taking a little extra time. Rushing to market and ignoring technical debt is a recipe for disaster, and I'm not willing to
              compromise on quality.
            </Typography>
          </Grid>
          <Grid item width="595px" height="312px">
            <CodeAutoTyping text={codeSample} syntaxHighlighterProps={{ style: nord, wrapLongLines: true }} language="javascript" />
          </Grid>
        </Grid>
      </ContentContainer>

      <ContentContainer sectionIndex={2} titleAlignment="center" title="Get it on paper">
        <Grid container justifyContent="center">
          <Grid>
            <ResumePreview />
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
}
