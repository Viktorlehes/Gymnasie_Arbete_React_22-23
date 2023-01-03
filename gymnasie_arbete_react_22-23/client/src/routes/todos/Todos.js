import React from "react";
import { useActionData, useLoaderData, Form } from "react-router-dom";
import { requireUserSession } from "../../services/auth";
import { AddTodo } from "./NewTodo";
import Popup from "reactjs-popup";

export async function loader({ params }) {
  const userId = await requireUserSession();

  const projectId = params.projectId;

  const req = await fetch(`http://localhost:8000/home/${projectId}`, {
    method: "GET",
    headers: {
      Authorization: window.localStorage.getItem("token") || "",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const { status, todos, collectionName } = await req.json();

  const data = {
    allTodos: todos,
    collectionName: collectionName,
  };

  return data;
}

export async function action({ params, request }) {
  const userId = await requireUserSession();
  const projectId = params.projectId;
  const errors = {};

  let formData = await request.formData();
  const todoName = formData.get("todoName");
  const intent = formData.get("intent");

  if (intent === "create") {
    if (todoName.trim().length === 0) {
      errors.todoName = "Enter todo name";
      return errors;
    }

    fetch(`http://localhost:8000/home/${projectId}`, {
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        todo: todoName,
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
      })
      .catch((err) => console.log(err));

    if (errors.length > 0) {
      return errors;
    }

    return null;
  }

  if (intent === "remove") {
    const todoId = formData.get("todoId");

    const req = await fetch(`http://localhost:8000/home/remove/${todoId}`, {
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const { status } = await req.json();

    if (errors.length > 0) {
      return errors;
    }

    return null;
  }

  if (intent === "edit") {
    const todoId = formData.get("todoId");
    const newTodoName = formData.get("newTodoName");

    fetch(`http://localhost:8000/home/edit/${todoId}`, {
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        newTodo: newTodoName,
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        console.log(d);
      })
      .catch((err) => console.log(err));

    if (errors.length > 0) {
      return errors;
    }

    return null;
  }
}

export function Todos() {
  const data = useLoaderData();
  const todos = data.allTodos;
  const collectionName = data.collectionName;

  return (
    <div className="wrapper-todos">
      <h2>{collectionName}</h2>
      <ul>
        {todos.map(({ todo, _id }) => {
          return (
            <li className="projects-item todo-item-wrapper" key={_id}>
              <span>{todo}</span>
              <div className="todo-button-wrapper">
                <Popup
                  trigger={
                    <button className="collection-add-button">
                      <span className="material-symbols-outlined projects-item">
                        edit
                      </span>
                    </button>
                  }
                  position="left center"
                >
                  {
                    <Form method="post">
                      <input type={"hidden"} name="todoId" value={_id} />
                      <input
                        type="text"
                        name="newTodoName"
                        placeholder="Edit todo here!"
                        className="form-control"
                      />
                      <button
                        type="submit"
                        name="intent"
                        value="edit"
                        className="edit-todo"
                      >
                        Update
                      </button>
                    </Form>
                  }
                </Popup>

                <Form method="post">
                  <input type={"hidden"} name="todoId" value={_id} />
                  <button
                    type="submit"
                    name="intent"
                    value="remove"
                    className="remove-todo"
                  >
                    <span className="material-symbols-outlined projects-item">
                      close
                    </span>
                  </button>
                </Form>
              </div>
            </li>
          );
        })}
      </ul>
      <AddTodo />
    </div>
  );
}
