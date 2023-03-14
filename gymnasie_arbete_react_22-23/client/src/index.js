import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";

import { App, loader as appLoader } from "./App";
import {
  LogIn,
  action as logInAction,
  loader as loginLoader,
} from "./routes/login/LogIn";
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

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return <div>Dang!</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: appLoader,
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "login",
        loader: loginLoader,
        action: logInAction,
        element: <LogIn />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "signup",
        action: signUpAction,
        element: <SignUp />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "home",
        action: homeAction,
        loader: homeLoader,
        element: <Home />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            loader: todosLoader,
            action: todosAction,
            path: ":projectId",
            element: <Todos />,
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
