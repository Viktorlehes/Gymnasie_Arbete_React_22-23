import React, { useEffect, useState } from "react";

function UserDetails() {

    useEffect(() => { 
        fetch("http://localhost:8000/userdetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            })
        }).then(d => d.json()).then(e => console.log(e, window.localStorage.getItem("token"))).catch(err => console.log(err));
    },[]);

    return (
        <div>
            Name<h1> viktor</h1>
            Email<h1>vikwer.werwe@sdf.asd</h1>
        </div>
    )
}
export default UserDetails;
