import { Document, Page } from "react-pdf";
import Resume from "../../assets/pdf/Resume.pdf?url";
import { Button, Grid, useTheme } from "@mui/material";
import { pdfjs } from "react-pdf";
import { CalculateCanvasSize } from "../../helpers/dynamicCanvasScaler";
import { useWindowWidth } from "@react-hook/window-size";

// This is needed for pdfjs to function
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
	standardFontDataUrl: "standard_fonts/",
};

const downloadFile = (fileUrl: string, fileName: string) => {
	const a = document.createElement("a");
	a.href = fileUrl;
	a.setAttribute("download", fileName);
	a.click();
};

export default function ResumePreview() {
	// We are relying on the useEffect inside this hook for re-rendering the component
	const windowWidth = useWindowWidth();

	const theme = useTheme();
	const canvasSize = CalculateCanvasSize(theme, {
		xs: {
			width: "80vw",
			height: "",
		},
		md: {
			width: "50vw",
			height: "",
		},
		lg: {
			width: "30vw",
			height: "",
		},
	});

	return (
		<Grid container alignContent="center" alignItems="center" direction="column">
			<Grid item>
				<Document file={Resume} options={options}>
					<Page width={canvasSize.width} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
				</Document>
			</Grid>
			<Grid item>
				<Button size="large" onClick={() => downloadFile(Resume, "Tyler Burnett - Resume")}>
					Grab a copy
				</Button>
			</Grid>
		</Grid>
	);
}
