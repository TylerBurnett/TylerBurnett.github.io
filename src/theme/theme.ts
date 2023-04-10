import "./fonts.css";
import { createTheme } from "@mui/material";

const AppTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#F1F1F1",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    h1: {
      fontFamily: "PPMori",
      fontWeight: 500,
    },
    h2: {
      fontFamily: "PPMori",
      fontWeight: "bold",
    },
    h3: {
      fontFamily: "PPMori",
      fontWeight: "bold",
    },
    h4: {
      fontFamily: "PPMori",
      fontWeight: "bold",
    },
    h5: {
      fontFamily: "PPMori",
      fontWeight: "bold",
    },
    h6: {
      fontFamily: "PPMori",
      fontWeight: "bold",
    },
    button: {
      fontFamily: "PPMori",
    },
  },
});

export default AppTheme;
