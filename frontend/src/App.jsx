import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import TextStress from "./components/TextStressInput";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/text",
    element: <TextStress/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
