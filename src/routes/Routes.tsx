import { createHashRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import HomePage from "../features/home/Homepage";

const AppRoutes = createHashRouter([
	{
		path: "/",
		element: <AppContainer />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
		],
	},
]);

export default AppRoutes;
