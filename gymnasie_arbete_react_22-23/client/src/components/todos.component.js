import React, { useEffect, useState } from "react";

function Todos({data}){
    const [folder, setFolder] = useState("")

    useEffect(()=>{
        setFolder(data || "")
        console.log(data)
    },[data])

    return(
        <div className="wrapper-todos">
            <h2>Collection one</h2>
            <ul>
                <li>This is a todo </li>
                <li>{folder}</li>
            </ul>
        </div>
    )
}

export default Todos;