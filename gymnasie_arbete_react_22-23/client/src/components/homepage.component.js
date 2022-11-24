import React, { useEffect, useState } from "react";
import Projects from "./projects.component";
import Todos from "./todos.component"

function Homepage() {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState("");

  function _setFolder(childData) {
    setData(childData);
  }  

  useEffect(() => {
    fetch("http://localhost:8000/homepage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((d) => d.json())
      .then((e) => {
        setUserData(e.data);
        console.log(userData)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="project-wrapper">
      <Projects _setFolder={_setFolder} />
      <Todos data={data}></Todos>
    </div>
  );
}
export default Homepage;
