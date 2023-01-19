import React from "react";
import { Form, redirect, Link } from "react-router-dom";

export async function action({ params, request }) {
  let formData = await request.formData();
  const fname = formData.get("firstname");
  const lname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");

  const req = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      fname,
      lname,
      email,
      password,
    }),
  });

  const { status } = await req.json();

  if (status === 200) {
    return redirect("/login");
  } else {
    alert("Something went wrong");
  }

  return null;
}

export function SignUp() {
  return (
    <Form method="post" className="wrapper-register">
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          name="firstname"
          className="form-control"
          placeholder="First name"
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          name="lastname"
          className="form-control"
          placeholder="Last name"
        />
      </div>

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

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <Link to="/login">sign in?</Link>
      </p>
    </Form>
  );
}
