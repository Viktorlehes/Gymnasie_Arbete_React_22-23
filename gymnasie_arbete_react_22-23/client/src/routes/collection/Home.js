import React from "react";
import { useLoaderData, Outlet, useActionData } from "react-router-dom";
import { Projects } from "../collections/Projects";
import { requireUserSession } from "../../services/auth";

export async function loader({ params }) {
  const userId = await requireUserSession();

  const req = await fetch(`http://localhost:8000/collections`, {
    method: "GET",
    headers: {
      Authorization: window.localStorage.getItem("token") || "",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const { data, status } = await req.json();

  return data;
}

export async function action({ params, request }) {
  const userId = await requireUserSession();
  const errors = {};
  let formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "new") {
    const collectionName = formData.get("collectionName");

    if (collectionName.trim().length === 0) {
      errors.collectionName = "Enter collection name";
      return errors;
    }

    fetch("http://localhost:8000/collection", {
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userId,
        collectionName,
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
      })
      .catch((err) => console.log(err));

    return null;
  }

  if (intent === "remove") {
    const folderId = formData.get("folderId");
    console.log(folderId);

    fetch("http://localhost:8000/collection/remove", {
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        folderId,
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
      })
      .catch((err) => console.log(err));

    return null;
  }

  if (intent === "edit") {
    const folderId = formData.get("folderId");
    const newCollectionName = formData.get("newCollectionName");

    fetch('http://localhost:8000/collection/edit/', {
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        newCollection: newCollectionName,
        folderId
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
      })
      .catch((err) => console.log(err));

    return null
  }

}

export function Home() {
  const data = useLoaderData();

  return (
    <div className="project-wrapper">
      {data ? <Projects collections={data} /> : null}
      <Outlet />
    </div>
  );
}
