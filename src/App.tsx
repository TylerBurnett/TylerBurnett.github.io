import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import AppTheme from "./theme/theme";

function App() {
	return (
		<ThemeProvider theme={AppTheme}>
			<CssBaseline />
			<RouterProvider router={AppRoutes} />
		</ThemeProvider>
	);
}

export default App;
