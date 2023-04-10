import React from "react";
import { Box, Button, Grid, IconButton, SxProps, Theme, Typography } from "@mui/material";
import CircleGridArt from "./CircleGridArt";
import FadeInTypography from "../common/FadeInTypography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FadeInContainer from "../common/FadeInContainer";

const centered: SxProps<Theme> = {
  transform: "translate(-50%, 0)",
};

export default function Landing() {
  return (
    <Box minHeight="100vh" minWidth="100%" position="relative">
      <Box position="absolute" right={0} top={25}>
        <Button size="large" onClick={() => (window.location.href = "https://www.linkedin.com/in/tyler-burnett-35a9a2181/")}>
          <FadeInTypography delay={0.9} text="Linked In" />
        </Button>
      </Box>

      <Box position="absolute" right={120} top={25}>
        <Button size="large" onClick={() => (window.location.href = "https://github.com/TylerBurnett")}>
          <FadeInTypography delay={0.6} text="Github" />
        </Button>
      </Box>

      <Box position="absolute" left="50%" top={100} sx={centered}>
        <FadeInContainer delay={0} duration={0.6}>
          <CircleGridArt />
        </FadeInContainer>
      </Box>

      <Box position="absolute" left={0} bottom={80} minWidth="100%">
        <Typography variant="h1" textAlign="left" sx={{ fontSize: 150, marginBottom: -6 }}>
          <FadeInTypography delay={0.6} text="Tyler" />
        </Typography>

        <Grid container>
          <Grid item xs={11} md={6}>
            <hr style={{ border: "0.1px solid" }} />
          </Grid>
          <Grid item md={6}>
            <hr style={{ border: "0.1px dashed" }} />
          </Grid>
        </Grid>

        <Typography variant="h2" textAlign="left">
          <FadeInTypography delay={0.7} text="Burnett." />
        </Typography>
      </Box>

      <IconButton aria-label="Scroll Down" size="large" sx={{ position: "absolute", left: "50%", bottom: 10, ...centered }}>
        <ArrowDownwardIcon fontSize="inherit" color="inherit" />
      </IconButton>
    </Box>
  );
}
