import React from "react";
import { requireUserSession } from "../services/auth";

export async function loader(){
    const userId = await requireUserSession();

    return null;
}

export function Calendar() { 

    return (
      <></>
    )
}