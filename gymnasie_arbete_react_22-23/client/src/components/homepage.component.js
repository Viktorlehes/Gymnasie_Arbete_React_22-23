import React, { useEffect, useState } from "react";

function Homepage() {
  const [userData, setUserData] = useState({})

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
        console.log(e) 
        setUserData(e.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="wrapper">
    </div>
  );
}
export default Homepage;
