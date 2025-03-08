import { createHashRouter } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import AppContainer from "./AppContainer";

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
