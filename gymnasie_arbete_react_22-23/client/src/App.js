import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Homepage from "./components/homepage.component";
import Logged_in from "./components/is_logged_in.component";

function App() {

  const ProtectedRoute = ({ children }) => {
    const user = window.localStorage.getItem("token")
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-light fixed-top">
          <div className="container">
            <div className="navbar-brand">Schedular</div>
            <div>
              <Logged_in />
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/homepage"
                element={
                  <ProtectedRoute >
                    <Homepage/>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
