import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./App";
import { LogIn, action as logInAction } from "./routes/login/LogIn";
import { SignUp, action as signUpAction } from "./routes/Signup/SignUp";
import {
  Home,
  action as homeAction,
  loader as homeLoader,
} from "./routes/collection/Home";
import {
  Todos,
  loader as todosLoader,
  action as todosAction,
} from "./routes/todos/Todos";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        action: logInAction,
        element: <LogIn />,
      },
      {
        path: "signup",
        action: signUpAction,
        element: <SignUp />,
      },
      {
        path: "home",
        action: homeAction,
        loader: homeLoader,
        element: <Home />,
        children: [
          {
            loader: todosLoader,
            action: todosAction,
            path: ":projectId",
            element: <Todos />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
