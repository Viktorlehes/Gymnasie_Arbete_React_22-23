import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet } from "react-router-dom";

import { Navbar }  from "./routes/Navbar";

export function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <div className="navbar-brand">Schedular</div>
          <div>
            <Navbar />
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
