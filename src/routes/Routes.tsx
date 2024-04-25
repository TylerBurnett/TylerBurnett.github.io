import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";
import HomePage from "../features/home/Homepage";

const AppRoutes = createBrowserRouter([
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
