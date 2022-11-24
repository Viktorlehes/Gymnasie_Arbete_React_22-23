import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Logged_in() {
  const [isLoggedIn, setLogin] = useState("")

  useEffect(() =>{
    setLogin(window.localStorage.getItem("token"));
  },[])

  function logout(){
    window.localStorage.removeItem("token");
    window.location.href = "/"
  }

  return (
    <div>
      {isLoggedIn ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span onClick={logout} id="logout" className="material-symbols-outlined">logout</span>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-in"}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/sign-up"}>
              Sign up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Logged_in;