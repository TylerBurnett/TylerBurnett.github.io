import "./fonts.css";
import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    landingHeader: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    landingHeader?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    poster: true;
  }
}

let AppTheme = createTheme({
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
      fontWeight: 500,
    },
    h3: {
      fontFamily: "PPMori",
      fontWeight: 500,
    },
    h4: {
      fontFamily: "PPMori",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "PPMori",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "PPMori",
      fontWeight: 500,
    },
    button: {
      fontFamily: "PPMori",
      fontWeight: 500,
      fontSize: "19px",
      textTransform: "none",
    },
    body1: {
      fontFamily: "PPMori",
      fontWeight: 500,
    },
    landingHeader: {
      fontFamily: "PPMori",
      fontWeight: 500,
      fontSize: "9rem",
      lineHeight: "5.8rem",
    },
  },
});

AppTheme = responsiveFontSizes(AppTheme);

export default AppTheme;
