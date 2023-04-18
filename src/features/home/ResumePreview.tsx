import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
import Resume from "../../assets/pdf/Resume.pdf?url";
import { Button, Grid } from "@mui/material";

export default function ResumePreview() {
  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  const download = (fileUrl: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
  };

  return (
    <Grid container direction="column" alignContent="center">
      <Grid item>
        <Document file={Resume} options={options}>
          <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </Grid>
      <Grid item>
        <Button size="large" onClick={() => download(Resume, "Tyler Burnett - Resume")}>
          Grab a copy
        </Button>
      </Grid>
    </Grid>
  );
}
