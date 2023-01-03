import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setLogin] = useState("");

  useEffect(() => {
    setLogin(window.localStorage.getItem("token"));
  }, []);

  function logout() {
    window.localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      {isLoggedIn ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span
              onClick={logout}
              id="logout"
              className="material-symbols-outlined"
            >
              logout
            </span>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/signup"}>
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
