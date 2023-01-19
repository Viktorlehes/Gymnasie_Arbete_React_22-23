import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar(isLoggedIn) {
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem("token");
    window.location.reload(0);
  }

  return (
    <div>
      {isLoggedIn.data ? (
        <ul className="nav-items">
          <li className="nav-item">
            <Link className="nav-link" to={"/calendar"}>
              Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/home"}>
              Todos
            </Link>
          </li>
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
