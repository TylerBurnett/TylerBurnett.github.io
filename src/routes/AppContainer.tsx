import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../features/common/Navigation";

/**
 * This is the primary container component for the application, it dictates the router outlet as well as the base padding
 * for the entire website.
 * @param props Please refer to the props interface for more information.
 * @returns A TSX DOM element.
 */
export default function AppContainer() {
	return (
		<>
			<Container maxWidth="xl">
				<Navigation />
				<Outlet />
			</Container>
		</>
	);
}
