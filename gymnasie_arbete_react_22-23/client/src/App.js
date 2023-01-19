import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navbar }  from "./routes/Navbar";

export async function loader() {
  if (window.localStorage.getItem("token")) {
    var token = window.localStorage.getItem("token");
    return token
  } else {
    return null
  }
}

export function App() {
  const isLoggedIn = useLoaderData();

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <div className="navbar-brand">Schedular</div>
          <div>
            <Navbar data={isLoggedIn} />
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
