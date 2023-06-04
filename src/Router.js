import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ValidateDetail from "./pages/ValidateDetail";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: ":id",
          element: <ValidateDetail />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

export default router;
