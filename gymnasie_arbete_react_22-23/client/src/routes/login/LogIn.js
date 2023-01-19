import React from "react";
import { Form, redirect, Link } from "react-router-dom";
import { requireUserSession } from "../../services/auth"

export async function loader() {
  const auth = await requireUserSession({navToken: "not logged in"});

  return null;
}

export async function action({ params, request }) {
  let formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const req = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      Authorization: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const { data, status } = await req.json();

  if (status === "ok") {
    window.localStorage.setItem("token", data);
    return redirect("/home");
  } else {
    alert("Wrong Email or Password");
  }


  return null;
}

export function LogIn() {
  return (
    <Form method="post" className="wrapper-isloggedin">
      <h3>Log In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <Link to="#" className="forgot-password text-right">
        Forgot password?
      </Link>
    </Form>
  );
}
