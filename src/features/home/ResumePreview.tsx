import { Grid2 as Grid, Skeleton, useTheme } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Resume from "../../assets/pdf/Resume.pdf?url";
import { CalculateCanvasSize } from "../../helpers/dynamicCanvasScaler";

// This is needed for pdfjs to function
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
	standardFontDataUrl: "standard_fonts/",
};

export const DownloadResume = () => {
	const a = document.createElement("a");
	a.href = Resume;
	a.setAttribute("download", "Tyler Burnett - Resume");
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
		xl: {
			width: "25vw",
			height: "",
		},
	});

	return (
		<Grid container alignContent="center" alignItems="center" direction="column">
			<Grid>
				<Document file={Resume} options={options} loading={<Skeleton width={canvasSize.width} height={canvasSize.width * 1.414141} />}>
					<Page width={canvasSize.width} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
				</Document>
			</Grid>
		</Grid>
	);
}
