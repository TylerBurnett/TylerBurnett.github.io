import React from "react";
import { Grid, Typography } from "@mui/material";

interface ContentContainerProps {
  children?: React.ReactNode;
  sectionIndex: number;
  title: string;
}

const numberToBinary = (int: number) => {
  return (int >>> 0).toString(3).padStart(3, "0");
};

export default function ContentContainer(props: ContentContainerProps) {
  return (
    <Grid container spacing={2} minWidth="100%">
      <Grid item top={20}>
        <Typography variant="h3">{numberToBinary(props.sectionIndex)}</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h3" paragraph>
          {props.title}
        </Typography>
      </Grid>
      <Grid item minWidth="100%">
        {props.children}
      </Grid>
    </Grid>
  );
}
